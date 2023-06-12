export default class BoundsInlineBlock extends BaseProperty {
    constructor();
    /**
     *
     * @type {Vector3}
     * @internal
     */
    _size: Vector3;
    _offsetWidth: number;
    _offsetHeight: number;
    _innerWidth: number;
    _innerHeight: number;
    update(element: any, out: any): void;
    process(element: any): void;
    render(element: any): void;
}
import BaseProperty from "./BaseProperty";
import { Vector3 } from "three/src/math/Vector3";
