export default class FrameMaterialUtils {
    /**
     *
     * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
     */
    static get mediation(): any;
    /**
     * Alter a material options with required fontMaterial options and or default values
     * @param {Object.<string,any>} materialOptions
     */
    static ensureMaterialOptions(materialOptions: {
        [x: string]: any;
    }): void;
    /**
     * As three-mesh-ui FontMaterial relies on webgl preprocessors,
     * lets force the material to have a proper defines object
     * @param {Material|ShaderMaterial} threeMaterial
     */
    static ensureDefines(threeMaterial: Material | ShaderMaterial): void;
    /**
     *
     * @param {Material|ShaderMaterial} threeMaterial
     * @param {Object.<string,any>} materialOptions
     */
    static ensureUserData(threeMaterial: Material | ShaderMaterial, materialOptions: {
        [x: string]: any;
    }): void;
    /**
     *
     * @param {any} shader
     * @param {Material|ShaderMaterial} threeMaterial
     */
    static bindUniformsWithUserData(shader: any, threeMaterial: Material | ShaderMaterial): void;
    /**
     *
     * @param shader
     */
    static injectShaderChunks(shader: any): void;
    /**
     *
     * @param shader
     */
    static injectVertexShaderChunks(shader: any): void;
    /**
     *
     * @param shader
     */
    static injectFragmentShaderChunks(shader: any): void;
}
import { Material } from "three/src/materials/Material";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
