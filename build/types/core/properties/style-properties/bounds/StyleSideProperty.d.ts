export default class StyleSideProperty extends SubStyleProperty {
    /**
     *
     * @param {string} propertyId
     * @param {number} defaultValue
     */
    constructor(propertyId: string, defaultValue?: number);
    /**
     *
     * @type {boolean}
     * @internal
     */
    _auto: boolean;
    /**
     *
     * @type {boolean}
     * @internal
     */
    _relative: boolean;
    _updateRequired: boolean;
    _parseInput(): void;
    update(element: any, out: any): void;
    computeOutputValue(element: any): void;
    getInheritedInput(element: any): any;
    getDefaultValue(): number;
    /**
     *
     * @return {number}
     */
    get value(): number;
}
import SubStyleProperty from "../SubStyleProperty";
