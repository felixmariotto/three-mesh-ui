import { Vector4 } from 'three';
import SubStyleProperty from './SubStyleProperty';
import StyleVector4Property from './StyleVector4Property';

export default class Style4DimensionsProperty extends StyleVector4Property {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

	}

	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		console.log( this._value, this._input)
		this._vector4ValueSetterFinal( this._value, this._input, element );

	}

	set inline( value ) {

		this._input = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @param {Vector4} vector4
	 * @param {Vector4|Array.<Number>|Number|String} value
	 * @protected
	 */
	_vector4ValueSetterFinal( vector4, value, element ) {

		if ( value instanceof Vector4 ) {

			return vector4.copy( value );

		}

		if ( typeof value === 'string' || value instanceof String ) {

			value = value.split( ' ' );

		}

		if ( Array.isArray( value ) ) {

			switch ( value.length ) {

				case 1:
					return vector4.setScalar( this._parseValue( value[ 0 ], element ) );

				case 2:
					vector4.x = vector4.z = this._parseValue(value[ 0 ]);
					vector4.y = vector4.w = this._parseValue(value[ 1 ]);
					return vector4;

				case 3:
					vector4.x = this._parseValue(value[ 0 ]);
					vector4.y = this._parseValue(value[ 1 ]);
					vector4.z = this._parseValue(value[ 2 ]);
					return vector4;

				case 4:
					vector4.x = this._parseValue(value[ 0 ]);
					vector4.y = this._parseValue(value[ 1 ]);
					vector4.z = this._parseValue(value[ 2 ]);
					vector4.w = this._parseValue(value[ 3 ]);
					return vector4;

				default:
					console.error( 'StyleVector4Property::set() Four Dimension property had more than four values' );
					return;

			}

		}

		if ( !isNaN( value ) ) {

			vector4.setScalar( value );

		}

		return vector4;

	}


	_parseValue( v , element ){

		if( !isNaN(v) ) return parseFloat(v);

		if( v.endsWith('em') ) {

			return parseFloat( v.replace(/[^0-9.]+/,"") ) * element._fontSize._value;

		}

	}

}


