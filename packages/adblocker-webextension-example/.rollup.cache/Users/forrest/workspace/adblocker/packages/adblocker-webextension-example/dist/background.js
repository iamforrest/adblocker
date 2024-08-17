/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { browser } from 'webextension-polyfill-ts';
import { fullLists, WebExtensionBlocker, } from '@cliqz/adblocker-webextension';
/**
 * Keep track of number of network requests altered for each tab
 */
const counter = new Map();
/**
 * Helper function used to both reset, increment and show the current value of
 * the blocked requests counter for a given tabId.
 */
function updateBlockedCounter(tabId, { reset = false, incr = false } = {}) {
    counter.set(tabId, (reset === true ? 0 : counter.get(tabId) || 0) + (incr === true ? 1 : 0));
    chrome.browserAction.setBadgeText({
        text: '' + (counter.get(tabId) || 0),
    });
}
function incrementBlockedCounter(request, blockingResponse) {
    updateBlockedCounter(request.tabId, {
        incr: Boolean(blockingResponse.match),
        reset: request.isMainFrame(),
    });
}
// Whenever the active tab changes, then we update the count of blocked request
chrome.tabs.onActivated.addListener(({ tabId }) => updateBlockedCounter(tabId));
// Reset counter if tab is reloaded
chrome.tabs.onUpdated.addListener((tabId, { status, url }) => {
    if (status === 'loading' && url === undefined) {
        updateBlockedCounter(tabId, {
            incr: false,
            reset: true,
        });
    }
});
WebExtensionBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
    enableHtmlFiltering: true,
    loadExtendedSelectors: true,
}).then((blocker) => {
    blocker.enableBlockingInBrowser(browser);
    blocker.on('request-blocked', (request, result) => {
        incrementBlockedCounter(request, result);
        console.log('block', request.url);
    });
    blocker.on('request-redirected', (request, result) => {
        incrementBlockedCounter(request, result);
        console.log('redirect', request.url, result);
    });
    blocker.on('csp-injected', (request, csps) => {
        console.log('csp', request.url, csps);
    });
    blocker.on('script-injected', (script, url) => {
        console.log('script', script.length, url);
    });
    blocker.on('style-injected', (style, url) => {
        console.log('style', url, style.length);
    });
    blocker.on('html-filtered', (htmlSelectors, url) => {
        console.log('html selectors', htmlSelectors, url);
    });
    blocker.on('filter-matched', ({ filter, exception }, context) => {
        console.log('filter-matched', filter, exception, context);
    });
    console.log('Ready to roll!');
});
//# sourceMappingURL=background.js.map