/*
	Job: Keeping track and deciding of a component's InlineComponents position, split, etc..
	Knows: Component Dimension, and the list of children InlineComponent
*/

import { ShapeBufferGeometry } from 'three';
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

		this.children.forEach( (child)=> {

			// Abort condition

			if ( !child.isInline ) {
				console.warn("A component cannot have a box and an inline child component at the same time");
			};

			if ( !child.chars ) return

			// Compute the position of each inline children according to its geometry

			let chars = child.chars.slice(0);

			// Merge the chars geometries

			for ( let i = 1 ; i < chars.length ; i++ ) {

				chars[0].geom = BufferGeometryUtils.mergeBufferGeometries([
					chars[0].geom,
					chars[i].geom
				], false );

			};

			// Update records

			inlineManager.inlinesInfo[ child.id ] = {
				x: 0,
				y: 0,
				z: 0,
				geometry: chars[0].geom
			};

		});

	};

	return inlineManager

};

export default InlineManager
