export default class BoundsBox extends BaseProperty {
    constructor();
    /**
     *
     * @type {Vector3}
     * @internal
     */
    _size: Vector3;
    /**
     *
     * @type {number}
     * @internal
     */
    _offsetWidth: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _offsetHeight: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _innerWidth: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _innerHeight: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _centerX: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _centerY: number;
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
    _computeChildrenSideWidth(element: any): number;
    /**
     *
     * @param element
     * @internal
     */
    _computeChildrenSideHeight(element: any): number;
    _propagateWidth(element: any): void;
    _propagateHeight(element: any): void;
    _triggerCascadingDependencies(element: any): void;
}
import BaseProperty from "./BaseProperty";
import { Vector3 } from "three/src/math/Vector3";
