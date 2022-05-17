export default class MSDFDepthMaterial extends MeshDepthMaterial {
    /**
     * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
     * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
     * @see {MSDFFontMaterialUtils.fontMaterialProperties}
     * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
     */
    static get fontMaterialProperties(): any;
    constructor(options?: {});
    onBeforeCompile: (shader: any) => void;
}
import { MeshDepthMaterial } from "three/src/materials/MeshDepthMaterial";
