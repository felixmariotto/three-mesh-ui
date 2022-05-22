/**

Job: Positioning inline elements according to their dimensions inside this component

Knows: This component dimensions, and its children dimensions

This module is used for Block composition (Object.assign). A Block is responsible
for the positioning of its inline elements. In order for it to know what is the
size of these inline components, parseParams must be called on its children first.

It's worth noting that a Text is not positioned as a whole, but letter per letter,
in order to create a line break when necessary. It's Text that merge the various letters
in its own updateLayout function.

 */
import * as Whitespace from '../../utils/inline-layout/Whitespace';
import * as TextAlign from '../../utils/inline-layout/TextAlign';
import * as InlineJustification from '../../utils/inline-layout/InlineJustification';
import Line from './Line';
import Lines from './Lines';
import MeshUIComponent from './MeshUIComponent';

export default class InlineManager extends MeshUIComponent{

		constructor(options) {

			super(options);

		}

		/** Compute children .inlines objects position, according to their pre-computed dimensions */
		computeInlinesPosition() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - this.getPaddingHorizontal();
			const INNER_HEIGHT = this.getHeight() - this.getPaddingVertical();

			// got by MeshUIComponent
			const JUSTIFICATION = this.getJustifyContent();
			const ALIGNMENT = this.getTextAlign();

			// Compute lines
			const lines = this.computeLines();

			/////////////////////////////////////////////////////////////////
			// Position lines according to justifyContent and contentAlign
			/////////////////////////////////////////////////////////////////

			// Vertical positioning
			InlineJustification.justifyInlines( this, lines, JUSTIFICATION, INNER_HEIGHT);

			// Horizontal positioning
			TextAlign.textAlign( this, lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}

		/**
		 * computes lines based on children's inlines array.
		 * @private
		 */
		computeLines() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - this.getPaddingHorizontal();
			// const INNER_WIDTH = this.getInnerWidth();
			const INTERLINE = this.getInterLine();

			// Will stock the characters of each line, so that we can
			// correct lines position before to merge
			const lines = new Lines( new Line() );

			let lastInlineOffset = 0;
			this.childrenInlines.forEach( ( inlineComponent ) => {

					// Abort condition

					if ( !inlineComponent.inlines ) return;

					//////////////////////////////////////////////////////////////
					// Compute offset of each children according to its dimensions
					//////////////////////////////////////////////////////////////

					const FONTSIZE = inlineComponent._fitFontSize || inlineComponent.getFontSize();
					const LETTERSPACING = inlineComponent.isText ? inlineComponent.getLetterSpacing() * FONTSIZE : 0;
					const WHITESPACE = inlineComponent.getWhiteSpace();
					const BREAKON = inlineComponent.getBreakOn();

					const whiteSpaceOptions = {
						WHITESPACE,
						LETTERSPACING,
						BREAKON,
						INNER_WIDTH
					}

					inlineComponent.inlines.forEach( ( inline, i, inlines ) => {

						const line = lines[lines.length - 1];
						// Line break
						const shouldBreak = Whitespace.shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

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
							lastInlineOffset = inline.xadvance + LETTERSPACING;
							return;

						}

						lines[ lines.length - 1 ].push( inline );
						inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

						lastInlineOffset += inline.xadvance + inline.kerning + LETTERSPACING;

						// in case of lineBreak mandatory
						if( line.length-1 === 1) {

							if ( line[ line.length - 2 ].width === 0 ) {

								// remove the offset of the character following the newline
								inline.offsetX -= inline.xoffset;
								lastInlineOffset -= inline.xoffset;

							}
						}

					} );

			} );

			// Compute single line and combined lines dimensions
			const WHITESPACE = this.getWhiteSpace();

			let width = 0;
			let lineOffsetY = 0;
			lines[0].y = 0;

			lines.forEach( ( line, i ) => {

				// starts by processing whitespace, it will return a collapsed left offset
				const whiteSpaceOffset = Whitespace.collapseWhitespaceOnInlines( line, WHITESPACE );

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

				const baseLineDelta = lineHeight - lineBase;

				// process yoffset
				line.forEach( ( inline ) => {

					inline.offsetY = lineOffsetY - line.lineHeight + baseLineDelta + lines[ 0 ].lineHeight;

				});

				if( i !== 0 ){

					// get the previousLine y and increase
					line.y =  lines[i-1].y - line.lineHeight - INTERLINE;

				}

				lineOffsetY = lineOffsetY - line.lineHeight - INTERLINE

				//

				line.width = 0;
				// if this line have inlines
				if ( line[ 0 ] ) {

					// compute its width: length from firstInline:LEFT to lastInline:RIGHT
					// only by the length of its extremities
					const lastInline = line[ line.length - 1 ];

					// Right + Left ( left is negative )
					line.width = (lastInline.offsetX + lastInline.width) + line[ 0 ].offsetX;

					width = Math.max( width, line.width);
				}

			} );

			lines.height = Math.abs(lineOffsetY + INTERLINE );
			lines.width = width;

			return lines;

		}


}
