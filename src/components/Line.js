/*
	Job: Position characters, group their geometries, make meshes and add them to the container
	Knows: Line position, characters and their style
*/

import { Object3D, meshNormalMaterial } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import MeshUIComponent from '../core/MeshUIComponent';

function LineModule( options /* height, width, chars, yPos */ ) {

	// if a property is not found in paragraph, it will delegate to MeshUIComponent
	const line = Object.create( MeshUIComponent() );

	setTimeout(()=> {

		// create three.js Object3D to store the characters, and add this container to the parent
		const obj = new Object3D();
		line.getContainer().threeOBJ.add( obj );

		//

		options.chars.reduce( ( offsetX, char )=> {

			char.shapeGeom.translate( offsetX, 0, 0 );

			return offsetX + char.width;

		}, 0 );

		//

		// merge all the character geometries into the first character's geometry
		for ( let i = 1 ; i < options.chars.length ; i++ ) {

			options.chars[0].shapeGeom = BufferGeometryUtils.mergeBufferGeometries([
				options.chars[0].shapeGeom,
				options.chars[i].shapeGeom
			], false );

		};

		// create mesh from the geometry, and add it to the container
		const material = line.getFontMaterial();
		const textMesh = new THREE.Mesh( options.chars[0].shapeGeom, material );
		obj.add( textMesh )

	}, 0 );

	return line;

};

export default LineModule