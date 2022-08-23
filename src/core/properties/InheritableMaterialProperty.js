import InheritableProperty from './InheritableProperty';

/**
 * @property {Material|null|"inherit"} value
 */
export default class InheritableMaterialProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId) {

		super( propertyId, 'inherit', false );

	}

}
