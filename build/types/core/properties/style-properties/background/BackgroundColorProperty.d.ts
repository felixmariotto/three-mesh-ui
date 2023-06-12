export default class BackgroundColorProperty extends StyleColorProperty {
    constructor(defaultValue: any);
    _input: string;
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    computeOutputValue(element: MeshUIBaseElement): void;
}
import StyleColorProperty from "../StyleColorProperty";
