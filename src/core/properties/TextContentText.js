import BaseProperty from './BaseProperty';
import InlineElement from '../../elements/basic/InlineElement';

export default class TextContentText extends BaseProperty{

	constructor() {

		super( "textContent", null, false );

		this._needsUpdate = false;

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

	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		for ( let i = element.children.length - 1 ; i >= 0; i-- ) {
			const child = element.children[ i ];
			if( child.isUI ) {

				element.remove( child );
				child.clear();

			}

		}


		if( this._value ) element.add( new InlineElement({textContent:this._value}));

	}

}
