/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as puppeteer from 'puppeteer';
import { FiltersEngine, Request } from '@cliqz/adblocker';
/**
 * Create an instance of `Request` from `puppeteer.Request`.
 */
export declare function fromPuppeteerDetails(details: puppeteer.HTTPRequest): Request;
/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export declare class BlockingContext {
    private readonly page;
    private readonly blocker;
    private readonly onFrameNavigated;
    private readonly onDomContentLoaded;
    private readonly onRequest;
    constructor(page: puppeteer.Page, blocker: PuppeteerBlocker);
    enable(): Promise<void>;
    disable(): Promise<void>;
}
/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class. It exposes
 * methods to interface with Puppeteer APIs needed to block ads.
 */
export declare class PuppeteerBlocker extends FiltersEngine {
    private readonly contexts;
    private priority;
    enableBlockingInPage(page: puppeteer.Page): Promise<BlockingContext>;
    disableBlockingInPage(page: puppeteer.Page): Promise<void>;
    isBlockingEnabled(page: puppeteer.Page): boolean;
    onFrameNavigated: (frame: puppeteer.Frame) => Promise<void>;
    private onFrame;
    setRequestInterceptionPriority: (defaultPriority?: number) => number;
    onRequest: (details: puppeteer.HTTPRequest) => void;
    private injectStylesIntoFrame;
    private injectScriptletsIntoFrame;
    /**
     * Look for sub-frames in `frame`, check if their `src` or `href` would be
     * blocked, and then proceed to removing them from the DOM completely.
     */
    private removeBlockedFrames;
}
export * from '@cliqz/adblocker';
//# sourceMappingURL=index.d.ts.map