export default class MSDFGeometricGlyph extends PlaneBufferGeometry {
    /**
     *
     * @param {MSDFInlineGlyph} inline
     */
    constructor(inline: MSDFInlineGlyph, segments?: number);
    /**
     * Compute the right UVs that will map the MSDF texture so that the passed character
     * will appear centered in full size
     * @param {MSDFInlineGlyph} inline
     * @private
     */
    private _mapUVs;
    /**
     * Set all UVs to 0, so that none of the glyphs on the texture will appear
     * @private
     * */
    private _nullifyUVs;
    /**
     *
     * @TODO: Apply pivot properties when splitText isset
     * Gives the previously computed scale and offset to the geometry
     * @param {MSDFInlineGlyph} inline
     * @private
     */
    private _transformGeometry;
}
import { PlaneBufferGeometry } from "three/src/geometries/PlaneGeometry";
import MSDFInlineGlyph from "./MSDFInlineGlyph";
