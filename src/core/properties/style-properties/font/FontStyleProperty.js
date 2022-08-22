import SubStyleProperty from '../SubStyleProperty';


export default class FontStyleProperty extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'fontStyle', defaultValue, true );

		this.isValidValue = _isValid;

	}

}


const AVAILABLE_VALUES = ['normal', 'italic'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontStyle value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
