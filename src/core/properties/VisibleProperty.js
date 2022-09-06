import BaseProperty from './BaseProperty';

export default class VisibleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( 'visible', value, true );

		this._needsUpdate = false;

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		element.visible = this._value;

		if( element._parent._value ) {

			element._parent._value._children._needsUpdate = true;

		}

	}

	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}
