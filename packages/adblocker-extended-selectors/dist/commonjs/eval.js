"use strict";
/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPattern = matchPattern;
exports.matches = matches;
exports.querySelectorAll = querySelectorAll;
function matchPattern(pattern, text) {
    // TODO - support 'm' RegExp argument
    if (pattern.startsWith('/') && (pattern.endsWith('/') || pattern.endsWith('/i'))) {
        let caseSensitive = true;
        pattern = pattern.slice(1);
        if (pattern.endsWith('/')) {
            pattern = pattern.slice(0, -1);
        }
        else {
            pattern = pattern.slice(0, -2);
            caseSensitive = false;
        }
        return new RegExp(pattern, caseSensitive === false ? 'i' : undefined).test(text);
    }
    return text.includes(pattern);
}
function matches(element, selector) {
    if (selector.type === 'id' ||
        selector.type === 'class' ||
        selector.type === 'type' ||
        selector.type === 'attribute') {
        return element.matches(selector.content);
    }
    else if (selector.type === 'list') {
        return selector.list.some((s) => matches(element, s));
    }
    else if (selector.type === 'compound') {
        return selector.compound.every((s) => matches(element, s));
    }
    else if (selector.type === 'pseudo-class') {
        if (selector.name === 'has' || selector.name === 'if') {
            // TODO - is this a querySelectorAll or matches here?
            return (selector.subtree !== undefined && querySelectorAll(element, selector.subtree).length !== 0);
        }
        else if (selector.name === 'not') {
            return selector.subtree !== undefined && matches(element, selector.subtree) === false;
        }
        else if (selector.name === 'has-text') {
            const { argument } = selector;
            if (argument === undefined) {
                return false;
            }
            const text = element.textContent;
            if (text === null) {
                return false;
            }
            return matchPattern(argument, text);
        }
        else if (selector.name === 'min-text-length') {
            const minLength = Number(selector.argument);
            if (Number.isNaN(minLength) || minLength < 0) {
                return false;
            }
            const text = element.textContent;
            if (text === null) {
                return false;
            }
            return text.length >= minLength;
        }
    }
    return false;
}
function querySelectorAll(element, selector) {
    const elements = [];
    if (selector.type === 'id' ||
        selector.type === 'class' ||
        selector.type === 'type' ||
        selector.type === 'attribute') {
        elements.push(...element.querySelectorAll(selector.content));
    }
    else if (selector.type === 'list') {
        for (const subSelector of selector.list) {
            elements.push(...querySelectorAll(element, subSelector));
        }
    }
    else if (selector.type === 'compound') {
        // TODO - handling compound needs to be reworked...
        // .cls:upward(1) for example will not work with this implementation.
        // :upward is not about selecting, but transforming a set of nodes (i.e.
        // uBO's transpose method).
        if (selector.compound.length !== 0) {
            elements.push(...querySelectorAll(element, selector.compound[0]).filter((e) => selector.compound.slice(1).every((s) => matches(e, s))));
        }
    }
    else if (selector.type === 'complex') {
        const elements2 = selector.left === undefined ? [element] : querySelectorAll(element, selector.left);
        if (selector.combinator === ' ') {
            for (const element2 of elements2) {
                elements.push(...querySelectorAll(element2, selector.right));
            }
        }
        else if (selector.combinator === '>') {
            for (const element2 of elements2) {
                for (const child of element2.children) {
                    if (matches(child, selector.right) === true) {
                        elements.push(child);
                    }
                }
            }
        }
        else if (selector.combinator === '~') {
            for (const element2 of elements2) {
                let sibling = element2;
                while ((sibling = sibling.nextElementSibling) !== null) {
                    if (matches(sibling, selector.right) === true) {
                        elements.push(sibling);
                    }
                }
            }
        }
        else if (selector.combinator === '+') {
            for (const element2 of elements2) {
                const nextElementSibling = element2.nextElementSibling;
                if (nextElementSibling !== null && matches(nextElementSibling, selector.right) === true) {
                    elements.push(nextElementSibling);
                }
            }
        }
    }
    else if (selector.type === 'pseudo-class') {
        // if (selector.name === 'upward') {
        //   let n = Number(selector.argument);
        //   console.log('upward', selector, n);
        //   if (Number.isNaN(n) === false) {
        //     if (n >= 1 && n < 256) {
        //       let ancestor: Element | null = element;
        //       while (ancestor !== null && n > 0) {
        //         ancestor = ancestor.parentElement;
        //         n -= 1;
        //       }
        //       if (ancestor !== null && n === 0) {
        //         elements.push(element);
        //       }
        //     }
        //   } else if (selector.argument !== undefined) {
        //     const parent = element.parentElement;
        //     if (parent !== null) {
        //       const ancestor = parent.closest(selector.argument);
        //       if (ancestor !== null) {
        //         elements.push(ancestor);
        //       }
        //     }
        //   }
        // } else {
        for (const subElement of element.querySelectorAll('*')) {
            if (matches(subElement, selector) === true) {
                elements.push(subElement);
            }
        }
        // }
    }
    return elements;
}
//# sourceMappingURL=eval.js.map