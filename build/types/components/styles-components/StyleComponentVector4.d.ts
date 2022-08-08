export default class StyleComponentVector4 {
    constructor(defaultValue: any);
    _input: Vector4;
    /**
     *
     * @param {Vector4|Array.<Number>|Number|String} v
     */
    set input(arg: Vector4);
    /**
     *
     * @returns {Vector4}
     */
    get input(): Vector4;
    /**
     * @returns {Vector4}
     */
    get output(): Vector4;
    /**
     *
     * @param {Number} v
     */
    set x(arg: number);
    /**
     *
     * @returns {number}
     */
    get x(): number;
    /**
     *
     * @param {Number} v
     */
    set y(arg: number);
    /**
     *
     * @returns {number}
     */
    get y(): number;
    /**
     *
     * @param {Number} v
     */
    set z(arg: number);
    /**
     *
     * @returns {number}
     */
    get z(): number;
    /**
     *
     * @param {Number} v
     */
    set w(arg: number);
    /**
     *
     * @returns {number}
     */
    get w(): number;
    dispose(): void;
}
import { Vector4 } from "three/src/math/Vector4";
