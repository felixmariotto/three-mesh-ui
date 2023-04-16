/**

 */
export default class MSDFTypographicGlyph extends TypographicGlyph {
    /**
     * @param {MSDFTypographicFont} fontDescription
     * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
     */
    constructor(fontDescription: MSDFTypographicFont, characterData: import('./MSDFFontVariant').MSDFJsonChar);

    /**
     *
     * @returns {{left: number, right: number, top: number, bottom: number}|null}
     */
    get uv(): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    /**
     * @override
     * @param {string} otherChar
     * @returns {MSDFTypographicGlyph}
     */
    override clone(otherChar: string): MSDFTypographicGlyph;
    /**
     * @override
     * @returns {MSDFInlineGlyph}
     */
    override asInlineGlyph(): MSDFInlineGlyph;
}
import TypographicGlyph from "../TypographicGlyph";
import MSDFInlineGlyph from "./MSDFInlineGlyph";
import MSDFTypographicFont from "./MSDFTypographicFont";
