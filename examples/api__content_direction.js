// xfg:title FlexDirection
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
	const flexDirections = [
		'row',						// 'row' or ThreeMeshUI.ContentDirection.ROW,
		'row-reverse',		// 'row-reverse' or ThreeMeshUI.ContentDirection.ROW_REVERSE,
		'column',					// 'column' or ThreeMeshUI.ContentDirection.COLUMN,
		'column-reverse'	// 'column-reverse' or ThreeMeshUI.ContentDirection.COLUMN_REVERSE,
	];

	for ( let i = 0; i < flexDirections.length; i++ ) {
		const flexDirection = flexDirections[ i ];
		makeTextPanel( i, flexDirection );
	}


	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel( index, flexDirection ) {


	const group = new Object3D();

	const title = new ThreeMeshUI.Block( {
		width: 1.5,
		height: 0.15,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xff9900 ),
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const titleText = new ThreeMeshUI.Text( {
		textContent: '.set({flexDirection: "' + flexDirection + '"})',
		fontSize: 0.075
	} );

	title.add( titleText );
	title.position.set( 0, 0.6, 0 );
	group.add( title );

	const container = new ThreeMeshUI.Block( {
		width: 1,
		height: 1,
		padding: 0.05,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: flexDirection,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const letters = 'ABCDEF';
	const colors = [ 0xff9900, 0xff0099, 0x00ff99, 0x99ff00, 0x9900ff, 0x0099ff ];

	for ( let i = 0; i < letters.length; i ++ ) {

		const blockText = new ThreeMeshUI.Block( {
			width: 0.125,
			height: 0.125,
			margin: 0.01,
			borderRadius: 0.02,
			backgroundColor: new THREE.Color(colors[i]),
			justifyContent: 'center',
			alignItems: 'center',
			offset:0.001
		} );



		const text = new ThreeMeshUI.Text( {
			textContent: letters[ i ]
		} );

		blockText.add( text );
		container.add( blockText );

	}

	// container.rotation.x = -0.25;
	group.add( container );

	group.position.set( -0.85 + (index%2 ) * 1.7 , 2.15 + Math.floor( index / 2 ) * -1.25, -2 );

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
