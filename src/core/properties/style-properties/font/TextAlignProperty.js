import SubStyleProperty from '../SubStyleProperty';


export default class TextAlignProperty extends SubStyleProperty {

	constructor() {

		super( 'textAlign', 'inherit', true );

		this.isValidValue = _isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = ['left', 'right', 'center', 'justify', 'justify-left', 'justify-right','justify-center'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const _isValid = function ( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) textAlign value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
