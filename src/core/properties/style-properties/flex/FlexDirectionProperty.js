import SubStyleProperty from '../SubStyleProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class FlexDirectionProperty extends SubStyleProperty {

	constructor() {

		super( 'flexDirection', 'inherit', true );

		// configure

		this.isValid = _isValid;

	}

}

const AVAILABLE_VALUES = ['row','row-reverse', 'column', 'column-reverse'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) flexDirection value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
