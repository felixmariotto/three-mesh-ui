import FontWeightProperty from './FontWeightProperty';

export default class FontWeightPropertyInline extends FontWeightProperty {

	constructor() {

		super();

	}

	computeOutputValue( element ) {

		const input = this.getInheritedInput( element );

		const converted = LOOK_UP_TABLE[ input ];

		if ( converted ) {

			this._value = converted

		} else {

			this._value = input;

		}

	}

}

const LOOK_UP_TABLE = {
	'light'		: '100',
	'normal'	: '400',
	'bold' 		: '700',
	'bolder' 	: '900'
}

