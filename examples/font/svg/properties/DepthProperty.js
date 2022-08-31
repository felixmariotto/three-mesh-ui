import { InheritableProperty } from 'three-mesh-ui';

export default class DepthProperty extends InheritableProperty {

	constructor() {
		super( 'fontDepth', 'inherit', true );
	}

	update( element, out ) {
		super.update( element, out );

		if( element.isInline ) element._parent._value._renderer._needsRender = true;

	}

}
