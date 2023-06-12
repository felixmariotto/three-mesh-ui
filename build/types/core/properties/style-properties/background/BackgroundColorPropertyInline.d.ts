export default class BackgroundColorPropertyInline extends StyleColorProperty {
    constructor(defaultValue: any);
    _input: number;
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    computeOutputValue(element: MeshUIBaseElement): void;
}
import StyleColorProperty from "../StyleColorProperty";
