'use strict';
// Unit tests for bilingual renderers and copy/print content. Not a browser test.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const nodes={infoDialog:{addEventListener(){}},printArea:{innerHTML:''}};
const sandbox={console,localStorage:{getItem(){return null;}},document:{addEventListener(){},getElementById(id){return nodes[id];}},window:{addEventListener(){}}};
vm.createContext(sandbox);vm.runInContext(scripts[0],sandbox);
const marker='try{render();}catch(error){failSafe(error);}';
assert.equal(scripts[1].split(marker).length,2);
vm.runInContext(scripts[1].replace(marker,`globalThis.testUI={set(s,l){state=s;lang=l;},dayForm,resultHTML,summaryText,updatePrint,sourceDialog};`),sandbox);
const {GLP1Engine:E,testUI:ui}=sandbox;
let checks=0;
function ok(value){assert.ok(value);checks++;}
for(const lang of ['pt','en'])for(const pocus of ['yes','no'])for(const symptoms of ['','yes','no','unknown'])for(const prep of ['','yes','no','unknown']){
 const s=E.initialState();Object.assign(s,{mode:'day',elective:'yes',exposure:'yes'});
 Object.assign(s.day,{pocus,symptoms,prep,medication:'held',scan:{content:'empty'}});
 ui.set(s,lang);const form=ui.dayForm(),result=ui.resultHTML(E.evaluate(s)),report=ui.summaryText();
 ok((form.match(/data-field="day.symptoms"/g)||[]).length===3);
 ok((form.match(/data-field="day.prep"/g)||[]).length===3);
 ok(result.includes('day-checks-result'));ok(!result.includes('undefined'));
 const symptomLabel=lang==='pt'?'Sintomas gastrointestinais hoje: ':'Gastrointestinal symptoms today: ';
 const prepLabel=lang==='pt'?'Preparo rigorosamente cumprido: ':'Preparation rigorously completed: ';
 const labels=lang==='pt'?{'':'Não informado',yes:'Sim',no:'Não',unknown:'Não confirmado'}:{'':'Not entered',yes:'Yes',no:'No',unknown:'Not confirmed'};
 ok(report.includes(symptomLabel+labels[symptoms]));ok(report.includes(prepLabel+labels[prep]));
 ui.updatePrint();ok(nodes.printArea.innerHTML.includes(symptomLabel+labels[symptoms]));
 ok(nodes.printArea.innerHTML.includes(prepLabel+labels[prep]));
 ok(report.includes('v1.1.1'));ok(report.includes('10/11/2026'));ok(report.includes('15/05/2026'));
 ok(!report.includes('undefined'));
}
console.log(`${checks} bilingual rendering/report assertions passed (mock DOM, not visual/browser validation).`);
