export default class SegmentsPropertyText extends SegmentsProperty {

    update(element: any, out: any): void;
    /**
     *
     * @param {number|"inherit"} v
     */
    override set value(arg: number);
    /**
     *
     * @override
     * @return {number}
     */
    override get value(): number;
}
import SegmentsProperty from "./SegmentsProperty";
