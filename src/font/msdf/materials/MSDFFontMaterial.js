import { ShaderMaterial, Vector2 } from 'three';
import MSDFFontMaterialUtils from '../utils/MSDFFontMaterialUtils';
import { vertexShader, fragmentShader } from '../renderers/ShaderLib/msdf-fontmaterial.glsl';

// JSDoc related import
/* eslint-disable no-unused-vars */
import { Material, Texture, Color } from 'three';
/* eslint-enable no-unused-vars */

export const ALPHA_TEST = 0.02;


/**
 * This material implements the msdf rendering shader
 */
export default class MSDFFontMaterial extends ShaderMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}

	constructor( materialOptions = {} ) {

		super( {

			uniforms: {
				'glyphMap': { value: null }, // texture
				'diffuse': { value: null }, // vec3
				'opacity': { value: 1 },
				'unitRange': { value: new Vector2(0,0) }, // vec2
				'alphaTest': { value: ALPHA_TEST },
			},
			transparent: true,
			clipping: true,
			vertexShader,
			fragmentShader,
			extensions: {
				derivatives: true
			},
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = materialOptions.noRGSS || false;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}




	/**
	 * The color will be the diffuse uniform
	 * @returns {Vector2}
	 */
	get unitRange() {

		return this.uniforms.unitRange.value;

	}

	/**
	 *
	 * @param {Vector2} v
	 */
	set unitRange( v ) {

		this.uniforms.unitRange.value.copy( v );

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get glyphMap() {

		return this.uniforms.glyphMap.value;

	}

	/**
	 *
	 * @param {Texture} v
	 */
	set glyphMap( v ) {

		this.uniforms.glyphMap.value = v;

	}

	/**
	 * Is this a default fontMaterial instance
	 * @returns {boolean}
	 */
	get isDefault() {

		return this.constructor === MSDFFontMaterial;

	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {
		return this.uniforms.alphaTest.value;
	}

	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

}
