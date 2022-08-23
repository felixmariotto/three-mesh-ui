import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import ThreeIcon from 'three-mesh-ui/examples/assets/threejs.png';
import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, container;

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

	container = new ThreeMeshUI.Text( {
		width: 2.2,
		height: 0.95,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.05,
		letterSpacing : 0
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const loader = new THREE.TextureLoader();



	loader.load( ThreeIcon, ( texture ) => {

		window.icon1 = new ThreeMeshUI.InlineBlock( {
			height: 0.2,
			width: 0.4,
			backgroundTexture: texture,
			backgroundOpacity: 0.75
		} );


		container.add(
			new ThreeMeshUI.Inline( {
				fontSize: 0.09,
				content: 'three-mesh-ui supports inline blocks\n'
			} ),

			new ThreeMeshUI.Inline( {
				fontSize: 0.07,
				content: 'Here is a first InlineBlock ',
				fontColor: new THREE.Color( 0xffc654 )
			} ),

			window.icon1,

			new ThreeMeshUI.Inline( {
				fontSize: 0.07,
				content: '\nand this is a second ',
				fontColor: new THREE.Color( 0xffc654 )
			} ),

			new ThreeMeshUI.InlineBlock( {
				height: 0.2,
				width: 0.4,
				backgroundTexture: texture,
				backgroundColor: new THREE.Color( 0x00ff00 ),
				backgroundOpacity: 0.3
			} ),

			new ThreeMeshUI.Inline( {
				fontSize: 0.07,
				content: ' with modified color and opacity.',
				fontColor: new THREE.Color( 0xffc654 )
			} ),

			new ThreeMeshUI.Inline( { content: `\nIt works like a Block component, but can be positioned among inline components like text. Perfect for icons and emojis.` } )
		);

	} );

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
