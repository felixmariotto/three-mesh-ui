export default class MSDFTypographicGlyph extends TypographicGlyph {
    /**
     * @param {MSDFTypographicFont} fontDescription
     * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
     */
    constructor(fontDescription: MSDFTypographicFont, characterData: import('./MSDFFontVariant').MSDFJsonChar);
    _uv: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
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
     * @returns {MSDFInlineGlyph}
     */
    override asInlineGlyph(): MSDFInlineGlyph;
}
import TypographicGlyph from "../TypographicGlyph";
import MSDFInlineGlyph from "./MSDFInlineGlyph";
import MSDFTypographicFont from "./MSDFTypographicFont";
