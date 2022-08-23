import InheritableProperty from './InheritableProperty';

/**
 * Class definition
 * @property {boolean|"inherit"} value - propriety description
 *
 */
export default class InvertAlphaProperty extends InheritableProperty {

	constructor() {

		super( 'invertAlpha', 'inherit' );

	}

}
