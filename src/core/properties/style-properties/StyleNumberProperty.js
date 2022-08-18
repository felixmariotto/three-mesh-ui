import SubStyleProperty from './SubStyleProperty';

export default class StyleNumberProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue );

	}

	/**
	 * @override
	 * @return {Number}
	 */
	get value() { return this._value; }

}



