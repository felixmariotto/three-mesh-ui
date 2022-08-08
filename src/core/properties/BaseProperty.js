export default class BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = null ) {

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._id = propertyId;

		/**
		 *
		 * @type {any}
		 * @protected
		 */
		this._value = value;

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._needsUpdate = true;

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._needsProcess = false;

	}

	/**
	 *
	 * @param vrElement
	 * @param {Object.<string,any>} out
	 */
	update( vrElement , out ) {

		out[this.id] = this._value;

	}

	process( vrElement ) {

	}

	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValid( value ) {

		return true;

	}
	/**
	 *
	 * @return {*}
	 */
	get value() { return this._value; }

	/**
	 *
	 * @return {string}
	 */
	get id() { return this._id; }



}
