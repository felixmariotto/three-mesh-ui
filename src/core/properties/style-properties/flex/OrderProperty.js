import SubStyleProperty from '../SubStyleProperty';

export default class OrderProperty extends SubStyleProperty {

	constructor( ) {

		super( 'order', 0, true );

		this._value = 0;

		this._input = 0;

		// configure
		this._allowsInherit = false;
	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		// require parent children (order) update, which will require layout update
		if( element._parent._value ) {

			element._parent._value._children._needsProcess = true;

		}

	}

}


