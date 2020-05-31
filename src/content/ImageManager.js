
/*

Job: Takes information about images to output, then output meshes

Knows:
	- The Text component for which it creates Meshes
	- The parameters of the image to create (SVG, PNG...)

*/

import { Mesh } from 'three/src/objects/Mesh.js';
import { PlaneBufferGeometry } from 'three/src/geometries/PlaneGeometry.js';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js' ;

// TEMP

import { SphereBufferGeometry, MeshNormalMaterial } from 'three';

//

export default function ImageManager() {

	return {
		create
	};

};

//

function create( options ) {

	console.log( options )

	const geometry = new PlaneBufferGeometry( options.width, options.height );

	// basic translation to put the plane's left bottom corner at the center of its space
	geometry.translate( options.width / 2, options.height / 2, 0 );

	// translation required by inlineManager to position this component inline
	geometry.translate( options.offsetX, options.offsetY, 0 );

	return new Mesh(
		geometry,
		new MeshNormalMaterial()
	);

};
