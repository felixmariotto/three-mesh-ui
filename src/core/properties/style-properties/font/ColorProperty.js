import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Color } from 'three';
/* eslint-enable no-unused-vars */

export default class ColorProperty extends StyleColorProperty {

	constructor( ) {

		super( 'color', 'inherit', false );

		this.output = this._outputValue;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			_setColor( this.getInheritedInput( element ) , this._value );

		} else {

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


