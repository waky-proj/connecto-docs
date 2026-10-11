// Fixed, local-only workflows for the project guide. No model or remote API calls.
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const runsDir = path.join(root, '.workflow-runs');
const npm = process.execPath;
const npmCli = path.join(path.dirname(process.execPath),'node_modules','npm','bin','npm-cli.js');
const steps = (cwd, command, args) => ({cwd:path.join(root,cwd),command,args:command===npm?[npmCli,...args]:args});
const tasks = [
 {id:'frontend-tests',group:'Tests',title:'Frontend tests',description:'Run the current Node test suite, including older regressions.',steps:[steps('connecto-app',npm,['test'])]},
 {id:'backend-tests',group:'Tests',title:'Backend tests',description:'Run the full current .NET unit/API test project; inspect any skipped tests.',steps:[steps('connecto-api','dotnet',['test','Connecto.Tests.Unit/Connecto.Tests.Unit.csproj','--verbosity','minimal'])]},
 {id:'identity-contract',group:'Tests',title:'Identity contract',description:'Check the frontend auth request against API Terraform configuration.',steps:[steps('.','node',['--test','docs/domain-design/identity-contract.test.mjs'])]},
 {id:'frontend-lint',group:'Build and quality',title:'Frontend lint',description:'Check JavaScript and feature boundaries.',steps:[steps('connecto-app',npm,['run','lint'])]},
 {id:'frontend-format-check',group:'Build and quality',title:'Frontend format check',description:'Check formatting without changing source.',steps:[steps('connecto-app',npm,['run','format:check'])]},
 {id:'frontend-build',group:'Build and quality',title:'Frontend production build',description:'Build the Vite production bundle.',steps:[steps('connecto-app',npm,['run','build'])]},
 {id:'backend-build',group:'Build and quality',title:'Backend Release build',description:'Build the API and related projects.',steps:[steps('connecto-api','dotnet',['build','Connecto.Api/Connecto.Api.csproj','--configuration','Release'])]},
 {id:'docker-build',group:'Build and quality',title:'Local API Docker image',description:'Build a local connecto-api:local image. Docker must be running; base image download may use the network.',steps:[steps('connecto-api','docker',['build','--file','Dockerfile','--tag','connecto-api:local','.'])]},
 {id:'terraform-check',group:'Build and quality',title:'Terraform format and validate',description:'Check the existing API Terraform configuration; provider initialization must already be complete.',steps:[steps('connecto-api/terraform','terraform',['fmt','-check','-recursive']),steps('connecto-api/terraform','terraform',['validate','-no-color'])]},
 {id:'dashboard-check',group:'Documentation',title:'Verify project guide',description:'Rebuild the offline guide and run dashboard checks.',steps:[steps('.','node',['docs/project-tracker/build-project-dashboard.cjs']),steps('.','node',['docs/project-tracker/verify-project-dashboard.cjs']),steps('.','node',['docs/project-tracker/verify-project-monitor.cjs'])]},
 {id:'all-local-checks',group:'Combined',title:'All routine local checks',description:'Run frontend tests, lint and build, backend tests and build, identity contract, and dashboard checks.',steps:[steps('connecto-app',npm,['test']),steps('connecto-app',npm,['run','lint']),steps('connecto-app',npm,['run','build']),steps('connecto-api','dotnet',['test','Connecto.Tests.Unit/Connecto.Tests.Unit.csproj','--verbosity','minimal']),steps('connecto-api','dotnet',['build','Connecto.Api/Connecto.Api.csproj','--configuration','Release']),steps('.','node',['--test','docs/domain-design/identity-contract.test.mjs']),steps('.','node',['docs/project-tracker/build-project-dashboard.cjs']),steps('.','node',['docs/project-tracker/verify-project-dashboard.cjs']),steps('.','node',['docs/project-tracker/verify-project-monitor.cjs'])]}
];
const publicTasks = tasks.map(({id,group,title,description})=>({id,group,title,description}));
let active = null;
let last = null;
let demo = null;
function summary(){return {tasks:publicTasks,active:active && publicRun(active),last:last && publicRun(last),demo:demo?{startedAt:demo.startedAt,pid:demo.child.pid,url:'http://127.0.0.1:5173/'}:null};}
function publicRun(run){return {id:run.id,title:run.title,startedAt:run.startedAt,endedAt:run.endedAt,status:run.status,step:run.step,exitCode:run.exitCode,log:run.log.slice(-16000),report:run.report};}
function append(run,line){run.log=(run.log+line).slice(-1000000);fs.appendFileSync(run.logPath,line);}
function runTask(id){
 if(active)throw Error('A workflow is already running');
 const task=tasks.find(t=>t.id===id);if(!task)throw Error('Unknown workflow');
 fs.mkdirSync(runsDir,{recursive:true});
 const stamp=new Date().toISOString().replace(/[:.]/g,'-');
 const run={id,title:task.title,startedAt:new Date().toISOString(),status:'running',step:0,log:'',logPath:path.join(runsDir,stamp+'-'+id+'.log'),report:null};
 active=run;append(run,task.title+' · '+run.startedAt+'\n');
 (async()=>{try{for(let i=0;i<task.steps.length;i++){
  const s=task.steps[i];run.step=i+1;append(run,'\n['+(i+1)+'/'+task.steps.length+'] '+s.command+' '+s.args.join(' ')+'\n');
  const code=await new Promise((resolve,reject)=>{const child=spawn(s.command,s.args,{cwd:s.cwd,env:process.env,windowsHide:true,shell:false});child.stdout.on('data',b=>append(run,b.toString()));child.stderr.on('data',b=>append(run,b.toString()));child.on('error',reject);child.on('close',resolve);});
  if(code!==0){run.exitCode=code;throw Error('Step '+(i+1)+' exited with '+code);}
 }
 run.status='passed';run.exitCode=0;
 }catch(e){run.status='failed';append(run,'\n'+e.message+'\n');}finally{run.endedAt=new Date().toISOString();append(run,'\nResult: '+run.status+' · '+run.endedAt+'\n');last=run;active=null;}})();
 return publicRun(run);
}
function startDemo(){
 if(demo)throw Error('Demo server is already running');
 const child=spawn(npm,[npmCli,'run','dev'],{cwd:path.join(root,'connecto-app'),env:process.env,windowsHide:true,shell:false,stdio:'ignore'});
 demo={child,startedAt:new Date().toISOString()};
 child.on('error',()=>{if(demo?.child===child)demo=null;});
 child.on('close',()=>{if(demo?.child===child)demo=null;});
 return summary().demo;
}
function stopDemo(){if(!demo)throw Error('Demo server is not running');const child=demo.child;demo=null;if(process.platform==='win32')spawn('taskkill',['/pid',String(child.pid),'/t','/f'],{windowsHide:true});else child.kill('SIGTERM');}
function stageDraft(stage){
 if(!/^S(?:[0-9]|1[01])$/.test(stage))throw Error('Unknown stage');
 fs.mkdirSync(runsDir,{recursive:true});
 const now=new Date();const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Pacific/Auckland',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const file=path.join(runsDir,`${day}-${stage.toLowerCase()}-evidence-draft.md`);
 if(fs.existsSync(file))throw Error('A draft for this stage and day already exists; review it before making another');
 const related=last?`Latest guide workflow: ${last.title}; ${last.status}; ${last.startedAt}; log: ${path.relative(root,last.logPath).replaceAll('\\','/')}`:'No workflow run recorded in this dashboard session.';
 const content=`# ${stage} evidence draft — ${day} (Pacific/Auckland)\n\nStatus: draft; no release acceptance or canonical-document approval is implied.\n\n## Work and environment\n\n- Change / commit or working tree: TODO\n- Tested environment and configuration (no secrets): TODO\n- ${related}\n\n## Verification\n\n- Commands and exact pass/fail/skip counts: TODO (read the full log and test reports)\n- Existing regression tests: TODO\n- New behavior tests: TODO\n- Browser, real SQL, Cognito, staging, recovery and accessibility gates where applicable: TODO / not run\n- Demo walkthrough and screenshots, clearly labelled illustrative or persisted: TODO / not run\n\n## Documentation impact\n\n- Implemented behavior versus target behavior: TODO\n- Canonical Word document sections/versions affected: assess under AGENTS.md and document-change-register.md\n- DCR reference, approval basis and archival/verification: TODO; do not edit canonical files from this draft\n- Project guide or supporting README updates: TODO\n- Open risks and next gate: TODO\n`;
 fs.writeFileSync(file,content,{flag:'wx'});return path.relative(root,file).replaceAll('\\','/');
}
module.exports={summary,runTask,startDemo,stopDemo,stageDraft};
