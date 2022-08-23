import { BackSide, DoubleSide, FrontSide } from 'three';
import InheritableProperty from './InheritableProperty';

/**
 * @property {number|"inherit"} value
 */
export default class SideProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId ) {

		super( propertyId, 'inherit', true);

		this.isValid = _isValid;

	}

}

const AVAILABLE_VALUES = [ FrontSide, BackSide, DoubleSide ];

/**
 *
 * @param {any} value
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
