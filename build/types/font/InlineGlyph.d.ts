export default class InlineGlyph extends Inline {
    /**
     *
     * @param {TypographicGlyph} characterDesc
     */
    constructor(characterDesc: TypographicGlyph);
    /** @protected */ protected _typographic: TypographicGlyph;
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
import Inline from "../components/core/Inline";
import TypographicGlyph from "./TypographicGlyph";
