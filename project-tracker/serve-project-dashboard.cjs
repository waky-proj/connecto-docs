// Loopback-only guide and fixed local workflow runner. No arbitrary command endpoint.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const {readProgress,sourceSnapshot}=require('./project-progress.cjs');
const workflows=require('./project-workflows.cjs');
const root=path.resolve(__dirname,'../..');
const port=Number(process.env.CONNECTO_DASHBOARD_PORT||5188);
if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid dashboard port');
const origin='http://127.0.0.1:'+port;
let state;
function refresh(){readProgress();const next=sourceSnapshot();if(!state||next.revision!==state.revision){execFileSync(process.execPath,[path.join(__dirname,'build-project-dashboard.cjs')],{cwd:root,stdio:'pipe'});state=next;}return {...state,checkedAt:new Date().toISOString()};}
refresh();
const types={'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.markdown':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
const server=http.createServer((req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403);return res.end('Invalid host');}
 try{
  const url=new URL(req.url,origin);
  if(url.pathname.startsWith('/api/workflows')){
   res.setHeader('Content-Type','application/json; charset=utf-8');
   if(req.method==='GET'&&url.pathname==='/api/workflows')return res.end(JSON.stringify(workflows.summary()));
   if(req.method!=='POST'||req.headers.origin!==origin||req.headers['content-type']!=='application/json'){res.writeHead(403);return res.end(JSON.stringify({error:'Use the local guide to run workflows'}));}
   let body='';req.on('data',part=>{body+=part;if(body.length>1024)req.destroy();});
   return req.on('end',()=>{try{const input=JSON.parse(body);let result;
    if(url.pathname==='/api/workflows/run')result=workflows.runTask(input.id);
    else if(url.pathname==='/api/workflows/demo/start')result=workflows.startDemo();
    else if(url.pathname==='/api/workflows/demo/stop'){workflows.stopDemo();result=workflows.summary();}
    else if(url.pathname==='/api/workflows/stage-draft')result={path:workflows.stageDraft(input.stage)};
    else {res.writeHead(404);return res.end(JSON.stringify({error:'Unknown action'}));}
    res.end(JSON.stringify(result));
   }catch(e){res.writeHead(400);res.end(JSON.stringify({error:e.message}));}});
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end('Method not allowed');}
  if(url.pathname==='/api/state'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(refresh()));}
  refresh();
  const relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'connecto-project-guide.html';
  if(relative!=='connecto-project-guide.html'&&!(relative.startsWith('docs/')&&types[path.extname(relative).toLowerCase()])){res.writeHead(404);return res.end('Not exposed by dashboard');}
  const target=relative==='connecto-project-guide.html'?path.join(__dirname,relative):path.resolve(root,relative);
  if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end('Outside project');}
  const real=fs.realpathSync(target);if(!real.startsWith(fs.realpathSync(root)+path.sep)){res.writeHead(403);return res.end('Outside project');}
  res.setHeader('Content-Type',types[path.extname(target).toLowerCase()]||'application/octet-stream');
  if(req.method==='HEAD')return res.end();res.end(fs.readFileSync(target));
 }catch(e){res.writeHead(e.code==='ENOENT'?404:503);res.end('Unable to refresh dashboard: '+e.message);}
});
server.listen(port,'127.0.0.1',()=>console.log('Connecto live dashboard: '+origin+'/ — checks every 5 seconds while the page is open. Ctrl+C stops the monitor.'));
server.on('error',e=>{console.error(e.message);process.exitCode=1;});
