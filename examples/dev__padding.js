import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import BoxLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxLayoutBehavior';

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
	camera.zoom = 250;
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

	const container = new ThreeMeshUI.Block({
		width: 8,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	});

	container.position.set( 0 , 1 , -2);
	scene.add( container );

	// If we are going to display ThreeMeshUI Text elements
	// It is important to know that a Text MUST have a Block as parent
	// Using three-mesh-ui, we would usually have one or more rootBlock elements
	const rootBlock = new ThreeMeshUI.Block( {
		boxSizing: 'border-box',
		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		// margin: 0.05,
		// padding: '0 0.225 0 0',
		// padding: '0.25 0 0 0.1',
		// padding: '0 0 0.1 0.1',
		// padding: '0.1 0.2 0.1 0',
		padding: '0 0 0.1 0.5',
		// padding: 0.1,
		// padding: '0.1 .2 .2 0.1',

		// A Block can define its "layout" properties
		// flexDirection: 'row-reverse',
		flexDirection: 'row',
		justifyContent: 'start',
		alignItems: 'start',
		textAlign: 'justify',

		backgroundColor: new THREE.Color(0xffffff),
		// backgroundTexture : new TextureLoader().load("./assets/uv_grid.jpg"),

		// borderWidth: 0.1,
		// borderWidth: '0 0.2 .05 0.1',
		borderColor: new THREE.Color(0x000000),

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	container.add( rootBlock );

	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock.add(

		// new ThreeMeshUI.Text( {
		// 	// three-mesh-ui Text should defined their flexDirection to display
		// 	content: 'this is a text made of small words ',
		//
		// 	// if a Text is going to use the exact same Text properties as defined in its parent
		// 	// there is no need to set those properties again
		// 	// fontSize: 0.055,
		// 	// fontFamily: './assets/fonts/msdf/roboto/regular.json',
		// 	// fontTexture: './assets/fonts/msdf/roboto/regular.png',
		//
		// } ),

		new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0x000000),
			width: 0.1,
			height: 0.1,

			// margin: 0.05,
			padding: 0,
			offset: 0.001,

		} ),

		new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0xffff99),
			width: 0.1,
			height: 0.1,

			// margin: 0.05,
			padding: 0,
			offset: 0.001,

		} ),

		new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0xff0000),
			width: 0.1,
			height: 0.1,
			// margin: 0.05,
			padding: 0,
			offset: 0.001,

		} ),

	);

	new BoxLayoutBehavior( rootBlock ).attach();

	const settings = [
		//top left -- column
		{flexDirection:'column', justifyContent: 'start', alignItems: 'start'},
		{flexDirection:'column-reverse', justifyContent: 'end', alignItems: 'start'},
					// {flexDirection:'column', justifyContent: 'space-between', alignItems: 'start'},
					// {flexDirection:'column-reverse', justifyContent: 'space-between', alignItems: 'start'},
					// {flexDirection:'column', justifyContent: 'space-around', alignItems: 'start'},
					// {flexDirection:'column-reverse', justifyContent: 'space-around', alignItems: 'start'},
					// {flexDirection:'column', justifyContent: 'space-evenly', alignItems: 'start'},
					// {flexDirection:'column-reverse', justifyContent: 'space-evenly', alignItems: 'start'},
		//top left -- row
		{flexDirection:'row', justifyContent: 'start', alignItems: 'start'},
		{flexDirection:'row-reverse', justifyContent: 'end', alignItems: 'start'},
					// {flexDirection:'row', justifyContent: 'space-between', alignItems: 'start'},
					// {flexDirection:'row-reverse', justifyContent: 'space-between', alignItems: 'start'},
					// {flexDirection:'row', justifyContent: 'space-around', alignItems: 'start'},
					// {flexDirection:'row-reverse', justifyContent: 'space-around', alignItems: 'start'},
					// {flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'start'},
					// {flexDirection:'row-reverse', justifyContent: 'space-evenly', alignItems: 'start'},
		// top center
		{flexDirection:'column', justifyContent: 'start', alignItems: 'center'},
		{flexDirection:'column-reverse', justifyContent: 'end', alignItems: 'center'},
					// {flexDirection:'column', justifyContent: 'space-between', alignItems: 'center'},
					// {flexDirection:'column-reverse', justifyContent: 'space-between', alignItems: 'center'},
					// {flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'},
					// {flexDirection:'column-reverse', justifyContent: 'space-around', alignItems: 'center'},
					// {flexDirection:'column', justifyContent: 'space-evenly', alignItems: 'center'},
					// {flexDirection:'column-reverse', justifyContent: 'space-evenly', alignItems: 'center'},
		// top center -- row
		{flexDirection:'row', justifyContent: 'center', alignItems: 'start'},
		{flexDirection:'row-reverse', justifyContent: 'center', alignItems: 'start'},
					// {flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'},
					// {flexDirection:'row-reverse', justifyContent: 'space-between', alignItems: 'center'},
					// {flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'},
					// {flexDirection:'row-reverse', justifyContent: 'space-around', alignItems: 'center'},
					// {flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'center'},
					// {flexDirection:'row-reverse', justifyContent: 'space-evenly', alignItems: 'center'},
		// top right
		{flexDirection:'column', justifyContent: 'start', alignItems: 'end'},
		{flexDirection:'column-reverse', justifyContent: 'end', alignItems: 'end'},
		// top right -- row
		{flexDirection:'row', justifyContent: 'end', alignItems: 'start'},
		{flexDirection:'row-reverse', justifyContent: 'start', alignItems: 'start'},

		// middle right
		{flexDirection:'column', justifyContent: 'center', alignItems: 'end'},
		{flexDirection:'column-reverse', justifyContent: 'center', alignItems: 'end'},
		// middle right -- row
		{flexDirection:'row', justifyContent: 'end', alignItems: 'center'},
		{flexDirection:'row-reverse', justifyContent: 'start', alignItems: 'center'},

		// bottom right
		{flexDirection:'column', justifyContent: 'end', alignItems: 'end'},
		{flexDirection:'column-reverse', justifyContent: 'start', alignItems: 'end'},
		// bottom right -- row
		{flexDirection:'row', justifyContent: 'end', alignItems: 'end'},
		{flexDirection:'row-reverse', justifyContent: 'start', alignItems: 'end'},

		// bottom center
		{flexDirection:'column', justifyContent: 'end', alignItems: 'center'},
		{flexDirection:'column-reverse', justifyContent: 'start', alignItems: 'center'},
		// bottom center -- row
		{flexDirection:'row', justifyContent: 'center', alignItems: 'end'},
		{flexDirection:'row-reverse', justifyContent: 'center', alignItems: 'end'},

		//bottom left
		{flexDirection:'column', justifyContent: 'end', alignItems: 'start'},
		{flexDirection:'column-reverse', justifyContent: 'start', alignItems: 'start'},
		//bottom left -- row
		{flexDirection:'row', justifyContent: 'start', alignItems: 'end'},
		{flexDirection:'row-reverse', justifyContent: 'end', alignItems: 'end'},

		// middle left
		{flexDirection:'column', justifyContent: 'center', alignItems: 'start'},
		{flexDirection:'column-reverse', justifyContent: 'center', alignItems: 'start'},
		// middle left -- row
		{flexDirection:'row', justifyContent: 'start', alignItems: 'center'},
		{flexDirection:'row-reverse', justifyContent: 'end', alignItems: 'center'},

		// middle center
		{flexDirection:'column', justifyContent: 'center', alignItems: 'center'},
		{flexDirection:'column-reverse', justifyContent: 'center', alignItems: 'center'},
		// middle center -- row
		{flexDirection:'row', justifyContent: 'center', alignItems: 'center'},
		{flexDirection:'row-reverse', justifyContent: 'center', alignItems: 'center'},
	]



	const rootBlock2 = new ThreeMeshUI.Block( {

		boxSizing: 'border-box',

		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		margin: 0.05,
		// padding: '0 0.225 0 0',
		// padding: '0.25 0 0 0.1',
		padding: '0.2 0.25 0.1 0.1',
		// padding: '0.1 0.2 0.3 0.4',

		// A Block can define its "layout" properties
		flexDirection: 'row',
		// flexDirection: 'column-reverse',
		justifyContent: 'start',
		alignItems: 'start',
		// textAlign: 'justify-left',
		textAlign: 'right',

		backgroundColor: new THREE.Color(0xffffff),
		// backgroundTexture : new TextureLoader().load("./assets/uv_grid.jpg"),

		borderWidth: '0.1 0.05 0.05 0.1',
		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	container.add( rootBlock2 );


	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock2.add(

		new ThreeMeshUI.Text( {
			// three-mesh-ui Text should defined their content to display
			textContent: 'this is a text made of small words '.repeat(2),

			// if a Text is going to use the exact same Text properties as defined in its parent
			// there is no need to set those properties again
			// fontSize: 0.055,
			// fontFamily: './assets/fonts/msdf/roboto/regular.json',
			// fontTexture: './assets/fonts/msdf/roboto/regular.png',

		} ),

	);

	new BoxLayoutBehavior( rootBlock2 ).attach();


	// If we are going to display ThreeMeshUI Text elements
	// It is important to know that a Text MUST have a Block as parent
	// Using three-mesh-ui, we would usually have one or more rootBlock elements
	const rootBlock3 = new ThreeMeshUI.Block( {

		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		// margin: 0.05,
		// padding: '0 0.225 0 0',
		// padding: '0.25 0 0 0.1',
		// padding: '0 0 0.1 0.1',
		// padding: '0.1 0.2 0.3 0.4',
		padding: '0.1 0 0.1 0.5',

		// A Block can define its "layout" properties
		// flexDirection: 'column',
		flexDirection: 'column-reverse',
		// flexDirection: 'row',
		// flexDirection: 'row-reverse',
		justifyContent: 'start',
		alignItems: 'end',
		textAlign: 'justify',
		boxSizing: 'content-box',

		// borderWidth: '0.1 0 0.1 0.05',
		backgroundColor: new THREE.Color(0xffffff),
		// backgroundTexture : new TextureLoader().load("./assets/uv_grid.jpg"),
		backgroundSize: 'stretch',

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	container.add( rootBlock3 );

	const childWithMargin = new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0xff9900),
			width: 0.1,
			height: 0.1,
			// margin:'0 0 0.1 0.1',
			// margin:'0.2 0 0.1 0',
			margin:'0.1 0.1 0.2 0.05',
			// margin:'0.1',
			padding: 0,
			offset: 0.001,

		} );

	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock3.add(


		new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0xffffff),
			width: 0.1,
			height: 0.1,
			margin:0,
			padding: 0,
			offset: 0.001,

		} ),

		childWithMargin,

		new ThreeMeshUI.Block( {
			// three-mesh-ui Text should defined their content to display
			backgroundColor: new THREE.Color(0xffffff),
			width: 0.1,
			height: 0.1,
			margin:0,
			padding: 0,
			offset: 0.001,

		} ),

	);

	new BoxLayoutBehavior( rootBlock3 ).attach();
	// new BoxLayoutBehavior( childWithMargin ).attach();




	const rootBlock4 = new ThreeMeshUI.Block( {

		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		margin: 0.05,
		// padding: '0 0.225 0 0',
		// padding: '0.25 0 0 0.1',
		padding: '0.4 0.25 0.1 0.1',
		// padding: '0.1 0.2 0.3 0.4',

		// A Block can define its "layout" properties
		flexDirection: 'row',
		// flexDirection: 'column-reverse',
		justifyContent: 'start',
		alignItems: 'start',
		// textAlign: 'justify-left',
		textAlign: 'right',
		boxSizing: 'content-box',

		borderWidth: '0.1 0 0.05 0.1',
		backgroundColor: new THREE.Color(0xffffff),
		// backgroundTexture : new TextureLoader().load("./assets/uv_grid.jpg"),

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: './assets/fonts/msdf/roboto/regular.json',
		fontTexture: './assets/fonts/msdf/roboto/regular.png',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	container.add( rootBlock4 );


	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	rootBlock4.add(

		new ThreeMeshUI.Text( {
			// three-mesh-ui Text should defined their content to display
			textContent: 'this is a text made of small words '.repeat(2),

			// if a Text is going to use the exact same Text properties as defined in its parent
			// there is no need to set those properties again
			// fontSize: 0.055,
			// fontFamily: './assets/fonts/msdf/roboto/regular.json',
			// fontTexture: './assets/fonts/msdf/roboto/regular.png',

		} ),

	);

	new BoxLayoutBehavior( rootBlock4 ).attach();


	let settingIndex = -1;

	setInterval( ()=>{
		settingIndex++;
		if( settingIndex > settings.length - 1 ){
			settingIndex = 0;
		}

		rootBlock.set( settings[settingIndex] );
		rootBlock2.set( settings[settingIndex] );
		rootBlock3.set( settings[settingIndex] );
		rootBlock4.set( settings[settingIndex] );
	}, 250)


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


