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
    _mediation: any;
    /**
     *
     * @type {null}
     * @internal
     */
    _defaultMaterial: any;
    /**
     * @override
     */
    override getInheritedInput(element: any): any;
}
import InheritableProperty from "./InheritableProperty";
