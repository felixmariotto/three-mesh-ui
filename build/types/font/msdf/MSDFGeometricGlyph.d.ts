export default class MSDFGeometricGlyph extends PlaneBufferGeometry {
    /**
     *
     * @param {MSDFInlineGlyph} inline
     * @param {MeshUIBaseElement} element
     */
    constructor(inline: MSDFInlineGlyph, element: MeshUIBaseElement);
    /**
     * Compute the right UVs that will map the MSDF texture so that the passed character
     * will appear centered in full size
     * @param {MSDFInlineGlyph} inline
     * @private
     */

    /**
     * Set all UVs to 0, so that none of the glyphs on the texture will appear
     * @private
     * */

    /**
     *
     * @TODO: Apply pivot properties when splitText isset
     * Gives the previously computed scale and offset to the geometry
     * @param {MSDFInlineGlyph} inline
     * @private
     */

}
import { PlaneBufferGeometry } from "three/src/geometries/PlaneGeometry";
import MSDFInlineGlyph from "./MSDFInlineGlyph";
import MeshUIBaseElement from "./../../core/elements/MeshUIBaseElement";
