export default class FontFamilyProperty extends SubStyleProperty {
    constructor();
    /**
     *
     * @param element
     */
    computeOutputValue(element: any): void;
    /**
     * @override
     * @return {any|FontFamily|null}
     */
    override get value(): any;
    getInheritedInput(element: any): any;
}
import SubStyleProperty from "../SubStyleProperty";
