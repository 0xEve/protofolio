const path = require('path');
const output = process.env.CI ? 'test-results' : '/downloads';
const { test, expect } = require('@playwright/test');
for (const width of [320,390,768,1280]) {
  test(`portfolio content and navigation at ${width}px`, async ({page}) => {
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.setViewportSize({width,height:900}); await page.goto('/');
    await expect(page.getByRole('heading',{name:'Abdelrhman Islam',exact:true})).toBeVisible();
    await expect(page.getByRole('textbox',{name:'Command line',exact:true})).toHaveCount(0);
    await expect(page.getByRole('button',{name:'Open command menu',exact:true})).toHaveCount(0);
    await page.keyboard.press('/');
    await expect(page.getByRole('dialog',{name:'Command menu',exact:true})).toHaveCount(0);
    await page.locator('#about').scrollIntoViewIfNeeded();
    const paragraph=page.locator('#about p').first(); await expect(paragraph).toBeVisible();
    expect(await paragraph.evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
    await page.screenshot({path:`${output}/portfolio-about-${width}.png`});
    await page.locator('#work').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
    await expect(page.getByRole('heading',{name:'EVHunter',exact:true})).toBeVisible();
    await expect(page.getByText('EVHunter / workflow',{exact:true})).toBeVisible();
    await expect(page.getByText('Project overview / not a scan result',{exact:true})).toBeVisible();
    await expect(page.locator('#work img')).toHaveCount(0);
    await expect(page.getByText('Model overview / not a live prediction',{exact:true})).toBeVisible();
    await expect(page.getByRole('link',{name:'Try it',exact:true})).toHaveAttribute('href','https://spam-detection-sigma-seven.vercel.app/');
    for (const img of await page.locator('#work img').all()) expect(await img.evaluate(el=>el.complete && el.naturalWidth>0)).toBe(true);
    await page.screenshot({path:`${output}/portfolio-work-${width}.png`});
    for (const id of ['skills','education','contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
    await page.screenshot({path:`${output}/portfolio-contact-${width}.png`});
    await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(500);
    if(width<768) {
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await expect(page.getByRole('dialog',{name:'Navigation menu'})).toBeVisible();
      await expect(page.getByRole('button',{name:'Close menu',exact:true})).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog',{name:'Navigation menu'})).toHaveCount(0);
      await expect(page.getByRole('button',{name:'Open menu',exact:true})).toBeFocused();
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await page.getByRole('dialog').getByRole('link',{name:'About',exact:true}).click();
      await expect(paragraph).toBeInViewport();
    }
    await page.goto('/');await page.waitForTimeout(3800);
    const name=page.locator('h1 span span').first();
    expect(await name.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
    await page.screenshot({path:`${output}/portfolio-hero-${width}.png`});
    await page.screenshot({path:`${output}/portfolio-full-${width}.png`,fullPage:true});
    expect(errors).toEqual([]);
  });
}
test('reduced motion and no JavaScript retain essential content', async({browser})=>{
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await c.newPage();await page.goto('/');
  await expect(page.locator('#about p')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Abdelrhman Islam',exact:true})).toBeVisible();
  await expect(page.getByRole('link',{name:'View projects',exact:true})).toBeVisible();
  await c.close();
});
