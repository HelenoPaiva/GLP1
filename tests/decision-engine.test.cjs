'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const sandbox = {};
vm.runInNewContext(html.match(/<script id="decision-engine">([\s\S]*?)<\/script>/)[1], sandbox);
const E = sandbox.GLP1Engine;
let checks = 0;
function eq(actual, expected) { assert.equal(actual, expected); checks++; }
function day(pocus='yes') {
 const s=E.initialState(); s.mode='day'; s.elective='yes'; s.exposure='yes'; s.day.pocus=pocus; return s;
}
function decision(s) { return E.evaluate(s).code; }
const lowScans=[{content:'empty'},{content:'liquid',grade:'1',unit:'indexed',volume:'1.5'},{content:'liquid',grade:'1',unit:'absolute',volume:'105',weight:'70'}];
// All confirmation combinations, both initial and repeat low-risk POCUS.
for (const scan of lowScans) for (const repeat of [false,true]) {
 for (const symptoms of ['', 'yes', 'no', 'unknown', 'invalid']) for (const prep of ['', 'yes', 'no', 'unknown', 'invalid']) {
  const s=day(); Object.assign(s.day,{symptoms,prep});
  if(repeat)Object.assign(s.day,{scan:{content:'solid'},canDelay:'no',repeated:'yes',repeat:scan});
  else s.day.scan=scan;
  const expected=symptoms==='yes'?'symptoms_review':prep==='no'?'prep_review':symptoms&&symptoms!=='no'?'symptoms_unknown':prep&&prep!=='yes'?'prep_unknown':!symptoms?'symptoms_pending':!prep?'prep_pending':repeat?'caution_repeat':'proceed';
  eq(decision(s),expected);
 }
}
// Preserve scan interpretation, including unrounded threshold and invalid inputs.
for(const [scan,kind] of [
 [{content:'empty'},'low'],[{content:'solid'},'high'],[{content:'uncertain'},'indeterminate'],
 [{content:'liquid',grade:'1',unit:'indexed',volume:'1,5'},'low'],
 [{content:'liquid',grade:'1',unit:'indexed',volume:'1.5001'},'high'],
 [{content:'liquid',grade:'2',unit:'indexed',volume:'1.5'},'discordant'],
 [{content:'liquid',grade:'1',unit:'indexed',volume:'-1'},'invalid'],
 [{content:'liquid',grade:'1',unit:'absolute',volume:'100',weight:'0'},'invalid']
])eq(E.classify(scan).kind,kind);
// High-risk findings must not be hidden by missing/positive checks.
for(const symptoms of ['', 'yes', 'unknown']) for(const prep of ['', 'no', 'unknown']) {
 const s=day();Object.assign(s.day,{symptoms,prep,scan:{content:'solid'}});
 eq(decision(s),'delay_pending');s.day.canDelay='yes';eq(decision(s),'postpone_high');
 s.day.canDelay='no';eq(decision(s),'prokinetic');
 Object.assign(s.day,{repeated:'yes',repeat:{content:'solid'}});eq(decision(s),'full_stomach');
}
// No POCUS: source postponement is preserved; no symptoms may be inferred.
let s=day('no');eq(decision(s),'prep_pending');s.day.prep='no';eq(decision(s),'postpone_prep');
s.day.prep='unknown';eq(decision(s),'prep_unknown');s.day.prep='yes';eq(decision(s),'symptoms_pending');
s.day.symptoms='yes';eq(decision(s),'symptoms_review');s.day.symptoms='unknown';eq(decision(s),'symptoms_unknown');
s.day.symptoms='no';eq(decision(s),'medication_pending');
for(const medication of ['continued','missed','unknown']){s.day.medication=medication;eq(decision(s),'medication_review');}
s.day.medication='held';eq(decision(s),'caution_no_scan');
// Planning remains separate and unchanged.
s=E.initialState();s.elective='yes';s.exposure='yes';Object.assign(s.plan,{therapy:'on',drug:'tirzepatide',protocol:'yes',reviewed:true,stable:'yes'});
eq(decision(s),'continue');s.plan.risks=['gi'];eq(decision(s),'hold7');s.plan.drug='liraglutide';eq(decision(s),'short_conflict');
s.plan.risks=[];s.plan.protocol='no';eq(decision(s),'hold1');s.plan.drug='semaglutide_po';eq(decision(s),'hold7');
s=E.transition(s,'mode','day');eq(s.day.symptoms,'');eq(s.day.prep,'');
// Reset and stale-answer behavior.
s=day();Object.assign(s.day,{symptoms:'no',prep:'yes',scan:{content:'empty'}});eq(decision(s),'proceed');
for(const [key,value] of [['plan.drug','tirzepatide'],['risk:gi',true],['day.pocus','no']]){
 const n=E.transition(s,key,value);eq(n.day.symptoms,'');eq(n.day.prep,'');eq(n.day.scan.content,'');
}
const changed=E.transition(s,'day.symptoms','yes');eq(decision(changed),'symptoms_review');eq(s.day.symptoms,'no');
eq(E.transition(s,'mode','plan').day.symptoms,'no');
eq(decision(E.transition(s,'day.prep','no')),'prep_review');
eq(decision(E.transition(s,'elective','no')),'outside');
eq(decision(E.transition(s,'exposure','no')),'not_exposed');
eq(E.THRESHOLD,1.5);eq(E.SOURCE_DATE,'2026-05-15');eq(E.VERSION,'1.1.1');
eq(E.FASTING_REFERENCE.adult.clear,2);eq(E.FASTING_REFERENCE.pediatricESAIC2022.clear,1);eq(E.FASTING_REFERENCE.pediatricASA2017.clear,2);
console.log(`${checks} decision-engine assertions passed.`);
