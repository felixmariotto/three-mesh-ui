import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

//

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.02, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
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
		padding: 0.05,
		textType: 'MSDF',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontColor: new THREE.Color( 0xabf7bf ),
		fontOpacity: 0.9 // 0 is invisible, 1 is opaque
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const bigTextContainer = new ThreeMeshUI.Block( {
		padding: 0.03,
		margin: 0.03,
		width: 1.5,
		height: 1.2,
		justifyContent: 'center',
		textAlign: 'left',
		backgroundOpacity: 0
	} );

	bigTextContainer.add(
		new ThreeMeshUI.Text( {
			content: 'three-mesh-ui is very efficient when rendering big text because the glyphs are textures on simple planes geometries, all merged together. '.repeat( 18 ),
			fontSize: 0.033
		} )
	);

	//

	const titleContainer = new ThreeMeshUI.Block( {
		width: 0.9,
		height: 0.25,
		padding: 0.04,
		margin: 0.03,
		backgroundOpacity: 0
	} ).add(
		new ThreeMeshUI.Text( {
			content: 'Do you need to render a big text ?',
			fontSize: 0.07
		} )
	);

	//

	container.add( titleContainer, bigTextContainer );

}

//

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
