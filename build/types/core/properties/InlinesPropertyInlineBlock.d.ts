/**
 * @property {Array.<InlineGlyph>} value
 */
export default class InlinesPropertyInlineBlock extends BaseProperty {
    constructor();
    /**
     *
     * @type {Array.<Inline>}
     * @internal
     */
    _value: Array<Inline>;
    process(element: any): void;
}
import BaseProperty from "./BaseProperty";
import Inline from "../elements/glyphs/Inline";
