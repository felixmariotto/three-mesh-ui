export default class CSSQuery extends Array<any> {
    /**
     * Build a CSSQuery from a queryString
     * @param {string} queryString
     * @returns {CSSQuery}
     */
    static build(queryString: string): CSSQuery;
    /**
     *
     * @param {CSSQuerySegment} items
     */
    constructor(...items: CSSQuerySegment);
    /**
     *
     * @param {MeshUIComponent} tmElement
     * @returns {boolean}
     */
    match(tmElement: MeshUIComponent): boolean;
}
import CSSQuerySegment from "./CSSQuerySegment";
