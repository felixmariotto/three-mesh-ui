export default class InlineElement extends MeshUIBaseElement {
    /**
     *
     * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
     * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
     */
    static definePropertiesValues(properties: import('./../../core/elements/MeshUIBaseElement').Properties, values: import('./../../core/elements/MeshUIBaseElement').Options): void;
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    static init(element: MeshUIBaseElement): void;
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
    set textContent(arg: any);
    get textContent(): any;
    set invertAlpha(arg: any);
    get invertAlpha(): any;
}
import MeshUIBaseElement from "../../core/elements/MeshUIBaseElement";
import { Object3D } from "three/src/core/Object3D";
