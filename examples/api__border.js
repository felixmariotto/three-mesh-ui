import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, panel;

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

	panel = new ThreeMeshUI.Block( {
		width: 1,
		height: 0.8,
		fontSize: 0.055,
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	panel.position.set( 0, 1, -1.8 );
	panel.rotation.x = -0.55;
	scene.add( panel );

	//

	panel.add(
		new ThreeMeshUI.Text( {
			content: `Block.borderRadius\n\nBlock.borderWidth\n\nBlock.borderColor\n\nBlock.borderOpacity`,
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

	panel.set( {
		borderRadius: [ 0, 0.2 + 0.2 * Math.sin( Date.now() / 500 ), 0, 0 ],
		borderWidth: 0.05 - 0.06 * Math.sin( Date.now() / 500 ),
		borderColor: new THREE.Color( 0.5 + 0.5 * Math.sin( Date.now() / 500 ), 0.5, 1 ),
		borderOpacity: 1
	} );

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
