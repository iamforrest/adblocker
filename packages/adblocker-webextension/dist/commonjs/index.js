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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebExtensionBlocker = exports.BlockingContext = void 0;
exports.fromWebRequestDetails = fromWebRequestDetails;
exports.updateResponseHeadersWithCSP = updateResponseHeadersWithCSP;
exports.filterRequestHTML = filterRequestHTML;
const tldts_experimental_1 = require("tldts-experimental");
const adblocker_1 = require("@cliqz/adblocker");
function isFirefox() {
    try {
        return navigator.userAgent.indexOf('Firefox') !== -1;
    }
    catch (e) {
        return false;
    }
}
/**
 * There are different ways to inject scriptlets ("push" vs "pull").
 * This function should decide based on the environment what to use:
 *
 * 1) "Pushing" means the adblocker will listen on "onCommitted" events
 *    and then execute scripts by running the tabs.executeScript API.
 * 2) "Pulling" means the adblocker will inject a content script, which
 *    runs before the page loads (and on the DOM changes), fetches
 *    scriplets from the background and runs them.
 *
 * Note:
 * - the "push" model requires permission to the webNavigation API.
 *   If that is not available, the implementation will fall back to the
 *   "pull" model, which does not have this requirement.
 */
function usePushScriptsInjection() {
    // There is no fundamental reason why it should not work on Firefox,
    // but given that there are no known issues with Firefox, let's keep
    // the old, proven technique until there is evidence that changes
    // are needed.
    //
    // Take YouTube as an example: on Chrome (or forks like Edge), the adblocker
    // will sometimes fail to block ads if you reload the page multiple times;
    // on Firefox, the same steps do not seem to trigger any ads.
    return !isFirefox();
}
const USE_PUSH_SCRIPTS_INJECTION = usePushScriptsInjection();
/**
 * Create an instance of `Request` from WebRequest details.
 */
function fromWebRequestDetails(details) {
    const sourceUrl = details.initiator || details.originUrl || details.documentUrl;
    return adblocker_1.Request.fromRawDetails(sourceUrl
        ? {
            _originalRequestDetails: details,
            requestId: details.requestId,
            sourceUrl,
            tabId: details.tabId,
            type: details.type,
            url: details.url,
        }
        : {
            _originalRequestDetails: details,
            requestId: details.requestId,
            tabId: details.tabId,
            type: details.type,
            url: details.url,
        });
}
/**
 * Helper used when injecting custom CSP headers to update `responseHeaders`.
 */
function updateResponseHeadersWithCSP(details, policies) {
    if (policies === undefined) {
        return {};
    }
    let responseHeaders = details.responseHeaders || [];
    const CSP_HEADER_NAME = 'content-security-policy';
    // Collect existing CSP headers from response
    responseHeaders.forEach(({ name, value }) => {
        if (name.toLowerCase() === CSP_HEADER_NAME) {
            policies += `; ${value}`;
        }
    });
    // Remove all CSP headers from response
    responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== CSP_HEADER_NAME);
    // Add updated CSP header
    responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });
    return { responseHeaders };
}
/**
 * Enable stream HTML filter on request `id` using `rules`.
 */
function filterRequestHTML(filterResponseData, { id }, rules) {
    // Create filter to observe loading of resource
    const filter = filterResponseData(id);
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const htmlFilter = new adblocker_1.StreamingHtmlFilter(rules);
    const teardown = (event) => {
        // Before disconnecting our streaming filter, we need to be extra careful
        // and make sure that no data remains in either our streaming `TextDecoder`
        // instance or the HTML filterer.
        //
        // In case any data remains, we write it to filter.
        try {
            const remaining = htmlFilter.write(decoder.decode()) + htmlFilter.flush();
            if (remaining.length !== 0) {
                filter.write(encoder.encode(remaining));
            }
        }
        catch (ex) {
            // If we reach this point, there is probably no way we can recover...
            console.error('Failed to flush HTML filterer', ex);
        }
        // If latest event had some data attached (i.e. 'ondata' event), we make
        // sure to flush it through the filterer before disconnecting.
        if (event.data !== undefined) {
            filter.write(event.data);
        }
        // Disconnect streaming filter.
        filter.disconnect();
    };
    filter.ondata = (event) => {
        // On any chunk of data we implementa very fast UTF-8 validity check to make
        // sure that we will be able to decode it. Note that in theory it should be
        // possible that a chunk ends on the boundary of a multi-byte UTF-8 code and
        // this check would fail?
        if ((0, adblocker_1.isUTF8)(new Uint8Array(event.data)) === false) {
            return teardown(event);
        }
        try {
            filter.write(encoder.encode(htmlFilter.write(decoder.decode(event.data, { stream: true }))));
        }
        catch (ex) {
            // If we fail to decode a chunk, we need to be extra conservative and stop
            // listening to streaming response. Teardown takes care of flushing any
            // data remaining in the pipeline and disconnecting the listener.
            return teardown(event);
        }
    };
    filter.onstop = () => {
        teardown({});
    };
}
/**
 * This abstraction takes care of blocking in one instance of `browser` (in
 * practice this would be `chrome` or `browser` global in the WebExtension
 * context).
 */
class BlockingContext {
    constructor(browser, blocker) {
        var _a;
        this.browser = browser;
        this.blocker = blocker;
        this.onBeforeRequest = (details) => blocker.onBeforeRequest(browser, details);
        this.onHeadersReceived = (details) => blocker.onHeadersReceived(browser, details);
        this.onRuntimeMessage = (msg, sender) => blocker.onRuntimeMessage(browser, msg, sender);
        if (this.blocker.config.enablePushInjectionsOnNavigationEvents === true &&
            USE_PUSH_SCRIPTS_INJECTION) {
            if ((_a = this.browser.webNavigation) === null || _a === void 0 ? void 0 : _a.onCommitted) {
                this.onCommittedHandler = (details) => blocker.onCommittedHandler(browser, details);
            }
            else {
                console.warn('Consider adding the "webNavigation" permission in the manifest to improve the reliability of the adblocker. ' +
                    'If you do not want to see this warning, turn off the "enablePushInjectionsOnNavigationEvents" flag.');
            }
        }
    }
    enable() {
        if (this.blocker.config.loadNetworkFilters === true && this.browser.webRequest !== undefined) {
            this.browser.webRequest.onBeforeRequest.addListener(this.onBeforeRequest, { urls: ['<all_urls>'] }, ['blocking']);
            this.browser.webRequest.onHeadersReceived.addListener(this.onHeadersReceived, { urls: ['<all_urls>'], types: ['main_frame'] }, ['blocking', 'responseHeaders']);
        }
        // Start listening to messages coming from the content-script
        if (this.blocker.config.loadCosmeticFilters === true &&
            this.browser.runtime !== undefined &&
            this.browser.runtime.onMessage !== undefined) {
            this.browser.runtime.onMessage.addListener(this.onRuntimeMessage);
        }
        if (this.onCommittedHandler) {
            this.browser.webNavigation.onCommitted.addListener(this.onCommittedHandler);
        }
    }
    disable() {
        if (this.browser.webRequest !== undefined) {
            this.browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequest);
            this.browser.webRequest.onHeadersReceived.removeListener(this.onHeadersReceived);
        }
        if (this.browser.runtime !== undefined && this.browser.runtime.onMessage !== undefined) {
            this.browser.runtime.onMessage.removeListener(this.onRuntimeMessage);
        }
        if (this.onCommittedHandler) {
            this.browser.webNavigation.onCommitted.removeListener(this.onCommittedHandler);
        }
    }
    get pushInjectionsActive() {
        return this.onCommittedHandler !== undefined;
    }
}
exports.BlockingContext = BlockingContext;
/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
class WebExtensionBlocker extends adblocker_1.FiltersEngine {
    constructor() {
        super(...arguments);
        this.contexts = new WeakMap();
        this.handleRuntimeMessage = async (browser, msg, sender, sendResponse) => {
            var _a, _b;
            const promises = [];
            // Make sure we only listen to messages coming from our content-script
            // based on the value of `action`.
            if (msg.action !== 'getCosmeticsFilters') {
                return;
            }
            if (sender.tab === undefined) {
                throw new Error('required "sender.tab" information is not available');
            }
            if (sender.tab.id === undefined) {
                throw new Error('required "sender.tab.id" information is not available');
            }
            if (sender.frameId === undefined) {
                throw new Error('required "sender.frameId" information is not available');
            }
            // Extract hostname from sender's URL
            const { url = '', frameId } = sender;
            const parsed = (0, tldts_experimental_1.parse)(url);
            const hostname = parsed.hostname || '';
            const domain = parsed.domain || '';
            // Once per tab/page load we inject base stylesheets. These are always
            // the same for all frames of a given page because they do not depend on
            // a particular domain and cannot be cancelled using unhide rules.
            // Because of this, we specify `allFrames: true` when injecting them so
            // that we do not need to perform this operation for sub-frames.
            if (frameId === 0 && msg.lifecycle === 'start') {
                const { active, styles } = this.getCosmeticsFilters({
                    domain,
                    hostname,
                    url,
                    classes: msg.classes,
                    hrefs: msg.hrefs,
                    ids: msg.ids,
                    // This needs to be done only once per tab
                    getBaseRules: true,
                    getInjectionRules: false,
                    getExtendedRules: false,
                    getRulesFromDOM: false,
                    getRulesFromHostname: false,
                    callerContext: {
                        tabId: (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id,
                        frameId: sender.frameId,
                    },
                });
                if (active === false) {
                    return;
                }
                promises.push(this.injectStylesWebExtension(browser, styles, {
                    tabId: sender.tab.id,
                    allFrames: true,
                }));
            }
            // Separately, requests cosmetics which depend on the page it self
            // (either because of the hostname or content of the DOM). Content script
            // logic is responsible for returning information about lists of classes,
            // ids and hrefs observed in the DOM. MutationObserver is also used to
            // make sure we can react to changes.
            {
                const { active, styles, scripts, extended } = this.getCosmeticsFilters({
                    domain,
                    hostname,
                    url,
                    classes: msg.classes,
                    hrefs: msg.hrefs,
                    ids: msg.ids,
                    // This needs to be done only once per frame
                    getBaseRules: false,
                    getInjectionRules: msg.lifecycle === 'start',
                    getExtendedRules: msg.lifecycle === 'start',
                    getRulesFromHostname: msg.lifecycle === 'start',
                    // This will be done every time we get information about DOM mutation
                    getRulesFromDOM: msg.lifecycle === 'dom-update',
                    callerContext: {
                        tabId: (_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id,
                        frameId: sender.frameId,
                    },
                });
                if (active === false) {
                    return;
                }
                promises.push(this.injectStylesWebExtension(browser, styles, { tabId: sender.tab.id, frameId }));
                // Inject scripts from content script
                if (scripts.length !== 0 && !this.pushInjectionsActive(browser)) {
                    sendResponse({
                        active,
                        extended,
                        scripts,
                        styles: '',
                    });
                }
            }
            await Promise.all(promises);
        };
        /**
         * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
         */
        this.onBeforeRequest = (browser, details) => {
            const request = fromWebRequestDetails(details);
            if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
                request.guessTypeOfRequest();
            }
            if (request.isMainFrame()) {
                this.performHTMLFiltering(browser, request);
                return {};
            }
            const { redirect, match } = this.match(request);
            if (redirect !== undefined) {
                return { redirectUrl: redirect.dataUrl };
            }
            else if (match === true) {
                return { cancel: true };
            }
            return {};
        };
        this.onHeadersReceived = (_, details) => {
            return updateResponseHeadersWithCSP(details, this.getCSPDirectives(fromWebRequestDetails(details)));
        };
        this.onRuntimeMessage = (browser, msg, sender) => {
            return new Promise((resolve, reject) => {
                this.handleRuntimeMessage(browser, msg, sender, resolve)
                    .catch(reject)
                    .finally(() => resolve({}));
            });
        };
    }
    // ----------------------------------------------------------------------- //
    // Helpers to enable and disable blocking for 'browser'
    // ----------------------------------------------------------------------- //
    enableBlockingInBrowser(browser) {
        let context = this.contexts.get(browser);
        if (context !== undefined) {
            return context;
        }
        // Create new blocking context for `browser`
        context = new BlockingContext(browser, this);
        this.contexts.set(browser, context);
        context.enable();
        return context;
    }
    disableBlockingInBrowser(browser) {
        const context = this.contexts.get(browser);
        if (context === undefined) {
            throw new Error('Trying to disable blocking which was not enabled');
        }
        this.contexts.delete(browser);
        context.disable();
    }
    onCommittedHandler(browser, details) {
        const { hostname, domain } = (0, tldts_experimental_1.parse)(details.url);
        if (!hostname) {
            return;
        }
        // Find the scriptlets to run and execute them as soon as possible.
        //
        // If possible, everything in this path should be kept synchronously,
        // since the scriptlets will attempt to patch the website while it is
        // already loading. Every additional asynchronous step increases the risk
        // of losing the race (i.e. that the patching is too late to have an effect)
        const { active, scripts } = this.getCosmeticsFilters({
            url: details.url,
            hostname,
            domain: domain || '',
            getBaseRules: false,
            getInjectionRules: true,
            getExtendedRules: false,
            getRulesFromDOM: false,
            getRulesFromHostname: true,
            callerContext: {
                tabId: details.tabId,
                frameId: details.frameId,
            },
        });
        if (active === false) {
            return;
        }
        if (scripts.length > 0) {
            this.executeScriptlets(browser, details, scripts);
        }
    }
    isBlockingEnabled(browser) {
        return this.contexts.has(browser);
    }
    pushInjectionsActive(browser) {
        const context = this.contexts.get(browser);
        if (!context) {
            // This means the browser instance is not controlled by the library directly.
            // For instance, if there is another wrapping layer on top (e.g. Ghostery).
            return false;
        }
        return context.pushInjectionsActive;
    }
    // ----------------------------------------------------------------------- //
    // WebExtensionBlocker-specific additions to FiltersEngine
    //
    // Note: some of these methods internally require access to the 'browser'
    // global in order to perform their function. Because WebExtensionBlocker can
    // be registered in multiple ones (in theory), we do not want to depend either
    // on the global object, or a single instance of 'browser' stored internally
    // (except as part of a BlockingContext which binds one 'browser' object with
    // a WebExtensionBlocker object to perform blocking in this context), so an
    // extra 'browser' argument is often needed.
    // ----------------------------------------------------------------------- //
    /**
     * This methods takes care of optionally performing HTML filtering.
     *
     * This can only be done if:
     * 1. Request is 'main_frame'
     * 2. `enableHtmlFiltering` is set to `true`.
     * 3. `browser.webRequest.filterResponseData` (Firefox only!).
     * 4. `TextEncoder` and `TextDecoder` are available.
     */
    performHTMLFiltering(browser, request) {
        if (this.config.enableHtmlFiltering === true &&
            browser.webRequest !== undefined &&
            browser.webRequest.filterResponseData !== undefined &&
            request.isMainFrame() === true &&
            typeof TextDecoder !== 'undefined' &&
            typeof TextEncoder !== 'undefined') {
            const htmlFilters = this.getHtmlFilters(request);
            if (htmlFilters.length !== 0) {
                filterRequestHTML(browser.webRequest.filterResponseData, request, htmlFilters);
            }
        }
    }
    async injectStylesWebExtension(browser, styles, { tabId, frameId, allFrames = false, }) {
        // Abort if stylesheet is empty.
        if (styles.length === 0) {
            return;
        }
        // Abort if `this.browser.tabs` is not available.
        if (browser.tabs === undefined) {
            throw new Error('required "tabs" API is not defined');
        }
        // Abort if `this.browser.tabs.insertCSS` is not available.
        if (browser.tabs.insertCSS === undefined) {
            throw new Error('required "tabs.insertCSS" API is not defined');
        }
        // Proceed with stylesheet injection.
        return browser.tabs.insertCSS(tabId, frameId
            ? {
                allFrames,
                code: styles,
                cssOrigin: 'user',
                frameId,
                matchAboutBlank: true,
                runAt: 'document_start',
            }
            : {
                allFrames,
                code: styles,
                cssOrigin: 'user',
                matchAboutBlank: true,
                runAt: 'document_start',
            });
    }
    executeScriptlets(browser, details, scripts) {
        // Dynamically injected scripts scripts can be difficult to find later in
        // the debugger. Console logs simplifies setting up breakpoints if needed.
        let debugMarker;
        if (this.config.debug) {
            debugMarker = (text) => `console.log('[ADBLOCKER-DEBUG]:', ${JSON.stringify(text)});`;
        }
        else {
            debugMarker = () => '';
        }
        // the scriptlet code that contains patches for the website
        const codeRunningInPage = `(function(){
${debugMarker('run scriptlets (executing in "page world")')}
${scripts.join('\n\n')}}
)()`;
        // wrapper to break the "isolated world" so that the patching operates
        // on the website, not on the content script's isolated environment.
        const codeRunningInContentScript = `
(function(code) {
    ${debugMarker('run injection wrapper (executing in "content script world")')}
    var script;
    try {
      script = document.createElement('script');
      script.appendChild(document.createTextNode(decodeURIComponent(code)));
      (document.head || document.documentElement).appendChild(script);
    } catch (ex) {
      console.error('Failed to run script', ex);
    }
    if (script) {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        script.textContent = '';
    }
})(\`${encodeURIComponent(codeRunningInPage)}\`);`;
        browser.tabs
            .executeScript(details.tabId, {
            code: codeRunningInContentScript,
            runAt: 'document_start',
            frameId: details.frameId,
            matchAboutBlank: true,
        })
            .catch((err) => {
            console.error('Failed to inject scriptlets', err);
        });
    }
}
exports.WebExtensionBlocker = WebExtensionBlocker;
// Re-export symbols from @cliqz/adblocker
__exportStar(require("@cliqz/adblocker"), exports);
//# sourceMappingURL=index.js.map