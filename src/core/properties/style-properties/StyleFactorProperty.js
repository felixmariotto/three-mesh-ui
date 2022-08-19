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

		this._input = this.getDefaultValue();

		this._value = this.getDefaultValue();

		this.output = this._outputValue;
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


