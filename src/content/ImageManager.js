
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

		case 'svg' :
			console.log('create svg');
			break

		default :
			console.warn(`extension of file ${options.src} is not supported`);
			return

	};

};

//

function makeTexturedPlane( options, fileExtension ) {
	/*
	console.log( options )

	
	const geometry = new PlaneBufferGeometry( options.width, options.height );

	// basic translation to put the plane's left bottom corner at the center of its space
	geometry.translate( options.width / 2, options.height / 2, 0 );

	// translation required by inlineManager to position this component inline
	geometry.translate( options.offsetX, options.offsetY, 0 );

	// create mesh with a transparent blank material, which will be updated
	// as soon as the texture loaded
	
	const mesh = new Mesh(
		geometry,
		loadingMaterial
	);
	*/

	const mesh = Frame(
		options.width,
		options.height,
		options.borderRadius,
		options.backgroundSize,
		loadingMaterial
	);

	// basic translation to put the plane's left bottom corner at the center of its space
	mesh.geometry.translate( options.width / 2, options.height / 2, 0 );

	// translation required by inlineManager to position this component inline
	mesh.geometry.translate( options.offsetX, options.offsetY, 0 );

	// load the image, then create a new material with the right texture
	textureLoader.load( options.src, (texture)=> {
		mesh.material = new MeshBasicMaterial({
			transparent: fileExtension === "png",
			map: texture
		});
	});

	return mesh

};
