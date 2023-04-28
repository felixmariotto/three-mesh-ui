import StyleColorProperty from '../StyleColorProperty';


export default class BackgroundColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._input = 'transparent';

		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */


		element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			// @TODO: Background should not be inheritable
			this._value.set(this.getInheritedInput( element ));

		} else if( !(this._input === 'transparent' || this._input === 'none') ) {
			this._value.set( this._input );
		}

	}

}


