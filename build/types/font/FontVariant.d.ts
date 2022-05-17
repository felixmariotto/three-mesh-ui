/**
 * @abstract
 */
export default class FontVariant extends EventDispatcher<import("three").Event> {
    /**
     *
     * @param {string} weight
     * @param {string} style
     */
    constructor(weight: string, style: string);
    /** @private */ private _isReady;
    /** @protected */ protected _weight: string;
    /** @protected */ protected _style: string;
    /** @protected */ protected _size: number;
    /** @protected */ protected _lineHeight: number;
    /** @protected */ protected _lineBase: number;
    /**
     *
     * @type {TypographicFont}
     * @protected
     */
    protected _font: TypographicFont;
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
     * @returns {MSDFTypographicGlyph}
     */
    getTypographicGlyph(character: string): MSDFTypographicGlyph;
    /**
     * Convert an InlineCharacter to a geometry
     *
     * @abstract
     * @param {InlineGlyph} inline
     * @returns {BufferGeometry|Array.<BufferGeometry>}
     */
    getGeometricGlyph(inline: InlineGlyph, segments?: number): BufferGeometry | Array<BufferGeometry>;
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
    private _checkReadiness;
    /**
     *
     * @abstract
     * @returns {boolean}
     * @protected
     */
    protected _readyCondition(): boolean;
}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import TypographicFont from "./TypographicFont";
import { Texture } from "three/src/textures/Texture";
import MSDFTypographicGlyph from "./msdf/MSDFTypographicGlyph";
import InlineGlyph from "./InlineGlyph";
import { BufferGeometry } from "three/src/core/BufferGeometry";
