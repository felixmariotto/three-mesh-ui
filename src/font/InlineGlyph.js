//JSDoc related imports
/* eslint-disable no-unused-vars */
import TypographicGlyph from './TypographicGlyph';
/* eslint-enable no-unused-vars */

export default class InlineGlyph {

	/**
	 *
	 * @param {TypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		/** @protected */ this._typographic = characterDesc;

		/** @protected */ this._fontFactor = 1;
		/** @protected */ this._lineBreak = null;

		/** @protected */ this._fontSize = 0;
		/** @protected */ this._kerning = 0;

		/** @protected */ this._offsetX = 0;
		/** @protected */ this._offsetY = 0;

	}

	/**
	 *
	 * @returns {TypographicGlyph}
	 */
	get typographic(){

		return this._typographic;

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	/**
	 *
	 * @returns {number}
	 */
	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	/**
	 *
	 * @returns {number}
	 */
	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	/**
	 *
	 * @returns {number}
	 */
	get width() { return this._typographic.width * this._fontFactor ; }

	/**
	 *
	 * @returns {number}
	 */
	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	/**
	 *
	 * @param {string|null} value
	 */
	set lineBreak( value ){

		this._lineBreak = value;

	}

	/**
	 *
	 * @returns {string|null}
	 */
	get lineBreak() { return this._lineBreak; }

	/**
	 *
	 * @returns {number}
	 */
	get anchor() {

		const lineHeight = this._typographic.font.lineHeight;
		const lineBase = this._typographic.font.lineBase;

		return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

	}

	/**
	 *
	 * @returns {number}
	 */
	get kerning() { return this._kerning * this._fontFactor; }

	/**
	 *
	 * @param {number} value
	 */
	set kerning( value ) {

		this._kerning = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontSize() { return this._fontSize }

	/**
	 *
	 * @param {number} value
	 */
	set fontSize( value ) {

		this._fontSize = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	/**
	 *
	 * @returns {number}
	 */
	get offsetX() { return this._offsetX; }

	/**
	 *
	 * @param value
	 */
	set offsetX( value ){

		this._offsetX = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get offsetY() { return this._offsetY; }

	/**
	 *
	 * @param {number} value
	 */
	set offsetY( value ){

		this._offsetY = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }

	/**
	 *
	 * @param {number} value
	 */
	set fontFactor( value ){

		this._fontFactor = value;

	}

}
