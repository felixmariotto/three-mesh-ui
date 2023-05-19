/**
 * @extends {FontVariant}
 */
export default class MSDFFontVariant extends FontVariant {
    constructor(weight: any, style: any, json: any, texture: any);



    get unitRange(): Vector2;
    /**
     *
     * @param {MSDFJson} json
     * @private
     */

    /**
     *
     * @type {import('../FontVariant').KerningPairs}
     * @private
     */



    /**
     *
     * @param texture
     * @private
     */

    /**
     *
     * @override
     * @param {import('./../InlineGlyph').default|import('./MSDFInlineGlyph').default} inline
     * @param {import('./../../core/elements/MeshUIBaseElement').default} element
     * @returns {MSDFGeometricGlyph}
     */
    override getGeometricGlyph(inline: import('./../InlineGlyph').default | import('./MSDFInlineGlyph').default, element: import('./../../core/elements/MeshUIBaseElement').default): MSDFGeometricGlyph;
    /**
     * Ensure that each font variant has its kerning dictionary
     * @see src/font/msdf/FontVariantMSDF.js for an implementation
     *
     * @param {MSDFJson} json
     * @returns {import('../FontVariant').KerningPairs}
     * @private
     */

    /**
     *
     * @param {MSDFJson} json
     * @private
     */

    /**
     *
     * @param {MSDFJson} json
     * @param char
     * @param scaleX
     * @param scaleY
     * @private
     */

}
export type MSDFJson = {
    info: MSDFJsonInfo;
    common: MSDFJsonCommon;
    pages: Array<MSDFJsonPage>;
    chars: Array<MSDFJsonChar>;
    distanceField: {
        fieldType: string;
        distanceRange: number;
    };
    kernings: Array<MSDFJsonKerning>;
};
export type MSDFJsonInfo = {
    /**
     * This is the name of the true type font.
     */
    face: string;
    /**
     * The size of the true type font.
     */
    size: number;
    /**
     * The font is bold.
     */
    bold: boolean;
    /**
     * The font is italic.
     */
    italic: boolean;
    /**
     * The name of the OEM charset used (when not unicode).
     */
    charset: string[];
    /**
     * Set to 1 if it is the unicode charset.
     */
    unicode: boolean;
    /**
     * The font height stretch in percentage. 100% means no stretch.
     */
    stretchH: number;
    /**
     * Set to 1 if smoothing was turned on.
     */
    smooth: number;
    /**
     * The supersampling level used. 1 means no supersampling was used.
     */
    aa: number;
    /**
     * TThe padding for each character (up, right, down, left).
     */
    padding: Array<number>;
    /**
     * The spacing for each character (horizontal, vertical).
     */
    spacing: Array<number>;
    /**
     * (not found) The outline thickness for the characters.
     */
    outline: number;
};
export type MSDFJsonCommon = {
    /**
     * This is the distance in pixels between each line of text.
     */
    lineHeight: number;
    /**
     * The number of pixels from the absolute top of the line to the base of the characters.
     */
    base: number;
    /**
     * The width of the texture, normally used to scale the x pos of the character image.
     */
    scaleW: number;
    /**
     * The height of the texture, normally used to scale the y pos of the character image.
     */
    scaleH: number;
    /**
     * The number of texture pages included in the font.
     */
    pages: number;
    packed: boolean;
    alphaChnl: number;
    redChnl: number;
    greenChnl: number;
    blueChnl: number[];
};
export type MSDFJsonPage = {
    /**
     * The page id.
     */
    id: string;
    /**
     * The texture file name.
     */
    file: string;
};
export type MSDFJsonChar = {
    /**
     * The character id.
     */
    id: number;
    /**
     * The character index.
     */
    index: number;
    /**
     * The character.
     */
    char: string;
    /**
     * The left position of the character image in the texture.
     */
    x: number;
    /**
     * The top position of the character image in the texture.
     */
    y: number;
    /**
     * The width of the character image in the texture.
     */
    width: number;
    /**
     * The height of the character image in the texture.
     */
    height: number;
    /**
     * How much the current position should be offset when copying the image from the texture to the screen.
     */
    xoffset: number;
    /**
     * How much the current position should be offset when copying the image from the texture to the screen.
     */
    yoffset: number;
    /**
     * How much the current position should be advanced after drawing the character.
     */
    xadvance: number;
    /**
     * The texture page where the character image is found.
     */
    page: string;
    /**
     * The texture channel where the character image is found (1 = blue, 2 = green, 4 = red, 8 = alpha, 15 = all channels).
     */
    chnl: number;
    /**
     * /
     *
     *
     *
     * /**
     */
    uv?: any;
};
export type MSDFJsonKerning = {
    /**
     * The first character id.
     */
    first: number;
    /**
     * The second character id.
     */
    second: number;
    /**
     * How much the x position should be adjusted when drawing the second character immediately following the first.
     */
    amount: number;
};
import FontVariant from "../FontVariant";
import { Vector2 } from "three/src/math/Vector2";
import { Texture } from "three/src/textures/Texture";
import MSDFFontMaterial from "./materials/MSDFFontMaterial";
import MSDFGeometricGlyph from "./MSDFGeometricGlyph";
