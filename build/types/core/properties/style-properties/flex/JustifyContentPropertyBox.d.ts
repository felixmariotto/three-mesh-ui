export default class JustifyContentPropertyBox extends JustifyContentProperty {
    constructor(defaultValue: any);
    /**
     *
     * @type {(axisOffset:number) => number}
     * @private
     */
    private _computeOffset;
    /**
     *
     * @type {(element:MeshUIBaseElement, availableSpace:number, reverse:number) => Array.<number> }
     * @private
     */
    private _computeMargin;
    /**
     *
     * @type {(element:MeshUIBaseElement) => void}
     * @private
     */
    private _process;
    computeOutputValue(element: any): void;
    process(element: any): void;
}
import JustifyContentProperty from "./JustifyContentProperty";
