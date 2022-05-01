import TypographicGlyph from '../TypographicGlyph';
import MSDFInlineGlyph from './MSDFInlineGlyph';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MSDFTypographicFont from './MSDFTypographicFont';
/* eslint-enable no-unused-vars */


export default class MSDFTypographicGlyph extends TypographicGlyph {

	/**
	 * @param {MSDFTypographicFont} fontDescription
	 * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
	 */
	constructor( fontDescription, characterData ) {

		super(fontDescription);

		this._char = characterData.char;
		this._width = characterData.width;
		this._heigth = characterData.height;

		this._xadvance = characterData.xadvance ? characterData.xadvance : this._width;
		this._xoffset = characterData.xoffset ? characterData.xoffset : 0;
		this._yoffset = characterData.yoffset ? characterData.yoffset : 0;

		// Msdf requires uvs
		this._uv = null;

		if( !isNaN( characterData.x ) ) {
			// transform absolute pixel values into uv values [0,1]
			this._uv = {
				left: characterData.x / fontDescription.textureWidth,
				right: ( characterData.x + characterData.width ) / fontDescription.textureWidth,
				top: 1 - ( ( characterData.y + characterData.height ) / fontDescription.textureHeight ),
				bottom: 1 - ( characterData.y / fontDescription.textureHeight )
			};
		}
	}


	/**
	 *
	 * @returns {{left: number, right: number, top: number, bottom: number}|null}
	 */
	get uv() {

		return this._uv;

	}

	/**
	 * @override
	 * @returns {MSDFInlineGlyph}
	 */
	asInlineGlyph() {

		return new MSDFInlineGlyph( this );

	}

}
