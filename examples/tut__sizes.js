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

	const rootBlock = new ThreeMeshUI.Block( {
		name: 'rootBlock',
		width: 2,
		height: 2,
		padding: 0.1,
		fontFamily: FontJSON,
		fontTexture: FontImage,
		color: new THREE.Color( 0xffffff ),

		backgroundColor: 0x000000,
		backgroundOpacity: 0.25,

		flexDirection: 'column',
		justifyContent: 'center',
		alignItems : 'stretch',
	} );

	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;

	window.rootBlock = rootBlock;

	scene.add( rootBlock );


	const innerBlock = new ThreeMeshUI.Block({
		name: "innerBlock",
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: 0xff9900,
	})

	rootBlock.add( innerBlock );

	const letters = "ABCDE";
	for ( let i = 0; i < 4; i++ ) {
		const item = new ThreeMeshUI.Text({
			width: 0.2,
			height: '100%',
			textContent: letters[i],
			textAlign: 'center',
			alignItems: 'center',
			margin: 0.025,
			backgroundColor : 'red',
			backgroundOpacity : 1
		})

		innerBlock.add( item );
	}

}

//

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//

function loop() {

	const now = Date.now();

	window.rootBlock.set( {
		width: Math.sin( now / 1000 ) * 0.5 + 1.5,
		height: Math.sin( now / 500 ) * 0.5 + 1.5
	} );

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
}
