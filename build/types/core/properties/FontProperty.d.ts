export default class FontProperty extends BaseProperty {
    /**
     *
     * @param {FontVariant} [value=null]
     */
    constructor(value?: FontVariant);
    /**
     *
     * @type {FontVariant|null}
     * @internal
     */
    _fontVariant: FontVariant | null;
    /**
     * @typedef ReadyClosure
     * @type { ()=> void|null }
     */
    /**
     *
     * @type {ReadyClosure}
     * @private
     */
    private _handleFontReadyClosure;
    /**
     * @override
     */
    override isValid: typeof _isValid;
    output(out: any): void;
    /**
     *
     * @override
     */
    override update(element: any, out: any): void;
    /**
     * @override
     * @param {FontVariant} value
     */
    override set value(arg: FontVariant);
    /**
     *
     * @return {FontVariant}
     */
    override get value(): FontVariant;
    /**
     *
     * @return {FontVariant|null}
     */
    get fontVariant(): FontVariant;
    /**
     *
     */
    dispose(): void;
}
import BaseProperty from "./BaseProperty";
import FontVariant from "../../font/FontVariant";
/**
 *
 * @param {number} value
 * @return {boolean}
 * @private
 */
declare function _isValid(value: number): boolean;
export {};
