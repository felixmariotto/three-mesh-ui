import SubStyleProperty from '../SubStyleProperty';

export default class JustifyContentProperty extends SubStyleProperty {

	constructor() {

		super( 'justifyContent', 'inherit', true );

		/**
		 *
		 * @override
		 */
		this.isValidValue = _isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = [ 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly' ];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if ( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) justifyContent value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

