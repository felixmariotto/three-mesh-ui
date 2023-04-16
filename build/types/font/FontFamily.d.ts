export default class FontFamily extends EventDispatcher<import("three").Event> {
    /**
     *
     * @param {string} name
     */
    constructor(name: string);
    /**
     *
     * @type {string}
     * @private
     */

    /**
     *
     * @type {Array.<FontVariant>}
     * @private
     */

    /**
     *
     * @type {boolean}
     * @private
     */

    get isReady(): boolean;
    /**
     *
     * @param {string} weight
     * @param {string} style
     * @param {string|Object} json
     * @param {string|Texture} texture
     * @param {boolean} [override=false]
     */
    addVariant(weight: string, style: string, json: string | any, texture: string | Texture, override?: boolean): FontFamily;
    /**
     *
     * @param {FontVariant} variantImplementation
     * @param {boolean} [override=false]
     */
    addCustomImplementationVariant(variantImplementation: FontVariant, override?: boolean): FontFamily;
    /**
     *
     * @param {string} weight
     * @param {string} style
     * @returns {FontVariant|null}
     */
    getVariant(weight: string, style: string): FontVariant | null;
    /**
     *
     * @return {string}
     */
    get name(): string;

}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import { Texture } from "three/src/textures/Texture";
import FontVariant from "./FontVariant";
