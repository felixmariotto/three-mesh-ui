import { Color, ShaderMaterial } from 'three';
import { vertexShader, fragmentShader } from "../renderers/ShaderLib/msdf-fontmaterial.glsl";

// JSDoc import
/* eslint-disable no-unused-vars */
import { Texture, Material } from 'three';
import MSDFFontMaterialUtils from '../utils/MSDFFontMaterialUtils';
/* eslint-enable no-unused-vars */

export const ALPHA_TEST = 0.02;
export const PX_RANGE = 4;




export default class MSDFFontMaterial extends ShaderMaterial {


	/**
	 *
	 * @abstract
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {
		return MSDFFontMaterialUtils.fontMaterialProperties;
	}

	constructor( materialOptions = {} ) {

		super( {

			// @TODO: Uniformize names
			uniforms: {
				'glyphMap': { value: null },
				'diffuse': { value: null },
				'opacity': { value: 0 },
				'u_pxRange': { value: 4.0 },
				'alphaTest':{ value: 0.02 },
			},
			transparent: true,
			clipping: true,
			vertexShader,
			fragmentShader,
			extensions: {
				derivatives: true
			},
		} );

		this.defines["NO_RGSS"] = '';
		this.defines["USE_ALPHATEST"] = "";

		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = materialOptions.noRGSS || false;
	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {*}
	 */
	get color() {
		return this.uniforms.diffuse.value;
	}

	set color( v ) {
		this.uniforms.diffuse.value = v;
	}

	/**
	 * Opacity stays opacity uniform
	 * @param v
	 */
	set opacity( v ) {
		if( this.uniforms )
			this.uniforms.opacity.value = v;
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

	get isCompatible() {
		return false;
	}

}
