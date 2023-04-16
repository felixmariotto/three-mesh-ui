export default class BoxLayouter extends BaseProperty {
    constructor();
    /**
     * @typedef ChildrenPos
     * @type {Object & Object.<string,Vector3>}
     */
    /**
     *
     * @type {ChildrenPos}
     * @internal
     */

    /**
     * Updated when :
     * 	- New child added
     * 	- Child removed
     * 	- Child position changed
     * 	- Child visibility changed
     * 	- ...?
     * 	@override
     */
    override update(element: any, out: any): void;
    /**
     *
     * @override
     */
    override process(element: any): void;
}
import BaseProperty from "./BaseProperty";
