import TextAlignProperty from './TextAlignProperty';


export default class TextAlignPropertyInline extends TextAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		element._layouter._needsProcess = true;

	}

}
