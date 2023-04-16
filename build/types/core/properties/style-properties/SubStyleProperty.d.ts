export default class SubStyleProperty extends BaseProperty {
    /**
     *
     * @param {string} propertyId
     * @param {boolean} [primitive=true]
     * @param {any} defaultValue
     */
    constructor(propertyId: string, defaultValue: any, primitive?: boolean);
    /**
     * @type {any}
     * @internal
     */

    /**
     *
     * @type {boolean}
     * @protected
     */

    /**
     * The input value that won't be 'inherit'
     * @type {any}
     * @protected
     */

    /**
     *
     * @type {any}
     * @internal
     */

    /**
     *
     * @param {MeshUIBaseElement} element
     * @param {Object.<string,any> } out
     */
    update(element: MeshUIBaseElement, out: {
        [x: string]: any;
    }): void;
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    computeOutputValue(element: MeshUIBaseElement): void;
    /**
     *
     * @param {MeshUIBaseElement} element
     */

    /**
     *
     * @param {any} value
     */
    set inline(arg: any);
    /**
     *
     * @return {any}
     */
    get inline(): any;
    /**
     *
     * @param {any} value
     * @return {boolean}
     */
    isValidValue(value: any): boolean;
}
import BaseProperty from "../BaseProperty";
import MeshUIBaseElement from "../../elements/MeshUIBaseElement";
