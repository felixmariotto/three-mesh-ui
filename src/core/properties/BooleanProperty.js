import BaseProperty from './BaseProperty';

export default class BooleanProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( propertyId, value, true );

		/**
		 * @override
		 * @type {boolean}
		 * @private
		 */
		this._value = value;

		this.output = this._outputValue;

	}

	/**
	 *
	 * @param {boolean} value
	 */
	set value( value ) {

		this._value = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}
