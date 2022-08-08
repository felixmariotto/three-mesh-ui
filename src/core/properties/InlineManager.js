import BaseProperty from './BaseProperty';
import Lines from '../../components/core/Lines';
import Line from '../../components/core/Line';
import * as Whitespace from '../../utils/inline-layout/Whitespace';

export default class InlineManager extends BaseProperty {

	constructor() {

		super( 'inlineManager' );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	update( vrElement, out ) {

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @return {Lines}
	 */
	process( vrElement ) {

		const INNER_WIDTH = vrElement.innerWidth;

		// // got by MeshUIComponent
		// const JUSTIFICATION = this.getJustifyContent();
		// const ALIGNMENT = this.getTextAlign();

		// Compute lines

		const INTERLINE = vrElement.style._lineHeight.output;

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = new Lines( new Line() );

		let lastInlineOffset = 0;
		vrElement._children.childrenInlines.forEach( ( inlineComponent ) => {

			// Abort condition

			if ( !inlineComponent._inlines.value ) return;

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its dimensions
			//////////////////////////////////////////////////////////////

			// @TODO: Fontsize best fit
			// const FONTSIZE = inlineComponent._fitFontSize || inlineComponent.getFontSize();
			const FONTSIZE = inlineComponent.style._fontSize.output;

			const LETTERSPACING = inlineComponent.style._letterSpacing.output * FONTSIZE;

			const WHITESPACE = inlineComponent.style._whiteSpace.output;

			const BREAKON = inlineComponent._lineBreak.output;

			const whiteSpaceOptions = {
				WHITESPACE,
				LETTERSPACING,
				BREAKON,
				INNER_WIDTH
			}

			lastInlineOffset += inlineComponent.style._margin.left + inlineComponent.style._padding.left;

			inlineComponent._inlines.value.forEach( ( inline, i, inlines ) => {

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

			lastInlineOffset += inlineComponent.style._margin.output.w + inlineComponent.style._padding.output.w;

		} );

		// Compute single line and combined lines dimensions
		const WHITESPACE = vrElement.style._whiteSpace.output;

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
				line.width = ( lastInline.offsetX + lastInline.cumulativeWidth + lastInline.paddingRight + lastInline.marginRight ) + line[ 0 ].offsetX;

				width = Math.max( width, line.width);
			}

		} );

		lines.height = Math.abs(lineOffsetY + INTERLINE );
		lines.width = width;

		this._value = lines;


		vrElement._inlineJustificator._needsProcess = true;

		vrElement.style._textAlign._needsProcess = true;

	}

}
