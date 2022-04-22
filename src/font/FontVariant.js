import { EventDispatcher } from 'three';
import FontLibrary from './FontLibrary';


/**
 * @abstract
 */
export default class FontVariant extends EventDispatcher {

	constructor( weight, style ) {

		super();

		this._isReady = false;

		this._weight = weight;
		this._style = style;

		this._size = 42;
		this._lineHeight = 42;
		this._lineBase = 42;

		/**
		 *
		 * @type {TypographyFont}
		 * @private
		 */
		this._font = null;

	}

	/**
	 *
	 * @returns {TypographyFont}
	 */
	get typographic() { return this._font; }

	get isReady() {

		return this._isReady;

	}

	get weight() {

		return this._weight;

	}

	get style() {

		return this._style;

	}

	get texture() {

		return this._texture;

	}

	/**
	 * @return {Class}
	 * @abstract
	 */
	get fontMaterial() {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	get id(){
		return `${this._name}(w:${this.weight},s:${this.style})`;
	}

	/**
	 *
	 * @param {string} character
	 * @returns {MSDFTypographyCharacter}
	 */
	getTypographyCharacter( character ) {

		let typographyCharacter = this._chars[ character ];
		if ( typographyCharacter ) return typographyCharacter;

		if ( character.match( /\s/ ) ) return this._chars[ " " ];

		const fallbackCharacter = FontLibrary.missingCharacter( this, character );
		if( fallbackCharacter ) {

			typographyCharacter = this._chars[ fallbackCharacter ];
			if ( typographyCharacter ) return typographyCharacter;

		}

		throw Error( `FontVariant('${this.id}')::getTypographyCharacter() - character('${character}') and/or fallback character were not found in provided msdf charset.` );
	}

	/* eslint-disable no-unused-vars */


	/**
	 * Convert an InlineCharacter to a geometry
	 *
	 * @abstract
	 * @param {InlineCharacter} inline
	 * @returns {THREE.BufferGeometry|Array.<THREE.BufferGeometry>}
	 */
	getGeometryCharacter( inline, segments = 1 ) {

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
	 * @param {Object} adjustmentObject
	 */
	adjustTypographyCharacters( adjustmentObject ){

		for ( const char in adjustmentObject ) {

			const desc = this.getTypographyCharacter( char );
			const characterAdjustment = adjustmentObject[ char ];
			for ( const propertyToAdjust in characterAdjustment ) {

				desc["_"+propertyToAdjust] = adjustmentObject[char][propertyToAdjust];

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
 * @param fontVariant
 * @private
 */
function _setReady( fontVariant ) {

	fontVariant._isReady = true;
	fontVariant.dispatchEvent( _readyEvent );

}

