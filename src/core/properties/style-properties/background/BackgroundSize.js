import SubStyleProperty from '../SubStyleProperty';


/**
 * @property {"cover"|"contain"|"stretch"} value
 */
export default class BackgroundSize extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundSize', defaultValue, true );

		this.isValidValue = _isValid;

		this.output = this._outputValue;
	}

}

const AVAILABLE_VALUES = ['cover','contain','stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) backgroundSize value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
