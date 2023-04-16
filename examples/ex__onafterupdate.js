import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

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

	let count = 0;

	//

	const container = new ThreeMeshUI.Block( {
		width: 1.2,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		backgroundColor: 0x000000,
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const text = new ThreeMeshUI.Text( {
		textContent: 'onAfterUpdate get called after any update.\n\n',
		fontSize: 0.055
	} );

	const counter = new ThreeMeshUI.Text( {
		textContent: '0',
		fontSize: 0.08
	} );

	// onAfterUpdate can be set on any component ( Text, Block... ),
	// and get called after any update to the component.

	counter.addAfterUpdate( function () {
		container._backgroundMesh.layers.set( count % 2 );
	});

	container.add( text, counter );

	// triggers updates to the component to test onAfterUpdate

	setInterval( () => {

		count++;
		counter.set( { textContent: String( count ) } );

	}, 500 );

}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// ThreeMeshUI.update only execute code if you set new attributes
	// to your components, so it's safe to call it every frame.
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
