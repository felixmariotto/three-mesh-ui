export default class ChildrenInline extends BaseProperty {
    constructor();
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
}
import BaseProperty from "../BaseProperty";
import MeshUIBaseElement from "../../elements/MeshUIBaseElement";
