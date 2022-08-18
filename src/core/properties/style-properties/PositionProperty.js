import SubStyleProperty from './SubStyleProperty';


export default class PositionProperty extends SubStyleProperty {

	constructor( ) {

		super( 'position', 'static', true );

		// configure
		this._allowsInherit = false;

		this._value = 'static';
		this._needsUpdate = false;

		this.computeOutputValue = this._computeFromInherited;

		this.isValidValue = _isValid;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );

		//console.log( "Position update")
		// require parent to compute children -> bounds -> etc...
		if( element._parent._value ) element._parent._value._children._needsProcess = true;
	}

}

const AVAILABLE_VALUES = ['static', 'absolute'];

function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) position value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
