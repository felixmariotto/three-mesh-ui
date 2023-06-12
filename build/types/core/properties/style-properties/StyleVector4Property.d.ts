export default class StyleVector4Property extends SubStyleProperty {
    constructor(propertyId: any, defaultValue: any);
    /**
     *
     * @type {Vector4}
     * @private
     */
    private _input;
    /**
     * @override
     * @type {Vector4}
     * @protected
     */
    protected override _value: Vector4;
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
    _computed: any;
    _output: any;
    /**
     *
     * @param {Vector4} vector4
     * @param {Vector4|Array.<Number>|Number|String} value
     * @protected
     */
    protected _vector4ValueSetter(vector4: Vector4, value: Vector4 | Array<number> | number | string): void;
}
import SubStyleProperty from "./SubStyleProperty";
import { Vector4 } from "three/src/math/Vector4";
