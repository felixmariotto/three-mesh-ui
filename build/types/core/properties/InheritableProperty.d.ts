export default class InheritableProperty extends BaseProperty {
    output: (out: any) => void;
    _notInheritedValue: any;
    update(element: any, out: any): void;
    propagate(element: any): void;
    /**
     * Output this property in a dictionnary
     * @override
     */
    override _outputValue(out: any): void;
}
import BaseProperty from "./BaseProperty";
