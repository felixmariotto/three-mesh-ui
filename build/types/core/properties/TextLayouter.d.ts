export default class TextLayouter extends BaseProperty {
    constructor();
    /**
     *
     * @type {Lines}
     * @private
     */
    private _value;
    update(element: any, out: any): void;
    /**
     *
     * @override
     */
    override process(element: any): void;
    /**
     *
     * @param inlineElement
     * @protected
     */
    protected _resetInlines(inlineElement: any): void;
}
import BaseProperty from "./BaseProperty";
