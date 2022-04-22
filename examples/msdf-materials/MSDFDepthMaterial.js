import { MeshDepthMaterial, MeshStandardMaterial, RGBADepthPacking } from 'three';
import MSDFFontMaterialUtils from '../../src/font/msdf/utils/MSDFFontMaterialUtils';
import msdfAlphaglyphParsVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';
import msdfAlphaglyphVertexGlsl from '../../src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';

export default class MSDFDepthMaterial extends MeshDepthMaterial {

	/**
	 *
	 * @abstract
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {
		return MSDFFontMaterialUtils.fontMaterialProperties;
	}

	constructor( options = {} ) {

		options.depthPacking = RGBADepthPacking;
		// three-mesh-ui font material requires
		// some material options to be set as default
		// in order to work properly
		MSDFFontMaterialUtils.ensureMaterialOptions( options )

		super( options );

		// three-mesh-ui font material requires
		// some webgl preprocessor to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureDefines( this );

		// three-mesh-ui font material requires
		// some userData properties to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureUserData( this, options );

		// three-mesh-ui custom font material can be achieve
		// by modifying the shader before its compilation
		this.onBeforeCompile = shader => {

			// three-mesh-ui font material shader requires
			// uniforms to be bound with userData properties
			MSDFFontMaterialUtils.bindUniformsWithUserData(shader,this);

			// VERTEX SHADER
			// three-mesh-ui font material shader requires
			// shader chunks to be inject in vertex shader

			// vertex pars
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_pars_vertex>',
				'#include <uv_pars_vertex>\n' + msdfAlphaglyphParsVertexGlsl
			);

			// vertex chunks
			shader.vertexShader = shader.vertexShader.replace(
				'#include <uv_vertex>',
				'#include <uv_vertex>\n' + msdfAlphaglyphVertexGlsl
			)

			shader.vertexShader = shader.vertexShader.replace(
				'#include <project_vertex>',
				'#include <project_vertex>\n' + msdfOffsetglyphVertexGlsl
			)


			// FRAGMENT SHADER
			// three-mesh-ui font material shader requires
			// shader chunks to be inject in fragment shader

			//fragment pars
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <uv_pars_fragment>',
				'#include <uv_pars_fragment>\n' + msdfAlphaglyphParsFragmentGlsl
			)

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				'#include <alphamap_fragment>\n' + msdfAlphaglyphFragmentGlsl
			)
		}
	}
}
