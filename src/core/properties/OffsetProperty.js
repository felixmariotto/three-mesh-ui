import BaseProperty from './BaseProperty';

export default class OffsetProperty extends BaseProperty {

	constructor( ) {

		super( 'offset', 0.01, false );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		// only process if element has ui parent
		if( element._parent._value !== null ) element.position.z = this._value;

	}


}
