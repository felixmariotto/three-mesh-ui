import SubStyleProperty from '../SubStyleProperty';

/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = ['start', 'center', 'end', 'stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const _isValid = function ( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) alignItems value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

export default class AlignItemsProperty extends SubStyleProperty {

	constructor() {

		super( 'alignItems', 'inherit', true );

		this.isValidValue = _isValid;

	}

}
