
/**
 * This material implements the msdf rendering shader
 */
export default class MSDFFontMaterial extends ShaderMaterial {
    /**
     * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
     * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
     * @see {MSDFFontMaterialUtils.mediation}
     * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
     */
    static get mediation(): any;
    constructor(materialOptions?: {});
    noRGSS: any;
    /**
     *
     * @param {Color} v
     */
    set color(arg: Color);
    /**
     * The color will be the diffuse uniform
     * @returns {Color}
     */
    get color(): Color;
    /**
     *
     * @param {Vector2} v
     */
    set unitRange(arg: Vector2);
    /**
     * The color will be the diffuse uniform
     * @returns {Vector2}
     */
    get unitRange(): Vector2;
    /**
     *
     * @param {Texture} v
     */
    set glyphMap(arg: Texture);
    /**
     *
     * @returns {Texture}
     */
    get glyphMap(): Texture;
    /**
     * Is this a default fontMaterial instance
     * @returns {boolean}
     */
    get isDefault(): boolean;
}
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import { Color } from "three/src/math/Color";
import { Vector2 } from "three/src/math/Vector2";
import { Texture } from "three/src/textures/Texture";
