/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
declare const tokenTypes: readonly ["attribute", "id", "class", "comma", "combinator", "pseudo-element", "pseudo-class", "type"];
export type TokenType = (typeof tokenTypes)[number];
export type Base = {
    length: number;
    content: string;
    pos: number[];
};
export type Type = Base & {
    type: 'type';
    name?: string;
    namespace?: string;
};
export type PseudoClass = Base & {
    type: 'pseudo-class';
    name: string;
    argument: string | undefined;
    subtree: AST | undefined;
};
export type PseudoElement = Base & {
    type: 'pseudo-element';
    name: string;
};
export type Combinator = Base & {
    type: 'combinator';
};
export type Comma = Base & {
    type: 'comma';
};
export type Class = Base & {
    type: 'class';
    name: string;
};
export type Id = Base & {
    type: 'id';
    name: string;
};
export type Attribute = Base & {
    type: 'attribute';
    namespace?: string;
    caseSensitive?: string;
    name: string;
    operator?: string;
    value?: string;
};
export type Atom = Attribute | Id | Class | Comma | Combinator | PseudoClass | PseudoElement | Type;
export type Atoms = Atom[];
export type AtomOrString = Atom | string;
export type AtomsOrStrings = AtomOrString[];
export type Strings = {
    str: string;
    start: number;
}[];
export interface Complex {
    type: 'complex';
    combinator: ' ' | '+' | '~' | '>';
    right: AST;
    left: AST | undefined;
}
export interface Compound {
    type: 'compound';
    compound: AST[];
}
export interface List {
    type: 'list';
    list: AST[];
}
export type AST = Attribute | Id | Class | PseudoClass | PseudoElement | Type | Complex | Compound | List;
export interface ParserOptions {
    recursive?: boolean;
    list?: boolean;
}
export declare function isAtoms(tokens: AtomsOrStrings): tokens is Atoms;
export declare function isAST(tokens: Atoms): tokens is (Attribute | Id | Class | PseudoClass | PseudoElement | Type)[];
export {};
//# sourceMappingURL=types.d.ts.map