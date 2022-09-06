// xfg:title Nested block
// xfg:category practice

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import SnakeImage from './assets/spiny_bush_viper.jpg';

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
		ref: 'container',
		padding: 0.025,
		fontFamily: FontJSON,
		fontTexture: FontImage,
		color: new THREE.Color( 0xffffff ),
		backgroundOpacity: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems : 'center',
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const title = new ThreeMeshUI.Text( {
		// height: 'auto',
		width: '80%',
		margin: 0.025,
		padding: '0.01 0.1',
		textAlign: 'center',
		fontSize: 0.09,
		textContent: 'spiny bush viper',
		backgroundColor: 0xff9900
	} );

	container.add( title );

	//

	const leftSubBlock = new ThreeMeshUI.Block( {
		height: 0.95,
		width: 1.0,
		margin: 0.025,
		padding: 0.025,
		textAlign: 'left',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'end',
	} );

	const caption = new ThreeMeshUI.Text( {
		width: '100%',
		margin: 0.025,
		padding: 0.025,
		textAlign: 'center',
		textContent: 'Mind your fingers',
		backgroundColor: 0x000000,
		backgroundOpacity: 0.5,
		fontSize: 0.04,
	} );

	leftSubBlock.add( caption );

	//

	const rightSubBlock = new ThreeMeshUI.Block( {
		margin: 0.025,
		width: 0.5,
		padding: 0.025,
		backgroundColor : 0x000000,
		backgroundOpacity : 0.5,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	} );

	const subSubBlock1 = new ThreeMeshUI.Text( {
		margin: 0.025,
		fontSize: 0.04,
		backgroundOpacity: 0,
		textAlign: 'center',
	} ).add(
		new ThreeMeshUI.Inline( {
			textContent: 'Known for its extremely keeled dorsal scales that give it a ',
		} ),

		new ThreeMeshUI.Inline( {
			textContent: 'bristly',
			color: new THREE.Color( 0x92e66c ),
		} ),

		new ThreeMeshUI.Inline( {
			textContent: ' appearance.',
		} )
	);

	const subSubBlock2 = new ThreeMeshUI.Text( {
		margin: 0.01,
		padding: 0.02,
		fontSize: 0.025,
		alignItems: 'start',
		textAlign: 'justify',
		backgroundOpacity: 0,
		textContent: 'The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\n\nThe head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales.',
	} );

	rightSubBlock.add( subSubBlock1, subSubBlock2 );

	//

	const contentContainer = new ThreeMeshUI.Block( {
		flexDirection: 'row',
		alignItems: 'stretch',
		padding: 0.02,
		margin: 0.025,
		backgroundOpacity: 0,
	} );

	contentContainer.add( leftSubBlock, rightSubBlock );
	container.add( contentContainer );

	//

	new THREE.TextureLoader().load( SnakeImage, ( texture ) => {
		leftSubBlock.set( {
			backgroundColor: new THREE.Color( 0xffffff ),
			backgroundOpacity: 1,
			backgroundImage: texture,
		} );
	} );
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
