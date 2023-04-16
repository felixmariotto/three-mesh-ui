export default class StyleNumberProperty extends SubStyleProperty {
    /**
     *
     * @param {string} propertyId
     * @param {any} defaultValue
     */
    constructor(propertyId: string, defaultValue: any);
    /**
     * @override
     * @return {Number}
     */
    override get value(): number;
}
import SubStyleProperty from "./SubStyleProperty";
