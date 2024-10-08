/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import type { AST } from '@cliqz/adblocker-extended-selectors';
export type Lifecycle = 'start' | 'dom-update';
export interface IBackgroundCallback {
    classes: string[];
    hrefs: string[];
    ids: string[];
    lifecycle: Lifecycle;
}
export interface IMessageFromBackground {
    active: boolean;
    scripts: string[];
    styles: string;
    extended: {
        ast: AST;
        remove: boolean;
        attribute?: string | undefined;
    }[];
}
/**
 * WARNING: this function should be self-contained and not rely on any global
 * symbol. That constraint needs to be fulfilled because this function can
 * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
 * more details).
 */
export declare function extractFeaturesFromDOM(roots: Element[]): {
    classes: string[];
    hrefs: string[];
    ids: string[];
};
export interface FeaturesUpdate {
    type: 'features';
    ids: string[];
    classes: string[];
    hrefs: string[];
}
export interface ElementsUpdate {
    type: 'elements';
    elements: Element[];
}
export type DOMUpdate = FeaturesUpdate | ElementsUpdate;
export declare class DOMMonitor {
    private readonly cb;
    private knownIds;
    private knownHrefs;
    private knownClasses;
    private observer;
    constructor(cb: (update: DOMUpdate) => void);
    queryAll(window: Pick<Window, 'document'>): void;
    start(window: Pick<Window, 'document'> & {
        MutationObserver?: typeof MutationObserver;
    }): void;
    stop(): void;
    handleNewFeatures({ hrefs, ids, classes, }: {
        hrefs: string[];
        ids: string[];
        classes: string[];
    }): boolean;
    private handleUpdatedNodes;
}
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export declare function autoRemoveScript(script: string): string;
export declare function injectScript(s: string, doc: Document): void;
//# sourceMappingURL=index.d.ts.map