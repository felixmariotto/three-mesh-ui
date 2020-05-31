
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

import { MeshBasicMaterial, Group, Color, ShapeBufferGeometry } from 'three';

// to delete
import { SphereBufferGeometry, MeshNormalMaterial } from 'three';

//

const textureLoader = new TextureLoader();
const svgLoader = new SVGLoader();

const loadingMaterial = new MeshBasicMaterial({
	transparent: true,
	opacity: 0
});

const DRAW_FILL_SHAPE = true;
const DRAW_STROKE = true;
const FILL_SHAPE_WIREFRAME = false;
const STROKE_WIREFRAME = false;

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
			return makeSVG( options );

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

//

function makeSVG( options ) {

	const container = new Group();

	svgLoader.load( options.src, function ( data ) {

		var paths = data.paths;

		var group = new Group();
		group.scale.multiplyScalar( 0.25 );
		group.position.x = - 70;
		group.position.y = 70;
		group.scale.y *= - 1;

		for ( var i = 0; i < paths.length; i ++ ) {

			var path = paths[ i ];

			var fillColor = path.userData.style.fill;
			if ( DRAW_FILL_SHAPE && fillColor !== undefined && fillColor !== 'none' ) {

				var material = new MeshBasicMaterial( {
					color: new Color().setStyle( fillColor ),
					opacity: path.userData.style.fillOpacity,
					transparent: path.userData.style.fillOpacity < 1,
					side: 2,
					depthWrite: false,
					wireframe: FILL_SHAPE_WIREFRAME
				});

				var shapes = path.toShapes( true );

				for ( var j = 0; j < shapes.length; j ++ ) {

					var shape = shapes[ j ];

					var geometry = new ShapeBufferGeometry( shape );
					var mesh = new Mesh( geometry, material );

					group.add( mesh );

				};

			};

			var strokeColor = path.userData.style.stroke;

			if ( DRAW_STROKE && strokeColor !== undefined && strokeColor !== 'none' ) {

				var material = new MeshBasicMaterial( {
					color: new Color().setStyle( strokeColor ),
					opacity: path.userData.style.strokeOpacity,
					transparent: path.userData.style.strokeOpacity < 1,
					side: 2,
					depthWrite: false,
					wireframe: STROKE_WIREFRAME
				});

				for ( var j = 0, jl = path.subPaths.length; j < jl; j ++ ) {

					var subPath = path.subPaths[ j ];

					var geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );

					if ( geometry ) {

						var mesh = new Mesh( geometry, material );

						group.add( mesh );

					};

				};

			};

		};

		container.add( group );

	});

	return container

};
