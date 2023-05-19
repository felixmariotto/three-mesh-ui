export default class Overflow extends SubStyleProperty {
    constructor(defaultValue: any);

    /**
     *
     * @type {Array.<Plane>|null}
     * @internal
     */


    /**
     * Update of overflow is a bit different, as parent may trigger changes on it
     * @override
     */
    override update(element: any, out: any): void;
    output(out: any): void;
    computeOutputValue(element: any): void;
    render(element: any): void;



}
import SubStyleProperty from "../SubStyleProperty";

import { Plane } from "three/src/math/Plane";
export {};
