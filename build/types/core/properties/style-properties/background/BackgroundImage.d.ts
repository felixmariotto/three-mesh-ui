export default class BackgroundImage extends SubStyleProperty {
    constructor(defaultValue: any);
    /**
     *
     * @type {Vector2}
     * @internal
     */

    /**
     * @override
     * @return {any|Texture|null}
     */
    override get value(): any;
    output(out: any): void;
    computeOutputValue(element: any): void;
    /**
     *
     * @param element
     */
    process(element: any): void;
}
import SubStyleProperty from "../SubStyleProperty";
import { Vector2 } from "three/src/math/Vector2";
