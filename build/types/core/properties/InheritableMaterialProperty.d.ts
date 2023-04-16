/**
 * @property {Material|null|"inherit"} value
 */
export default class InheritableMaterialProperty extends InheritableProperty {
    /**
     *
     * @param {string} propertyId
     */
    constructor(propertyId: string);
    /**
     *
     * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
     * @internal
     */

    /**
     *
     * @type {null}
     * @internal
     */

    /**
     * @override
     */
    override getInheritedInput(element: any): any;
}
import InheritableProperty from "./InheritableProperty";
