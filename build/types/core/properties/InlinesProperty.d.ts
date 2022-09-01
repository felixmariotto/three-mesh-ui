export default class InlinesProperty extends BaseProperty {
    constructor();
    /**
     *
     * @type {Array.<Inline>}
     * @private
     */

    process(element: any): void;
    /**
     *
     * @return {Array.<Inline>}
     */
    get value(): Inline[];
}
import BaseProperty from "./BaseProperty";
import Inline from "../elements/glyphs/Inline";
