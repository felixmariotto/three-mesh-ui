import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class BorderColorPropertyInlineBlock extends StyleColorProperty {

	constructor() {

		super( 'borderColor', 'inherit', false );

		this._allowsInherit = false;

		this._input = 'inherit';

	}

	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			this._value.set(this.getInheritedInput( element ));

		} else {

			this._value.set( this._input );

		}

	}

	// background color of inlineBlock looks for parent color instead of backgroundColor
	getInheritedInput( element ) {

		if ( this._input !== 'inherit' ) return this._input;

		return element._color._value;

	}

}


