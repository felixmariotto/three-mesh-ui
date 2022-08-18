import FontWeightDefault from './FontWeightDefault';


export default class FontWeight extends FontWeightDefault {

	constructor() {

		super();

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		if ( this._input === 'inherit') {

			this._value = this.getInheritedInput( element );

		} else {

			super.computeOutputValue( element );

		}

	}

}


