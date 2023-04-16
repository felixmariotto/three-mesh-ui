import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class ColorPropertyInlineBlock extends StyleColorProperty {

	constructor() {

		super( 'color', 'inherit', false );

		this._input = 'inherit';

		this.output = this._outputValue;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			this._value.set( this.getInheritedInput( element ) );

		} else {

			this._value.set( this._input);

		}

		element._backgroundColor._needsUpdate = true;
		element._borderColor._needsUpdate = true;

	}

}
