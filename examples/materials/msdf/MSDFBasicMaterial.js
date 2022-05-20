import { MSDFFontMaterialUtils } from 'three-mesh-ui';
import { MeshBasicMaterial } from 'three';

/**
 * Example of enabling MeshLambertMaterial to render ThreeMeshUI MSDF Texts
 */
export default class MSDFBasicMaterial extends MeshBasicMaterial{

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}


	constructor( options = {} ) {

		// be sure transparent and alphaTest are set
		MSDFFontMaterialUtils.ensureMaterialOptions( options );

		// build this material
		super( options );

		// ensure this material support webgl preprocessors
		MSDFFontMaterialUtils.ensureDefines( this );

		// ensure this material has the proper userData properties (api for uniforms)
		MSDFFontMaterialUtils.ensureUserData( this, options );

		// override the shaders
		this.onBeforeCompile = shader => {

			// links this material userDatas with its uniforms
			MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

			// inject ThreeMeshUI shaderChunks to provide msdf rendering
			MSDFFontMaterialUtils.injectShaderChunks( shader );

		}

	}

}
