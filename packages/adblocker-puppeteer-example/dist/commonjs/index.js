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
const adblocker_puppeteer_1 = require("@cliqz/adblocker-puppeteer");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const puppeteer = __importStar(require("puppeteer"));
const fs_1 = require("fs");
function getUrlToLoad() {
    let url = 'https://www.mangareader.net/';
    if (process.argv[process.argv.length - 1].endsWith('.js') === false) {
        url = process.argv[process.argv.length - 1];
    }
    return url;
}
(async () => {
    const blocker = await adblocker_puppeteer_1.PuppeteerBlocker.fromLists(cross_fetch_1.default, adblocker_puppeteer_1.fullLists, {
        enableCompression: true,
    }, {
        path: 'engine.bin',
        read: fs_1.promises.readFile,
        write: fs_1.promises.writeFile,
    });
    const browser = await puppeteer.launch({
        // @ts-ignore
        defaultViewport: null,
        headless: false,
    });
    const page = await browser.newPage();
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
    await page.goto(getUrlToLoad());
})();
//# sourceMappingURL=index.js.map