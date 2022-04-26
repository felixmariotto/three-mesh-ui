export default class TypographicFont {

	constructor() {

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 38;
		/** @protected */ this._name = "-";
		/** @protected */ this._charset = "";

	}

	/**
	 *
	 * @returns {number}
	 */
	get size() { return this._size; }

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return this._lineHeight; }

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return this._lineBase; }

	/**
	 *
	 * @returns {string}
	 */
	get name() { return this._name; }

	/**
	 *
	 * @returns {string}
	 */
	get charset() { return this._charset; }

}
