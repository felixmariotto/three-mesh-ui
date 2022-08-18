import BaseProperty from './BaseProperty';
import { numberEquals } from '../../utils/NumberUtils';

export default class NumberProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} [value]
	 */
	constructor( propertyId, value ) {

		super( propertyId, value, true);

		this.output = this._outputValue;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( numberEquals(this._value, value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}



	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}
