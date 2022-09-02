import StyleVector4Property from '../StyleVector4Property';
import { Vector4 } from 'three';

export default class MarginProperty extends StyleVector4Property {

	constructor() {

		super('margin', new Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		element._renderer._needsRender = true;

		if( element._parent._value ){
			element._parent._value._flexDirection._needsProcess = true;
		}
	}

}
