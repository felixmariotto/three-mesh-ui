import SubStyleProperty from './SubStyleProperty';

export default class StyleEmptyProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId = 'untitled' ) {

		super( propertyId , undefined, false);

		this._needsUpdate = false;

	}

	/* eslint-disable no-unused-vars */ output( out ) {} /* eslint-enable no-unused-vars */
}



