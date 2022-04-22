import {MeshStandardMaterial} from "three";
import MSDFFontMaterialUtils from '../../src/font/msdf/utils/MSDFFontMaterialUtils';
import msdfAlphaglyphParsVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfAlphaglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';

export default class MSDFVertexMaterialExample extends MeshStandardMaterial{

	/**
	 *
	 * @abstract
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {
		return MSDFFontMaterialUtils.fontMaterialProperties;
	}

	constructor(options = {}) {

		// default options
		options.transparent = true;
		options.alphaTest = options.alphaTest || 0.02;


		super(options);

		MSDFFontMaterialUtils.ensureDefines(this);

		this.userData.progress = {value: 0.0 };
		this.userData.offset = {value: 0.1 };
		this.userData.glyphMap = {value: options.glyphMap};
		this.userData.u_pxRange = {value: options.u_pxRange || 4};

		this.onBeforeCompile = shader => {

			shader.uniforms.glyphMap = this.userData.glyphMap;
			shader.uniforms.u_pxRange = this.userData.u_pxRange;
			shader.uniforms.progress = this.userData.progress;
			shader.uniforms.offset = this.userData.offset;

			shader.vertexShader = `
                uniform float progress;
                uniform float offset;
            `+ shader.vertexShader;

			// vertex pars
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_pars_vertex>',
				'#include <uv_pars_vertex>\n'+ msdfAlphaglyphParsVertexGlsl
			);

			// vertex chunks
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_vertex>',
				'#include <uv_vertex>\n'+ msdfAlphaglyphVertexGlsl
			)

			shader.vertexShader = shader.vertexShader.replace(
				'#include <project_vertex>',
				msdfOffsetglyphVertexGlsl + `
if( uv.y >= progress )
{
		transformed.z +=  (progress-uv.y) * offset;
}
#include <project_vertex>
`

			)


			//fragment pars
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <uv_pars_fragment>',
				'#include <uv_pars_fragment>\n'+ msdfAlphaglyphParsFragmentGlsl
			)

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				'#include <alphamap_fragment>\n' + msdfAlphaglyphFragmentGlsl
			)
		}
	}
}
