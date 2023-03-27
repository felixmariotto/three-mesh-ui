import Inline from '../core/elements/glyphs/Inline';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import TypographicGlyph from './TypographicGlyph';
/* eslint-enable no-unused-vars */

export default class InlineGlyph extends Inline {

	/**
	 *
	 * @param {TypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super();

		/** @protected */ this._typographic = characterDesc;

	}

	/**
	 *
	 * @returns {TypographicGlyph}
	 */
	get typographic(){

		return this._typographic;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	/**
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get width() { return this._typographic.width * this._fontFactor ; }

	/**
	 * @override
	 * @returns {number}
	 */
	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	/**
	 * @override
	 * @returns {number}
	 */
	get anchor() {

		// const lineHeight = this._typographic.font.lineHeight;
		// const lineBase = this._typographic.font.lineBase;
		//
		// return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

		return this.yoffset;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }


}
