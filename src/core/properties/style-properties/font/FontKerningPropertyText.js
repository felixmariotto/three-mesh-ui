import FontKerningProperty from './FontKerningProperty';


export default class FontKerningPropertyText extends FontKerningProperty {

	constructor() {

		super();

		this._value = this._input = this.getDefaultValue();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);


	}

}
