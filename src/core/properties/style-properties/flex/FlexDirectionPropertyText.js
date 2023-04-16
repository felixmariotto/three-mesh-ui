import FlexDirectionProperty from './FlexDirectionProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class FlexDirectionPropertyText extends FlexDirectionProperty {

	constructor( ) {

		super();

		this._value = this._input = 'column';

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Evaluate the needs of this property. Could be empty
		this._value = this._inheritedInput;

	}

}
