export default class SegmentsPropertyText extends SegmentsProperty {
    _notInheritedValue: any;
    update(element: any, out: any): void;
    /**
     *
     * @param {number|"inherit"} v
     */
    set value(arg: number);
    /**
     *
     * @override
     * @return {number}
     */
    get value(): number;
}
import SegmentsProperty from "./SegmentsProperty";
