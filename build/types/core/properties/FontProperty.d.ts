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

    /**
     * @typedef ReadyClosure
     * @type { ()=> void|null }
     */
    /**
     *
     * @type {ReadyClosure}
     * @private
     */

    /**
     * @override
     */

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
    set value(arg: FontVariant);
    /**
     *
     * @return {FontVariant}
     */
    get value(): FontVariant;
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

export {};
