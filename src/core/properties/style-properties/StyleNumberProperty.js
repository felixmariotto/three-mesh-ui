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
	 *
	 * @return {Number}
	 */
	get output() { return this._output; }

}



