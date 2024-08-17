import { fullLists, PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';
import * as pw from 'playwright';
(async () => {
    const blocker = await PlaywrightBlocker.fromLists(fetch, fullLists, {
        enableCompression: true,
    });
    const browser = await pw.chromium.launch({ headless: false });
    // const browser = await pw.firefox.launch({ headless: false });
    // const browser = await pw.webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await blocker.enableBlockingInPage(page);
    blocker.on('request-blocked', (request) => {
        console.log('blocked', request.url);
    });
    blocker.on('request-redirected', (request) => {
        console.log('redirected', request.url);
    });
    blocker.on('request-whitelisted', (request) => {
        console.log('whitelisted', request.url);
    });
    blocker.on('csp-injected', (request, csps) => {
        console.log('csp', request.url, csps);
    });
    blocker.on('script-injected', (script, url) => {
        console.log('script', script.length, url);
    });
    blocker.on('style-injected', (style, url) => {
        console.log('style', style.length, url);
    });
    blocker.on('filter-matched', ({ filter, exception }, context) => {
        console.log('filter-matched', filter, exception, context);
    });
    await page.goto('https://www.mangareader.net/');
    await page.screenshot({ path: 'output.png' });
    await blocker.disableBlockingInPage(page);
    await browser.close();
})();
//# sourceMappingURL=index.js.map