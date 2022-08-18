import SubStyleProperty from '../SubStyleProperty';


export default class WhiteSpace extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'whiteSpace', defaultValue );

		this._whiteSpacedContent = "";

		this.isValidValue = _isValid;

	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._input;

		this._needsProcess = true;

	}

	process( element ) {

		// @TODO: Apply whitespace from strategy
		this._whiteSpacedContent = "" + element._textContent._value;

		element._glyphs._needsProcess = true;

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
