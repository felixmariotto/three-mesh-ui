import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

/*

This example demonstrate how to manually position a Block inside
a parent component. That is to say, how to use Block.position directly.

As three-mesh-ui automatically position components when you call
ThreeMeshUI.update(), any manual setting of Block.position will be
overridden by default.

The solution is to set Block.autoLayout = false on the Blocks whose
position should no be updated automatically by three-mesh-ui.

Note that the origin of a component's position is at the center of its
parent component.

*/

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;
let outerContainer, innerContainer;
let text;

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

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

	// stats = new Stats();
	// document.body.appendChild( stats.dom );

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

	outerContainer = new ThreeMeshUI.Block( {
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xd9d9d9 ),
		backgroundOpacity: 0.5,
		justifyContent: 'end',
		alignItems: 'end',
		fontColor: new THREE.Color( 0x333333 ),
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	outerContainer.position.set( 0, 1, -1.8 );
	outerContainer.rotation.x = -0.55;
	scene.add( outerContainer );

	//

	innerContainer = new ThreeMeshUI.Block( {
		backgroundColor: new THREE.Color( 0xffffff ),
		backgroundOpacity: 0.5
	} );

	outerContainer.add( innerContainer );

	//

	makeAbsoluteBlock( 'set .autoLayout = false', -0.1, 0.15 );
	makeAbsoluteBlock( 'on a Block component', 0.1, 0.05 );
	makeAbsoluteBlock( 'to make three-mesh-ui', -0.1, -0.05 );
	makeAbsoluteBlock( 'skip its automatic layout', 0.1, -0.15 );

}

function makeAbsoluteBlock( string, x, y ) {

	text = new ThreeMeshUI.Block( {
		height: 0.08,
		width: 0.6,
		justifyContent: 'center',
		backgroundOpacity: 0.2
	} );

	text.add( new ThreeMeshUI.Text( { content: string } ) );

	text.autoLayout = false;
	text.position.set( x, y, 0 );

	innerContainer.add( text );

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

	innerContainer.set( {
		width: Math.sin( now / 1000 ) * 0.25 + 1.2,
		height: Math.sin( now / 500 ) * 0.15 + 0.7
	} );

	outerContainer.set( {
		width: Math.sin( now / 1200 ) * 0.25 + 1.8,
		height: 1.4
	} );

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
