import SubStyleProperty from './SubStyleProperty';


export default class BoxSizing extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'boxSizing', defaultValue );

		this.isValidValue = _isValid;
	}

}


const AVAILABLE_VALUES = ['border-box', 'content-box'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) boxSizing value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
