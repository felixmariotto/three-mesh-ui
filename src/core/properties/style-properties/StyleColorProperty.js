import SubStyleProperty from './SubStyleProperty';
import { Color } from 'three';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class StyleColorProperty extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 * @type {Color}
		 * @protected
		 */
		this._value = new Color();

		this._needsUpdate = false;

		this.output = this._outputValue;
	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input !== 'inherit' ) {

			_setColor( this._input, this._value);

		}

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function _setColor( value, output ) {



	if ( !( value instanceof Color ) ) {

		if ( output instanceof Color ) {

			output.set( value );

		} else {

			output = new Color( value );

		}

	} else {

		output.set(value);

	}
}


