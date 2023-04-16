// xfg:title FontKerning
// xfg:category learn

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import { Color } from 'three';

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
		width: 2,
		height: 0.3,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		backgroundOpacity: 0,
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.25;
	scene.add( container );

	//

	const infoBox = new ThreeMeshUI.Block( {
		width: 2,
		height: 0.1,
		margin: 0.01,
		padding: 0.025,
		textAlign: 'center'
	} );

	infoBox.add( new ThreeMeshUI.Text( {
		textContent: '.fontKerning adds spaces between pairs of characters that are defined in font files.\n',
	} ) );

	container.add( infoBox );

	container.add( makeKernedContainer( 'normal' ) );
	container.add( makeKernedContainer( 'none' ) );

}

function makeKernedContainer( kerning ) {

	const container = new ThreeMeshUI.Block( {
		width: 1.8,
		height: 0.12,
		padding: 0.05,
		flexDirection: "row",
		justifyContent: 'center',
		textAlign: 'left',
		backgroundOpacity: 0
	} );

	const titleBox = new ThreeMeshUI.Block( {
		width: 0.8,
		height: 0.1,
		margin: 0.01,
		padding: 0.025,
		justifyContent: 'center',
		backgroundColor: new Color( 0xff9900 ),
		textAlign: 'left'
	} );

	const title = new ThreeMeshUI.Text( {
		textContent: `.set({fontKerning: "${kerning}"})`,
		fontSize: 0.055
	} );

	titleBox.add( title );

	const textBox = new ThreeMeshUI.Block( {
		width: 1.4,
		height: 0.1,
		margin: 0.01,
		padding: 0.02,
		justifyContent: 'center',
		fontSize: 0.055,
	} );

	textBox.add(
		new ThreeMeshUI.Text( {
			textContent: '"LYON F. to ATLANTA GA. Via ALTOONA PA."',
			fontKerning: kerning,
		} )
	);

	container.add( titleBox );
	container.add( textBox );

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

	controls.update();
	renderer.render( scene, camera );

}
