export default class CSSCondition {

	/**
	 *
	 * @param {string} type
	 * @param {string|null} [value=null]
	 */
	constructor( type, value = null ) {

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._type = type;

		/**
		 *
		 * @type {string|null}
		 * @private
		 */
		this._value = value;

	}

	/**
	 *
	 * @returns {string}
	 */
	get type() { return this._type; }

	/**
	 *
	 * @returns {string}
	 */
	get value() { return this._value; }


}
