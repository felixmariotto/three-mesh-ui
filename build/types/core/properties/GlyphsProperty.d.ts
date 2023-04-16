export default class GlyphsProperty extends BaseProperty {
    constructor();
    /**
     *
     * @type {Array.<TypographicGlyph>}
     * @private
     */

    process(element: any): void;
    /**
     *
     * @return {Array.<TypographicGlyph>}
     */
    get value(): TypographicGlyph[];
}
import BaseProperty from "./BaseProperty";
import TypographicGlyph from "../../font/TypographicGlyph";
