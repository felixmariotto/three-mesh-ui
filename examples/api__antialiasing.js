// xfg:title FontSmooth
// xfg:category learn
// xfg:type MSDF Only

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
let autoMoveCam = true;

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 500 );
	camera.position.set( 0, 1.5, 0 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'start', () => autoMoveCam = false );

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 12, 10, 10, 20 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	// attempt to have a pixel-perfect match to the reference MSDF implementation

	const no = makeTextPanel( 0.6, 0, 0, 0, 'antialiased' );
	window.no = no;
	makeTextPanel( -0.6, 0, 0, 0, 'none' );

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel( x, rotX, rotY, rotZ, supersample ) {

	const textContent = `
  fontSmooth: '${supersample}'

  Three-mesh-ui uses rotated-grid-super-sampling (RGSS) to smooth out the rendering of small characters on low res displays.

  This is especially important in VR. However you can improve performance slightly by disabling it, especially if you only render big texts.`;

	const container = new ThreeMeshUI.Text( {
		width: 1,
		height: 0.9,
		padding: 0.05,
		borderRadius: 0.05,
		justifyContent: 'center',
		alignItems: 'start',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		color: new THREE.Color( 0xffffff ),
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color( 0x000000 ),
		fontSmooth: supersample,
		fontSize: 0.045,
		textContent
	} );

	scene.add( container );
	container.position.set( x, 1.5, -4 );
	container.rotation.set( rotX, rotY, rotZ );

	// container.add(
	// 	new ThreeMeshUI.Text( {
	// 		content: textContent,
	// 		fontKerning: 'normal',
	// 		fontSize: 0.045,
	// 	} )
	// );

	return container;

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

	// swinging motion to see motion aliasing better
	if ( autoMoveCam ) {

		controls.target.set(
			Math.sin( Date.now() / 3000 ) * 0.3,
			Math.cos( Date.now() / 3000 ) * 0.3 + 1.5,
			-4
		);

	}

	controls.update();
	renderer.render( scene, camera );

}
