import BaseProperty from './BaseProperty';

export default class BooleanProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( propertyId, value);

	}

	update( vrElement, out ) {

	}

	set value( v ) {

		if( this._value !== v ) {

			this._value = v;
			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}
