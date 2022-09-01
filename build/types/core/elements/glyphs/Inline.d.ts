/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
export default class Inline {











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
     * @param {number} value
     */
    set cumulativeWidth(arg: number);
    /**
     *
     * @return {number}
     */
    get cumulativeWidth(): number;
    /**
     *
     * @param {number} value
     */
    set marginLeft(arg: number);
    /**
     *
     * @return {number}
     */
    get marginLeft(): number;
    /**
     *
     * @param {number} value
     */
    set marginRight(arg: number);
    /**
     *
     * @return {number}
     */
    get marginRight(): number;
    /**
     *
     * @param {number} value
     */
    set paddingLeft(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingLeft(): number;
    /**
     *
     * @param {number} value
     */
    set paddingRight(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingRight(): number;
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
    /**
     *
     * @returns {number}
     */
    get fontFactor(): number;
}
