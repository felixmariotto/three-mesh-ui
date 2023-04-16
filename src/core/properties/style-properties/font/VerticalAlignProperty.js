import SubStyleProperty from '../SubStyleProperty';


export default class VerticalAlignProperty extends SubStyleProperty {

	constructor() {

		super( 'verticalAlign', 'inherit', true );

		this.isValidValue = _isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const AVAILABLE_VALUES = ['inherit', 'baseline', 'sub', 'super'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const _isValid = function ( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) verticalAlign value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
