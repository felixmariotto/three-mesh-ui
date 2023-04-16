import FontStyleProperty from './FontStyleProperty';


export default class FontStylePropertyInline extends FontStyleProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}

	_computeFromInherited( element ) {

		super._computeFromInherited(element);

		element._font._needsUpdate = true;

	}

}
