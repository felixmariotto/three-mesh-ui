
// xfg:title 				Align Items
// xfg:type  				api
// xfg:description  This description is updated & printed on html upon each build
// xfg:contribution Implemented by <a href="https://github.com/random_human">@random_human</a> and sponsorized by <a href="https://www.some-company.com/">SomeCompany</a>


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
	const alignItems = [
		'start',					// 'start' or ThreeMeshUI.AlignItems.START,
		'end',						// 'end' or ThreeMeshUI.AlignItems.END,
		'center',					// 'center' or ThreeMeshUI.AlignItems.CENTER,
		'stretch',		// 'space-around' or ThreeMeshUI.AlignItems.STRETCH
	];

	for ( let i = 0; i < alignItems.length; i++ ) {
		const alignItem = alignItems[ i ];
		makeTextPanelColumn( i, alignItem );
		makeTextPanelRow( i, alignItem );
	}

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanelColumn( index, flexDirection ) {


	const group = new Object3D();

	const title = new ThreeMeshUI.Block( {
		width: 0.75,
		height: 0.15,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xff9900 ),
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const titleText = new ThreeMeshUI.Text( {
		textContent: flexDirection,
		fontSize: 0.075
	} );

	title.add( titleText );
	title.position.set( 0, 0.6, 0 );
	group.add( title );

	const container = new ThreeMeshUI.Block( {
		width: 0.7,
		height: 1,
		padding: 0.01,
		justifyContent: "space-evenly",
		alignItems: flexDirection,
		flexDirection: 'column',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const letters = 'ABC';
	const colors = [ 0xff9900, 0xff0099, 0x00ff99, 0x99ff00, 0x9900ff, 0x0099ff ];

	for ( let i = 0; i < letters.length; i ++ ) {

		const blockText = new ThreeMeshUI.Block( {
			width: 0.125,
			height: 0.125,
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

	group.position.set( -0.4 * 3  + (index%6 ) * 0.8 , 2.15 + Math.floor( index / 6 ) * -1.25, -2 );

	scene.add( group );

}

function makeTextPanelRow( index, flexDirection ) {


	const group = new Object3D();

	const title = new ThreeMeshUI.Block( {
		width: 1.4,
		height: 0.15,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0xff9900 ),
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const titleText = new ThreeMeshUI.Text( {
		textContent: `.set({justifyContent: "${flexDirection}"})`,
		fontSize: 0.075
	} );

	title.add( titleText );
	title.position.set( -2.3, 0, 0 );
	group.add( title );

	const container = new ThreeMeshUI.Block( {
		width: 3,
		height: 0.3,
		padding: 0.01,
		justifyContent: "space-evenly",
		alignItems: flexDirection,
		flexDirection: 'row',
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	const letters = 'ABC';
	const colors = [ 0xff9900, 0xff0099, 0x00ff99, 0x99ff00, 0x9900ff, 0x0099ff ];

	for ( let i = 0; i < letters.length; i ++ ) {

		const blockText = new ThreeMeshUI.Block( {
			width: 0.125,
			height: 0.125,
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

	// group.position.set( -0.4 * 5  + (index%6 ) * 0.8 , 2.15 + Math.floor( index / 6 ) * -1.25, -2 );
	group.position.set( 0.7 ,1.35 + (index%6 ) * -0.325, -2 );

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

export const infos = {nbo:"fdsfds"};

