import InheritableProperty from './InheritableProperty';

export default class OffsetProperty extends InheritableProperty {

	constructor( ) {

		super( 'offset', 'inherit', false );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		super.update( element, out);

		// only process if element has ui parent
		if( element._parent._value !== null ) element.position.z = this._notInheritedValue;

	}


}
