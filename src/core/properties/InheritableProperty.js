import BaseProperty from './BaseProperty';

export default class InheritableProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		super( propertyId, value, primitive );

		this.output = this._outputValue;

	}

	update( element , out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if( this._notInheritedValue === 'inherit' )
		{
			this._notInheritedValue = this.getInheritedInput( element )
			console.log( "Not Herited ::", this._id , this._notInheritedValue );

		}

		this._outputValue( out );

	}


	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	_outputValue( out ) { 	/* eslint-enable no-unused-vars */

		out[this._id] = this._notInheritedValue;

	}

	set value ( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}
	}
	/**
	 *
	 * @override
	 * @return {any|"inherit"}
	 */
	get value() {

		if( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}
