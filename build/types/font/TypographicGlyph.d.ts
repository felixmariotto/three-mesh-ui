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
    /** @protected */ protected _char: string;
    /** @protected */ protected _width: number;
    /** @protected */ protected _heigth: number;
    /** @protected */ protected _xadvance: number;
    /** @protected */ protected _xoffset: number;
    /** @protected */ protected _yoffset: number;
    /**
     *
     * @type {TypographicFont}
     * @protected
     */
    protected _font: TypographicFont;
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
     * @returns {InlineGlyph}
     */
    asInlineGlyph(): InlineGlyph;
}
import TypographicFont from "./TypographicFont";
import InlineGlyph from "./InlineGlyph";
