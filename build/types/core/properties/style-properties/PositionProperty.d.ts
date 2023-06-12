export default class PositionProperty extends SubStyleProperty {
    constructor();
    _value: string;
    computeOutputValue: (element: any) => void;
    isValidValue: typeof _isValid;
    _computeFromInherited(element: any): void;
}
import SubStyleProperty from "./SubStyleProperty";
declare function _isValid(value: any): boolean;
export {};
