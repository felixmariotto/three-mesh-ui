export default class TextElement extends BoxElement {
    /**
     *
     * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
     */
    constructor(values?: import('./../../core/elements/MeshUIBaseElement').Options);
    /**
     * A Text Element can only contains inline elements
     * @override
     * @param {...Object3D} object
     * @return {this}
     */
    override add(...args: Object3D<import("three").Event>[]): this;
    set textContent(arg: string);
    get textContent(): string;
    set invertAlpha(arg: any);
    get invertAlpha(): any;
    get lines(): any;
}
import BoxElement from "./BoxElement";
import { Object3D } from "three/src/core/Object3D";
