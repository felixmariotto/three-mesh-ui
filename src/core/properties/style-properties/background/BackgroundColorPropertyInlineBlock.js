import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class BackgroundColorPropertyInlineBlock extends StyleColorProperty {

	constructor() {

		super( 'backgroundColor', 'inherit', false );

		this._allowsInherit = false;

		this._input = 'inherit';

	}

	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			console.log( "get inherit")
			this._value.set(this.getInheritedInput( element ));

		} else {


			console.log( "from input", this._input)
			this._value.set( this._input );

		}

	}

	// background color of inlineBlock looks for parent color instead of backgroundColor
	getInheritedInput( element ) {

		console.log("inhearit")

		if ( this._input !== 'inherit' ) return this._input;

		return element._color._value;

	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		console.log( value, 'from inline')

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

}


