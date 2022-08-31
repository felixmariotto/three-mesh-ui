import SubStyleProperty from './SubStyleProperty';

export default class StyleFactorProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, true );

		this.isValidValue = _isValid;

		this._allowsInherit = false;

		this._input = defaultValue;

		this._value = defaultValue;

		this.output = this._outputValue;

		this.computeOutputValue = this._computeFromInherited;

	}


	_outputValue( out ) {

		out[this._id] = this._inheritedInput;

	}



}

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if ( value < 0 && value > 1.0 ) {

		console.warn( `(.style) styleFactorProperty('${this.id}') value '${value}' is not valid)` );
		return false;

	}

	return true;

}


