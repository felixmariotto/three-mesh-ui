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

		// Colors are too wide to perform validation checks each time
		// if( ! this.isValidValue( value ) ) return;

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

}


