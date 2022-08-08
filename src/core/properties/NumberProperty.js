import BaseProperty from './BaseProperty';

export default class NumberProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} [value]
	 */
	constructor( propertyId, value ) {

		super( propertyId, value);

	}

	/**
	 *
	 * @param vrElement
	 * @param {Object.<string,any>} out
	 * @return {number}
	 */
	update( vrElement, out ) {

		out[this.id] = this._value;

	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}
