import { Color } from 'three';
import StyleColorProperty from '../StyleColorProperty';


export default class BackgroundColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._input = 'transparent';

		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

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


