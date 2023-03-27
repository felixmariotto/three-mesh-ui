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

			this._value.set(this._input);

		}

	}

	set inline( value ) {

		// Colors are too wide to performa validation checks each time
		// if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			if( value instanceof Color ) this._needsUpdate = true;
			return;

		}

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function _setColor( value, output ) {


}


