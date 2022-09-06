// xfg:title TextAlign
// xfg:category learn

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import { Object3D } from 'three';

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
	camera.position.set( 0, 1.6, 0.75 );
	controls.target = new THREE.Vector3( 0, 1.5, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL
	const textAligns = [
		'left',						// 'left' or ThreeMeshUI.TextAlign.LEFT,
		'center',					// 'center' or ThreeMeshUI.TextAlign.CENTER,
		'right',					// 'right' or ThreeMeshUI.TextAlign.RIGHT,
		'justify-left',		// 'justify-left' or ThreeMeshUI.TextAlign.JUSTIFY_LEFT,
		'justify',				// 'justify' or ThreeMeshUI.TextAlign.JUSTIFY,
		'justify-right',	// 'justify-right' or ThreeMeshUI.TextAlign.JUSTIFY_RIGHT,
		'justify-center'	// 'justify-center' or ThreeMeshUI.TextAlign.JUSTIFY_CENTER
	];

	for ( let i = 0; i < textAligns.length; i++ ) {
		const textAlign = textAligns[ i ];
		makeTextPanel( i, textAlign, i === textAligns.length - 1 );
	}


	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel( index, textAlign, last = false ) {


	const group = new Object3D();

	const title = new ThreeMeshUI.Block( {
		width: 1.15,
		height: 0.15,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xff9900 ),
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const titleText = new ThreeMeshUI.Text( {
		textContent: '.set({textAlign: "' + textAlign + '"})',
		fontSize: 0.075
	} );

	title.add(
		titleText
	);
	title.position.set( 0, 0.35, 0 );
	group.add( title );

	const container = new ThreeMeshUI.Block( {
		width: 1.3,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		alignItems: 'start',
		textAlign,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	// container.rotation.x = -0.25;
	group.add( container );

	//

	container.add(
		new ThreeMeshUI.Text( {
			textContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			fontSize: 0.055
		} )
	);

	group.position.set( -1.35 + index % 3 * 1.35, 2.25 + Math.floor( index / 3 ) * -0.8, -2 );

	if ( last ) {

		group.position.x = 0;

	}

	scene.add( group );

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
