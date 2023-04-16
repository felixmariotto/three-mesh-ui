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

    /**
     *
     * @type {StringCollapserStrategy}
     * @internal
     */

    /**
     *
     * @type {InlineCollapserStrategy}
     * @internal
     */

    /**
     *
     * @type {InlineWrapperStrategy}
     * @internal
     */

    /**
     *
     * @param element
     * @private
     */


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
