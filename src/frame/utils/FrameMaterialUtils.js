import { Vector2, Vector3, Vector4 } from 'three';

//JSDoc related import
/* eslint-disable no-unused-vars */
import { Material, ShaderMaterial } from 'three';
import { alphaTestTransformer, asPreprocessorValueTransformer, uniformOrUserDataTransformer } from '../../utils/mediator/transformers/MaterialTransformers';
import frameBorderParsVertexGlsl from '../renderers/ShaderChunk/frame-border.pars.vertex.glsl';
import frameBorderVertexGlsl from '../renderers/ShaderChunk/frame-border.vertex.glsl';
import frameBackgroundParsFragmentGlsl from '../renderers/ShaderChunk/frame-background.pars.fragment.glsl';
import frameBorderParsFragmentGlsl from '../renderers/ShaderChunk/frame-border.pars.fragment.glsl';
import frameCommonParsFragmentGlsl from '../renderers/ShaderChunk/frame-common.pars.fragment.glsl';
import frameBackgroundFragmentGlsl from '../renderers/ShaderChunk/frame-background.fragment.glsl';
import frameBorderFragmentGlsl from '../renderers/ShaderChunk/frame-border.fragment.glsl';
/* eslint-enable no-unused-vars */


export default class FrameMaterialUtils {



	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return _mediationDefinitions;

	}


	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.borderColor = { value: null };
		threeMaterial.userData.borderRadius = { value: new Vector4(0,0,0,0) };
		// Store corners based on borderRadiuses
		threeMaterial.userData.cornerTL = { value : new Vector2(0,1) };
		threeMaterial.userData.cornerTR = { value : new Vector2(1,1) };
		threeMaterial.userData.cornerBR = { value : new Vector2(1,0) };
		threeMaterial.userData.cornerBL = { value : new Vector2(0,0) };

		threeMaterial.userData.borderWidth = { value: new Vector4(0,0,0,0) };
		threeMaterial.userData.borderOpacity = { value: null };
		threeMaterial.userData.frameSize = { value: new Vector3( 1, 1, 1 ) };
		threeMaterial.userData.textureSize = { value: new Vector2( 1, 1 ) };

	}
	/* eslint-enable no-unused-vars */

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.borderColor = threeMaterial.userData.borderColor;
		// Border radiuses and corners
		shader.uniforms.borderRadius = threeMaterial.userData.borderRadius;
		shader.uniforms.cornerTL = threeMaterial.userData.cornerTL;
		shader.uniforms.cornerTR = threeMaterial.userData.cornerTR;
		shader.uniforms.cornerBR = threeMaterial.userData.cornerBR;
		shader.uniforms.cornerBL = threeMaterial.userData.cornerBL;

		shader.uniforms.borderWidth = threeMaterial.userData.borderWidth;
		shader.uniforms.borderOpacity = threeMaterial.userData.borderOpacity;
		shader.uniforms.frameSize = threeMaterial.userData.frameSize;
		shader.uniforms.textureSize = threeMaterial.userData.textureSize;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		FrameMaterialUtils.injectVertexShaderChunks( shader );
		FrameMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + frameBorderParsVertexGlsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + frameBorderVertexGlsl
		)

	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frameBackgroundParsFragmentGlsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frameBorderParsFragmentGlsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frameCommonParsFragmentGlsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_fragment>',
			frameBackgroundFragmentGlsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			frameBorderFragmentGlsl+'\n#include <alphamap_fragment>'
		)

	}

}

/**
 *
 * @param target
 * @param property
 * @param value
 * @private
 */
const _backgroundSizeTransformer = function( target, property, value ) {

	value = ['stretch','contain','cover'].indexOf(value);
	asPreprocessorValueTransformer(target, 'BACKGROUND_MAPPING', value);

}

// /**
//  *
//  * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
//  */
// const _mediationDefinitions = {
// 	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
// 	backgroundTexture: { m: 'map' },
// 	backgroundColor: { m: 'color' },
// 	backgroundOpacity: { m:'opacity' },
// 	backgroundSize: { m: 'u_backgroundMapping', t: _backgroundSizeTransformer },
// 	_borderWidthComponent: { m: 'borderWidth', t: _linkComponentOutput },
// 	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
// 	_borderRadiusComponent: { m: 'computedCorners', t: _linkCornersOutput },
// 	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
// 	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
// 	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
// }


/**
 * 7xx
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _mediationDefinitions = {
	clippingPlanes : {m: 'clippingPlanes'},
	backgroundAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	backgroundSide: { m: 'side' },
	// backgroundTexture: { m: 'map' },
	backgroundImage: { m: 'map'},
	backgroundColor: { m: 'color' },
	backgroundOpacity: { m:'opacity' },
	backgroundSize: { m: 'computedBackgroundSize', t: _backgroundSizeTransformer },
	borderWidth: { m: 'borderWidth', t: uniformOrUserDataTransformer },
	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
	cornerTL : { m: 'cornerTL', t: uniformOrUserDataTransformer },
	cornerTR : { m: 'cornerTR', t: uniformOrUserDataTransformer },
	cornerBR : { m: 'cornerBR', t: uniformOrUserDataTransformer },
	cornerBL : { m: 'cornerBL', t: uniformOrUserDataTransformer },
	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
}
