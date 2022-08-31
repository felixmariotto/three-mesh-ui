import StyleVector4Property from '../StyleVector4Property';
import { Vector4 } from 'three';

export default class PaddingProperty extends StyleVector4Property {

	constructor() {

		super('padding', new Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		element._bounds._needsUpdate = true;
		element._bounds._needsRender = true;
		element._layouter._needsProcess = true;
		element._renderer._needsRender = true;

		if( element._parent._value ){
			element._parent._value._layouter._needsProcess = true;
		}
	}

}
