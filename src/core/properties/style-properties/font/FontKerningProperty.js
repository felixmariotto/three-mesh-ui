import SubStyleProperty from '../SubStyleProperty';


export default class FontKerningProperty extends SubStyleProperty {

	constructor() {

		super( 'fontKerning', 'inherit' );

		this.isValidValue = _isValid;

	}

}


const AVAILABLE_VALUES = ['normal', 'none', 'inherit'];

function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontKerning value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
