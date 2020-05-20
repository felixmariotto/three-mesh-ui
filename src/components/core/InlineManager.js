/*
	Job: Keeping track and deciding of a component's InlineComponents position, split, etc..
	Knows: Component dimensions, and the list of children InlineComponent
*/

import { ShapeBufferGeometry, BufferGeometry } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MeshUIComponent from './MeshUIComponent';

function InlineManager( boxComponent ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const inlineManager = Object.create( MeshUIComponent() );

	inlineManager.type = 'inlineManager'

	// New elements are pushed by MeshUIComponent in this array when adding a child
	inlineManager.inlineComponents = [];

	// Updated by computeInlinesPosition.
	// inlineManager.inlinesInfo = {};

	inlineManager.computeInlinesPosition = function computeInlinesPosition() {

		if ( !this.children.length || !this.children[0].inlines ) return

		// reset the records
		// inlineManager.inlinesInfo = {};

		// computed by BoxComponent
		const INNER_WIDTH = this.getWidth() - (this.padding * 2 || 0);

		// characters to prioritize breaking line (eg: white space)
		const BREAK_ON = this.getBreakOn();

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = [[]];

		this.children.reduce( (lastInlineOffset, inlineComponent)=> {

			// Abort condition

			if ( !inlineComponent.isInline ) {
				console.warn("A component cannot have a box and an inline child component at the same time");
			};

			if ( !inlineComponent.inlines ) return

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its geometry
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

			/*

			line.height = line.reduce( (highest, char)=> {
				return highest < char.height ? char.height : highest
			}, 0 );

			line.ascender = line.reduce( (highest, char)=> {
				return highest < char.ascender ? char.ascender : highest
			}, 0 );

			line.width = line.reduce( (width, char)=> {
				return width + char.width
			}, 0 );

			*/

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
		
		/*

		// Geometry translation and merging

		this.children.forEach( (inlineComponent)=> {

			if ( !inlineComponent.chars ) return

			let translatedGeom = [];

			inlineComponent.chars.forEach( (char, i)=> {

				translatedGeom[ i ] = new BufferGeometry().copy( char.geometry );

				translatedGeom[ i ].translate( char.offsetX, char.offsetY, 0 );

			});

			///////////////////////
			/// Merge and record
			///////////////////////

			const testGeom = new THREE.Sphere

			const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

			inlineManager.inlinesInfo[ inlineComponent.id ] = {
				geometry: mergedGeom
			};

		});

		*/

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
