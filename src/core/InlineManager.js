/*
	Job: Keeping track and deciding of a component's InlineComponents position, split, etc..
	Knows: Component Dimension, and the list of children InlineComponent
*/

import { ShapeBufferGeometry, BufferGeometry, SphereBufferGeometry } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MeshUIComponent from './MeshUIComponent';

function InlineManager( boxComponent ) {

	// if a property is not found in layout, it will delegate to MeshUIComponent
	const inlineManager = Object.create( MeshUIComponent() );

	inlineManager.type = 'inlineManager'

	inlineManager.inlineComponents = [];

	// Updated by computeInlinesPosition, and read by InlineComponent.setPosFromParentRecords()
	inlineManager.inlinesInfo = {};

	inlineManager.computeInlinesPosition = function computeInlinesPosition() {

		if ( this.children.length === 0 ) return

		inlineManager.inlinesInfo = {};

		// Dummy to compute total line height
		let line = [];

		const INNER_WIDTH = this.getWidth() - (this.padding * 2 || 0);

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = [[]];

		this.children.reduce( (lastInlineOffset, inlineComponent)=> {

			// Abort condition

			if ( !inlineComponent.isInline ) {
				console.warn("A component cannot have a box and an inline child component at the same time");
			};

			if ( !inlineComponent.chars ) return

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its geometry
			//////////////////////////////////////////////////////////////

			const currentInlineInfo = inlineComponent.chars.reduce( (lastCharOffset, char)=> {

				// Line break

				if ( lastCharOffset + char.width > INNER_WIDTH ) {

					lastCharOffset = 0;

					lines.push([ char ]);

				} else {

					lines[ lines.length - 1 ].push( char );

				};

				//

				char.offsetX = lastCharOffset;

				//

				return lastCharOffset + char.width;

			}, lastInlineOffset );

			//

			return currentInlineInfo

		}, 0 );

		/////////////////////////////////////////////////////////////////
		// Position lines according to justifyContent and contentAlign
		/////////////////////////////////////////////////////////////////

		const INNER_HEIGHT = this.getHeight() - (this.padding * 2 || 0);
		const JUSTIFICATION = this.getJustifyContent();
		const ALIGNMENT = this.getAlignContent();
		const INTERLINE = this.getInterline();

		// Compute lines dimensions

		lines.forEach( (line)=> {

			line.height = line.reduce( (highest, char)=> {
				return highest < char.height ? char.height : highest
			}, 0 );

			line.ascender = line.reduce( (highest, char)=> {
				return highest < char.ascender ? char.ascender : highest
			}, 0 );

			line.width = line.reduce( (width, char)=> {
				return width + char.width
			}, 0 );

		});

		// Vertical offset

		let textHeight = lines.reduce( (offsetY, line)=> {

			line.forEach( (char)=> {

				char.offsetY = offsetY;

			});

			return offsetY - line.height - INTERLINE;

		}, 0 ) + INTERLINE;

		textHeight = Math.abs( textHeight );

		// Vertical positioning

		const justificationOffset = (()=> {
			switch ( JUSTIFICATION ) {
				case 'start': return (INNER_HEIGHT / 2) - lines[0].ascender
				case 'end': return textHeight - lines[0].ascender - ( INNER_HEIGHT / 2 ) + (lines[ lines.length -1 ].height - lines[ lines.length -1 ].ascender) ;
				case 'center': return (textHeight / 2) - lines[0].ascender
				default: console.warn('"textJustification" is not valid')
			};
		})();

		//

		lines.forEach( (line)=> {

			line.forEach( (char)=> {

				char.offsetY += justificationOffset

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

			const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

			inlineManager.inlinesInfo[ inlineComponent.id ] = {
				geometry: mergedGeom
			};

		});

	};

	//

	return inlineManager

};

export default InlineManager
