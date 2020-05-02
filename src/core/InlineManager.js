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

		this.children.reduce( (lastInlineOffset, inline, i)=> {

			// Abort condition

			if ( !inline.isInline ) {
				console.warn("A component cannot have a box and an inline child component at the same time");
			};

			if ( !inline.chars ) return

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its geometry
			//////////////////////////////////////////////////////////////

			let translatedGeom = [];

			const currentInlineInfo = inline.chars.reduce( (lastCharOffset, char, i)=> {

				// Line break

				if ( lastCharOffset + char.width > INNER_WIDTH ) {

					lastCharOffset = 0;

					lines.push([ char ]);

				} else {

					lines[ lines.length - 1 ].push( char );

				};

				// Geometry translation

				translatedGeom[ i ] = new BufferGeometry().copy( char.geometry );

				translatedGeom[ i ].translate( lastCharOffset, 0, 0 );

				//

				return lastCharOffset + char.width;

			}, lastInlineOffset );

			/////////////////////
			// Merge and record
			/////////////////////

			const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

			inlineManager.inlinesInfo[ inline.id ] = {
				geometry: mergedGeom
			};

			//

			return currentInlineInfo

		}, 0 );

		/////////////////////////////////////////////////////////////////
		// Position lines according to justifyContent and contentAlign
		/////////////////////////////////////////////////////////////////

		const INNER_HEIGHT = this.getHeight() - (this.padding * 2 || 0);
		const JUSTIFICATION = this.getJustifyContent();
		const ALIGN = this.getContentAlign();
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

		lines.reduce( (offsetY, line)=> {

			const newOffset = offsetY + line.height;

			line.offsetY = newOffset;

			return newOffset

		}, 0 );

		// Vertical positioning

		switch ( JUSTIFICATION ) {

			case 'center' :

				break;

		};

		// Translation

		

	};

	//

	return inlineManager

};

export default InlineManager
