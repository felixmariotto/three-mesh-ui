import SubStyleProperty from './SubStyleProperty';


export default class TextAlign extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'textAlign', defaultValue );

		this.isValidValue = _isValid;

	}

}

const AVAILABLE_VALUES = ['left', 'right', 'center', 'justify', 'justify-left', 'justify-right','justify-center'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) textAlign value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
