import SubStyleProperty from './SubStyleProperty';

export default class StyleSideProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} defaultValue
	 */
	constructor( propertyId, defaultValue = null ) {

		super( propertyId, defaultValue );

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

		this._needsUpdate = true;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any> } out
	 */
	update( vrElement, out ) {


		// Inline has priority if set
		if( this._inline !== undefined && this._inline !== 'unset' ) {

			// do not require an update if the value remains
			if( this._inline === this._input ) return;
			this._input = this._inline;

		}
		// or fallback on computed
		else if( this._computed !== undefined ) {

			// do not require an update if the value remains
			if( this._computed === this._input ) return;
			this._input = this._computed;

		}
		// or fallback on default value
		else {

			// // do not require an update if the value remains
			if( this._value === this._input ) return;
			this._input = this._value;

		}

		this.buildOutput( vrElement, out );

	}

	buildOutput( vrElement, out ) {

		// bounds should be updated
		vrElement._bounds._needsProcess = true;

		return super.buildOutput(vrElement, out);

	}

	/**
	 *
	 * @return {number}
	 */
	get output() { return this._output; }

}


