import BaseProperty from './BaseProperty';

export default class EmptyProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId = 'untitled' ) {

		super( propertyId, undefined, false );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element , out ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { /* eslint-enable no-unused-vars */ }

}
