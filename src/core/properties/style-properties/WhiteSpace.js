import SubStyleProperty from './SubStyleProperty';


export default class WhiteSpace extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'whiteSpace', defaultValue );

		this._whiteSpacedContent = "";

		this.isValidValue = _isValid;

	}

	process( vrElement ) {

		// @TODO: Apply whitespace from strategy
		this._whiteSpacedContent = vrElement._textContent.value;

	}



}

const AVAILABLE_VALUES = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) whiteSpace value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
