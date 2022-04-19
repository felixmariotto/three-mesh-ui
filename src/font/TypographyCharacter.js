//JSDoc Related Imports
/* eslint-disable no-unused-vars */
import TypographyFont from "./TypographyFont";
import InlineCharacter from "./InlineCharacter";
/* eslint-enable no-unused-vars */

/**
 * @abstract
 */
export default class TypographyCharacter {

	/**
	 *
	 * @param {TypographyFont} typographicFont
	 */
	constructor( typographicFont ) {

		this._char = "";
		this._width = this._heigth = this._xadvance = 1;
		this._xoffset = this._yoffset = 0;

		/**
		 *
		 * @private
		 */
		this._font = typographicFont;
	}

	/**
	 *
	 * @returns {TypographyFont}
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

	get width() {

		return this._width;

	}

	get height() {

		return this._heigth;

	}

	get xadvance() {

		return this._xadvance;

	}

	get xoffset() {

		return this._xoffset;

	}

	get yoffset() {

		return this._yoffset;

	}

	set yoffset( value ) {

		this._yoffset = value;

	}

	/**
	 *
	 * @abstract
	 * @returns {InlineCharacter}
	 */
	asInlineCharacter() {

		throw new Error("Abstract... Need to be implemented")

	}

}
