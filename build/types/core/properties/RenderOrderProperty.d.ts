export default class RenderOrderProperty extends BaseProperty {
    constructor();
    output: (out: any) => void;
    _actualValue: number;
    /**
     *
     * @param {number} value
     */
    set value(arg: number);
    /**
     *
     * @return {number}
     */
    get value(): number;
    update(element: any, out: any): void;
    _outputValue(out: any): void;
}
import BaseProperty from "./BaseProperty";
