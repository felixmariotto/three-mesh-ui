import SubStyleProperty from './SubStyleProperty';


export default class FontWeight extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'fontWeight', defaultValue );

		this.isValidValue = _isValid;

	}

}


const AVAILABLE_VALUES = [100,200,300,400,500,600,700,800,900,'light','normal','bold','bolder'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontWeight value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
