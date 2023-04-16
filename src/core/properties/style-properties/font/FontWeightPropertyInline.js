import FontWeightProperty from './FontWeightProperty';

export default class FontWeightPropertyInline extends FontWeightProperty {

	constructor( def ) {

		super( def );

	}

	computeOutputValue( element ) {

		const input = this.getInheritedInput( element );

		const converted = LOOK_UP_TABLE[ input ];

		if ( converted ) {

			this._value = converted

		} else {

			this._value = input;

		}

		element._font._needsUpdate = true;

	}

}

// @TODO : Evaluate the need
const LOOK_UP_TABLE = {
	// 'light'		: '100',
	// 'normal'	: '400',
	// 'bold' 		: '700',
	// 'bolder' 	: '900'
}

