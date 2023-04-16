import VerticalAlignProperty from './VerticalAlignProperty';


export default class VerticalAlignPropertyInline extends VerticalAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		this._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	process( element ) {

		if( !element._inlines.value ) return;

		element._inlines.value.forEach( inline => {
			inline.verticalAlign = this._value;
		});

	}

}
