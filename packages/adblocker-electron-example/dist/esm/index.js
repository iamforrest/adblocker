import { app, BrowserWindow } from 'electron';
import fetch from 'cross-fetch';
import { readFileSync, writeFileSync } from 'fs';
import { ElectronBlocker, fullLists } from '@cliqz/adblocker-electron';
function getUrlToLoad() {
    let url = 'https://google.com';
    if (process.argv[process.argv.length - 1].endsWith('.js') === false) {
        url = process.argv[process.argv.length - 1];
    }
    return url;
}
let mainWindow = null;
async function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            nodeIntegrationInSubFrames: true,
        },
        height: 600,
        width: 800,
    });
    const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
        enableCompression: true,
    }, {
        path: 'engine.bin',
        read: async (...args) => readFileSync(...args),
        write: async (...args) => writeFileSync(...args),
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
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map