import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';
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
	const whitespaces = [
		'normal', 		// 'normal' or ThreeMeshUI.whiteSpace.NORMAL
		'pre-line', 	// 'pre-line' or ThreeMeshUI.whiteSpace.PRE_LINE
		'pre-wrap', 	// 'pre-wrap' or ThreeMeshUI.whiteSpace.PRE_WRAP
		'pre', 				// 'pre' or ThreeMeshUI.whiteSpace.PRE
		'nowrap', 		// 'nowrap' or ThreeMeshUI.whiteSpace.NOWRAP
	];

	for ( let i = 0; i < whitespaces.length; i++ ) {
		const whitespace = whitespaces[ i ];
		makeTextPanel(i, whitespace, i=== whitespaces.length-1);
	}


	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel( index, whitespace, last = false) {


	const group = new Object3D();

	const title = new ThreeMeshUI.Block( {
		width: 1.15,
		height: 0.15,
		padding: 0.05,
		backgroundColor: new THREE.Color(0xff9900),
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const titleText = new ThreeMeshUI.Text( {
			content: '.set({whiteSpace: "'+whitespace+'"})',
			fontSize: 0.075
		} );

	title.add(
		titleText
	);
	title.position.set( 0, 0.55, 0 );
	group.add( title );

	const container = new ThreeMeshUI.Block( {
		width: 0.91,
		height: 0.85,
		padding: 0.05,
		justifyContent: 'center',
		alignItems: 'start',
		textAlign: 'left',
		whiteSpace: whitespace,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	// container.rotation.x = -0.25;
	group.add( container );

	//

	container.add(
		new ThreeMeshUI.Text( {
			content: `But ere she from the church-door stepped
     She smiled and told us why:
'It was a wicked woman's curse,'
     Quoth she, 'and what care I?'

She smiled, and smiled, and passed it off
     Ere from the door she stept. -`,
			fontSize: 0.055
		} )
	);

	group.position.set( -1.35 + index%3 * 1.35 , 2.15 + Math.floor(index / 3) * -1.15 , -2);

	if( last ){

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
