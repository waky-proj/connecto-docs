const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {readProgress,sourceSnapshot}=require('./project-progress.cjs');
const model=readProgress();
assert.equal(model.slices.length,12);
assert.equal(model.slices.flatMap(s=>s.checkpoints).length,48);
assert.ok(model.slices.flatMap(s=>s.checkpoints).filter(c=>c.credited).length>=6);
assert.equal(model.slices.filter(s=>s.accepted).length,0);
const original=fs.readFileSync(path.join(__dirname,'project-progress.json'));
try{
 const edited=JSON.parse(original);edited.slices[0].checkpoints[0].evidence=['docs/does-not-exist.md'];
 fs.writeFileSync(path.join(__dirname,'project-progress.json'),JSON.stringify(edited));
 assert.equal(readProgress().slices[0].percent,25,'Missing evidence must remove completion credit');
 edited.slices[0].releaseAccepted=true;edited.slices[0].releaseEvidence=['docs/current-baseline.md'];
 fs.writeFileSync(path.join(__dirname,'project-progress.json'),JSON.stringify(edited));
 assert.equal(readProgress().slices[0].accepted,false,'Partial checkpoints cannot close release gates');
}finally{fs.writeFileSync(path.join(__dirname,'project-progress.json'),original);}
const fixture=path.join(__dirname,'..','dashboard-monitor-verification.txt');
assert.equal(fs.existsSync(fixture),false);
const before=sourceSnapshot();
try{fs.writeFileSync(fixture,'Temporary monitor verification');assert.notEqual(sourceSnapshot().revision,before.revision);}finally{fs.unlinkSync(fixture);}
assert.equal(sourceSnapshot().revision,before.revision);
console.log('PASS: 48 checkpoint calculation, missing evidence handling, release-gate protection, source/document change detection and restoration.');
