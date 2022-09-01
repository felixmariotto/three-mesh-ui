/**
 * Line represents an horizontal combination of positioned inlines with additional properties
 */
export default class Line extends Array<any> {
    /**
     *
     * @param {Inline[]} items
     */
    constructor(...items: Inline[]);
    /**
     * The width of this line
     * @type {number}
     */
    width: number;
    /**
     * The maximum lineBase of this line of inlines
     * @type {number}
     */
    lineBase: number;
    /**
     * The maximum lineHeight of this line of inlines
     * @type {number}
     */
    lineHeight: number;
    /**
     * The vertical position of this line
     * @type {number}
     */
    y: number;
}
import Inline from "./Inline";
