import { EventDispatcher } from 'three';
import FontLibrary from './FontLibrary';

// JSDoc related imports
/* eslint-disable no-unused-vars */
import TypographicFont from './TypographicFont';
import InlineGlyph from './InlineGlyph';
import MSDFTypographicGlyph from './msdf/MSDFTypographicGlyph';
import { BufferGeometry, Material, ShaderMaterial, Texture } from 'three';
/* eslint-enable no-unused-vars */


/**
 * @abstract
 */
export default class FontVariant extends EventDispatcher {

	constructor( weight, style ) {

		super();

		/** @private */ this._isReady = false;

		/** @protected */ this._weight = weight;
		/** @protected */ this._style = style;

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 42;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = null;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get typographic() { return this._font; }

	/**
	 *
	 * @returns {boolean}
	 */
	get isReady() {

		return this._isReady;

	}

	/**
	 *
	 * @returns {string}
	 */
	get weight() {

		return this._weight;

	}

	/**
	 *
	 * @returns {string}
	 */
	get style() {

		return this._style;

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get texture() {

		return this._texture;

	}

	/**
	 * @param {Function.<ShaderMaterial|Material>} v
	 * @abstract
	 */
	set fontMaterial( v ) {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 * @return {Function.<ShaderMaterial|Material>}
	 * @abstract
	 */
	get fontMaterial() {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 *
	 * @returns {string}
	 */
	get id(){
		return `${this._name}(w:${this.weight},s:${this.style})`;
	}

	/**
	 *
	 * @param {string} character
	 * @returns {MSDFTypographicGlyph}
	 */
	getTypographicGlyph( character ) {

		let typographicGlyph = this._chars[ character ];
		if ( typographicGlyph ) return typographicGlyph;

		if ( character.match( /\s/ ) ) return this._chars[ " " ];

		const fallbackCharacter = FontLibrary.missingCharacter( this, character );
		if( fallbackCharacter ) {

			typographicGlyph = this._chars[ fallbackCharacter ];
			if ( typographicGlyph ) return typographicGlyph;

		}

		throw Error( `FontVariant('${this.id}')::getTypographicGlyph() - character('${character}') and/or fallback character were not found in provided msdf charset.` );
	}

	/* eslint-disable no-unused-vars */


	/**
	 * Convert an InlineCharacter to a geometry
	 *
	 * @abstract
	 * @param {InlineGlyph} inline
	 * @returns {BufferGeometry|Array.<BufferGeometry>}
	 */
	getGeometricGlyph( inline, segments = 1 ) {

		throw new Error(`FontVariant(${typeof this})::getGeometryCharacter() is abstract and should therefore be overridden.`);

	}

	/* eslint-enable no-unused-vars */


	/**
	 * Obtain the kerning amount of a glyphPair
	 * @param {string} glyphPair
	 * @returns {number}
	 */
	getKerningAmount( glyphPair ){

		//or zero offset if kerning glyphPais is not defined
		return this._kernings[ glyphPair ] ? this._kernings[ glyphPair ] : 0;

	}


	/**
	 * Perform some changes on the character description of this font
	 * @param {Object.<string,{property:string,value:any}>} adjustmentObject
	 */
	adjustTypographicGlyphs( adjustmentObject ){

		for ( const char in adjustmentObject ) {

			const typographicGlyph = this.getTypographicGlyph( char );
			const glyphAdjustment = adjustmentObject[ char ];
			for ( const propertyToAdjust in glyphAdjustment ) {

				typographicGlyph["_"+propertyToAdjust] = adjustmentObject[char][propertyToAdjust];

			}

		}

	}

	/**
	 *
	 * @private
	 */
	_checkReadiness() {

		if ( this._readyCondition() ) {

			_setReady( this );

		}

	}

	/**
	 *
	 * @abstract
	 * @returns {boolean}
	 * @protected
	 */
	_readyCondition () {

		// ie: MSDFFontVariant
		// Must have chars and a texture
		// return this._chars && this._texture

		throw new Error(`FontVariant(${typeof this})::_readyCondition() is abstract and should therefore be overridden.`);
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


const _readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontVariant} fontVariant
 * @private
 */
function _setReady( fontVariant ) {

	fontVariant._isReady = true;
	fontVariant.dispatchEvent( _readyEvent );

}

