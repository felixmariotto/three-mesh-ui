export default class BorderWidth extends StyleVector4Property {
    /**
     *
     * @param defaultValue
     */
    constructor(defaultValue: any);
    _valueUV: import("three").Vector4;
    output: (out: any) => void;
    _units: string;
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
    _outputValue(out: any): void;
    /**
     *
     * @override
     */
    override process(element: any): void;
    /**
     * @override
     */
    override render(element: any): void;
}
import StyleVector4Property from "../StyleVector4Property";
