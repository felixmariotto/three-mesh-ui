import SubStyleProperty from '../SubStyleProperty';


export default class BoxSizing extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'boxSizing', defaultValue );

		// Configure
		this._allowsInherit = false;

		this.isValidValue = _isValid;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		element._bounds._needsUpdate = true;

	}

}


/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = ['border-box', 'content-box'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) boxSizing value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
