export default class SegmentsPropertyText extends SegmentsProperty {

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
