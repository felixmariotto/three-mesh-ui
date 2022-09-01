//JSDoc related imports
/* eslint-disable no-unused-vars */
import TypographicFont from './TypographicFont';
import InlineGlyph from './InlineGlyph';
/* eslint-enable no-unused-vars */

/**
 * @class
 * @abstract
 */
export default class TypographicGlyph {

	/**
	 *
	 * @param {TypographicFont} typographicFont
	 */
	constructor( typographicFont ) {

		/** @protected */ this._char = "";
		/** @protected */ this._width = 1;
		/** @protected */ this._heigth = 1;
		/** @protected */ this._xadvance = 1;
		/** @protected */ this._xoffset = 0;
		/** @protected */ this._yoffset = 0;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = typographicFont;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get font() {

		return this._font;

	}

	/**
	 *
	 * @return {string}
	 */
	get char() {

		return this._char;

	}

	/**
	 *
	 * @returns {number}
	 */
	get width() {

		return this._width;

	}

	/**
	 *
	 * @returns {number}
	 */
	get height() {

		return this._heigth;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() {

		return this._xadvance;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xoffset() {

		return this._xoffset;

	}

	/**
	 *
	 * @returns {number}
	 */
	get yoffset() {

		return this._yoffset;

	}

	/**
	 *
	 * @param value
	 */
	set yoffset( value ) {

		this._yoffset = value;

	}

	/**
	 *
	 * @abstract
	 * @param {string} otherChar
	 * @returns {TypographicGlyph}
	 */
	/* eslint-disable no-unused-vars */ clone( otherChar ) { /* eslint-enable no-unused-vars */

		throw new Error("Abstract... Need to be implemented");

	}

	/**
	 *
	 * @abstract
	 * @returns {InlineGlyph}
	 */
	asInlineGlyph() {

		throw new Error("Abstract... Need to be implemented")

	}

}
