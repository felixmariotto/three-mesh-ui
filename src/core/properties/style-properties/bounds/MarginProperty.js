import StyleVector4Property from '../StyleVector4Property';
import { Vector4 } from 'three';
import Style4DimensionsProperty from '../Style4DimensionsProperty';

// export default class MarginProperty extends StyleVector4Property {
export default class MarginProperty extends Style4DimensionsProperty {

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
