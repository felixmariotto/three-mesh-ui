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
import * as Whitespace from '../../utils/Whitespace';

import * as TextAlign from '../../utils/TextAlign';

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
			TextAlign.alignLines( lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}


		calculateBestFit( bestFit ) {

			const inlineChildren = this.children.filter( ( child ) => {

				return child.isInline ? true : false;

			} );

			if ( inlineChildren.length === 0 ) return;

			switch ( bestFit ) {
				case 'grow':
					this.calculateGrowFit( inlineChildren );
					break;
				case 'shrink':
					this.calculateShrinkFit( inlineChildren );
					break;
				case 'auto':
					this.calculateAutoFit( inlineChildren );
					break;
			}

		}

		calculateGrowFit( inlineChildren ) {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = inlineChildren.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 1;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( inlineChildren, fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					if ( fontMultiplier <= minFontMultiplier ) { // can't shrink text

						inlineChildren.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not shrink
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );

		}

		calculateShrinkFit( inlineChildren ) {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = inlineChildren.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 1;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( inlineChildren, fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( fontMultiplier >= maxFontMultiplier ) { // can't grow text

						inlineChildren.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not grow
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
		}

		calculateAutoFit( inlineChildren ) {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = inlineChildren.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( inlineChildren, fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
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

			this.children.filter( ( child ) => {

				return child.isInline ? true : false;

			} )
				.reduce( ( lastInlineOffset, inlineComponent ) => {

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

						const kerning = inline.kerning ? inline.kerning : 0;
						const xoffset = inline.xoffset ? inline.xoffset : 0;
						const xadvance = inline.xadvance ? inline.xadvance : inline.width;

						// Line break
						const shouldBreak = Whitespace.shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

						if ( shouldBreak ) {

							lines.push( [ inline ] );

							inline.offsetX = xoffset;

							// restart the lastInlineOffset as zero.
							if ( inline.width === 0 ) return 0;

							// compute lastInlineOffset normally
							// except for kerning which won't apply
							// as there is visually no lefthanded glyph to kern with
							return xadvance + LETTERSPACING;

						}

						lines[ lines.length - 1 ].push( inline );

						inline.offsetX = lastInlineOffset + xoffset + kerning;

						return lastInlineOffset + xadvance + kerning + LETTERSPACING;

					}, lastInlineOffset );

					//

					return currentInlineInfo;

				}, 0 );

			// Compute lines dimensions

			lines.forEach( ( line ) => {

				//

				line.lineHeight = line.reduce( ( height, inline ) => {

					const charHeight = inline.lineHeight !== undefined ? inline.lineHeight : inline.height;

					return Math.max( height, charHeight );

				}, 0 );

				//

				line.lineBase = line.reduce( ( lineBase, inline ) => {

					const newLineBase = inline.lineBase !== undefined ? inline.lineBase : inline.height;

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

		calculateHeight( inlineChildren, fontMultiplier ) {

			inlineChildren.forEach( inlineComponent => {

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

			return Math.abs( firstInline.offsetX - ( lastInline.offsetX + lastInline.width ) );

		}

	};

}
