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

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;

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
}
