import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from '../../components/core/Inline';
/* eslint-enable no-unused-vars */

export default class InlinesProperty extends BaseProperty{

	constructor() {

		super( "inlines" );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @private
		 */
		this._value = null;

		// value

		// 3. Inlines
		// this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		// 4. kerning
		// this._buildContentKernings();


		// 5.? Apply margin and padding on first and last inlines
		// if( this._textContentInlines.length ) {
		//
		// 	// First gets left side
		// 	this._textContentInlines[0].paddingLeft = this._padding.w;
		// 	this._textContentInlines[0].marginLeft = this._margin.w;
		//
		// 	// Last gets right side
		// 	const lastIndex = this._textContentInlines.length - 1;
		// 	this._textContentInlines[lastIndex].paddingRight = this._padding.y;
		// 	this._textContentInlines[lastIndex].marginRight = this._margin.y;
		//
		// }

	}

	process( vrElement ) {

		this._value = vrElement._glyphs.value.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		if( this._value.length ) {

			// First gets left side
			this._value[0].paddingLeft = this._padding.w;
			this._value[0].marginLeft = this._margin.w;

			// Last gets right side
			const lastIndex = this._textContentInlines.length - 1;
			this._value[lastIndex].paddingRight = this._padding.y;
			this._value[lastIndex].marginRight = this._margin.y;

		}

		vrElement.style._fontKerning._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<InlineGlyph>}
	 */
	get value() { return this._value; }

}
