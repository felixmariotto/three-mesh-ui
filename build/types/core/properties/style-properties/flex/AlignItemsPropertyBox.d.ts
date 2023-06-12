export default class AlignItemsPropertyBox extends AlignItemsProperty {
    /**
     *
     * @type {(element:MeshUIBaseElement, (child:MeshUIBaseElement, parentOffset:number )=> number ) =>  void  }
     * @private
     */
    private _process;
    /**
     *
     * @type {(child:MeshUIBaseElement, parentOffset:number )=> number}
     * @private
     */
    private _childAlign;
    /**
     *
     * @param element
     */
    process(element: any): void;
}
import AlignItemsProperty from "./AlignItemsProperty";
