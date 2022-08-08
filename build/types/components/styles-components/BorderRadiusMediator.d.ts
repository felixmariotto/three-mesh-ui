/**
 * Job: Contains two border radiuses values of the same side
 * 			If their sums is greater than 1 (uv units) mediation could occurs
 */
export default class BorderRadiusMediator {
    /**
     *
     * @param {Vector4} borderRadiuses
     * @param {Array.<string>} sideProperties
     */
    constructor(borderRadiuses: Vector4, sideProperties: Array<string>);
    /**
     *
     * @type {Vector4}
     * @private
     */
    private _borderRadiuses;
    /**
     *
     * @type {Array<string>}
     * @private
     */
    private _sideProperties;
    /**
     *
     * @type {BorderRadiusMediator|null}
     * @private
     */
    private _complementaryMediation;
    /**
     *
     * @type {number}
     * @private
     */
    private _value;
    /**
     * The sum of the border radius of that side
     * @returns {number}
     */
    get value(): number;
    /**
     * A complementary side mediation ie: For top, complementary is bottom
     * @param {BorderRadiusMediator} brm
     */
    set complementaryMediation(arg: BorderRadiusMediator);
    /**
     * Adds all side property to compute the value of that side
     */
    computeValue(): void;
    /**
     *
     * @param {boolean} [mediateOpposite=true]
     */
    mediate(mediateOpposite?: boolean): void;
    /**
     *
     */
    dispose(): void;
}
import { Vector4 } from "three/src/math/Vector4";
