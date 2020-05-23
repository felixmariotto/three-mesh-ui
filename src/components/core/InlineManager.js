/*
	Job: Positioning inline elements according to their dimensions inside this component's dimensions
	Knows: This component dimensions, and its children dimensions
*/

import { ShapeBufferGeometry, BufferGeometry } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MeshUIComponent from './MeshUIComponent';

function InlineManager( boxComponent ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const inlineManager = Object.create( MeshUIComponent() );

	inlineManager.type = 'inlineManager'

	inlineManager.computeInlinesPosition = function computeInlinesPosition() {

		// computed by BoxComponent
		const INNER_WIDTH = this.getWidth() - (this.padding * 2 || 0);

		// characters to prioritize breaking line (eg: white space)
		const BREAK_ON = this.getBreakOn();

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = [[]];

		this.children.filter( (child)=> {

			return child.isInline ? true : false

		})
		.reduce( (lastInlineOffset, inlineComponent)=> {

			// Abort condition

			if ( !inlineComponent.inlines ) return

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its dimensions
			//////////////////////////////////////////////////////////////

			const currentInlineInfo = inlineComponent.inlines.reduce( (lastInlineOffset, inline, i, inlines)=> {

				// Line break

				const nextBreak = distanceToNextBreak( inlines, i + 1 );

				if ( lastInlineOffset + inline.width > INNER_WIDTH ||
					 inline.lineBreak === "mandatory" ||
					 /* test if current glyph is break-friendly and next break-friendly glyph is beyond limit */
					 (lastInlineOffset + nextBreak > INNER_WIDTH && BREAK_ON.indexOf( inlines[ i ].glyph ) > -1) ) {

					lastInlineOffset = 0;

					lines.push([ inline ]);

					inline.offsetX = lastInlineOffset;

					//

					return lastInlineOffset;

				} else {

					lines[ lines.length - 1 ].push( inline );

				};

				//

				inline.offsetX = lastInlineOffset;

				//

				return lastInlineOffset + inline.width;

			}, lastInlineOffset );

			//

			return currentInlineInfo

		}, 0 );

		/////////////////////////////////////////////////////////////////
		// Position lines according to justifyContent and contentAlign
		/////////////////////////////////////////////////////////////////

		// got by BoxComponent
		const INNER_HEIGHT = this.getHeight() - (this.padding * 2 || 0);

		// got by MeshUIComponent
		const JUSTIFICATION = this.getJustifyContent();
		const ALIGNMENT = this.getAlignContent();
		const INTERLINE = this.getInterline();

		// Compute lines dimensions

		lines.forEach( (line)=> {

			line.lowestPoint = line.reduce( (lowest, inline)=> {

				return lowest < inline.anchor ? inline.anchor : lowest

			}, 0 );

			//

			line.heighestPoint = line.reduce( (highest, inline)=> {

				const topPart = inline.height - inline.anchor;

				return highest < topPart ? topPart : highest 

			}, 0 );

			//

			line.totalHeight = line.lowestPoint + line.heighestPoint;

			//

			line.width = line.reduce( (width, inline)=> {

				return width + inline.width

			}, 0 );

		});

		// Vertical offset

		let textHeight = lines.reduce( (offsetY, line)=> {

			line.forEach( (char)=> {

				char.offsetY = offsetY;

			});

			return offsetY - line.totalHeight - INTERLINE;

		}, 0 ) + INTERLINE;

		textHeight = Math.abs( textHeight );

		// Vertical positioning

		const justificationOffset = (()=> {
			switch ( JUSTIFICATION ) {
				case 'start': return (INNER_HEIGHT / 2) - lines[0].heighestPoint
				case 'end': return textHeight - lines[0].heighestPoint - ( INNER_HEIGHT / 2 ) + (lines[ lines.length -1 ].totalHeight - lines[ lines.length -1 ].heighestPoint) ;
				case 'center': return (textHeight / 2) - lines[0].heighestPoint
				default: console.warn('"textJustification" is not valid')
			};
		})();

		//

		lines.forEach( (line)=> {

			line.forEach( (inline)=> {

				inline.offsetY += justificationOffset

			});

		});

		// Horizontal positioning

		lines.forEach( (line)=> {

			const alignmentOffset = (()=> {
				switch ( ALIGNMENT ) {
					case 'left': return -INNER_WIDTH / 2
					case 'right': return -line.width + (INNER_WIDTH / 2)
					case 'center': return -line.width / 2
					default: console.warn('"textJustification" is not valid')
				};
			})();

			line.forEach( (char)=> {

				char.offsetX += alignmentOffset

			});

		});

	};

	//

	function distanceToNextBreak( inlines, currentIdx, accu ) {

		accu = accu || 0 ;

		// end of the text
		if ( !inlines[ currentIdx ] ) return accu

		// if inline.lineBreak is set, it is 'mandatory' or 'possible'
		if ( inlines[ currentIdx ].lineBreak ) {

			return accu + inlines[ currentIdx ].width

		// no line break is possible on this character
		} else {

			return distanceToNextBreak(
				inlines,
				currentIdx + 1,
				accu + inlines[ currentIdx ].width
			);

		};

	};

	//

	return inlineManager

};

export default InlineManager
