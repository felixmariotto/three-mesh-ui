import { FileLoader, LinearFilter, MeshBasicMaterial, Vector2 } from 'three';
import SVGTypographicFont from 'three-mesh-ui/examples/font/svg/MSDFTypographicFont';
import MSDFGeometricGlyph from 'three-mesh-ui/examples/font/svg/MSDFGeometricGlyph';
import MSDFTypographicGlyph from 'three-mesh-ui/examples/font/svg/MSDFTypographicGlyph';
import { FontVariant } from 'three-mesh-ui';
import SVGTypographicGlyph from './SVGTypographicGlyph';

export default class SVGFontVariant extends FontVariant {

	constructor( weight, style, svgFile ) {

		super(weight, style);

		if ( svgFile.tagName ) {

			this._buildData( svgFile );

		} else {

			_loadSvg( this, svgFile );

		}

		// Default material is standard three material
		this._defaultMaterialClass = MeshBasicMaterial;

		this._checkReadiness();

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
	 * @param {SVGElement} svgElement
	 * @private
	 */
	_buildData( svgElement ) {

		this._font = new SVGTypographicFont( svgElement );

		this._kernings = this._buildKerningPairs( svgElement );
		this._chars = this._buildCharacters( svgElement );
		this._chars[ " " ] = this._buildCharacterWhite( svgElement );

		this._size = this._font.size
		this._lineHeight = this._font.lineHeight;
		this._lineBase = this._font.lineBase;

	}

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 * @returns {MSDFGeometricGlyph}
	 */
	getGeometricGlyph( inline, segments = 1 ) {

		return new MSDFGeometricGlyph( inline, segments );

	}

	/**
	 * Abstraction implementation
	 *
	 * @returns {boolean}
	 * @private
	 */
	_readyCondition() {

		return this._chars;

	}

	/**
	 * Ensure that each font variant has its kerning dictionary
	 *
	 * @param {SVGElement} svgElement
	 * @returns {Object.<string, number>}
	 * @private
	 *
	 */
	_buildKerningPairs( svgElement ) {

		const friendlyKernings = {};

		// select all hkern markups with u1 & u2 attributes
		// @TODO : Handle other kernings : ligatures & glyphs : hkern[u1][g2],hkern[g1][u2], hkern[g1][g2]
		const availableKerning = svgElement.querySelectorAll('defs font hkern[u1][u2]');
		// Loop through each kernings pairs defined in msdf json
		for ( let i = 0; i < availableKerning.length; i++ ) {

			const kerning = availableKerning[ i ];

			// ignore zero kerned glyph pair
			if ( kerning.k === 0 ) continue;

			// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
			const glyphPair = String.fromCharCode( kerning.u1, kerning.u2 );

			// This would then be available for fast access
			friendlyKernings[ glyphPair ] = kerning.k;

		}

		// update the font to keep it
		return friendlyKernings;

	}


	/**
	 *
	 * @param {SVGElement} svgElement
	 * @private
	 */
	_buildCharacters( svgElement ) {

		const friendlyChars = {};
		const svgGlyphs = svgElement.querySelectorAll('defs font glyph[unicode]')

		for ( let i = 0; i < svgGlyphs.length; i++ ) {
			const charOBJ = svgGlyphs[ i ];

			friendlyChars[ charOBJ.unicode ] = new SVGTypographicGlyph( this._font, charOBJ );

		}

		return friendlyChars;

	}

	/**
	 *
	 * @private
	 */
	_buildCharacterWhite() {
		return new MSDFTypographicGlyph( this._font,
			{
				char: ' ',
				xadvance:  this._font.size / 3,
			});
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


/**
 * Load a msdf json then build fontVariant data
 *
 * @param {FontVariant} fontVariant
 * @param {string} svgUrl
 * @private
 */
function _loadSvg( fontVariant, svgUrl ) {

	new FileLoader().setResponseType( 'document' ) .load( svgUrl, ( response ) => {

		// check what response is
		var i = 2;

		fontVariant._buildData( response );
		fontVariant._checkReadiness();

	} );

}

