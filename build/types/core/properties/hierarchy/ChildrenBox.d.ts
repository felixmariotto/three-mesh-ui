export default class ChildrenBox extends BaseProperty {
    constructor();
    /**
     *
     * @type {Array.<MeshUIBaseElement>}
     * @private
     */

    /**
     *
     * @type {Array.<MeshUIBaseElement>}
     * @internal
     */

    /**
     * Update requested when :
     * 		- New child has been added
     * 		- Existing child has been removed
     *
     * @param element
     * @param out
     */
    update(element: any, out: any): void;
    /**
     * Process when :
     * 		- Existing child visibility changed
     *
     * @param element
     */
    process(element: any): void;

    /**
     *
     */
    dispose(): void;
    /**
     *
     * Sort children according to their .style.order property or fallback on children index
     *
     * @param {HTMLElementVR} a
     * @param {HTMLElementVR} b
     * @return {number}
     * @private
     */

}
import BaseProperty from "../BaseProperty";
import MeshUIBaseElement from "../../elements/MeshUIBaseElement";
