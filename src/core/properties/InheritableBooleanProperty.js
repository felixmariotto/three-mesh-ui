import InheritableProperty from './InheritableProperty';

/**
 * @property {boolean|"inherit"} value
 */
export default class InheritableBooleanProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId) {

		super( propertyId, 'inherit', true );

	}

}
