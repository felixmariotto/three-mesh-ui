import BaseProperty from './BaseProperty';
import Lines from '../elements/glyphs/Lines';
import Line from '../elements/glyphs/Line';

export default class TextLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {


		let INNER_WIDTH = element._width._value;

		if ( element._width._auto ) {

			INNER_WIDTH = Infinity;

		} else {

			INNER_WIDTH = element._bounds._innerWidth;

		}

		// Compute lines

		const INTERLINE = element._lineHeight._value;

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = new Lines( new Line() );

		let lastInlineOffset = 0;
		element._children._inlines.forEach( ( inlineElement ) => {

			// Abort condition

			if ( !inlineElement._inlines.value ) return;

			this._resetInlines( inlineElement );

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its dimensions
			//////////////////////////////////////////////////////////////

			// @TODO: Fontsize best fit
			const FONTSIZE = inlineElement._fontSize._value;

			const LETTERSPACING = inlineElement._letterSpacing._value * FONTSIZE;

			const WHITESPACE = inlineElement._whiteSpace._value;

			const BREAKON = inlineElement._lineBreak._value;

			const whiteSpaceOptions = {
				WHITESPACE,
				LETTERSPACING,
				BREAKON,
				INNER_WIDTH
			}

			const inlineWrapper = inlineElement._whiteSpace._inlineWrapper;

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

			inlineElement._inlines.value.forEach( ( inline, i, inlines ) => {

				const line = lines[lines.length - 1];

				// Line break
				const shouldBreak = inlineWrapper(inlines,i,lastInlineOffset, whiteSpaceOptions );

				if ( shouldBreak ) {

					lines.push( new Line( inline ) );

					inline.offsetX = inline.xoffset;

					// restart the lastInlineOffset as zero.
					if ( inline.width === 0 ) {
						lastInlineOffset = 0;
						return;
					}

					// compute lastInlineOffset normally
					// except for kerning which won't apply
					// as there is visually no lefthanded glyph to kern with
					inline.cumulativeWidth = inline.xadvance + LETTERSPACING;
					lastInlineOffset = inline.cumulativeWidth;
					return;

				}

				lines[ lines.length - 1 ].push( inline );
				inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

				inline.cumulativeWidth = inline.xadvance + inline.kerning + LETTERSPACING;
				lastInlineOffset += inline.cumulativeWidth;

				// in case of lineBreak mandatory
				if( line.length-1 === 1) {

					if ( line[ line.length - 2 ].width === 0 ) {

						// remove the offset of the character following the newline
						inline.offsetX -= inline.xoffset;
						lastInlineOffset -= inline.xoffset;

					}

				}

			} );

			lastInlineOffset += inlineElement._margin._value.y + inlineElement._padding._value.y;

		} );

		// Compute single line and combined lines dimensions
		const inlineCollapser = element._whiteSpace._inlineCollapser;


		let width = 0, height =0, lineOffsetY = 0;

		// calculates lines
		lines.forEach( ( line, i ) => {

			// starts by processing whitespace, it will return a collapsed left offset
			const whiteSpaceOffset = inlineCollapser( line );

			//
			let lineHeight = 0;
			let lineBase = 0;

			line.forEach( ( inline ) => {

				lineHeight = Math.max( lineHeight, inline.lineHeight );
				lineBase = Math.max( lineBase, inline.lineBase );

				inline.offsetX -= whiteSpaceOffset;

			});

			line.lineHeight = lineHeight;
			line.lineBase = lineBase;

			// const baseLineDelta = lineHeight - lineBase;

			if( i === 0 ){
				lineOffsetY = -(lineHeight*INTERLINE - lineHeight) * 0.5;
			} else {
				lineOffsetY -= lines[i-1].lineHeight*INTERLINE;
			}

			line.y = lineOffsetY;
			line.x = 0;

			// process yoffset
			line.forEach( ( inline ) => {

				inline.offsetY = lineOffsetY - inline.anchor;

				if( inline.lineHeight < line.lineHeight ){
					inline.offsetY -= line.lineBase- inline.lineBase;
				}

			});



			height += ( line.lineHeight * INTERLINE );
			// height += ( line.lineHeight);

			//
			line.width = 0;
			// if this line have inlines
			if ( line[ 0 ] ) {

				// compute its width: length from firstInline:LEFT to lastInline:RIGHT
				// only by the length of its extremities
				const lastInline = line[ line.length - 1 ];

				// Right + Left ( left is negative )
				line.width = ( lastInline.offsetX + lastInline.cumulativeWidth + lastInline.paddingRight + lastInline.marginRight ) + line[ 0 ].offsetX;

				width = Math.max( width, line.width);
			}

		} );

		lines.height = height;
		lines.width = width;

		this._value = lines;

		if( INNER_WIDTH === Infinity ) {

			element._bounds.setChildrenWidth( element, lines.width );

		}

		if( element._height._auto ) {

			element._bounds.setChildrenHeight( element, lines.height );

		}

		const parent = element._parent._value;
		if( parent ) {

			parent._autoSize._needsProcess = true;
			parent._flexDirection._needsProcess = true;

		}

		element._inlineJustificator._needsProcess = true;
		element._textAlign._needsProcess = true;

		element._overflow._needsUpdate = true;

	}

	/**
	 *
	 * @param inlineElement
	 * @protected
	 */
	_resetInlines ( inlineElement ) {

		// ensure no collapsed remains
		inlineElement._fontSize.process( inlineElement );

	}

}
