import { MeshStandardMaterial } from 'three';
import * as ThreeMeshUI from 'three-mesh-ui';

/**
 * This material try to demonstrate how to append a vertex shading effect
 * on-top of a three-mesh-ui Text component using MSDF font variant
 */
export default class MSDFVertexMaterialExample extends MeshStandardMaterial{

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return ThreeMeshUI.MSDFFontMaterialUtils.mediation;

	}

	constructor(options = {}) {

		// be sure transparent and alphaTest are set
		ThreeMeshUI.MSDFFontMaterialUtils.ensureMaterialOptions( options );

		// build this material
		super( options );

		// ensure this material support webgl preprocessors
		ThreeMeshUI.MSDFFontMaterialUtils.ensureDefines( this );

		// ensure this material has the proper userData properties (api for uniforms)
		ThreeMeshUI.MSDFFontMaterialUtils.ensureUserData( this, options );

		// add some custom uniforms not related to msdf
		this.userData.progress = {value: 0.0 };
		this.userData.offset = {value: 0.1 };

		// override the shaders
		this.onBeforeCompile = shader => {

			// links this material userDatas with its uniforms
			ThreeMeshUI.MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

			// also bind custom property
			shader.uniforms.progress = this.userData.progress;
			shader.uniforms.offset = this.userData.offset;

			shader.vertexShader = `
                uniform float progress;
                uniform float offset;
            `+ shader.vertexShader;

			// ThreeMeshUI msdf vertex pars
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_pars_vertex>',
				'#include <uv_pars_vertex>\n'+ ThreeMeshUI.ShaderChunkUI.msdfAlphaglyphParsVertexGlsl
			);

			// ThreeMeshUI msdf vertex chunks
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_vertex>',
				'#include <uv_vertex>\n'+ ThreeMeshUI.ShaderChunkUI.msdfAlphaglyphVertexGlsl
			)

			// Custom shader part before vertex projection
			shader.vertexShader = shader.vertexShader.replace(
				'#include <project_vertex>',
				ThreeMeshUI.ShaderChunkUI.msdfOffsetglyphVertexGlsl + `
// add a custom vertex shader chunks to modify vertex position
if( uv.y >= progress )
{
		transformed.z +=  (progress-uv.y) * offset;
}
#include <project_vertex>
`
			)

			// inject ThreeMeshUI shaderChunks to provide msdf rendering
			ThreeMeshUI.MSDFFontMaterialUtils.injectFragmentShaderChunks( shader );
		}
	}
}
