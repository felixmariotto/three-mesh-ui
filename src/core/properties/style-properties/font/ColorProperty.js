import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Color } from 'three';
/* eslint-enable no-unused-vars */

export default class ColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'color', defaultValue, false );

		this._input = defaultValue;

		this.output = this._outputValue;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			this._value.set( this.getInheritedInput( element ) );

		} else {

			this._value.set( this._input);

		}

	}

}
