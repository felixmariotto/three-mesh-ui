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

export default function InlineManager( Base ) {

	return class InlineManager extends Base {

		/** Compute children .inlines objects position, according to their pre-computed dimensions */
		computeInlinesPosition() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );
			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// got by MeshUIComponent
			const JUSTIFICATION = this.getJustifyContent();
			const ALIGNMENT = this.getTextAlign();

			const INTERLINE = this.getInterLine();

			// Compute lines
			const lines = this.computeLines();

			/////////////////////////////////////////////////////////////////
			// Position lines according to justifyContent and contentAlign
			/////////////////////////////////////////////////////////////////

			// individual vertical offset

			let textHeight = lines.reduce( ( offsetY, line, i, arr ) => {

				const charAlignement = line.lineHeight - line.lineBase;

				line.forEach( ( inline ) => {

					inline.offsetY = offsetY - line.lineHeight + charAlignement + arr[ 0 ].lineHeight;

				} );

				return offsetY - line.lineHeight - INTERLINE;

			}, 0 ) + INTERLINE;

			//

			textHeight = Math.abs( textHeight );

			// Line vertical positioning

			const justificationOffset = ( () => {
				switch ( JUSTIFICATION ) {

					case 'start':
						return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight;
					case 'end':
						return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 ) + ( lines[ lines.length - 1 ].lineHeight - lines[ lines.length - 1 ].lineHeight );
					case 'center':
						return ( textHeight / 2 ) - lines[ 0 ].lineHeight;
					default:
						console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

				}
			} )();

			// const justificationOffset = 0;

			//

			lines.forEach( ( line ) => {

				line.forEach( ( inline ) => {

					inline.offsetY += justificationOffset;

				} );

			} );

			// Horizontal positioning
			TextAlign.textAlign( lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}

		/**
		 * computes lines based on children's inlines array.
		 * @private
		 */
		computeLines() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );

			// Will stock the characters of each line, so that we can
			// correct lines position before to merge
			const lines = [ [] ];

			this.childrenInlines.reduce( ( lastInlineOffset, inlineComponent ) => {

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

					const currentInlineInfo = inlineComponent.inlines.reduce( ( lastInlineOffset, inline, i, inlines ) => {

						// Line break
						const shouldBreak = Whitespace.shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

						if ( shouldBreak ) {

							lines.push( [ inline ] );

							inline.offsetX = inline.xoffset;

							// restart the lastInlineOffset as zero.
							if ( inline.width === 0 ) return 0;

							// compute lastInlineOffset normally
							// except for kerning which won't apply
							// as there is visually no lefthanded glyph to kern with
							return inline.xadvance + LETTERSPACING;

						}

						lines[ lines.length - 1 ].push( inline );

						inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

						return lastInlineOffset + inline.xadvance + inline.kerning + LETTERSPACING;

					}, lastInlineOffset );

					//

					return currentInlineInfo;

				}, 0 );

			// Compute lines dimensions

			lines.forEach( ( line ) => {

				//

				line.lineHeight = line.reduce( ( height, inline ) => {

					const charHeight = inline.lineHeight !== undefined ? inline.lineHeight : inline.height;
					// const charHeight = inline.height;

					return Math.max( height, charHeight );

				}, 0 );

				//

				line.lineBase = line.reduce( ( lineBase, inline ) => {

					const newLineBase = inline.lineBase !== undefined ? inline.lineBase : inline.height;
					// const newLineBase = inline.height;

					return Math.max( lineBase, newLineBase );

				}, 0 );

				//

				line.width = 0;
				const lineHasInlines = line[ 0 ];

				if ( lineHasInlines ) {

					// starts by processing whitespace, it will return a collapsed left offset
					const WHITESPACE = this.getWhiteSpace();
					const whiteSpaceOffset = Whitespace.collapseWhitespaceOnInlines( line, WHITESPACE );

					// apply the collapsed left offset to ensure the starting offset is 0
					line.forEach( ( inline ) => {

						inline.offsetX -= whiteSpaceOffset;

					} );

					// compute its width: length from firstInline:LEFT to lastInline:RIGHT
					line.width = this.computeLineWidth( line );

				}

			} );

			return lines;
		}

		calculateHeight( fontMultiplier ) {

			this.childrenInlines.forEach( inlineComponent => {

				if ( inlineComponent.isInlineBlock ) return;

				// Set font size and recalculate dimensions
				inlineComponent._fitFontSize = inlineComponent.getFontSize() * fontMultiplier;
				inlineComponent.calculateInlines( inlineComponent._fitFontSize );

			} );

			const lines = this.computeLines();

			const INTERLINE = this.getInterLine();

			const textHeight = lines.reduce( ( offsetY, line ) => {

				return offsetY - line.lineHeight - INTERLINE;

			}, 0 ) + INTERLINE;

			return Math.abs( textHeight );
		}

		/**
		 * Compute the width of a line
		 * @param line
		 * @returns {number}
		 */
		computeLineWidth( line ) {

			// only by the length of its extremities
			const firstInline = line[ 0 ];

			const lastInline = line[ line.length - 1 ];

			// Right + Left ( left is negative )
			return (lastInline.offsetX + lastInline.width) + firstInline.offsetX;

		}

	};

}
