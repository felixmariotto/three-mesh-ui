/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
export default class Inline {
    /** @protected */ protected _offsetX: number;
    /** @protected */ protected _offsetY: number;
    /** @protected */ protected _lineBreak: string;
    /** @protected */ protected _kerning: number;
    /** @protected */ protected _fontFactor: number;
    /** @protected */ protected _fontSize: number;
    /**
     * @returns {void}
     */
    resetOffsets(): void;
    /**
     * The horizontal distance this inline fills
     * @returns {number}
     */
    get xadvance(): number;
    /**
     * The offset x of this inline in a line
     * @returns {number}
     */
    get xoffset(): number;
    /**
     * The offset y of this inline in a line
     * @returns {number}
     */
    get yoffset(): number;
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
     * @param {string|null} value
     */
    set lineBreak(arg: string);
    /**
     *
     * @returns {string|null}
     */
    get lineBreak(): string;
    /**
     *
     * @returns {number}
     */
    get anchor(): number;
    /**
     *
     * @param {number} value
     */
    set kerning(arg: number);
    /**
     *
     * @returns {number}
     */
    get kerning(): number;
    /**
     *
     * @param {number} value
     */
    set fontSize(arg: number);
    /**
     *
     * @returns {number}
     */
    get fontSize(): number;
    /**
     *
     * @returns {number}
     */
    get lineHeight(): number;
    /**
     *
     * @param value
     */
    set offsetX(arg: number);
    /**
     *
     * @returns {number}
     */
    get offsetX(): number;
    /**
     *
     * @param {number} value
     */
    set offsetY(arg: number);
    /**
     *
     * @returns {number}
     */
    get offsetY(): number;
    /**
     *
     * @returns {number}
     */
    get lineBase(): number;
    /**
     *
     * @param {number} value
     */
    set fontFactor(arg: number);
}
