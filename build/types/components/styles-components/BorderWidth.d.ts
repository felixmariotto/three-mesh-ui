export default class BorderWidth {
    /**
     *
     * @param defaultValue
     */
    constructor(defaultValue: any);
    _units: string;
    _inputValue: Vector4;
    _borderWidthUV: Vector4;
    /**
     *
     * @param {string} units
     */
    set units(arg: string);
    /**
     *
     * @returns {string}
     */
    get units(): string;
    updateValue(target?: any, offsetWidth?: number, offsetHeight?: number): void;
    /**
     *
     * @returns {Vector4}
     */
    get output(): Vector4;
}
import { Vector4 } from "three/src/math/Vector4";
