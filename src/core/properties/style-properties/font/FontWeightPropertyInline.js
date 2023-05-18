import FontWeightProperty from './FontWeightProperty';
import { uniformizeFontWeight } from '../../../../font/utils/FontUtils';

export default class FontWeightPropertyInline extends FontWeightProperty {

	constructor() {

		super();

	}

	computeOutputValue( element ) {

		this._value = uniformizeFontWeight( this.getInheritedInput( element )	);

	}

}
