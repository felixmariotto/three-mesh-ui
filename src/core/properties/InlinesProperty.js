import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from '../elements/glyphs/Inline';
/* eslint-enable no-unused-vars */

export default class InlinesProperty extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

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

	process( element ) {

		this._value = element._glyphs._value.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		if( this._value.length ) {

			// First gets left side
			this._value[0].paddingLeft = element._padding._value.w;
			this._value[0].marginLeft = element._margin._value.w;

			// Last gets right side
			const lastIndex = this._value.length - 1;
			this._value[lastIndex].paddingRight = element._padding._value.y;
			this._value[lastIndex].marginRight = element._margin._value.y;

		}


		element._fontSize._needsProcess = true;
		element._lineBreak._needsProcess = true;
		element._fontKerning._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<Inline>}
	 */
	get value() { return this._value; }

}
