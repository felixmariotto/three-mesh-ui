import StyleColorProperty from '../StyleColorProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class BackgroundColorPropertyInline extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._allowsInherit = false;

		this._input = 0x000000;


	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Changes multiple mesh visibility
		// element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			this._value.set(this.getInheritedInput( element ));

		} else {

			this._value.set( this._input );

		}

	}

}


