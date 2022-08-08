import SubStyleProperty from './SubStyleProperty';

export default class LineHeight extends SubStyleProperty {

	/**
	 *
	 * @param {number} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'lineHeight', defaultValue );

	}

	process( vrElement ) {
		console.log("todo");
	}

}


