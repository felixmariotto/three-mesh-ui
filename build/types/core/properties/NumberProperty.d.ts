export default class NumberProperty extends BaseProperty {
    /**
     *
     * @param {string} propertyId
     * @param {number} [value]
     */
    constructor(propertyId: string, value?: number);
    output: (out: any) => void;
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
}
import BaseProperty from "./BaseProperty";
