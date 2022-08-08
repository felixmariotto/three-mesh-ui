export default class BorderRadius {
    /**
     *
     * @param {Vector4} target
     */
    constructor(target: Vector4);
    /**
     *
     * @type {string}
     * @private
     */
    private _units;
    /**
     *
     * @type {Vector4}
     * @private
     */
    private _target;
    /**
     *
     * @type {boolean}
     * @private
     */
    private _mediation;
    /**
     * The mediated border radius values.
     * Maximum side sum is 1.
     * The units is UV ( ALWAYS )
     * @type {Vector4}
     * @private
     */
    private _borderRadiusMediated;
    /**
     *
     * @type {Vector2}
     * @private
     */
    private _cornerTL;
    /**
     *
     * @type {Vector2}
     * @private
     */
    private _cornerTR;
    /**
     *
     * @type {Vector2}
     * @private
     */
    private _cornerBR;
    /**
     *
     * @type {Vector2}
     * @private
     */
    private _cornerBL;
    /**
     *
     * @type {Array.<BorderRadiusMediator>}
     * @private
     */
    private _sideMediators;
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
     * @param {Number} sX
     * @param {Number} sY
     */
    process(sX: number, sY: number): void;
    /**
     *
     * @param target
     * @param sX
     * @param sY
     */
    updateValue(target: any, sX?: number, sY?: number): void;
    /**
     *
     */
    dispose(): void;
    /**
     *
     * @returns {Vector4}
     */
    get output(): Vector4;
}
import { Vector4 } from "three/src/math/Vector4";
