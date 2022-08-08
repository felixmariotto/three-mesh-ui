import SubStyleProperty from './SubStyleProperty';
//JSDoc related imports
/* eslint-disable no-unused-vars */
import {Texture} from 'three';
/* eslint-enable no-unused-vars */


export default class BackgroundImage extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundImage', defaultValue );

		/**
		 *
		 * @type {Texture|null}
		 * @private
		 */
		this._output = null;

		this.isValidValue = _isValid;

	}



	buildOutput( vrElement, out ) {

		this._output = this._input;

		out[this.id] = this._output;

	}

}

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	// @TODO : Texture or URL() or String or ID ?
	console.log( "todo, validate image value", value);

	return true;

}
