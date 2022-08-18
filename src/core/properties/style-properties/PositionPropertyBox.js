import PositionProperty from './PositionProperty';

export default class PositionPropertyBox extends PositionProperty {

	constructor( ) {

		super( 'position');

	}

	update( element, out ) {

		super.update( element, out );

		this._needsProcess = true;

	}

	process( element ) {

		// if( element._parent._value ) {
		//
		// 	element._parent._value._layouter._needsUpdate = true;
		//
		// }

	}

}
