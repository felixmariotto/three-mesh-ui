export default class CSSConditionToken extends CSSCondition {
    /**
     *
     * @param {string} type
     * @param {Array.<string>} tokenMatches
     */
    constructor(type: string, tokenMatches: Array<string>);
    /**
     *
     * @type {Array.<string>}
     * @private
     */
    private _value;
    /**
     * @override
     * @returns {Array.<string>}
     */
    override get value(): string[];
}
import CSSCondition from "./CSSCondition";
