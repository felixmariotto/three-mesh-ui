export default class InheritableProperty extends BaseProperty {
    output: (out: any) => void;

    update(element: any, out: any): void;
    propagate(element: any): void;
    /**
     * Output this property in a dictionnary
     * @override
     */

}
import BaseProperty from "./BaseProperty";
