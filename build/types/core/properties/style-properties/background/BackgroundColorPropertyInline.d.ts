export default class BackgroundColorPropertyInline extends StyleColorProperty {
    constructor(defaultValue: any);

    /**
     *
     * @param {MeshUIBaseElement} element
     */
    computeOutputValue(element: MeshUIBaseElement): void;
}
import StyleColorProperty from "../StyleColorProperty";
