/*
	Job: Position characters horizontally, group their geometries, make meshes and add them to the container
	Knows: Line position, characters and their style
*/

import { Object3D } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MeshUIComponent from '../core/MeshUIComponent';

function LineModule( options /* width, chars, yPos, containerWidth */, parent ) {

	// If a property is not found in paragraph, it will delegate to MeshUIComponent
	const line = Object.create( MeshUIComponent() );

	parent.appendChild( line );

	////////////////////
	//  LINE BUILDING
	////////////////////

	const TEXT_JUSTIFICATION = line.getTextAlign();

	// Get offset to apply to justify the text to the container
	
	const justificationOffset = (()=> {
		switch ( TEXT_JUSTIFICATION ) {
			case 'left': return - options.containerWidth / 2
			case 'right': return - options.width + ( options.containerWidth / 2 )
			case 'center': return - options.width / 2
			default: throw new Error('no default textJustification was found')
		};
	})();

	// Create three.js Object3D to store the characters, and add this container to the parent
	
	const obj = new Object3D();
	obj.position.y = options.yPos;
	obj.position.x = justificationOffset;
	line.getContainer().threeOBJ.add( obj );

	// Translate characters geometries in order to merge later

	options.chars.reduce( ( offsetX, char )=> {

		char.shapeGeom.translate( offsetX, 0, 0 );

		return offsetX + char.width;

	}, 0 );

	// Merge all the character geometries into the first character's geometry
	
	for ( let i = 1 ; i < options.chars.length ; i++ ) {

		options.chars[0].shapeGeom = BufferGeometryUtils.mergeBufferGeometries([
			options.chars[0].shapeGeom,
			options.chars[i].shapeGeom
		], false );

	};

	// Create mesh from the geometry, and add it to the container

	if ( !options.chars[0] ) return

	const material = line.getFontMaterial();
	const textMesh = new THREE.Mesh( options.chars[0].shapeGeom, material );
	obj.add( textMesh );

};

export default LineModule
