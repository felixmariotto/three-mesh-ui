export default class Overflow extends SubStyleProperty {
    constructor(defaultValue: any);
    isValidValue: typeof _isValid;
    /**
     *
     * @type {Array.<Plane>|null}
     * @internal
     */
    _clippingPlanes: Array<Plane> | null;
    _renderStrategy: (element: any) => void;
    /**
     * Update of overflow is a bit different, as parent may trigger changes on it
     * @override
     */
    override update(element: any, out: any): void;
    output(out: any): void;
    computeOutputValue(element: any): void;
    render(element: any): void;
    _emptyRender(element: any): void;
    _hiddenRender(element: any): void;
    _propagateRender(element: any): void;
}
import SubStyleProperty from "../SubStyleProperty";
declare function _isValid(value: any): boolean;
import { Plane } from "three/src/math/Plane";
export {};
