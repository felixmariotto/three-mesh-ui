/**
 * @extends InlineGlyph
 */
export default class MSDFInlineGlyph extends InlineGlyph {
    /**
     *
     * @param {MSDFTypographicGlyph} characterDesc
     */
    constructor(characterDesc: MSDFTypographicGlyph);
    /**
     *
     * @returns {{left:number, right:number, top:number, bottom:number}|null}
     */
    get uv(): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
import InlineGlyph from "../InlineGlyph";
import MSDFTypographicGlyph from "./MSDFTypographicGlyph";
