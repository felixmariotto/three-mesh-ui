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
		const INNER_HEIGHT = this.getHeight() - (this.padding * 2 || 0);

		this.children.reduce( (lastInlineInfo, inline, i)=> {

			// Abort condition

			if ( !inline.isInline ) {
				console.warn("A component cannot have a box and an inline child component at the same time");
			};

			if ( !inline.chars ) return

			// Compute the position of each inline children according to its geometry

			let translatedGeom = [];

			const currentInlineInfo = inline.chars.reduce( (lastCharInfo, char, i)=> {

				// Line break

				if ( lastCharInfo.offsetX + char.width > INNER_WIDTH ) {

					const currentLineHeight = getLineHeight( line );

					lastCharInfo.offsetX = 0;

					lastCharInfo.offsetY -= currentLineHeight ;

					line = []

				} else {

					line.push( char );

				};

				// Geometry translation

				translatedGeom[ i ] = new BufferGeometry().copy( char.geometry );

				translatedGeom[ i ].translate( lastCharInfo.offsetX, lastCharInfo.offsetY, 0 );

				//

				return {
					offsetX: lastCharInfo.offsetX + char.width,
					offsetY: lastCharInfo.offsetY
				};

			}, lastInlineInfo );

			// Merge the characters geometries

			const mergedGeom = BufferGeometryUtils.mergeBufferGeometries( translatedGeom );

			// Update records

			inlineManager.inlinesInfo[ inline.id ] = {
				x: 0,
				y: 0,
				z: 0,
				geometry: mergedGeom
			};

			//

			return currentInlineInfo

		}, { offsetX: 0, offsetY: INNER_HEIGHT / 2 } );

	};

	function getLineHeight( line ) {

		return line.reduce( (highest, char)=> {
			return highest < char.height ? char.height : highest
		}, 0 );

	};

	return inlineManager

};

export default InlineManager
