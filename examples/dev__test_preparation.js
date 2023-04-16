import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import { TextureLoader } from 'three';
import BoxLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxLayoutBehavior';
import FrameBasicMaterial from 'three-mesh-ui/examples/materials/frame/FrameBasicMaterial';
import BoxAnchorsBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxAnchorsBehavior';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener( 'load', step1BuildThreeJSElements );
window.addEventListener( 'resize', onWindowResize );

/***********************************************************************************************************************
 * THREE-MESH-UI - BASIC SETUP
 * ---------------------------
 *
 * This tutorial is made of 3 steps, split by functions:
 *    - step1BuildThreeJSElements()
 *    - step2BuildThreeMeshUIElements()
 *    - step3AnimationLoop()
 *
 * Be sure to read all of their comments, in the proper order before going for another tutorial.
 **********************************************************************************************************************/


// three-mesh-ui requires working threejs setup
// We usually build the threejs stuff prior three-mesh-ui
function step1BuildThreeJSElements() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	// camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );
	camera = new THREE.OrthographicCamera( WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000 );


	renderer = new THREE.WebGLRenderer( {
		antialias: true
	} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );



	camera.position.set( 0, 1.6, 0 );
	camera.zoom = 750;
	camera.updateProjectionMatrix();

	window.camera = camera;

	controls = new OrbitControls( camera, renderer.domElement );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM
	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// Now that we have the threejs stuff up and running, we can build our three-mesh-ui stuff
	// Let's read that function
	step2BuildThreeMeshUIElements();

	// three-mesh-ui requires to be updated prior each threejs render, let's go see what is in step3AnimationLoop()
	renderer.setAnimationLoop( step3AnimationLoop );

}

//
function step2BuildThreeMeshUIElements() {


	// const padding = '0.1 0 0.3 0';
	const padding = '0.1 0.5 0.2 0.2';
	const flexDirection = 'row';
	const justifyContent = 'center';
	const alignItems = 'center';

	const rootBlock = new ThreeMeshUI.Block( {

		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		padding,
		boxSizing: 'border-box',


		flexDirection,
		justifyContent,
		alignItems,

		backgroundColor: new THREE.Color(0xffffff),
		backgroundImage : new TextureLoader().load("./assets/uv_grid.jpg"),

		// borderWidth: 0.1,
		// borderWidth: '0 0.2 .05 0.2',
		// borderColor: new THREE.Color(0x000000),

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',


	} );


	scene.add( rootBlock );

	rootBlock.position.set( -0.65, 1, -1.8 );

	const child1 = new ThreeMeshUI.Block( {
		backgroundColor: new THREE.Color(0x000000),
		width: 0.1,
		height: 0.1,
		margin:0.1,
		padding: 0,
		offset: 0.001,

	} );

	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock.add(


		child1,

		new ThreeMeshUI.Block( {
			backgroundColor: new THREE.Color(0x000000),
			width: 0.1,
			height: 0.1,
			margin:0.1,
			padding: 0,
			offset: 0.001,

		} )

	);

	new BoxLayoutBehavior( rootBlock ).attach();
	new BoxAnchorsBehavior( rootBlock ).attach();

	const rootBlock2 = new ThreeMeshUI.Block( {

		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		padding,
		boxSizing: 'content-box',

		// A Block can define its "layout" properties
		// flexDirection: 'row-reverse',
		flexDirection,
		justifyContent,
		alignItems,

		backgroundColor: new THREE.Color(0xffffff),
		backgroundImage : new TextureLoader().load("./assets/uv_grid.jpg"),
		backgroundSize: 'stretch',

		// borderWidth: 0.1,
		// borderWidth: '0 0.2 .05 0.2',
		// borderColor: new THREE.Color(0x000000),

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',


	} );

	rootBlock2.backgroundMaterial = new FrameBasicMaterial({});


	scene.add( rootBlock2 );

	rootBlock2.position.set( 0.65, 1, -1.8 );

	const child11 = new ThreeMeshUI.Block( {
		backgroundColor: new THREE.Color(0x000000),
		width: 0.1,
		height: 0.1,
		// margin:0.1,
		padding: 0,
		offset: 0.001,

	} );

	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock2.add(

		child11,
		new ThreeMeshUI.Block( {
			backgroundColor: new THREE.Color(0x000000),
			width: 0.1,
			height: 0.1,
			margin: '0.2 0 0 0.1',
			// margin: 0.1,
			padding: 0,
			offset: 0.001,

		} ),
		new ThreeMeshUI.Block( {
			backgroundColor: new THREE.Color(0x000000),
			width: 0.1,
			height: 0.1,
			padding: 0,
			offset: 0.001,

		} )

	);

	new BoxLayoutBehavior( rootBlock2 ).attach();
	new BoxAnchorsBehavior( rootBlock2 ).attach();

	rootBlock2.addAfterUpdate( () => {

		rootBlock2.backgroundMaterial.map.matrixAutoUpdate = true;

		rootBlock2.backgroundMaterial.map.offset.set(
			-rootBlock2._padding.w,
			-rootBlock2._padding.z
		);

		rootBlock2.backgroundMaterial.map.repeat.set(
			rootBlock2.offsetWidth / rootBlock2.innerWidth,
			rootBlock2.offsetHeight / rootBlock2.innerHeight
		);

	});

}

// In order to see things, we need to render them, usually on each frame
function step3AnimationLoop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}


// handles resizing the renderer when the viewport is resized
// common threejs stuff
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


