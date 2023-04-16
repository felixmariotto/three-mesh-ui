import StyleVector4Property from '../StyleVector4Property';
import { Vector4 } from 'three';
import { DefaultValues } from '../../../../three-mesh-ui';

export default class PaddingProperty extends StyleVector4Property {

	constructor( defaultValue ) {

		super('padding', defaultValue )

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
