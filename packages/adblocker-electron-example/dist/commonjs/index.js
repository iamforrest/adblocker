"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const fs_1 = require("fs");
const adblocker_electron_1 = require("@cliqz/adblocker-electron");
function getUrlToLoad() {
    let url = 'https://google.com';
    if (process.argv[process.argv.length - 1].endsWith('.js') === false) {
        url = process.argv[process.argv.length - 1];
    }
    return url;
}
let mainWindow = null;
async function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            nodeIntegrationInSubFrames: true,
        },
        height: 600,
        width: 800,
    });
    const blocker = await adblocker_electron_1.ElectronBlocker.fromLists(cross_fetch_1.default, adblocker_electron_1.fullLists, {
        enableCompression: true,
    }, {
        path: 'engine.bin',
        read: async (...args) => (0, fs_1.readFileSync)(...args),
        write: async (...args) => (0, fs_1.writeFileSync)(...args),
    });
    blocker.enableBlockingInSession(mainWindow.webContents.session);
    blocker.on('request-blocked', (request) => {
        console.log('blocked', request.tabId, request.url);
    });
    blocker.on('request-redirected', (request) => {
        console.log('redirected', request.tabId, request.url);
    });
    blocker.on('request-whitelisted', (request) => {
        console.log('whitelisted', request.tabId, request.url);
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
    blocker.on('filter-matched', console.log.bind(console, 'filter-matched'));
    mainWindow.loadURL(getUrlToLoad());
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map