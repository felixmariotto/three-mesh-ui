import { Vector4 } from 'three';
import SubStyleProperty from './SubStyleProperty';

export default class StyleVector4Property extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue );

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._computed = undefined;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._inline = undefined;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._input = null;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._output = new Vector4(0,0,0,0);

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any>} out
	 */
	buildOutput( vrElement, out ) {

		this._vector4ValueSetter( this._output, this._input );

	}


	/**
	 * @returns {Vector4}
	 */
	get output() { return this._output; }

	/**
	 *
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._inline.x === v ) return;

		this._inline.x = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {number}
	 */
	get top() { return this._inline.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._inline.y === v ) return;

		this._inline.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get right() { return this._inline.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._inline.z === v ) return;

		this._inline.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottom() { return this._inline.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._inline.w === v ) return;

		this._inline.w = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get left() { return this._inline.w; }

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

			console.log( "set scalar", value)
			vector4.setScalar( value );

		}

	}

}


