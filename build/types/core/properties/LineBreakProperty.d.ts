export default class LineBreakProperty extends BaseProperty {
    constructor(defaultValue?: string);
    /**
     *
     * @type {"mandatory"|"possible"|null}
     * @private
     */

    update(element: any, out: any): void;
    process(element: any): void;
    /**
     * @override
     * @return {string}
     */
    override get value(): string;
}
import BaseProperty from "./BaseProperty";
