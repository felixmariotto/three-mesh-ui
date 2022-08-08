import SubStyleProperty from './SubStyleProperty';


export default class Position extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'position', defaultValue );

		this.isValidValue = _isValid;

	}

}

const AVAILABLE_VALUES = ['static', 'absolute'];

function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) position value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
