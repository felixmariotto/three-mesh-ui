export default class FrameMaterial extends ShaderMaterial {
    /**
     * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
     * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
     * @see {FrameMaterialUtils.mediation}
     * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
     */
    static get mediation(): any;
    constructor();
    set map(arg: any);
    get map(): any;
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
}
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import { Color } from "three/src/math/Color";
