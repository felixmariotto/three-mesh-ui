import SubStyleProperty from './SubStyleProperty';

export default class StyleFactorProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue );

		this.isValidValue = _isValid;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any> } out
	 */
	update( vrElement, out ) {

		console.log( this.id );

		// Inline has priority if set
		if( this._inline !== undefined && this._inline !== 'unset' ) {

			console.log(" - from inline", this._inline );

			// do not require an update if the value remains
			if( this._inline === this._input ) return;
			this._input = this._inline;

		}
		// or fallback on computed
		else if( this._computed ) {

			console.log(" - from computed", this._computed );

			// do not require an update if the value remains
			if( this._computed === this._input ) return;
			this._input = this._computed;

		}
		// or fallback on default value
		else {

			console.log(" - from default", this._value );

			// // do not require an update if the value remains
			if( this._value === this._input ) return;
			this._input = this._value;

		}

		this.buildOutput( vrElement, out );

	}

	buildOutput( vrElement, out ) {

		// input transformation
		this._output = this._input;

		// output
		out[this.id] = this._output;

	}

}

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if ( value < 0 && value > 1.0 ) {

		console.warn( `(.style) styleFactorProperty('${this.id}') value '${value}' is not valid)` );
		return false;

	}

	return true;

}


