export default class ParentProperty extends BaseProperty {
    constructor();
    /**
     * Update when :
     * 		- element has been added
     * 		- element has been removed
     *
     * @param element
     * @param out
     */
    update(element: any, out: any): void;
    /**
     *
     * @param {(p:Object3D)=>boolean } conditionCallback
     */
    find(conditionCallback: (p: Object3D) => boolean): any;
    /**
     *
     */
    dispose(): void;
}
import BaseProperty from "../BaseProperty";
import { Object3D } from "three/src/core/Object3D";
