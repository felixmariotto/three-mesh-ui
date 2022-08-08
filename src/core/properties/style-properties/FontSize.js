import SubStyleProperty from './SubStyleProperty';
import * as Whitespace from '../../../utils/inline-layout/Whitespace';

export default class FontSize extends SubStyleProperty {

	/**
	 *
	 * @param {number} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'fontSize', defaultValue );

	}

	process( vrElement ) {

		const SCALE_MULT = this._output / this._font.typographic.size;

		// First character won't be kerned with its void lefthanded peer
		const inlines = vrElement._inlines._value;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < inlines.length; i++ ) {

			const inline = inlines[ i ];

			inline.resetOffsets();

			inline.fontSize = fontSize;
			inline.fontFactor = SCALE_MULT;

		}

	}

	/**
	 *
	 * @return {number}
	 */
	get output() { return this._output; }

}


