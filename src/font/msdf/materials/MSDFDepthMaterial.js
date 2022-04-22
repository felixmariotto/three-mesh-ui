import { Color, MeshDepthMaterial, RGBADepthPacking, ShaderMaterial } from 'three';
import { vertexShader, fragmentShader } from "../renderers/ShaderLib/msdf-fontmaterial.glsl";

// JSDoc import
/* eslint-disable no-unused-vars */
import { Texture, Material } from 'three';
import MSDFFontMaterialUtils from '../utils/MSDFFontMaterialUtils';
import msdfAlphaglyphParsVertexGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfAlphaglyphVertexGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';
/* eslint-enable no-unused-vars */

export const ALPHA_TEST = 0.02;
export const PX_RANGE = 4;




export default class MSDFDepthMaterial extends MeshDepthMaterial {



	constructor( options = {} ) {

		options.depthPacking = RGBADepthPacking;
		// three-mesh-ui font material requires
		// some material options to be set as default
		// in order to work properly
		MSDFFontMaterialUtils.ensureMaterialOptions( options )
		delete options['transparent']

		super( options );

		// three-mesh-ui font material requires
		// some webgl preprocessor to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureDefines( this );

		// three-mesh-ui font material requires
		// some userData properties to be set
		// in order to work properly
		MSDFFontMaterialUtils.ensureUserData( this, options );


		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = options.noRGSS || false;

		// three-mesh-ui custom font material can be achieve
		// by modifying the shader before its compilation
		this.onBeforeCompile = shader => {

			console.log("BeforeCompile MSDF Depth", shader);

			// // three-mesh-ui font material shader requires
			// // uniforms to be bound with userData properties
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

			// shader.vertexShader = shader.vertexShader.replace(
			// 	'#include <project_vertex>',
			// 	'#include <project_vertex>\n' + msdfOffsetglyphVertexGlsl
			// )


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
