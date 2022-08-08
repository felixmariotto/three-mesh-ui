import SubStyleProperty from './SubStyleProperty';

export default class LetterSpacing extends SubStyleProperty {

	/**
	 *
	 * @param {number} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'letterSpacing', defaultValue );

	}

	process( vrElement ) {

		//todo : rebuild geometry

	}

}


