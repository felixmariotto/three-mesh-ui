export default class InlineBlockElement extends MeshUIBaseElement {
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
     *
     * @override
     * @param {...Object3D} object
     * @return {this}
     */
    override add(...args: Object3D[]): this;
}
import MeshUIBaseElement from "../../core/elements/MeshUIBaseElement";
