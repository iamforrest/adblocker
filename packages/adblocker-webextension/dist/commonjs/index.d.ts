/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { Browser, Runtime, WebRequest, WebNavigation } from 'webextension-polyfill-ts';
import { FiltersEngine, HTMLSelector, Request } from '@cliqz/adblocker';
import { IBackgroundCallback, IMessageFromBackground } from '@cliqz/adblocker-content';
export type OnBeforeRequestDetailsType = Pick<WebRequest.OnBeforeRequestDetailsType, 'url' | 'type' | 'requestId' | 'tabId' | 'originUrl' | 'documentUrl'> & {
    initiator?: string;
};
type OnHeadersReceivedDetailsType = Pick<WebRequest.OnHeadersReceivedDetailsType, 'responseHeaders' | 'url' | 'type' | 'tabId' | 'requestId'>;
/**
 * Create an instance of `Request` from WebRequest details.
 */
export declare function fromWebRequestDetails(details: OnBeforeRequestDetailsType): Request;
/**
 * Helper used when injecting custom CSP headers to update `responseHeaders`.
 */
export declare function updateResponseHeadersWithCSP(details: OnHeadersReceivedDetailsType, policies: string | undefined): WebRequest.BlockingResponse;
/**
 * Enable stream HTML filter on request `id` using `rules`.
 */
export declare function filterRequestHTML(filterResponseData: Browser['webRequest']['filterResponseData'], { id }: {
    id: string;
}, rules: HTMLSelector[]): void;
/**
 * This abstraction takes care of blocking in one instance of `browser` (in
 * practice this would be `chrome` or `browser` global in the WebExtension
 * context).
 */
export declare class BlockingContext {
    private readonly browser;
    private readonly blocker;
    private readonly onBeforeRequest;
    private readonly onHeadersReceived;
    private readonly onRuntimeMessage;
    private readonly onCommittedHandler;
    constructor(browser: Browser, blocker: WebExtensionBlocker);
    enable(): void;
    disable(): void;
    get pushInjectionsActive(): boolean;
}
/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
export declare class WebExtensionBlocker extends FiltersEngine {
    private readonly contexts;
    enableBlockingInBrowser(browser: Browser): BlockingContext;
    disableBlockingInBrowser(browser: Browser): void;
    onCommittedHandler(browser: Browser, details: WebNavigation.OnCommittedDetailsType): void;
    isBlockingEnabled(browser: Browser): boolean;
    private pushInjectionsActive;
    /**
     * This methods takes care of optionally performing HTML filtering.
     *
     * This can only be done if:
     * 1. Request is 'main_frame'
     * 2. `enableHtmlFiltering` is set to `true`.
     * 3. `browser.webRequest.filterResponseData` (Firefox only!).
     * 4. `TextEncoder` and `TextDecoder` are available.
     */
    performHTMLFiltering(browser: Browser, request: Request): void;
    private handleRuntimeMessage;
    /**
     * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
     */
    onBeforeRequest: (browser: Browser, details: OnBeforeRequestDetailsType) => WebRequest.BlockingResponse;
    onHeadersReceived: (_: Browser, details: OnHeadersReceivedDetailsType) => WebRequest.BlockingResponse;
    onRuntimeMessage: (browser: Browser, msg: IBackgroundCallback & {
        action?: string;
    }, sender: Runtime.MessageSender) => Promise<IMessageFromBackground | {}>;
    private injectStylesWebExtension;
    private executeScriptlets;
}
export * from '@cliqz/adblocker';
//# sourceMappingURL=index.d.ts.map