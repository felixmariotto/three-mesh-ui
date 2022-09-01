export default class MSDFTypographicFont extends TypographicFont {
    /**
     *
     * @param {import('./MSDFFontVariant').MSDFJson} json
     */
    constructor(json: import('./MSDFFontVariant').MSDFJson);


    /**
     *
     * @returns {number}
     */
    get textureWidth(): number;
    /**
     *
     * @returns {number}
     */
    get textureHeight(): number;
}
import TypographicFont from "../TypographicFont";
