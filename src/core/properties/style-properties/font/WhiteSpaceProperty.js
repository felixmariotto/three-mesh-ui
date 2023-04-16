import SubStyleProperty from '../SubStyleProperty';


export default class WhiteSpaceProperty extends SubStyleProperty {

	constructor() {

		super( 'whiteSpace', 'inherit' );

		this.isValidValue = _isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) whiteSpace value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
