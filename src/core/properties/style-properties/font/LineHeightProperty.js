import SubStyleProperty from '../SubStyleProperty';

export default class LineHeightProperty extends SubStyleProperty {

	/**
	 *
	 */
	constructor() {

		super( 'lineHeight', 'inherit', true );

	}

	update( element, out ) {
		super.update( element, out );

		element._layouter._needsProcess = true;
	}

}


