import msdfAlphaglyphParsVertexGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl';
import msdfAlphaglyphVertexGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl';
import msdfOffsetglyphVertexGlsl from '../renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl';
import msdfAlphaglyphParsFragmentGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl';
import msdfAlphaglyphFragmentGlsl from '../renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl';
import { Vector2 } from 'three';

/* eslint-disable no-unused-vars */
import { Material, ShaderMaterial } from 'three';
/* eslint-enable no-unused-vars */

/**
 * MSDFFontMaterialUtils provides utilities
 * for customizing other threejs or custom materials
 * into a three-mesh-ui MSDFFontMaterial
 */
export default class MSDFFontMaterialUtils {

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

	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.glyphMap = { value: materialOptions.glyphMap };
		threeMaterial.userData.unitRange = { value: new Vector2() };
	}

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.glyphMap = threeMaterial.userData.glyphMap;
		shader.uniforms.unitRange = threeMaterial.userData.unitRange;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		MSDFFontMaterialUtils.injectVertexShaderChunks( shader );
		MSDFFontMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
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
	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
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



	/**
	 * Mix a threejs Material into a three-mesh-ui FontMaterial
	 * @param {typeof Material|ShaderMaterial} materialClass
	 * @returns {typeof Material|ShaderMaterial}
	 */
	static from( materialClass ) {

		return class extends materialClass {

			/**
			 *
			 * @abstract
			 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
			 */
			static get fontMaterialProperties() {
				return MSDFFontMaterialUtils.fontMaterialProperties;
			}

			constructor( options = {} ) {

				// same as FontMaterial extension
				MSDFFontMaterialUtils.ensureMaterialOptions( options );
				super( options );
				MSDFFontMaterialUtils.ensureDefines( this );
				MSDFFontMaterialUtils.ensureUserData( this, options );

				// defines two internal properties in order to kept
				// user allowed to use onBeforeCompile for its own stuff
				// 1- store an callback for user
				/* eslint-disable no-unused-vars */
				this._userDefinedOnBeforeCompile = (shader) => {};
				/* eslint-enable no-unused-vars */
				// 2- store the cumulative callback
				this._onBeforeCompile = this._cumulativeOnBeforeCompile;
			}

			////////////////////////////
			// OnBeforeCompile Override
			///////////////////////////

			/**
			 * Override the setter of onBeforeCompile in order to never overwrite
			 * the three-mesh-ui fontMaterial onBeforeCompile
			 * @param { (shader:any) => void }fct
			 */
			set onBeforeCompile( fct ) {
				// only store it as userDefinedCallback
				this._userDefinedOnBeforeCompile = fct;
			}

			/**
			 * Override the getter of onBeforeCompile in order to
			 * always deliver the cumulativeCallbacks to threejs
			 * @returns { (shader:any) => void }
			 */
			get onBeforeCompile() {
				return this._onBeforeCompile;
			}

			/**
			 *
			 * On before compile that first run three-mesh-ui fontMaterial
			 * then user defined onBeforeCompile
			 * @param shader
			 * @private
			 */
			_cumulativeOnBeforeCompile = ( shader ) => {
				// bind uniforms
				MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

				// inject both vertex and fragment shaders
				MSDFFontMaterialUtils.injectShaderChunks( shader );

				// user defined additional onBeforeCompile
				this._userDefinedOnBeforeCompile( shader );
			}
		}
	}

	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get fontMaterialProperties() {

		return _msdfMaterialProperties;

	}

}

/**
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _toWegblPreprocessorTransformer = function( fontMaterial, materialProperty, value){

	if ( value ) {

		fontMaterial.defines[materialProperty] = '';

	} else {

		delete fontMaterial.defines[materialProperty];

	}

	fontMaterial.needsUpdate = true;

}


/**
 *
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _RGSSTransformer = function( fontMaterial, materialProperty, value){

	if ( !value ) {

		fontMaterial.defines['NO_RGSS'] = '';

	} else {

		delete fontMaterial.defines['NO_RGSS'];

	}

	fontMaterial.needsUpdate = true;

}

/**
 * Convert a fontVariant to a material glyphMap texture
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _fontToGlyphMapTransformer = function( fontMaterial, materialProperty, value) {

	if( fontMaterial[materialProperty] !== undefined ) {

		fontMaterial.glyphMap = value.texture;
		fontMaterial.unitRange = value.unitRange;
		return;
	}

	if( fontMaterial.userData && fontMaterial.userData.glyphMap ) {

		fontMaterial.userData.glyphMap.value = value.texture;
		fontMaterial.userData.unitRange.value = value.unitRange;

	}

}

const USE_ALPHATEST = "USE_ALPHATEST";

/**
 *
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _alphaTestTransformer = function( fontMaterial, materialProperty, value) {


	fontMaterial.alphaTest = value;

	const expectedWebglPreProcessor = value === 0 ? '' : null;
	if( expectedWebglPreProcessor ) {

		if( fontMaterial.defines[USE_ALPHATEST] === undefined ) {

			fontMaterial.defines[USE_ALPHATEST] = ''
			fontMaterial.needsUpdate = true; // recompile with new preprocessor value

		}

	} else if( fontMaterial.defines[USE_ALPHATEST] !== undefined ) {

		delete fontMaterial.defines[USE_ALPHATEST];
		fontMaterial.needsUpdate = true; // recompile without existing preprocessor value

	}

}

/**
 * Convert a MeshUIComponent property to a materialUserData one
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
// const _toUserData = function( fontMaterial, materialProperty, value ) {
//
// 	if( fontMaterial[materialProperty] !== undefined ) {
//
// 		fontMaterial[materialProperty] = value;
// 		return;
// 	}
//
// 	if( fontMaterial.userData && fontMaterial.userData[materialProperty] ) {
//
// 		fontMaterial.userData[materialProperty].value = value;
//
// 	}
// }

/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _msdfMaterialProperties = {
	alphaTest: { m: 'alphaTest', t: _alphaTestTransformer },
	font: { m: "glyphMap", t: _fontToGlyphMapTransformer },
	fontColor: { m: 'color' },
	fontOpacity: { m: 'opacity' },
	fontSupersampling: { m: 'NO_RGSS', t: _RGSSTransformer },
	invertAlpha: { m: 'INVERT_ALPHA', t: _toWegblPreprocessorTransformer },
}
