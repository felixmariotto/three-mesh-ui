import SubStyleProperty from '../SubStyleProperty';


export default class FontWeightProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontWeight', 'inherit', true );

		this.isValid = _isValid;
	}

}

const AVAILABLE_VALUES = ['100','200','300','400','500','600','700','800','900','light','normal','bold','bolder'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value.toString() ) === -1 ) {

		console.warn( `(.style) fontWeight value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
