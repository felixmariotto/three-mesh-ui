import BooleanProperty from './BooleanProperty';

export default class InvertAlphaProperty extends BooleanProperty {

	constructor() {

		super( 'invertAlpha', false );

		// this._needsUpdate = false;

		this._notInheritedValue = this.getDefaultValue();

	}

	update( element , out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if( this._notInheritedValue === 'inherit' )
		{

			this._notInheritedValue = this.getInheritedInput( element )

		}

		out[this._id] = this._notInheritedValue;

	}


	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	_outputValue( out ) { 	/* eslint-enable no-unused-vars */

		out[this._id] = this._notInheritedValue;

	}

	/**
	 *
	 * @param {boolean|"inherit"} v
	 */
	set value ( v ){

		if( this._value === v ) return;

		this._value = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @override
	 * @return {boolean|"inherit"}
	 */
	get value() {

		if( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}
