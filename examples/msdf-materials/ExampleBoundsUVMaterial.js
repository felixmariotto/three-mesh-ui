import { MeshBasicMaterial } from 'three';
import { MSDFFontMaterialUtils, ShaderChunk } from 'three-mesh-ui';
/**
 * This material is only intended to demonstrate BestFitBehavior within the whole glyph box
 */
export default class ExampleBoundsUVMaterial extends MeshBasicMaterial{

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.fontMaterialProperties}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {

		return MSDFFontMaterialUtils.fontMaterialProperties;

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

			// default vertex shader
			MSDFFontMaterialUtils.injectVertexShaderChunks( shader );

			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <uv_pars_fragment>',
				'#include <uv_pars_fragment>\n' + ShaderChunk.msdf_alphaglyph_pars_fragment
			)

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				ShaderChunk.msdf_alphaglyph_fragment + `
				if( diffuseColor.a <= 0.02 ) {
					diffuseColor.a = 0.25;
				}
				#include <alphamap_fragment>
`
			)

		}

	}

}
