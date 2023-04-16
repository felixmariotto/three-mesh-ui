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

		// @TODO : I would like to remove this rules ( here )
		this.output = this._outputValue;

		this._notInheritedValue = null;
	}

	update( element , out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if( this._notInheritedValue === 'inherit' )
		{
			this._notInheritedValue = this.getInheritedInput( element );
		}
		// else
		// {
		// 	this.propagate( element );
		// }

		// @TODO: Evaluate. This might be too much
		this.propagate( element );

		this._outputValue( out );

	}

	propagate( element ) {

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			if( property !== undefined && property._value === 'inherit' ) {
				childUIElement[`_${this._id}`]._needsUpdate = true;
			}

		}
	}

	/**
	 * Output this property in a dictionnary
	 * @override
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
