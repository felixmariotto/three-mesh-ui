import FlexDirectionProperty from './FlexDirectionProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class FlexDirectionPropertyText extends FlexDirectionProperty {

	constructor( ) {

		super();

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		element._flexDirection._needsProcess = true;
		element._layouter._needsProcess = true;
		element._textAlign._needsUpdate = true;

	}

}
