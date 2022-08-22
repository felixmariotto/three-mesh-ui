import WhiteSpaceProperty from './WhiteSpaceProperty';


export default class WhiteSpacePropertyInline extends WhiteSpaceProperty {

	constructor( ) {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

		this._whiteSpacedContent = "";

		this.isValidValue = _isValid;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_computeFromInherited( element ) { /* eslint-enable no-unused-vars */
		super._computeFromInherited( element );

		this._needsProcess = true;
	}


	process( element ) {

		// @TODO: Apply whitespace from strategy


		// Then for inline
		if( element.isInline ) {

			this._whiteSpacedContent = "" + element._textContent._value;
			element._glyphs._needsProcess = true;

		}
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
