import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import ElementVR from '../../elements/ElementVR';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
export default class SubStyleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue );

		/**
		 * @type {any}
		 * @private
		 */
		this._input = null;

		/**
		 * @type {any}
		 * @protected
		 */
		this._output = defaultValue;

		/**
		 *
		 * @type {any}
		 * @protected
		 */
		this._inline = undefined;

		/**
		 *
		 * @type {any}
		 * @protected
		 */
		this._computed = undefined;

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

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @param {Object.<string,any>} out
	 */
	buildOutput( vrElement, out ) {

		this._output = this._input;

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 */
	process( vrElement ) { }

	/**
	 *
	 * @return {any}
	 */
	get output() { return this._output; }


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
	 * @return {any}
	 */
	get inline() { return this._inline; }

	/**
	 *
	 * @param {any} value
	 */
	set computed( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( this._computed !== value ) {

			this._computed = value;

		}

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {any}
	 */
	get computed( ) { return this._computed; }

	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValidValue( value ) {

		return true;

	}

}
/* eslint-enable no-unused-vars */
