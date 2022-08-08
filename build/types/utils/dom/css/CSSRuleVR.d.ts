export default class CSSRuleVR {
    /**
     *
     * @param {string} queryString
     * @param {Object.<string, string>} styles
     * @param {Object.<string, string>} [lookupTable=null]
     */
    constructor(queryString: string, styles: {
        [x: string]: string;
    }, lookupTable?: {
        [x: string]: string;
    });
    /**
     *
     * @type {CSSQuery}
     * @private
     */
    private _query;
    /**
     *
     * @type {number}
     * @private
     */
    private _specificity;
    /**
     *
     * @type {number}
     * @private
     */
    private _order;
    _styles: {};
    /**
     *
     * @type {boolean}
     * @private
     */
    private _enabled;
    /**
     *
     * @param v
     */
    set enabled(arg: boolean);
    /**
     *
     * @returns {boolean}
     */
    get enabled(): boolean;
    /**
     *
     * @returns {CSSQuery}
     */
    get query(): CSSQuery;
    /**
     *
     * @returns {number}
     */
    get specificity(): number;
    /**
     *
     * @param {number} v
     */
    set order(arg: number);
    /**
     *
     * @returns {number}
     */
    get order(): number;
    /**
     *
     * @returns {Object.<string,any>}
     */
    get styles(): {
        [x: string]: any;
    };
}
import CSSQuery from "./CSSQuery";
