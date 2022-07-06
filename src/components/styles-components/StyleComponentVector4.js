import { Vector4 } from 'three';

export default class StyleComponentVector4 {

	constructor( defaultValue ) {

		this._input = new Vector4().copy( defaultValue );

	}

	/**
	 *
	 * @param {Vector4|Array.<Number>|Number|String} v
	 */
	set input( v ) {
		_vector4ValueSetter( this._input, v );
	}

	/**
	 *
	 * @returns {Vector4}
	 */
	get input() { return this._input; }

	/**
	 * @returns {Vector4}
	 */
	get output() { return this._input; }

	/**
	 *
	 * @param {Number} v
	 */
	set x( v ) {
		this._input.x = v;
	}

	/**
	 *
	 * @returns {number}
	 */
	get x() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set y( v ) {
		this._input.y = v;
	}

	/**
	 *
	 * @returns {number}
	 */
	get y() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set z( v ) {
		this._input.z = v;
	}

	/**
	 *
	 * @returns {number}
	 */
	get z() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set w( v ) {
		this._input.w = v;
	}

	/**
	 *
	 * @returns {number}
	 */
	get w() { return this._input.w; }

	dispose(){

		this._input = null;

	}

}

/**
 *
 * @param {Vector4} vector4
 * @param {Vector4|Array.<Number>|Number|String} value
 * @private
 */
function _vector4ValueSetter( vector4, value ) {

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
				console.error( 'StyleComponentVector4::set() Four Dimension property had more than four values' );
				return;

		}

	}

	if ( !isNaN( value ) ) {

		vector4.setScalar( value );

	}

}
