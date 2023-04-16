import SubStyleProperty from '../SubStyleProperty';


export default class Display extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'display', defaultValue );

		// configure
		this._value = 'flex';
		this._allowsInherit = false;
		this._needsUpdate = false;


		this.isValidValue = _isValid;

	}

	computeOutputValue( element ) {

		element._visible._value = this._output !== 'none';

	}
}

const AVAILABLE_VALUES = ['none','flex'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) display value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
