import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

import Stats from 'three/examples/jsm/libs/stats.module.js';

/*

This example demonstrate how a best fit works.

*/

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const HEADER_TEXT = [
	'BestFit: \'none\'',
	'BestFit: \'auto\'',
	'BestFit: \'grow\'',
	'BestFit: \'shrink\''
];
const TEXT1 = [
	'This text will remain the same size regardless of its parent\'s size.',
	'This text will adjust its font size to ensure it always fits within its parent.',
	'This text will only grow in size to fit container.',
	'This text will only shrink in size to fit container.'
];
const TEXT2 = [
	'This is the default option and should be used in most cases.',
	'This option will either increase or decrease the font size.',
	'This option will only increase the font size, while capping its minimum font size to its original value.',
	'This option will only decrease the font size, while capping its maximum font size to its original value.'
];

let scene, camera, renderer, controls, stats;
const innerContainers = [];

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 1.5 );
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

	const warningContainer = new ThreeMeshUI.Block( {
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xf1c232 ),
		backgroundOpacity: 1,
		borderRadius: 0.05,
		borderWidth: 0.02,
		borderOpacity: 1,
		borderColor: new THREE.Color( 'orange' ),
		fontColor: new THREE.Color( 0x333333 ),
		fontFamily: FontJSON,
		fontTexture: FontImage,
		width: 4,
		height: 0.35
	} );

	warningContainer.position.set( 0, 0.35, -1 );
	warningContainer.rotation.x = -0.55;
	scene.add( warningContainer );

	const warningTextBlock = new ThreeMeshUI.Text( {
		content: '* Warning - The Best Fit functionality is computationally expensive and therefore should not be used if you intend to update the container size every frame. ' +
			'If you do need to update the container while using this functionality, it may be wise to only do so at intervals.',
		fontSize: 0.075
	} );

	warningContainer.add( warningTextBlock );

	for ( let i = 0; i < 4; i++ ) {

		let bestFit;

		switch ( i ) {

			case 0:
				bestFit = 'none';
				break;
			case 1:
				bestFit = 'auto';
				break;
			case 2:
				bestFit = 'grow';
				break;
			case 3:
				bestFit = 'shrink';
				break;

		}

		const titleContainer = new ThreeMeshUI.Block( {
			padding: 0.05,
			backgroundColor: new THREE.Color( 0xd9d9d9 ),
			backgroundOpacity: 1,
			borderRadius: 0.05,
			fontColor: new THREE.Color( 0x111111 ),
			fontFamily: FontJSON,
			fontTexture: FontImage,
			width: 1.1,
			height: 0.15
		} );

		titleContainer.position.set( -1.725 + 1.15 * i, 1.8, -2 );

		scene.add( titleContainer );

		const titleTextBlock = new ThreeMeshUI.Text( {
			content: HEADER_TEXT[ i ],
			fontSize: 0.075
		} );

		titleContainer.add( titleTextBlock );

		const outerContainer = new ThreeMeshUI.Block( {
			padding: 0.05,
			backgroundColor: new THREE.Color( 0xd9d9d9 ),
			backgroundOpacity: 0.5,
			borderRadius: 0.05,
			borderWidth: 0.01,
			borderOpacity: 1,
			borderColor: new THREE.Color( 0x333333 ),
			justifyContent: 'end',
			alignItems: 'end',
			fontColor: new THREE.Color( 0x111111 ),
			fontFamily: FontJSON,
			fontTexture: FontImage,
			width: 1.1,
			height: 0.95
		} );

		outerContainer.position.set( -1.725 + 1.15 * i, 1, -1.8 );
		outerContainer.rotation.x = -0.55;
		scene.add( outerContainer );

		//

		const innerContainer = new ThreeMeshUI.Block( {
			width: 1,
			height: 0.7,
			padding: 0.05,
			backgroundColor: new THREE.Color( 0xffffff ),
			backgroundOpacity: 0.5,
			bestFit: bestFit
		} );

		outerContainer.add( innerContainer );
		innerContainers.push( innerContainer );

		const firstTextBlock = new ThreeMeshUI.Text( {
			content: TEXT1[ i ],
			fontSize: 0.066
		} );

		innerContainer.add( firstTextBlock );

		const secondTextBlock = new ThreeMeshUI.Text( {
			content: TEXT2[ i ],
			fontSize: 0.066
		} );

		innerContainer.add( secondTextBlock );

	}

}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


//

function loop() {

	const now = Date.now();

	innerContainers.forEach( innerContainer => {

		innerContainer.set( {
			width: Math.sin( now / 1000 ) * 0 + 1,
			height: Math.sin( now / 500 ) * 0.25 + 0.6
		} );

	} );

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
	stats.update();

}
