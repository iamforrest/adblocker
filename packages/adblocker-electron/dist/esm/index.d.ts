/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { FiltersEngine, Request } from '@cliqz/adblocker';
import type { IBackgroundCallback } from '@cliqz/adblocker-electron-preload';
/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export declare function fromElectronDetails(details: Electron.OnHeadersReceivedListenerDetails | Electron.OnBeforeRequestListenerDetails): Request;
/**
 * This abstraction takes care of blocking in one instance of `Electron.Session`.
 */
export declare class BlockingContext {
    private readonly session;
    private readonly blocker;
    private readonly onBeforeRequest;
    private readonly onGetCosmeticFiltersUpdated;
    private readonly onGetCosmeticFiltersFirst;
    private readonly onHeadersReceived;
    private readonly onIsMutationObserverEnabled;
    constructor(session: Electron.Session, blocker: ElectronBlocker);
    enable(): void;
    disable(): void;
}
/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class. It exposes
 * methods to interface with Electron APIs needed to block ads.
 */
export declare class ElectronBlocker extends FiltersEngine {
    private readonly contexts;
    enableBlockingInSession(session: Electron.Session): BlockingContext;
    disableBlockingInSession(session: Electron.Session): void;
    isBlockingEnabled(session: Electron.Session): boolean;
    onIsMutationObserverEnabled: (event: Electron.IpcMainEvent) => void;
    onGetCosmeticFiltersFirst: (event: Electron.IpcMainEvent, url: string) => void;
    onGetCosmeticFiltersUpdated: (event: Electron.IpcMainEvent, url: string, msg: IBackgroundCallback) => void;
    onHeadersReceived: (details: Electron.OnHeadersReceivedListenerDetails, callback: (a: Electron.HeadersReceivedResponse) => void) => void;
    onBeforeRequest: (details: Electron.OnBeforeRequestListenerDetails, callback: (a: Electron.CallbackResponse) => void) => void;
    private injectStyles;
}
export * from '@cliqz/adblocker';
//# sourceMappingURL=index.d.ts.map