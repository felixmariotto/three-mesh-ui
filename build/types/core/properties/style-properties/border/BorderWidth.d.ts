export default class BorderWidth extends StyleVector4Property {
    /**
     *
     * @param defaultValue
     */
    constructor(defaultValue: any);

    output: (out: any) => void;

    /**
     *
     * @param {string} units
     */
    set units(arg: string);
    /**
     *
     * @returns {string}
     */
    get units(): string;

    /**
     *
     * @override
     */
    override process(element: any): void;
    /**
     * @override
     */
    override render(element: any): void;
}
import StyleVector4Property from "../StyleVector4Property";
