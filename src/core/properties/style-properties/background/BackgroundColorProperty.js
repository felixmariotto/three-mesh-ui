import { Color } from 'three';
import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class BackgroundColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._backgroundMesh.visible = this._input !== 'none';

		_setColor( this._input, this._value);

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


