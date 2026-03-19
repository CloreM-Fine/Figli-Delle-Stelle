const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 800 });
    
    await page.goto('file:///Users/lorenzoferrarini/Desktop/figli%20delle%20stelle%203%20/pasquetta-figli-delle-stelle/index.html', {
        waitUntil: 'networkidle0',
        timeout: 30000
    });
    
    // Wait for fonts and animations
    await page.waitForTimeout(3000);
    
    // Get full page height
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Set viewport to full height
    await page.setViewport({ width: 1440, height: bodyHeight });
    
    // Scroll to trigger all animations
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    await page.waitForTimeout(1000);
    
    // Scroll back to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    
    await page.waitForTimeout(500);
    
    // Take screenshot
    await page.screenshot({
        path: '/Users/lorenzoferrarini/Desktop/figli delle stelle 3 /anteprima-finale.png',
        fullPage: true
    });
    
    await browser.close();
    console.log('Screenshot saved!');
})();
