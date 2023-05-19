export default FontVariant;
export type KerningPairs = {
    [x: string]: number;
};
/**
 * @abstract
 */
declare class FontVariant extends EventDispatcher<import("three").Event> {
    /**
     *
     * @param {import('./../core/elements/MeshUIBaseElement').FontWeightFormat} weight
     * @param {"normal"|"italic"} style
     */
    constructor(weight: import('./../core/elements/MeshUIBaseElement').FontWeightFormat, style: "normal" | "italic");






    /**
     *
     * @type {TypographicFont}
     * @protected
     */

    /**
     *
     * @returns {TypographicFont}
     */
    get typographic(): TypographicFont;
    /**
     *
     * @returns {boolean}
     */
    get isReady(): boolean;
    /**
     *
     * @returns {string}
     */
    get weight(): string;
    /**
     *
     * @returns {string}
     */
    get style(): string;
    /**
     *
     * @returns {Texture}
     */
    get texture(): Texture;
    /**
     * @param {Function.<ShaderMaterial|Material>} v
     * @abstract
     */
    set fontMaterial(arg: Function);
    /**
     * @return {Function.<ShaderMaterial|Material>}
     * @abstract
     */
    get fontMaterial(): Function;
    /**
     *
     * @returns {string}
     */
    get id(): string;
    /**
     *
     * @param {string} character
     * @returns {TypographicGlyph}
     */
    getTypographicGlyph(character: string): TypographicGlyph;
    /**
     * @abstract
     * @protected
     * @param {string} missingChar
     * @returns {string|null}
     */

    /**
     * Convert an InlineCharacter to a geometry
     *
     * @abstract
     * @param {InlineGlyph} inline
     * @param {MeshUIBaseElement} element
     * @returns {BufferGeometry|Array.<BufferGeometry>}
     */
    getGeometricGlyph(inline: InlineGlyph, element: MeshUIBaseElement): BufferGeometry | Array<BufferGeometry>;
    /**
     * Obtain the kerning amount of a glyphPair
     * @param {string} glyphPair
     * @returns {number}
     */
    getKerningAmount(glyphPair: string): number;
    /**
     * Perform some changes on the character description of this font
     * @param {Object.<string,Object.<string,number|string>>} adjustmentObject
     */
    adjustTypographicGlyphs(adjustmentObject: {
        [x: string]: {
            [x: string]: number | string;
        };
    }): void;
    /**
     *
     * @private
     */

    /**
     * @abstract
     * @param element
     * @internal
     */

    /**
     *
     * @abstract
     * @returns {boolean}
     * @protected
     */

}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import TypographicFont from "./TypographicFont";
import { Texture } from "three/src/textures/Texture";
import TypographicGlyph from "./TypographicGlyph";
import InlineGlyph from "./InlineGlyph";
import MeshUIBaseElement from "./../core/elements/MeshUIBaseElement";
import { BufferGeometry } from "three/src/core/BufferGeometry";
