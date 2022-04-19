import { EventDispatcher } from 'three';
import FontLibrary from './FontLibrary';
//JSDoc Related Imports
/* eslint-disable no-unused-vars */
import TypographyFont from './TypographyFont';
import MSDFTypographyCharacter from './msdf/MSDFTypographyCharacter';
import InlineCharacter from './InlineCharacter';
/* eslint-enable no-unused-vars */


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
	getGeometryCharacter( inline ) {

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
		// Must have chards and a texture
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

/**
 * @typedef {Object} MSDFJson
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {MSDFJsonInfo} info
 * @property {MSDFJsonCommon} common
 * @property {Array.<MSDFJsonPage>} pages
 * @property {Array.<MSDFJsonChar>} chars
 * @property {Array.<MSDFJsonKerning>} kernings
 */

/**
 *
 * @typedef {Object} MSDFJsonInfo
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {string} face This is the name of the true type font.
 * @property {number} size The size of the true type font.
 * @property {boolean} bold The font is bold.
 * @property {boolean} italic The font is italic.
 * @property {string[]} charset The name of the OEM charset used (when not unicode).
 * @property {boolean} unicode 	Set to 1 if it is the unicode charset.
 * @property {number} stretchH The font height stretch in percentage. 100% means no stretch.
 * @property {number} smooth Set to 1 if smoothing was turned on.
 * @property {number} aa The supersampling level used. 1 means no supersampling was used.
 * @property {Array.<number>} padding TThe padding for each character (up, right, down, left).
 * @property {Array.<number>} spacing The spacing for each character (horizontal, vertical).
 * @property {number} outline (not found) The outline thickness for the characters.
 */

/**
 *
 * @typedef {Object} MSDFJsonCommon
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {number} lineHeight This is the distance in pixels between each line of text.
 * @property {number} base The number of pixels from the absolute top of the line to the base of the characters.
 * @property {number} scaleW The width of the texture, normally used to scale the x pos of the character image.
 * @property {number} scaleH The height of the texture, normally used to scale the y pos of the character image.
 * @property {number} pages The number of texture pages included in the font.
 * @property {boolean} packed
 * @property {number} alphaChnl
 * @property {number} redChnl
 * @property {number} greenChnl
 * @property {number[]} blueChnl
 */

/**
 *
 * @typedef {Object} MSDFJsonPage
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {string} id The page id.
 * @property {string} file The texture file name.
 */

/**
 *
 * @typedef {Object} MSDFJsonChar
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {number} id The character id.
 * @property {number} index The character index.
 * @property {string} char The character.
 * @property {number} x The left position of the character image in the texture.
 * @property {number} y The top position of the character image in the texture.
 * @property {number} width The width of the character image in the texture.
 * @property {number} height The height of the character image in the texture.
 * @property {number} xoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} yoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} xadvance How much the current position should be advanced after drawing the character.
 * @property {string} page The texture page where the character image is found.
 * @property {number} chnl The texture channel where the character image is found (1 = blue, 2 = green, 4 = red, 8 = alpha, 15 = all channels).
 */



/**
 *
 * @typedef {Object} MSDFJsonKerning
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 *
 * @property {number} first The first character id.
 * @property {number} second The second character id.
 * @property {number} amount How much the x position should be adjusted when drawing the second character immediately following the first.
 *
 */
