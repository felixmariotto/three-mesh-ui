
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

import Frame from './Frame.js';

// TEMP

import { MeshBasicMaterial } from 'three';
import { SphereBufferGeometry, MeshNormalMaterial } from 'three';

//

const textureLoader = new TextureLoader();

const loadingMaterial = new MeshBasicMaterial({
	transparent: true,
	opacity: 0
});

//

export default function ImageManager() {

	return {
		create
	};

};

//

function create( options ) {

	const fileExtension = options.src.substring( options.src.lastIndexOf('.') + 1 );

	switch( fileExtension ) {

		case 'png' :
		case 'jpg' :
			return makeTexturedPlane( options, fileExtension );

		default :
			console.warn(`extension of file ${options.src} is not supported`);
			return

	};

};

//

function makeTexturedPlane( options, fileExtension ) {

	const mesh = Frame(
		options.width,
		options.height,
		options.borderRadius,
		options.backgroundSize,
		loadingMaterial
	);

	// basic translation to put the plane's left bottom corner at the center of its space
	mesh.position.set( options.width / 2, options.height / 2, 0 );

	// translation required by inlineManager to position this component inline
	mesh.position.x += options.offsetX;
	mesh.position.y += options.offsetY;

	mesh.renderOrder = Infinity;

	// load the image, then create a new material with the right texture
	textureLoader.load( options.src, (texture)=> {

		mesh.material = new MeshBasicMaterial({
			transparent: fileExtension === "png",
			map: texture
		});

		setTimeout( ()=> {
			mesh.updateUVs( options.backgroundSize );
		}, 0 );

	});

	return mesh

};
