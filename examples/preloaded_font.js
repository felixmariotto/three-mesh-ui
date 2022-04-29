import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;
const fontName = 'Roboto';

window.addEventListener( 'load', preload );
window.addEventListener( 'resize', onWindowResize );

//

function preload() {
	const textureLoader = new TextureLoader();

	// JSON may be preloaded as well

	textureLoader.load( FontImage, ( texture ) => {

		ThreeMeshUI.FontLibrary.addFont( fontName, FontJSON, texture );

		init();

	} );
}

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer( {
		antialias: true
	} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const container = new ThreeMeshUI.Block( {
		width: 1.2,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: fontName,
		fontTexture: fontName
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	container.add(
		new ThreeMeshUI.Text( {
			content: 'This example shows how to use pre-loaded font files',
			fontSize: 0.08
		} ),

		new ThreeMeshUI.Text( {
			content: '\nYou can preload font or font and texture, and add it to FontLibrary !',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: '\nAfter that, all added text of this font will be displayed with no loading delays !',
			fontSize: 0.05
		} )
	);

}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
