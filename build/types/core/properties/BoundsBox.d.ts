export default class BoundsBox extends BaseProperty {
    constructor();
    /**
     *
     * @type {Vector3}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     *
     * @type {number}
     * @internal
     */

    /**
     * Set the value of the width 100%
     * @param element
     * @param value
     */
    setReferenceWidth(element: any, value: any): void;
    /**
     * Set the value of the height 100%
     * @param element
     * @param value
     */
    setReferenceHeight(element: any, value: any): void;
    setChildrenWidth(element: any, value: any): void;
    setChildrenHeight(element: any, value: any): void;
    update(element: any, out: any): void;
    render(element: any): void;
    /**
     * @override
     */
    override process(element: any): void;
    /**
     *
     * @param element
     * @internal
     */

    /**
     *
     * @param element
     * @internal
     */




}
import BaseProperty from "./BaseProperty";
import { Vector3 } from "three/src/math/Vector3";
