import SubStyleProperty from '../SubStyleProperty';

export default class StyleSideProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} defaultValue
	 */
	constructor( propertyId, defaultValue = null ) {

		super( propertyId, defaultValue, true );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'auto';

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._auto = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._relative = false;

	}

	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._auto = !this._input || this._input === 'auto';

		if( !this._auto ) {

			// string can be percentages
			// console.log( this._input, typeof this._input, this._input.endsWith('%'))
			if( (typeof this._input === 'string' || this._input instanceof String) && this._input.endsWith('%') ) {


				this._relative = true;
				this._value = 0;


				const floatValue = parseFloat( this._input.replace('%','').trim() );
				if ( !isNaN (floatValue) ) {

					this._value = floatValue / 100;

				}

			} else {

				this._relative = false;
				this._value = this._input;

			}

		}

		element._bounds._needsUpdate = true;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput ( element ) {

		if( this._input !== 'inherit' && !this._auto ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	getDefaultValue() {

		return 0;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}


