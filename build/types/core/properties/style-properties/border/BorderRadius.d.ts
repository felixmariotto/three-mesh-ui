export default class BorderRadius extends StyleVector4Property {
    /**
     *
     * @param {Vector4} defaultValue
     */
    constructor(defaultValue: Vector4);
    /**
     *
     * @type {Vector4}
     * @private
     */

    /**
     *
     * @type {boolean}
     * @private
     */

    /**
     *
     * @type {Vector2}
     * @private
     */

    /**
     *
     * @type {Vector2}
     * @private
     */

    /**
     *
     * @type {Vector2}
     * @private
     */

    /**
     *
     * @type {Vector2}
     * @private
     */

    /**
     *
     * @type {Array.<BorderRadiusMediator>}
     * @private
     */


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
     * @param {boolean} v
     */
    set mediation(arg: boolean);
    /**
     *
     * @returns {boolean}
     */
    get mediation(): boolean;
    /**
     *
     * @override
     */
    override process(element: any): void;
    /**
     *
     * @override
     */
    override render(element: any): void;
    /**
     *
     * @param {Number} v
     */
    set topLeft(arg: number);
    /**
     *
     * @returns {number}
     */
    get topLeft(): number;
    /**
     *
     * @param {Number} v
     */
    set topRight(arg: number);
    /**
     *
     * @returns {number}
     */
    get topRight(): number;
    /**
     *
     * @param {Number} v
     */
    set bottomRight(arg: number);
    /**
     *
     * @returns {number}
     */
    get bottomRight(): number;
    /**
     *
     * @param {Number} v
     */
    set bottomLeft(arg: number);
    /**
     *
     * @returns {number}
     */
    get bottomLeft(): number;
}
import StyleVector4Property from "../StyleVector4Property";
import { Vector4 } from "three/src/math/Vector4";
