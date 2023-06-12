/**
 * @typedef  StringCollapserStrategy
 * @type {(textContent:{string}) => string}
 */
/**
 * @typedef  InlineCollapserStrategy
 * @type {(line:{Line}) => number }
 */
/**
 * @typedef InlineWrapperStrategy
 * @type {(inlines:{Array}, i:{number}, lastInlineOffset:{number}, options:Object<string,any>) => boolean}
 */
export default class WhiteSpacePropertyInline extends WhiteSpaceProperty {
    computeOutputValue: (element: any) => void;
    _whiteSpacedContent: string;
    /**
     *
     * @type {StringCollapserStrategy}
     * @internal
     */
    _stringCollapser: StringCollapserStrategy;
    /**
     *
     * @type {InlineCollapserStrategy}
     * @internal
     */
    _inlineCollapser: InlineCollapserStrategy;
    /**
     *
     * @type {InlineWrapperStrategy}
     * @internal
     */
    _inlineWrapper: InlineWrapperStrategy;
    /**
     *
     * @param element
     * @private
     */
    private _computeFromInherited;
    _newLineBreakability: string;
    process(element: any): void;
}
export type StringCollapserStrategy = (textContent: {
    string;
}) => string;
export type InlineCollapserStrategy = (line: {
    Line;
}) => number;
export type InlineWrapperStrategy = (inlines: {
    Array;
}, i: {
    number;
}, lastInlineOffset: {
    number;
}, options: {
    [x: string]: any;
}) => boolean;
import WhiteSpaceProperty from "./WhiteSpaceProperty";
