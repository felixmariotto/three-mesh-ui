export default class FrameDepthMaterial extends MeshDepthMaterial {
    /**
     * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
     * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
     * @see {FrameMaterialUtils.mediation}
     * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
     */
    static get mediation(): any;
    constructor(options?: {});
    onBeforeCompile: (shader: any) => void;
}
import { MeshDepthMaterial } from "three/src/materials/MeshDepthMaterial";
