"use strict";
/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronBlocker = exports.BlockingContext = void 0;
exports.fromElectronDetails = fromElectronDetails;
const electron = __importStar(require("electron"));
const tldts_experimental_1 = require("tldts-experimental");
const adblocker_1 = require("@cliqz/adblocker");
// import { PRELOAD_PATH } from './preload_path.js';
const { ipcMain } = electron;
// https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
function fromElectronDetails(details) {
    const { id, url, resourceType, referrer, webContentsId } = details;
    return adblocker_1.Request.fromRawDetails(webContentsId
        ? {
            _originalRequestDetails: details,
            requestId: `${id}`,
            sourceUrl: referrer,
            tabId: webContentsId,
            type: (resourceType || 'other'),
            url,
        }
        : {
            _originalRequestDetails: details,
            requestId: `${id}`,
            sourceUrl: referrer,
            type: (resourceType || 'other'),
            url,
        });
}
/**
 * This abstraction takes care of blocking in one instance of `Electron.Session`.
 */
class BlockingContext {
    constructor(session, blocker) {
        this.session = session;
        this.blocker = blocker;
        this.onBeforeRequest = (details, callback) => blocker.onBeforeRequest(details, callback);
        this.onGetCosmeticFiltersFirst = (event, url) => blocker.onGetCosmeticFiltersFirst(event, url);
        this.onGetCosmeticFiltersUpdated = (event, url, msg) => blocker.onGetCosmeticFiltersUpdated(event, url, msg);
        this.onHeadersReceived = (details, callback) => blocker.onHeadersReceived(details, callback);
        this.onIsMutationObserverEnabled = (event) => blocker.onIsMutationObserverEnabled(event);
    }
    enable() {
        if (this.blocker.config.loadCosmeticFilters === true) {
            // this.session.setPreloads(this.session.getPreloads().concat([PRELOAD_PATH]));
            // ipcMain.on('get-cosmetic-filters-first', this.onGetCosmeticFiltersFirst);
            // ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFiltersUpdated);
            // ipcMain.on('is-mutation-observer-enabled', this.onIsMutationObserverEnabled);
        }
        if (this.blocker.config.loadNetworkFilters === true) {
            this.session.webRequest.onHeadersReceived({ urls: ['<all_urls>'] }, this.onHeadersReceived);
            this.session.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onBeforeRequest);
        }
    }
    disable() {
        if (this.blocker.config.loadNetworkFilters === true) {
            // NOTE - there is currently no support in Electron for multiple
            // webRequest listeners registered for the same event. This means that
            // adblocker's listeners can be overriden by other ones in the same
            // application (or that the adblocker can override another listener
            // registered previously). Because of this, the only way to disable the
            // adblocker is to remove all listeners for the events we are interested
            // in. In the future, we should consider implementing a webRequest
            // pipeline allowing to register multiple listeners for the same event.
            this.session.webRequest.onHeadersReceived(null);
            this.session.webRequest.onBeforeRequest(null);
        }
        if (this.blocker.config.loadCosmeticFilters === true) {
            // this.session.setPreloads(this.session.getPreloads().filter((p) => p !== PRELOAD_PATH));
            ipcMain.removeListener('get-cosmetic-filters', this.onGetCosmeticFiltersUpdated);
        }
    }
}
exports.BlockingContext = BlockingContext;
/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class. It exposes
 * methods to interface with Electron APIs needed to block ads.
 */
class ElectronBlocker extends adblocker_1.FiltersEngine {
    constructor() {
        super(...arguments);
        this.contexts = new WeakMap();
        // ----------------------------------------------------------------------- //
        // ElectronBlocker-specific additions to FiltersEngine
        // ----------------------------------------------------------------------- //
        this.onIsMutationObserverEnabled = (event) => {
            event.returnValue = this.config.enableMutationObserver;
        };
        this.onGetCosmeticFiltersFirst = (event, url) => {
            // Extract hostname from sender's URL
            const parsed = (0, tldts_experimental_1.parse)(url);
            const hostname = parsed.hostname || '';
            const domain = parsed.domain || '';
            const { active, styles, scripts, extended } = this.getCosmeticsFilters({
                domain,
                hostname,
                url,
                // This needs to be done only once per frame
                getBaseRules: true,
                getInjectionRules: true,
                getExtendedRules: true,
                getRulesFromHostname: true,
                getRulesFromDOM: false, // Only done on updates (see `onGetCosmeticFiltersUpdated`)
                callerContext: {
                    frameId: event.frameId,
                    processId: event.processId,
                },
            });
            if (active === false) {
                event.returnValue = null;
                return;
            }
            // Inject custom stylesheets
            this.injectStyles(event.sender, styles);
            event.sender.send('get-cosmetic-filters-response', {
                active,
                extended,
                styles: '',
            });
            // to execute Inject scripts synchronously, simply return scripts to renderer.
            event.returnValue = scripts;
        };
        this.onGetCosmeticFiltersUpdated = (event, url, msg) => {
            // Extract hostname from sender's URL
            const parsed = (0, tldts_experimental_1.parse)(url);
            const hostname = parsed.hostname || '';
            const domain = parsed.domain || '';
            const { active, styles, extended } = this.getCosmeticsFilters({
                domain,
                hostname,
                url,
                classes: msg.classes,
                hrefs: msg.hrefs,
                ids: msg.ids,
                // Only done on first load in the frame, disable for updates
                getBaseRules: false,
                getInjectionRules: false,
                getExtendedRules: false,
                getRulesFromHostname: false,
                // This will be done every time we get information about DOM mutation
                getRulesFromDOM: true,
                callerContext: {
                    frameId: event.frameId,
                    processId: event.processId,
                    lifecycle: msg.lifecycle,
                },
            });
            if (active === false) {
                return;
            }
            // Inject custom stylesheets
            this.injectStyles(event.sender, styles);
            // Inject scripts from content script
            event.sender.send('get-cosmetic-filters-response', {
                active,
                extended,
                styles: '',
            });
        };
        this.onHeadersReceived = (details, callback) => {
            const CSP_HEADER_NAME = 'content-security-policy';
            const policies = [];
            const responseHeaders = details.responseHeaders || {};
            if (details.resourceType === 'mainFrame' || details.resourceType === 'subFrame') {
                const rawCSP = this.getCSPDirectives(fromElectronDetails(details));
                if (rawCSP !== undefined) {
                    policies.push(...rawCSP.split(';').map((csp) => csp.trim()));
                    // Collect existing CSP headers from response
                    for (const [name, values] of Object.entries(responseHeaders)) {
                        if (name.toLowerCase() === CSP_HEADER_NAME) {
                            policies.push(...values);
                            delete responseHeaders[name];
                        }
                    }
                    responseHeaders[CSP_HEADER_NAME] = [policies.join(';')];
                    callback({ responseHeaders });
                    return;
                }
            }
            callback({});
        };
        this.onBeforeRequest = (details, callback) => {
            const request = fromElectronDetails(details);
            if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
                request.guessTypeOfRequest();
            }
            if (request.isMainFrame()) {
                callback({});
                return;
            }
            const { redirect, match } = this.match(request);
            if (redirect) {
                callback({ redirectURL: redirect.dataUrl });
            }
            else if (match) {
                callback({ cancel: true });
            }
            else {
                callback({});
            }
        };
    }
    // ----------------------------------------------------------------------- //
    // Helpers to enable and disable blocking for 'browser'
    // ----------------------------------------------------------------------- //
    enableBlockingInSession(session) {
        let context = this.contexts.get(session);
        if (context !== undefined) {
            return context;
        }
        // Create new blocking context for `session`
        context = new BlockingContext(session, this);
        this.contexts.set(session, context);
        context.enable();
        return context;
    }
    disableBlockingInSession(session) {
        const context = this.contexts.get(session);
        if (context === undefined) {
            throw new Error('Trying to disable blocking which was not enabled');
        }
        this.contexts.delete(session);
        context.disable();
    }
    isBlockingEnabled(session) {
        return this.contexts.has(session);
    }
    injectStyles(sender, styles) {
        if (styles.length > 0) {
            sender.insertCSS(styles, {
                cssOrigin: 'user',
            });
        }
    }
}
exports.ElectronBlocker = ElectronBlocker;
// re-export @cliqz/adblocker symbols for convenience
__exportStar(require("@cliqz/adblocker"), exports);
//# sourceMappingURL=index.js.map