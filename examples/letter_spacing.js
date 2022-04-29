import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';
import { Color } from 'three';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, animatedText;

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

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments( new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ), new THREE.LineBasicMaterial( { color: 0x808080 } ) );

	scene.add( room );

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const container = new ThreeMeshUI.Block( {
		width: 3,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'start',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		backgroundOpacity: 0
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	for ( let i = -2; i < 3; i++ ) {

		const letterSpace = i / 10;
		const opacity = letterSpace === 0 ? 1 : 0.5;

		const titleBox = new ThreeMeshUI.Block( {
			width: 1,
			height: 0.1,
			margin: 0.01,
			padding: 0.025,
			justifyContent: 'center',
			backgroundColor: new Color( 0xff9900 ),
			backgroundOpacity: opacity,
			textAlign: 'left'
		} );

		const title = new ThreeMeshUI.Text( {
			content: `.set({letterSpacing: ${letterSpace}})`,
			fontSize: 0.055,
		} );

		titleBox.add( title );

		const textBox = new ThreeMeshUI.Block( {
			width: 3,
			height: 0.1,
			margin: 0.01,
			justifyContent: 'center',
			backgroundOpacity: opacity,
		} );

		const text = new ThreeMeshUI.Text( {
			content: '.letterSpacing adds a constant space between each characters.',
			fontSize: 0.055,
			letterSpacing: letterSpace
		} );

		textBox.add( text );

		container.add( titleBox );
		container.add( textBox );
	}


	// Then add an animated one
	const animatedTitleBox = new ThreeMeshUI.Block( {
		width: 1,
		height: 0.1,
		margin: 0.01,
		padding: 0.025,
		justifyContent: 'center',
		backgroundColor: new Color( 0xff9900 ),
		backgroundOpacity: 0.5,
		textAlign: 'left'
	} );

	const animatedTitle = new ThreeMeshUI.Text( {
		content: `animated letterSpacing`,
		fontSize: 0.055,
	} );

	animatedTitleBox.add( animatedTitle );

	const animatedTextBox = new ThreeMeshUI.Block( {
		width: 3,
		height: 0.1,
		margin: 0.01,
		justifyContent: 'center',
		backgroundOpacity: 0.5
	} );

	animatedText = new ThreeMeshUI.Text( {
		content: '.letterSpacing adds a constant space between each characters.',
		fontSize: 0.055,
	} );

	animatedTextBox.add( animatedText );

	container.add( animatedTitleBox );
	container.add( animatedTextBox );


}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//
let letterSpacingSpeed = 0.005;

function loop( ) {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );


	// console.log( animatedText )

	// update letterSpacing
	let lspace = animatedText.getLetterSpacing();
	lspace += letterSpacingSpeed;

	if ( lspace < -0.6 ) {

		lspace = -0.6;
		letterSpacingSpeed *= -1;

	} else if ( lspace > 0.4 ) {

		lspace = 0.4;
		letterSpacingSpeed *= - 1;

	}

	animatedText.set({letterSpacing: lspace});

}
