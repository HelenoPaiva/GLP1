'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.GLP1_CHROMIUM_PATH?{executablePath:process.env.GLP1_CHROMIUM_PATH}:{})});
 try{
  for(const width of [390,1280]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(pathToFileURL(path.join(__dirname,'..','index.html')).href);
   const choose=async(key,value)=>page.locator(`[data-field="${key}"][value="${value}"]`).check();
   const code=async()=>page.locator('#result').getAttribute('data-code');
   await choose('elective','yes');await choose('exposure','yes');await page.locator('#tab-day').click();
   await choose('day.pocus','yes');
   assert.equal(await page.locator('[data-field="day.symptoms"]').count(),3);
   assert.equal(await page.locator('[data-field="day.prep"]').count(),3);
   await choose('day.scan.content','empty');assert.equal(await code(),'symptoms_pending');
   await choose('day.symptoms','no');assert.equal(await code(),'prep_pending');
   await choose('day.prep','yes');assert.equal(await code(),'proceed');
   for(const language of ['pt','en']){
    if(language==='en')await page.locator('[data-action="language"]').click();
    const report=await page.evaluate(()=>GLP1App.summaryText());
    assert.match(report,language==='pt'?/Sintomas gastrointestinais hoje: Não/:/Gastrointestinal symptoms today: No/);
    assert.match(report,language==='pt'?/Preparo rigorosamente cumprido: Sim/:/Preparation rigorously completed: Yes/);
    assert.match(report,/v1\.1\.1/);assert.match(report,/15\/05\/2026/);assert.match(report,/10\/11\/2026/);
    await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
    assert.match(await page.locator('#printArea').innerText(),language==='pt'?/Sintomas gastrointestinais hoje: Não/:/Gastrointestinal symptoms today: No/);
    await choose('day.symptoms','yes');assert.equal(await code(),'symptoms_review');
    await choose('day.symptoms','unknown');assert.equal(await code(),'symptoms_unknown');
    await choose('day.symptoms','no');await choose('day.prep','no');assert.equal(await code(),'prep_review');
    await choose('day.prep','unknown');assert.equal(await code(),'prep_unknown');
    await choose('day.prep','yes');assert.equal(await code(),'proceed');
   }
   await choose('day.symptoms','yes');await choose('day.prep','no');await choose('day.scan.content','solid');
   assert.equal(await code(),'delay_pending');await choose('day.canDelay','no');assert.equal(await code(),'prokinetic');
   await choose('day.repeated','yes');await choose('day.repeat.content','empty');assert.equal(await code(),'symptoms_review');
   await choose('day.symptoms','no');assert.equal(await code(),'prep_review');await choose('day.prep','yes');assert.equal(await code(),'caution_repeat');
   await choose('day.pocus','no');assert.equal(await code(),'prep_pending');
   assert.equal(await page.locator('[data-field="day.symptoms"]:checked').count(),0);
   await choose('day.prep','no');assert.equal(await code(),'postpone_prep');
   await choose('day.prep','yes');await choose('day.symptoms','no');await choose('day.medication','held');assert.equal(await code(),'caution_no_scan');
   await page.locator('#tab-plan').click();await choose('plan.therapy','on');await page.locator('#tab-day').click();assert.equal(await code(),'pocus_pending');
   await page.locator('[data-action="source"]').first().click();
   assert.match(await page.locator('#infoDialog').innerText(),/Software safeguards — not new guidelines/);
   await page.locator('[data-action="close-dialog"]').click();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.deepEqual(errors,[]);assert.equal(await page.locator('#fatal').isVisible(),false);
   await page.close();console.log(`Browser checks passed at ${width}px (PT/EN, reports, print, transitions).`);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
