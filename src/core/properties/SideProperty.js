import BaseProperty from './BaseProperty';
import { BackSide, DoubleSide, FrontSide } from 'three';

export default class SideProperty extends BaseProperty{

	/**
	 *
	 * @param {number} [value=null]
	 */
	constructor( value = FrontSide ) {

		super( 'side', value);

		this.isValid = _isValid;

	}

	update( vrElement, out ) {

		out[this.id] = this._value;

	}


	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}

const AVAILABLE_VALUES = [ FrontSide, BackSide, DoubleSide ];

/**
 *
 * @param {number} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value) === -1 ){

		console.warn(`SideProperty value '${value}' is not valid. Abort`);
		return false;

	}

	return true;

}
