import { FileLoader, LinearFilter, Texture, TextureLoader, Vector2 } from 'three';
import MSDFTypographicFont from './MSDFTypographicFont';
import MSDFTypographicGlyph from './MSDFTypographicGlyph';
import MSDFGeometricGlyph from './MSDFGeometricGlyph';
import MSDFFontMaterial from './materials/MSDFFontMaterial';
import FontVariant from '../FontVariant';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import InlineGlyph from './../InlineGlyph';
import FontLibrary from '../FontLibrary';
/* eslint-enable no-unused-vars */

/**
 * @extends {FontVariant}
 */
export default class MSDFFontVariant extends FontVariant {

	constructor( weight, style, json, texture ) {

		super(weight, style);

		// provide default values
		this._unitRange = new Vector2( 1, 1 );

		if ( json.pages ) {

			this._buildData( json );

		} else {

			_loadJson( this, json );

		}

		if ( texture instanceof Texture ) {

			this._texture = texture;
			this._buildTexture( texture );

		} else if( typeof(texture) === 'string' || texture instanceof String ){

			_loadTexture( this, texture );

		} else {

			throw new Error(`ThreeMeshUI::MSDFVariant provided 'texture' parameter is '${typeof texture}'. Only Texture and String allowed.`)

		}

		this._defaultMaterialClass = MSDFFontMaterial;


		this._checkReadiness();

	}


	get texture() {

		return this._texture;

	}

	get unitRange() {

		return this._unitRange;

	}

	/**
	 * @param {Function.<Material|ShaderMaterial>} v
	 * @override
	 */
	set fontMaterial( v ) {

		this._defaultMaterialClass = v;

	}

	/**
	 *
	 * @override
	 * @returns {Function.<Material|ShaderMaterial>}
	 */
	get fontMaterial() {

		return this._defaultMaterialClass;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildData( json ) {

		this._font = new MSDFTypographicFont( json );

		/**
		 *
		 * @type {import('../FontVariant').KerningPairs}
		 * @private
		 */
		this._kernings = this._buildKerningPairs( json );
		this._chars = this._buildCharacters( json );

		this._chars[ " " ] = this._buildCharacterWhite( json );
		this._chars[ "\n" ] = this._buildCharacterWhite( json, '\n' , 0.001, 1);
		this._chars[ "\t" ] = this._buildCharacterWhite( json, '\t' , 4, 1);

		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._distanceRange = json.distanceField.distanceRange;

		// precompute the unit range as recommended by chlumsky
		// @see https://github.com/Chlumsky/msdfgen
		// "I would suggest precomputing unitRange as a uniform variable instead of pxRange for better performance."
		this._unitRange = new Vector2(this._distanceRange, this._distanceRange)
			.divide( new Vector2( json.common.scaleW, json.common.scaleH ) );

	}

	/**
	 *
	 * @param texture
	 * @private
	 */
	_buildTexture( texture ) {

		texture.generateMipmaps = false;
		texture.minFilter = LinearFilter;
		texture.magFilter = LinearFilter;

		texture.needsUpdate = true;

	}

	/**
	 * @abstract
	 * @protected
	 * @param {string} missingChar
	 * @returns {string|null}
	 */
	_getFallbackCharacter( missingChar ) {
		return FontLibrary.missingCharacter( this, missingChar );
	}

	/**
	 *
	 * @override
	 * @param {import('./../InlineGlyph').default|import('./MSDFInlineGlyph').default} inline
	 * @param {import('./../../core/elements/MeshUIBaseElement').default} element
	 * @returns {MSDFGeometricGlyph}
	 */
	getGeometricGlyph( inline, element ) {

		return new MSDFGeometricGlyph( inline, element );

	}

	/**
	 * Abstraction implementation
	 *
	 * @returns {boolean}
	 * @private
	 */
	_readyCondition() {

		return this._chars && this._texture && this._texture.image;

	}

	/**
	 * Ensure that each font variant has its kerning dictionary
	 * @see src/font/msdf/FontVariantMSDF.js for an implementation
	 *
	 * @param {MSDFJson} json
	 * @returns {import('../FontVariant').KerningPairs}
	 * @private
	 */
	_buildKerningPairs( json ) {

		const friendlyKernings = {};

		// Loop through each kernings pairs defined in msdf json
		for ( let i = 0; i < json.kernings.length; i++ ) {

			const kerning = json.kernings[ i ];

			// ignore zero kerned glyph pair
			if ( kerning.amount === 0 ) continue;

			// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
			const glyphPair = String.fromCharCode( kerning.first, kerning.second );

			// This would then be available for fast access
			friendlyKernings[ glyphPair ] = kerning.amount;

		}

		// update the font to keep it
		return friendlyKernings;

	}


	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildCharacters( json ) {

		const friendlyChars = {};

		for ( let i = 0; i < json.chars.length; i++ ) {
			const charOBJ = json.chars[ i ];

			friendlyChars[ charOBJ.char ] = new MSDFTypographicGlyph( this._font, charOBJ );

		}

		return friendlyChars;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @param char
	 * @param scaleX
	 * @param scaleY
	 * @private
	 */
	_buildCharacterWhite( json, char = " ", scaleX = 1, scaleY = 1 ) {
		return new MSDFTypographicGlyph( this._font,
			{
				char,
				width: (json.info.size / 3)*scaleX,
				height: (json.info.size * 0.7)*scaleY,
			});
	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_alterElementProperties( element ) { /* eslint-enable no-unused-vars */ }
}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


/**
 * Load a msdf json then build fontVariant data
 *
 * @param {FontVariant} fontVariant
 * @param {string} jsonUrl
 * @private
 */
function _loadJson( fontVariant, jsonUrl ) {

	new FileLoader().setResponseType( 'json' ) .load( jsonUrl, ( response ) => {

		fontVariant._buildData( response );
		fontVariant._checkReadiness();

	} );

}

/**
 * Load a msdf texture then build texture
 *
 * @param {FontVariant} fontVariant
 * @param {string} textureUrl
 * @private
 */
function _loadTexture( fontVariant, textureUrl ) {

	fontVariant._texture = new TextureLoader().load( textureUrl, ( texture ) => {

		fontVariant._buildTexture( texture );
		fontVariant._checkReadiness();

	} );

}

/***********************************************************************************************************************
 * MSDF FILE FORMAT DESCRIPTION
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 **********************************************************************************************************************/

/**
 * @typedef {Object} MSDFJson
 *
 * @property {MSDFJsonInfo} info
 * @property {MSDFJsonCommon} common
 * @property {Array.<MSDFJsonPage>} pages
 * @property {Array.<MSDFJsonChar>} chars
 * @property {{fieldType:string, distanceRange:number}} distanceField
 * @property {Array.<MSDFJsonKerning>} kernings
 */

/**
 *
 * @typedef {Object} MSDFJsonInfo
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
 * @typedef {Object} MSDFJsonPage
 *
 * @property {string} id The page id.
 * @property {string} file The texture file name.
 */

/**
 *
 * @typedef {Object} MSDFJsonChar
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
 * @property {Object} [uv]
 * /



/**
 *
 * @typedef {Object} MSDFJsonKerning
 *
 * @property {number} first The first character id.
 * @property {number} second The second character id.
 * @property {number} amount How much the x position should be adjusted when drawing the second character immediately following the first.
 *
 */
