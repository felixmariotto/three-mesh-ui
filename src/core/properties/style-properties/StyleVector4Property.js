import { Vector4 } from 'three';
import SubStyleProperty from './SubStyleProperty';

export default class StyleVector4Property extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new Vector4(0,0,0,0);

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = null;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._value = new Vector4(0,0,0,0);

	}

	/**
	 * @override
	 * @return {Vector4}
	 */
	get value(){

		return this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

	}

	set inline( value ) {

		this._vector4ValueSetter( this._input, value );

		if( this._input.equals( this._value) ) return;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}


	/**
	 *
	 * @returns {number}
	 */
	get top() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get right() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottom() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}


	/**
	 *
	 * @returns {number}
	 */
	get left() { return this._input.w; }

	dispose(){

		this._computed = null;
		this._inline = null;
		this._input = null;
		this._output = null;

	}

	/**
	 *
	 * @param {Vector4} vector4
	 * @param {Vector4|Array.<Number>|Number|String} value
	 * @protected
	 */
	_vector4ValueSetter( vector4, value ) {

		if ( value instanceof Vector4 ) {

			vector4.copy( value );
			return;

		}

		if ( typeof value === 'string' || value instanceof String ) {

			value = value.split( ' ' );

		}

		if ( Array.isArray( value ) ) {

			value = value.map( v => parseFloat( v ) );

			switch ( value.length ) {

				case 1:
					vector4.setScalar( value[ 0 ] );
					return;

				case 2:
					vector4.x = vector4.z = value[ 0 ];
					vector4.y = vector4.w = value[ 1 ];
					return;

				case 3:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					return;

				case 4:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					vector4.w = value[ 3 ];
					return;

				default:
					console.error( 'StyleVector4Property::set() Four Dimension property had more than four values' );
					return;

			}

		}

		if ( !isNaN( value ) ) {

			vector4.setScalar( value );

		}

	}

}


