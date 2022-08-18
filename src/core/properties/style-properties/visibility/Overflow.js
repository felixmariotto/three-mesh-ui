import SubStyleProperty from '../SubStyleProperty';


export default class Overflow extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'overflow', defaultValue, true );

		this.isValidValue = _isValid;

	}

}

const AVAILABLE_VALUES = ['visible', 'hidden'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) overflow value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
