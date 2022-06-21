import { Vector2, Vector4 } from 'three';

//JSDoc related import
/* eslint-disable no-unused-vars */
import { Material, ShaderMaterial } from 'three';
import { ShaderChunkUI } from '../../renderers/shaders/ShaderChunkUI';
import { alphaTestTransformer, asPreprocessorValueTransformer, uniformOrUserDataTransformer } from '../../utils/mediator/transformers/MaterialTransformers';
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
		threeMaterial.userData.cornerTL = { value : new Vector2(0,0) };
		threeMaterial.userData.cornerTR = { value : new Vector2(0,0) };
		threeMaterial.userData.cornerBR = { value : new Vector2(0,0) };
		threeMaterial.userData.cornerBL = { value : new Vector2(0,0) };

		threeMaterial.userData.borderWidth = { value: new Vector4(0,0,0,0) };
		threeMaterial.userData.borderOpacity = { value: null };
		threeMaterial.userData.frameSize = { value: new Vector2( 1, 1 ) };
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
			'#include <uv_pars_vertex>\n' + ShaderChunkUI.frame_border_pars_vertex
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + ShaderChunkUI.frame_border_vertex
		)

	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_background_pars_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_border_pars_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_common_pars
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_fragment>',
			ShaderChunkUI.frame_background_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			ShaderChunkUI.frame_border_fragment+'\n#include <alphamap_fragment>'
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

const _borderRadiusTransformer = function( material, property, value ) {

	// console.log( value );
	const corners = _radiusToCorners(value);

	if( material.userData[property] ) {

		material.userData[property].value.copy( value );

		// convert border radius to corners
		material.userData.cornerTL.value.x = corners[0][0];
		material.userData.cornerTL.value.y = corners[0][1];

		material.userData.cornerTR.value.x = corners[1][0];
		material.userData.cornerTR.value.y = corners[1][1];

		material.userData.cornerBR.value.x = corners[2][0];
		material.userData.cornerBR.value.y = corners[2][1];

		material.userData.cornerBL.value.x = corners[3][0];
		material.userData.cornerBL.value.y = corners[3][1];


	}else{

		material.uniforms[property].value.copy( value );

		// console.log( material.uniforms.cornerTL.value );

		// convert border radius to corners
		material.uniforms.cornerTL.value.x = corners[0][0];
		material.uniforms.cornerTL.value.y = corners[0][1];

		material.uniforms.cornerTR.value.x = corners[1][0];
		material.uniforms.cornerTR.value.y = corners[1][1];

		material.uniforms.cornerBR.value.x = corners[2][0];
		material.uniforms.cornerBR.value.y = corners[2][1];

		material.uniforms.cornerBL.value.x = corners[3][0];
		material.uniforms.cornerBL.value.y = corners[3][1];

	}

}


/**
 * @TODO: Mediation doens't seem completed. Can be seen when all corners have 1.0
 * @param value
 * @returns {Array.<Array<Number>>}
 * @private
 */
const _radiusToCorners = function( value ) {

	const order = ['x', 'y', 'z', 'w'];
	order.sort( (axisA, axisB) => {
		if( value[axisA] > value[axisB] ) return -1;
		if( value[axisA] < value[axisB] ) return 1;
		return 0;
	})

	for ( let i = 0; i < order.length; i++ ) {
		const axis = order[ i ];

		if( axis === 'x' ) {

			if( value.x + value.y > 1.0 || value.x + value.w > 1.0 ) {

				// scale to bigggest value
				const halfRatio = ( Math.max( value.y, value.w ) / value.x ) / 2;
				value.y = halfRatio;
				value.w = halfRatio;

				value.x *= halfRatio;

			}

		}

		if( axis === 'y' ) {

			if( value.y + value.x > 1.0 || value.y + value.z > 1.0 ) {

				// scale to bigggest value
				const halfRatio = ( Math.max( value.x, value.z ) / value.y ) / 2;
				value.x = halfRatio;
				value.z = halfRatio;

				value.y *= halfRatio;

			}

		}

		if( axis === 'z' ) {

			if( value.z + value.y > 1.0 || value.z + value.w > 1.0 ) {

				// scale to bigggest value
				const halfRatio = ( Math.max( value.y, value.w ) / value.z ) / 2;
				value.y = halfRatio;
				value.w = halfRatio;

				value.z *= halfRatio;

			}

		}

		if( axis === 'w' ) {

			if( value.w + value.z > 1.0 || value.w + value.x > 1.0 ) {

				// scale to bigggest value
				const halfRatio = ( Math.max( value.z, value.x ) / value.z ) / 2;
				value.z = halfRatio;
				value.x = halfRatio;

				value.w *= halfRatio;

			}

		}

	}


	let topLeft = [ value.x, 1.0 - value.x ];
	let topRight = [ 1 - value.y, 1 - value.y ];
	let bottomRight = [ 1 - value.z , value.z ];
	let bottomLeft = [ value.w, value.w ];


	return [
		[ value.x, 1.0 - value.x ],
		[ 1 - value.y, 1 - value.y ],
		[ 1 - value.z , value.z ],
		[ value.w, value.w ]
	]

}

/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _mediationDefinitions = {
	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	backgroundTexture: { m: 'map' },
	backgroundColor: { m: 'color' },
	backgroundOpacity: { m:'opacity' },
	backgroundSize: { m: 'u_backgroundMapping', t: _backgroundSizeTransformer },
	_borderWidth: { m: 'borderWidth', t: uniformOrUserDataTransformer },
	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
	_borderRadius: { m: 'borderRadius', t: _borderRadiusTransformer },
	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
}

