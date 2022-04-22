import { MeshNormalMaterial } from 'three';
import MSDFFontMaterialUtils from '../../src/font/msdf/utils/MSDFFontMaterialUtils';
import msdfAlphaglyphParsVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfAlphaglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';

export default class MSDFNormalMaterial extends MeshNormalMaterial{


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

		this.userData.glyphMap = {value: options.glyphMap};
		this.userData.u_pxRange = {value: options.u_pxRange || 4};

		this.onBeforeCompile = shader => {

			shader.uniforms.glyphMap = this.userData.glyphMap;
			shader.uniforms.u_pxRange = this.userData.u_pxRange;


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
				'#include <project_vertex>\n'+ msdfOffsetglyphVertexGlsl
			)


			//fragment pars
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <normalmap_pars_fragment>',
				`#include <normalmap_pars_fragment>
vec4 diffuseColor;
uniform float alphaTest;
${msdfAlphaglyphParsFragmentGlsl}`
			);

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <normal_fragment_maps>',
				`#include <normal_fragment_maps>
diffuseColor = vec4( packNormalToRGB( normal ), opacity );
${msdfAlphaglyphFragmentGlsl}`
			);

			shader.fragmentShader = shader.fragmentShader.replace(
				'gl_FragColor = vec4( packNormalToRGB( normal ), opacity );',
				`if( diffuseColor.a < alphaTest ) discard;
                gl_FragColor = diffuseColor;`
			)
		}
	}
}
