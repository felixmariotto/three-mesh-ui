/**
 * Lines represents a vertical succession of Line
 */
export default class Lines extends Array<any> {
    /**
     *
     * @param {Line} items
     */
    constructor(...items: Line);
    /**
     * The maximum width of Line items
     * @type {number}
     */
    width: number;
    /**
     * The addition of height of any Line
     * @type {number}
     */
    height: number;
}
import Line from "./Line";
