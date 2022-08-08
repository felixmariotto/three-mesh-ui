import BaseProperty from './BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import TypographicGlyph from '../../font/TypographicGlyph';
/* eslint-enable no-unused-vars */

export default class GlyphsProperty extends BaseProperty{

	constructor() {

		super( "glyphs" );

		/**
		 *
		 * @type {Array.<TypographicGlyph>}
		 * @private
		 */
		this._value = null;

		// value

		// 1. collapsed whiteSpace;
		// this._textContent = Whitespace.collapseWhitespaceOnString( this.content, this.getWhiteSpace() );

		// 2. glyphs
		// this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographicGlyph( char ) );

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

		this._value = vrElement.style._whiteSpace._whiteSpacedContent.split( '' ).map( ( char ) => vrElement._font.getTypographicGlyph( char ) );



	}

	/**
	 *
	 * @return {Array.<TypographicGlyph>}
	 */
	get value() { return this._value; }

}
