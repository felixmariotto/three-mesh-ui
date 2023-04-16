
import LineHeightProperty from './LineHeightProperty';

export default class LineHeightPropertyInline extends LineHeightProperty {

	/**
	 *
	 */
	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}

}


