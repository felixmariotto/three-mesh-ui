export default class VisibleProperty extends BaseProperty {
    /**
     *
     * @param {string} propertyId
     * @param {any} [value=null]
     */
    constructor(propertyId: string, value?: any);
    update(element: any, out: any): void;
    set value(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get value(): boolean;
}
import BaseProperty from "./BaseProperty";
