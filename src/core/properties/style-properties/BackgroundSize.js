import SubStyleProperty from './SubStyleProperty';


export default class BackgroundSize extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundSize', defaultValue );

		this.isValidValue = _isValid;

	}

	update( vrElement, out ) {

		out[this.id] = this._output;

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

		console.warn( `(.style) display value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
