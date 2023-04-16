export default class StyleVector4Property extends SubStyleProperty {
    constructor(propertyId: any, defaultValue: any);
    /**
     *
     * @type {Vector4}
     * @private
     */

    /**
     * @override
     * @type {Vector4}
     * @protected
     */

    /**
     * @override
     * @return {Vector4}
     */
    override get value(): Vector4;
    /**
     * @override
     */
    override computeOutputValue(element: any): void;
    /**
     *
     * @param {Number} v
     */
    set top(arg: number);
    /**
     *
     * @returns {number}
     */
    get top(): number;
    /**
     *
     * @param {Number} v
     */
    set right(arg: number);
    /**
     *
     * @returns {number}
     */
    get right(): number;
    /**
     *
     * @param {Number} v
     */
    set bottom(arg: number);
    /**
     *
     * @returns {number}
     */
    get bottom(): number;
    /**
     *
     * @param {Number} v
     */
    set left(arg: number);
    /**
     *
     * @returns {number}
     */
    get left(): number;
    dispose(): void;


    /**
     *
     * @param {Vector4} vector4
     * @param {Vector4|Array.<Number>|Number|String} value
     * @protected
     */

}
import SubStyleProperty from "./SubStyleProperty";
import { Vector4 } from "three/src/math/Vector4";
