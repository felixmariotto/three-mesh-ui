import SubStyleProperty from '../SubStyleProperty';

export default class OrderProperty extends SubStyleProperty {

	constructor( ) {

		super( 'order', 0, true );

		// configure
		this._allowsInherit = false;
	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		this._needsProcess = true;

	}

	process( element ) {

		// require parent children (order) update, which will require layout update
		if( element._parent._value ) {

			// reorder children
			element._parent._value._children._needsProcess = true;

		}

	}

}


