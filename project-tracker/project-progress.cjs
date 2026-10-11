const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const manifestPath = path.join(__dirname, 'project-progress.json');
const definitions = [
 ['S0',['Token validation and session isolation','Local identity configuration and manual AI fallback','Real Cognito and authenticated browser acceptance','Staging transport and release recovery']],
 ['S1',['Allowlisted profile API and UI','Owned paginated activity and UI','Real SQL Server persistence and ownership','Fresh-device/browser retrieval and retry acceptance']],
 ['S2',['Authenticated listing creation','Approved taxonomy and currency/pricing contract','Owner edit/pause/close with revisions','Real database validation and lifecycle acceptance']],
 ['S3',['Owner-authorised deterministic matches','Persisted discovery and public details','Configured/versioned weights and explanations','Owner-reviewed semantic and exclusion acceptance']],
 ['S4',['Blocks and reports','Authorised operator cases','Transactional outbox and receipts','Crash/replay acceptance']],
 ['S5',['Participant requests and terms','Inbox and reload persistence','Decline and withdraw','Permission and duplicate acceptance']],
 ['S6',['Atomic acceptance and capacity','Immutable agreement view','Idempotency and revisions','Real SQL concurrent acceptance']],
 ['S7',['Persistent participant messages','Cursor history and retry keys','Delivery/read semantics','Multi-device and forbidden-access acceptance']],
 ['S8',['Independent completion reports','Confirmation state and history','Cancellation and dispute workflow','Concurrency and permission acceptance']],
 ['S9',['Eligible role-specific reviews','Hidden reciprocal publication','Reputation recomputation','Privacy/window/withdrawal acceptance']],
 ['S10',['Private quarantined upload','Format validation and metadata removal','Parent-authorised serving','Withdrawal and failure acceptance']],
 ['S11',['Defined cohort metrics','Operator and pilot views','Restore and rotation drills','Full journey and owner release review']]
];
function seed() {
 const local = {'S0':2,'S1':2,'S2':1,'S3':1};
 const evidence = ['docs/test-evidence/2026-10-01/s0-account-isolation.md','docs/test-evidence/2026-10-01/s0-s1-signin-profile.md'];
 const model = {schemaVersion:1,updatedAt:'2026-10-01',method:'Equal weight for 48 tracked checkpoints; done requires a recorded evidence reference. Local completion does not close a release slice.',slices:definitions.map(([id,names])=>({id,releaseAccepted:false,releaseEvidence:[],checkpoints:names.map((title,i)=>({id:id+'-'+(i+1),title,status:i<(local[id]||0)?'done':'pending',evidence:i<(local[id]||0)?evidence:[]}))}))};
 fs.writeFileSync(manifestPath, JSON.stringify(model,null,2)+'\n');
}
function readProgress() {
 if (!fs.existsSync(manifestPath)) seed();
 const m=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
 if(m.schemaVersion!==1||m.slices.length!==12)throw Error('Progress manifest must contain schemaVersion 1 and all 12 slices');
 const safeEvidence=p=>typeof p==='string'&&!path.isAbsolute(p)&&!p.split(/[\\/]/).includes('..')&&fs.existsSync(path.join(root,p));
 const seen=new Set();
 for(const s of m.slices){
  if(seen.has(s.id)||!definitions.some(d=>d[0]===s.id)||s.checkpoints.length!==4)throw Error('Invalid or duplicate slice '+s.id);
  seen.add(s.id);
  for(const c of s.checkpoints){if(!['done','pending','in-progress','blocked'].includes(c.status))throw Error('Invalid checkpoint status');c.credited=c.status==='done'&&c.evidence.length>0&&c.evidence.every(safeEvidence);}
  s.percent=100*s.checkpoints.filter(c=>c.credited).length/s.checkpoints.length;
  s.accepted=s.releaseAccepted===true&&s.percent===100&&s.releaseEvidence.length>0&&s.releaseEvidence.every(safeEvidence);
 }
 return m;
}
function sourceSnapshot() {
 const h=crypto.createHash('sha256');let count=0;let latest=0;
 function scan(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){if(e.isSymbolicLink()||['.git','node_modules','bin','obj','dist','.aws','.workflow-runs'].includes(e.name)||e.name==='connecto-project-guide.html')continue;const p=path.join(dir,e.name);if(e.isDirectory())scan(p);else if(/\.(md|markdown|txt|docx|cs|csproj|jsx|js|mjs|json|tf|html)$/i.test(e.name)&&!/^appsettings/i.test(e.name)){const st=fs.statSync(p);h.update(path.relative(root,p));h.update(fs.readFileSync(p));count++;latest=Math.max(latest,st.mtimeMs);}}}
 for(const name of fs.readdirSync(root).sort())if(name==='docs'||name.startsWith('connecto-')&&fs.statSync(path.join(root,name)).isDirectory())scan(path.join(root,name));
 h.update(fs.readFileSync(manifestPath));
 return {revision:h.digest('hex'),fileCount:count,latestFileChange:new Date(latest).toISOString()};
}
module.exports={readProgress,sourceSnapshot};
