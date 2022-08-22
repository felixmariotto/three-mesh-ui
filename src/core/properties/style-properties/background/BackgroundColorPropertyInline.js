import { Color } from 'three';
import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class BackgroundColorPropertyInline extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._allowsInherit = false;

		this._input = 'transparent';


	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Changes multiple mesh visibility
		// element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

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


