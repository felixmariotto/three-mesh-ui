import LetterSpacingProperty from './LetterSpacingProperty';

export default class LetterSpacingPropertyInline extends LetterSpacingProperty {

	constructor() {

		super();

		// configure
		this._input = 'inherit';
		this._allowsInherit = false;

		this.computeOutputValue = this._computeFromInherited;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );


		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}


