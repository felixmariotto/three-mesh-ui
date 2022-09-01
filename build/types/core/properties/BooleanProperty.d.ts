export default class BooleanProperty extends BaseProperty {
    /**
     *
     * @param {string} propertyId
     * @param {any} [value=null]
     */
    constructor(propertyId: string, value?: any);
    /**
     * @override
     * @type {boolean}
     * @private
     */

    output: (out: any) => void;
    /**
     *
     * @param {boolean} value
     */
    set value(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get value(): boolean;
}
import BaseProperty from "./BaseProperty";
