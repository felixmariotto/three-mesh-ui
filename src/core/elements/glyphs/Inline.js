/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
export default class Inline {

	constructor() {

		/** @protected */ this._offsetX = 0;
		/** @protected */ this._offsetY = 0;

		/** @protected */ this._lineBreak = null;

		/** @protected */ this._kerning = 0;

		/** @protected */ this._fontFactor = 1;
		/** @protected */ this._fontSize = 0;

		/** @protected */ this._cumulativeWidth = 0;

		/** @protected */ this._paddingLeft = 0;
		/** @protected */ this._paddingRight = 0;

		/** @protected */ this._marginLeft = 0;
		/** @protected */ this._marginRight = 0;

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;
		this._cumulativeWidth = 0;

	}

	/**
	 * The horizontal distance this inline fills
	 * @returns {number}
	 */
	get xadvance() { return 0 }

	/**
	 * The offset x of this inline in a line
	 * @returns {number}
	 */
	get xoffset() { return 0 }

	/**
	 * The offset y of this inline in a line
	 * @returns {number}
	 */
	get yoffset() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get width() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get height() { return 0 }

	/**
	 *
	 * @param {string|null} value
	 */
	set lineBreak( value ) {

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
	get anchor() { return 0 }

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
	get lineHeight() { return 0 }

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
	 * @return {number}
	 */
	get cumulativeWidth() { return this._cumulativeWidth; }

	/**
	 *
	 * @param {number} value
	 */
	set cumulativeWidth( value ) {

		this._cumulativeWidth = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginLeft() { return this._marginLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set marginLeft( value ) {

		this._marginLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight() { return this._marginRight; }

	/**
	 *
	 * @param {number} value
	 */
	set marginRight( value ) {

		this._marginRight = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft() { return this._paddingLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingLeft( value ) {

		this._paddingLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight() { return this._paddingRight; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingRight( value ) {

		this._paddingRight = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return 0 }

	/**
	 *
	 * @param {number} value
	 */
	set fontFactor( value ){

		this._fontFactor = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontFactor() { return this._fontFactor }
}
