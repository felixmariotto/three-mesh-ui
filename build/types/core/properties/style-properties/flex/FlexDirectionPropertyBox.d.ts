export default class FlexDirectionPropertyBox extends FlexDirectionProperty {
    /**
     *
     * @type {number}
     * @internal
     */
    _offset: number;
    /**
     *
     * @type {number}
     * @internal
     */
    _reverse: number;
    /**
     *
     * @param { (element:MeshUIBaseElement) => void} element
     * @private
     */
    private _process;
    computeOutputValue(element: any): void;
    process(element: any): void;
}
import FlexDirectionProperty from "./FlexDirectionProperty";
