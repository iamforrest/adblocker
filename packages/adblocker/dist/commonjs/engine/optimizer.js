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
Object.defineProperty(exports, "__esModule", { value: true });
exports.noopOptimizeNetwork = noopOptimizeNetwork;
exports.noopOptimizeCosmetic = noopOptimizeCosmetic;
exports.optimizeNetwork = optimizeNetwork;
const network_js_1 = __importStar(require("../filters/network.js"));
const utils_js_1 = require("../utils.js");
const domains_js_1 = require("../engine/domains.js");
function processRegex(r) {
    return `(?:${r.source})`;
}
function escape(s) {
    return `(?:${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`;
}
function setWithDefault(map, key, value) {
    let bucket = map.get(key);
    if (bucket === undefined) {
        bucket = [];
        map.set(key, bucket);
    }
    bucket.push(value);
}
function groupBy(filters, criteria) {
    const grouped = new Map();
    for (const filter of filters) {
        setWithDefault(grouped, criteria(filter), filter);
    }
    return Array.from(grouped.values());
}
function splitBy(filters, condition) {
    const positive = [];
    const negative = [];
    for (const filter of filters) {
        if (condition(filter)) {
            positive.push(filter);
        }
        else {
            negative.push(filter);
        }
    }
    return {
        negative,
        positive,
    };
}
const OPTIMIZATIONS = [
    {
        description: 'Remove duplicated filters by ID',
        fusion: (filters) => filters[0],
        groupByCriteria: (filter) => '' + filter.getId(),
        select: () => true,
    },
    {
        description: 'Group idential filter with same mask but different domains in single filters',
        fusion: (filters) => {
            const parts = [];
            const hostnames = new Set();
            const notHostnames = new Set();
            const entities = new Set();
            const notEntities = new Set();
            for (const { domains } of filters) {
                if (domains !== undefined) {
                    if (domains.parts !== undefined) {
                        parts.push(domains.parts);
                    }
                    if (domains.hostnames !== undefined) {
                        for (const hash of domains.hostnames) {
                            hostnames.add(hash);
                        }
                    }
                    if (domains.entities !== undefined) {
                        for (const hash of domains.entities) {
                            entities.add(hash);
                        }
                    }
                    if (domains.notHostnames !== undefined) {
                        for (const hash of domains.notHostnames) {
                            notHostnames.add(hash);
                        }
                    }
                    if (domains.notEntities !== undefined) {
                        for (const hash of domains.notEntities) {
                            notEntities.add(hash);
                        }
                    }
                }
            }
            return new network_js_1.default(Object.assign({}, filters[0], {
                domains: new domains_js_1.Domains({
                    hostnames: hostnames.size !== 0 ? new Uint32Array(hostnames).sort() : undefined,
                    entities: entities.size !== 0 ? new Uint32Array(entities).sort() : undefined,
                    notHostnames: notHostnames.size !== 0 ? new Uint32Array(notHostnames).sort() : undefined,
                    notEntities: notEntities.size !== 0 ? new Uint32Array(notEntities).sort() : undefined,
                    parts: parts.length !== 0 ? parts.join(',') : undefined,
                }),
                rawLine: filters[0].rawLine !== undefined
                    ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
                    : undefined,
            }));
        },
        groupByCriteria: (filter) => filter.getHostname() + filter.getFilter() + filter.getMask() + filter.getRedirect(),
        select: (filter) => !filter.isCSP() && filter.denyallow === undefined && filter.domains !== undefined,
    },
    {
        description: 'Group simple patterns, into a single filter',
        fusion: (filters) => {
            const patterns = [];
            for (const f of filters) {
                if (f.isRegex()) {
                    patterns.push(processRegex(f.getRegex()));
                }
                else if (f.isRightAnchor()) {
                    patterns.push(`${escape(f.getFilter())}$`);
                }
                else if (f.isLeftAnchor()) {
                    patterns.push(`^${escape(f.getFilter())}`);
                }
                else {
                    patterns.push(escape(f.getFilter()));
                }
            }
            return new network_js_1.default(Object.assign({}, filters[0], {
                mask: (0, utils_js_1.setBit)(filters[0].mask, network_js_1.NETWORK_FILTER_MASK.isRegex),
                rawLine: filters[0].rawLine !== undefined
                    ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
                    : undefined,
                regex: new RegExp(patterns.join('|')),
            }));
        },
        groupByCriteria: (filter) => '' + (filter.getMask() & ~network_js_1.NETWORK_FILTER_MASK.isRegex & ~network_js_1.NETWORK_FILTER_MASK.isFullRegex),
        select: (filter) => filter.domains === undefined &&
            filter.denyallow === undefined &&
            !filter.isHostnameAnchor() &&
            !filter.isRedirect() &&
            !filter.isCSP(),
    },
];
/**
 * Optimizer which returns the list of original filters.
 */
function noopOptimizeNetwork(filters) {
    return filters;
}
function noopOptimizeCosmetic(filters) {
    return filters;
}
/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
function optimizeNetwork(filters) {
    const fused = [];
    let toFuse = filters;
    for (const { select, fusion, groupByCriteria } of OPTIMIZATIONS) {
        const { positive, negative } = splitBy(toFuse, select);
        toFuse = negative;
        const groups = groupBy(positive, groupByCriteria);
        for (const group of groups) {
            if (group.length > 1) {
                fused.push(fusion(group));
            }
            else {
                toFuse.push(group[0]);
            }
        }
    }
    for (const filter of toFuse) {
        fused.push(filter);
    }
    return fused;
}
//# sourceMappingURL=optimizer.js.map