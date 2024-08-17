/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import type { IMessageFromBackground } from '@cliqz/adblocker-content';
import Config from '../config.js';
import { EventEmitter } from '../events.js';
import { Fetch } from '../fetch.js';
import { HTMLSelector } from '../html-filtering.js';
import CosmeticFilter from '../filters/cosmetic.js';
import NetworkFilter from '../filters/network.js';
import { FilterType, IListDiff, IPartialRawDiff } from '../lists.js';
import Request from '../request.js';
import Resources from '../resources.js';
import CosmeticFilterBucket from './bucket/cosmetic.js';
import NetworkFilterBucket from './bucket/network.js';
import { Metadata, IPatternLookupResult } from './metadata.js';
import Preprocessor, { Env } from '../preprocessor.js';
import PreprocessorBucket from './bucket/preprocessor.js';
export declare const ENGINE_VERSION = 665;
export interface BlockingResponse {
    match: boolean;
    redirect: undefined | {
        body: string;
        contentType: string;
        dataUrl: string;
    };
    exception: NetworkFilter | undefined;
    filter: NetworkFilter | undefined;
    metadata: IPatternLookupResult[] | undefined;
}
export interface Caching {
    path: string;
    read: (path: string) => Promise<Uint8Array>;
    write: (path: string, buffer: Uint8Array) => Promise<void>;
}
type NetworkFilterMatchingContext = {
    request: Request;
    filterType: FilterType.NETWORK;
};
type CosmeticFilterMatchingContext = {
    url: string;
    callerContext: any;
    filterType: FilterType.COSMETIC;
};
type NetworkFilterMatchEvent = (request: Request, result: BlockingResponse) => void;
export type EngineEventHandlers = {
    'request-allowed': NetworkFilterMatchEvent;
    'request-blocked': NetworkFilterMatchEvent;
    'request-redirected': NetworkFilterMatchEvent;
    'request-whitelisted': NetworkFilterMatchEvent;
    'csp-injected': (request: Request, csps: string) => void;
    'html-filtered': (htmlSelectors: HTMLSelector[], url: string) => void;
    'script-injected': (script: string, url: string) => void;
    'style-injected': (style: string, url: string) => void;
    'filter-matched': (match: {
        filter?: CosmeticFilter | NetworkFilter | undefined;
        exception?: CosmeticFilter | NetworkFilter | undefined;
    }, context: CosmeticFilterMatchingContext | NetworkFilterMatchingContext) => any;
};
export default class FilterEngine extends EventEmitter<EngineEventHandlers> {
    private static fromCached;
    static empty<T extends FilterEngine>(this: new (...args: any[]) => T, config?: Partial<Config>): T;
    /**
     * Create an instance of `FiltersEngine` (or subclass like `ElectronBlocker`,
     * etc.), from the list of subscriptions provided as argument (e.g.:
     * EasyList).
     *
     * Lists are fetched using the instance of `fetch` provided as a first
     * argument. Optionally resources.txt and config can be provided.
     */
    static fromLists<T extends typeof FilterEngine>(this: T, fetch: Fetch, urls: string[], config?: Partial<Config>, caching?: Caching): Promise<InstanceType<T>>;
    /**
     * Initialize blocker of *ads only*.
     *
     * Attempt to initialize a blocking engine using a pre-built version served
     * from Ghostery's CDN. If this fails (e.g.: if no pre-built engine is available
     * for this version of the library), then falls-back to using `fromLists(...)`
     * method with the same subscriptions.
     */
    static fromPrebuiltAdsOnly<T extends typeof FilterEngine>(this: T, fetchImpl?: Fetch, caching?: Caching): Promise<InstanceType<T>>;
    /**
     * Same as `fromPrebuiltAdsOnly(...)` but also contains rules to block
     * tracking (i.e.: using extra lists such as EasyPrivacy and more).
     */
    static fromPrebuiltAdsAndTracking<T extends typeof FilterEngine>(this: T, fetchImpl?: Fetch, caching?: Caching): Promise<InstanceType<T>>;
    /**
     * Same as `fromPrebuiltAdsAndTracking(...)` but also contains annoyances
     * rules to block things like cookie notices.
     */
    static fromPrebuiltFull<T extends typeof FilterEngine>(this: T, fetchImpl?: Fetch, caching?: Caching): Promise<InstanceType<T>>;
    static fromTrackerDB<T extends typeof FilterEngine>(this: T, rawJsonDump: any, options?: Partial<Config>): InstanceType<T>;
    static merge<T extends typeof FilterEngine>(this: T, engines: InstanceType<T>[]): InstanceType<T>;
    static parse<T extends FilterEngine>(this: new (...args: any[]) => T, filters: string, options?: Partial<Config>): T;
    static deserialize<T extends FilterEngine>(this: new (...args: any[]) => T, serialized: Uint8Array): T;
    lists: Map<string, string>;
    preprocessors: PreprocessorBucket;
    csp: NetworkFilterBucket;
    hideExceptions: NetworkFilterBucket;
    exceptions: NetworkFilterBucket;
    importants: NetworkFilterBucket;
    redirects: NetworkFilterBucket;
    filters: NetworkFilterBucket;
    cosmetics: CosmeticFilterBucket;
    metadata: Metadata | undefined;
    resources: Resources;
    readonly config: Config;
    constructor({ cosmeticFilters, networkFilters, preprocessors, config, lists, }?: {
        cosmeticFilters?: CosmeticFilter[];
        networkFilters?: NetworkFilter[];
        preprocessors?: Preprocessor[];
        lists?: Map<string, string>;
        config?: Partial<Config>;
    });
    private isFilterExcluded;
    updateEnv(env: Env): void;
    /**
     * Estimate the number of bytes needed to serialize this instance of
     * `FiltersEngine` using the `serialize(...)` method. It is used internally
     * by `serialize(...)` to allocate a buffer of the right size and you should
     * not have to call it yourself most of the time.
     *
     * There are cases where we cannot estimate statically the exact size of the
     * resulting buffer (due to alignement which needs to be performed); this
     * method will return a safe estimate which will always be at least equal to
     * the real number of bytes needed, or bigger (usually of a few bytes only:
     * ~20 bytes is to be expected).
     */
    getSerializedSize(): number;
    /**
     * Creates a binary representation of the full engine. It can be stored
     * on-disk for faster loading of the adblocker. The `deserialize` static
     * method of Engine can be used to restore the engine.
     */
    serialize(array?: Uint8Array): Uint8Array;
    /**
     * Update engine with new filters or resources.
     */
    loadedLists(): string[];
    hasList(name: string, checksum: string): boolean;
    /**
     * Update engine with `resources.txt` content.
     */
    updateResources(data: string, checksum: string): boolean;
    getFilters(): {
        networkFilters: NetworkFilter[];
        cosmeticFilters: CosmeticFilter[];
    };
    /**
     * Update engine with new filters as well as optionally removed filters.
     */
    update({ newNetworkFilters, newCosmeticFilters, newPreprocessors, removedCosmeticFilters, removedNetworkFilters, removedPreprocessors, }: Partial<IListDiff>, env?: Env): boolean;
    updateFromDiff({ added, removed, preprocessors }: IPartialRawDiff, env?: Env): boolean;
    /**
     * Return a list of HTML filtering rules.
     */
    getHtmlFilters({ url, hostname, domain, callerContext, }: {
        url: string;
        hostname: string;
        domain: string | null | undefined;
        callerContext?: any | undefined;
    }): HTMLSelector[];
    /**
     * Given `hostname` and `domain` of a page (or frame), return the list of
     * styles and scripts to inject in the page.
     */
    getCosmeticsFilters({ url, hostname, domain, classes, hrefs, ids, getBaseRules, getInjectionRules, getExtendedRules, getRulesFromDOM, getRulesFromHostname, callerContext, }: {
        url: string;
        hostname: string;
        domain: string | null | undefined;
        classes?: string[] | undefined;
        hrefs?: string[] | undefined;
        ids?: string[] | undefined;
        getBaseRules?: boolean;
        getInjectionRules?: boolean;
        getExtendedRules?: boolean;
        getRulesFromDOM?: boolean;
        getRulesFromHostname?: boolean;
        callerContext?: any | undefined;
    }): IMessageFromBackground;
    /**
     * Given a `request`, return all matching network filters found in the engine.
     */
    matchAll(request: Request): Set<NetworkFilter>;
    /**
     * Given a "main_frame" request, check if some content security policies
     * should be injected in the page.
     */
    getCSPDirectives(request: Request): string | undefined;
    /**
     * Decide if a network request (usually from WebRequest API) should be
     * blocked, redirected or allowed.
     */
    match(request: Request, withMetadata?: boolean | undefined): BlockingResponse;
    getPatternMetadata(request: Request, { getDomainMetadata }?: {
        getDomainMetadata?: boolean | undefined;
    }): IPatternLookupResult[];
    blockScripts(): this;
    blockImages(): this;
    blockMedias(): this;
    blockFrames(): this;
    blockFonts(): this;
    blockStyles(): this;
}
export {};
//# sourceMappingURL=engine.d.ts.map