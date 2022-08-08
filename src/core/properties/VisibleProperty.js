import BaseProperty from './BaseProperty';

export default class VisibleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( 'visible', value);

	}

	update( vrElement, out ) {

		if( vrElement._parent.value ) {

			vrElement._parent.value._children._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}
