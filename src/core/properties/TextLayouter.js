import BaseProperty from './BaseProperty';
import Lines from '../../components/core/Lines';
import Line from '../../components/core/Line';
import * as Whitespace from '../../utils/inline-layout/Whitespace';

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
	 * @param {MeshUIBaseElement} element
	 * @return {Lines}
	 */
	process( element ) {

		//console.log( "Layout Inlines", element._width._auto );

		let INNER_WIDTH = element._width._value;
		// if nowrap or pre => infinite then = re bounds;

		// if auto => element.getInherited()
		// if display inline => auto then if lines.width less than autoWidth => shrink


		if( element._whiteSpace._value === 'nowrap' || element._whiteSpace._value === 'pre' ){

			INNER_WIDTH = Infinity;

		} else if ( element._width._auto ) {

			// INNER_WIDTH = element._width.getInheritedInput( element )
			// INNER_WIDTH = element._bounds._innerWidth;
			INNER_WIDTH = Infinity;

		} else {

			INNER_WIDTH = element._bounds._innerWidth;

		}

		//console.log( INNER_WIDTH );

		// let INNER_WIDTH = element._bounds._innerWidth;



		// // got by MeshUIComponent
		// const JUSTIFICATION = this.getJustifyContent();
		// const ALIGNMENT = this.getTextAlign();

		// Compute lines

		const INTERLINE = element._lineHeight._value;

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = new Lines( new Line() );

		let lastInlineOffset = 0;
		element._children._inlines.forEach( ( inlineElement ) => {

			// Abort condition

			if ( !inlineElement._inlines.value ) return;

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

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

			inlineElement._inlines.value.forEach( ( inline, i, inlines ) => {

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

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

		} );

		// Compute single line and combined lines dimensions
		const WHITESPACE = element._whiteSpace._value;

		let width = 0;
		let lineOffsetY = 0;
		lines[0].y = 0;
		// lines[0].y = (lines[0].lineHeight * INTERLINE);

		// calculates lines
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

			if( i !== 0 ) {

				// get the previousLine y and increase
				line.y =  lines[i-1].y - (line.lineHeight * INTERLINE) / 2;

			} else {

				// console.error( - line.lineHeight * INTERLINE );
				// line.y = - ((line.lineHeight * INTERLINE ) + line.lineHeight);
				// line.y = - ( (line.lineHeight * INTERLINE ) - line.lineHeight);
				// line.y = - ((line.lineHeight * INTERLINE ) - line.lineBase) / 2;
				line.y = - ((line.lineHeight * INTERLINE ) - line.lineHeight) / 2;
				// line.y = 4 ;
				// line.y = 1;

			}

			lineOffsetY = lineOffsetY - (line.lineHeight * INTERLINE);

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

		lines.height = Math.abs(lineOffsetY);
		lines.width = width;

		this._value = lines;

		if( element._width._auto ) {
			let sizeBase = lines.width;

			// if( element._boxSizing._value === 'content-box' ) {
				const padding = element._padding._value;
				const border = element._borderWidth._value;

				sizeBase += padding.w + padding.y + border.w + border.y;
			// }

			element._bounds.setOffsetWidth( element, sizeBase );
		}

		if( element._height._auto ) {
			let sizeBase = lines.height;

			// if( element._boxSizing._value === 'content-box' ) {
			const padding = element._padding._value;
			const border = element._borderWidth._value;

			sizeBase += padding.x + padding.z + border.x + border.z;
			// }

			element._bounds.setOffsetHeight( element, sizeBase );

			element._parent._value._bounds._needsUpdate = true;
		}

		//console.log( "LINES :::" , lines.height );

		// element._bounds._needsProcess = true;

		// element._bounds.process( element );

		element._inlineJustificator._needsProcess = true;
		element._textAlign._needsProcess = true;

		// @TODO :
		element.performAfterUpdate();

	}

}
