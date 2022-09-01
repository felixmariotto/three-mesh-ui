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

		this._updateRequired = true;



	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._inline = value;

		if( this._input === this._inline ) return;

		this._parseInput();

	}

	get inline() { return this._inline; }

	_parseInput() {

		let updateRequired = true;

		// Inline has priority if set
		if( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if( this._computed !== undefined ) {

			// do not require an update if the value remains
			if( this._computed === this._input ) updateRequired = false;
			this._input = this._computed;

		}
		// or fallback on default value
		else {

			updateRequired = this._input === 'inherit';

		}

		if( updateRequired ) {

			this._auto = !this._input || this._input === 'auto';


			if ( !this._auto ) {

				// string can be percentages
				// console.log( this._input, typeof this._input, this._input.endsWith('%'))
				if ( ( typeof this._input === 'string' || this._input instanceof String ) && this._input.endsWith( '%' ) ) {


					this._relative = true;
					this._value = 0;


					const floatValue = parseFloat( this._input.replace( '%', '' ).trim() );
					if ( !isNaN( floatValue ) ) {

						this._value = floatValue / 100;

					}

				} else {

					this._relative = false;
					this._value = this._input;

				}

			} else {


				this._relative = false;

			}

			this._needsUpdate = this._updateRequired = updateRequired;

		}

	}

	update( element, out ) {

		if( this._updateRequired ) {

			this._updateRequired = false;

			if( !this._allowsInherit ) {

				this._inheritedInput = this.getInheritedInput( element );

			}

			this.computeOutputValue( element );

			// rebuild same properties on children 'inheritance'
			for ( const childUIElement of element._children._uis ) {

				childUIElement[`_${this._id}`]._needsUpdate = true;

			}

			this.output( out );

			if( element._parent._value ) element._parent._value._layouter._needsProcess = true;

		}

	}

	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._bounds._needsUpdate = true;
		element._renderer._needsRender = true;
		// element._autoSize._needsProcess = true;

	}

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


