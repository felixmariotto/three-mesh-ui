import SubStyleProperty from './SubStyleProperty';
import { Color } from 'three';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class StyleColorProperty extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue );

		/**
		 * @type {Color}
		 * @protected
		 */
		this._output = new Color( defaultValue );

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any>} out
	 */
	buildOutput( vrElement, out ) {

		console.log("buildOutput color", this.id);
		_setColor( this._input, this._output);

		console.log( "out", this._output );
		out[this.id] = this._output;

	}

	/**
	 *
	 * @return {Color}
	 */
	get output() {

		return this._output;

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function _setColor( value, output ) {

	console.log(value,output);
	if ( !( value instanceof Color ) ) {

		if ( output instanceof Color ) {

			output.set( value );

		} else {

			output = new Color( value );

		}

	} else {

		output = value;

	}
}


