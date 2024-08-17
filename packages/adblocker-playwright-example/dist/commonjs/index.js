"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adblocker_playwright_1 = require("@cliqz/adblocker-playwright");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const pw = __importStar(require("playwright"));
(async () => {
    const blocker = await adblocker_playwright_1.PlaywrightBlocker.fromLists(cross_fetch_1.default, adblocker_playwright_1.fullLists, {
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