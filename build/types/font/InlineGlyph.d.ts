export default class InlineGlyph extends Inline {
    /**
     *
     * @param {TypographicGlyph} characterDesc
     */
    constructor(characterDesc: TypographicGlyph);

    /**
     *
     * @returns {TypographicGlyph}
     */
    get typographic(): TypographicGlyph;
    /**
     *
     * @return {string}
     */
    get char(): string;
}
import Inline from "../core/elements/glyphs/Inline";
import TypographicGlyph from "./TypographicGlyph";
