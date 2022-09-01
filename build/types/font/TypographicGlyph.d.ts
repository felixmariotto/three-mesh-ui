/**
 * @class
 * @abstract
 */
export default class TypographicGlyph {
    /**
     *
     * @param {TypographicFont} typographicFont
     */
    constructor(typographicFont: TypographicFont);






    /**
     *
     * @type {TypographicFont}
     * @protected
     */

    /**
     *
     * @returns {TypographicFont}
     */
    get font(): TypographicFont;
    /**
     *
     * @return {string}
     */
    get char(): string;
    /**
     *
     * @returns {number}
     */
    get width(): number;
    /**
     *
     * @returns {number}
     */
    get height(): number;
    /**
     *
     * @returns {number}
     */
    get xadvance(): number;
    /**
     *
     * @returns {number}
     */
    get xoffset(): number;
    /**
     *
     * @param value
     */
    set yoffset(arg: number);
    /**
     *
     * @returns {number}
     */
    get yoffset(): number;
    /**
     *
     * @abstract
     * @param {string} otherChar
     * @returns {TypographicGlyph}
     */
    clone(otherChar: string): TypographicGlyph;
    /**
     *
     * @abstract
     * @returns {InlineGlyph}
     */
    asInlineGlyph(): InlineGlyph;
}
import TypographicFont from "./TypographicFont";
import InlineGlyph from "./InlineGlyph";
