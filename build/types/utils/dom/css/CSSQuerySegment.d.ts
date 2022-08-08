export default class CSSQuerySegment {
    /**
     *
     * @param {string} queryString
     */
    constructor(queryString: string);
    /**
     *
     * @type {string}
     * @private
     */
    private _query;
    /**
     *
     * @type {string|null}
     * @private
     */
    private _combinator;
    /**
     *
     * @type {Array<CSSCondition|CSSConditionToken|CSSConditionAttribute>}
     * @private
     */
    private _conditions;
    /**
     *
     * @returns {Array<CSSCondition|CSSConditionToken|CSSConditionAttribute>}
     */
    get conditions(): (CSSCondition | CSSConditionAttribute | CSSConditionToken)[];
    /**
     *
     * @returns {string|null}
     */
    get combinator(): string;
    /**
     *
     * @returns {string}
     */
    get query(): string;
    /**
     *
     * @param {MeshUIComponent} target
     * @returns {boolean}
     */
    match(target: MeshUIComponent): boolean;
}
import CSSCondition from "./CSSCondition";
import CSSConditionAttribute from "./CSSConditionAttribute";
import CSSConditionToken from "./CSSConditionToken";
