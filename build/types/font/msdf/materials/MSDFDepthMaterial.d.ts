export default class MSDFDepthMaterial extends MeshDepthMaterial {
    /**
     * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
     * It will provide a mediation for properties from ThreeMeshUI.Text to THREE.Material
     * @see {MSDFFontMaterialUtils.mediation}
     * @returns {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
     */
    static get mediation(): any;
    constructor(options?: {});
    onBeforeCompile: (shader: any) => void;
}
import { MeshDepthMaterial } from "three/src/materials/MeshDepthMaterial";
