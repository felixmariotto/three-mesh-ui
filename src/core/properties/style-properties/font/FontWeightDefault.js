import SubStyleProperty from '../SubStyleProperty';


export default class FontWeightDefault extends SubStyleProperty {

	constructor( ) {

		super( 'fontWeight', 'inherit', true );

		this.isValid = _isValid;
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if ( this._input !== 'inherit') {

			const converted = LOOK_UP_TABLE[ this._input ];

			if ( converted ) {

				this._value = converted

			} else {

				this._value = this._input;

			}

		}

	}

}

const LOOK_UP_TABLE = {
	'light':'100',
	'normal': '400',
	'bold' : '700',
	'bolder' : '900'
}

const AVAILABLE_VALUES = ['100','200','300','400','500','600','700','800','900','light','normal','bold','bolder'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value.toString() ) === -1 ) {

		console.warn( `(.style) fontWeight value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
