export default class StyleFactorProperty extends SubStyleProperty {
    /**
     *
     * @param {string} propertyId
     * @param {any} defaultValue
     */
    constructor(propertyId: string, defaultValue: any);
    output: (out: any) => void;

}
import SubStyleProperty from "./SubStyleProperty";
