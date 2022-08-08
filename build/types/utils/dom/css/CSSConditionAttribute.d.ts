export default class CSSConditionAttribute extends CSSCondition {
    /**
     *
     * @param {Array.<string>} attributesMatches
     */
    constructor(attributesMatches: Array<string>);
    /**
     *
     * @type {Array.<AttributeCondition>}
     * @private
     */
    private _value;
    /**
     *
     * @returns {Array.<AttributeCondition>}
     */
    get value(): AttributeCondition[];
}
import CSSCondition from "./CSSCondition";
declare class AttributeCondition {
    /**
     * Parse attribute query string to isolates its components
     *
     * 	ie: `[disabled]` 				=> {name:'disabled',value:null,operator:'!=='}
     * 			`[src="http://"]` 	=> {name:'src',value:"http://",operator:'='}
     * 			`[src$="http://"]` 	=> {name:'src',value:"http://",operator:'$='}
     *
     * @param {string} queryString
     */
    constructor(queryString: string);
    name: string;
    operator: string;
    value: string;
}
export {};
