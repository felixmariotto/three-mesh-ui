//xfg:title Arrows

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import Arrows from 'three-mesh-ui/examples/utils/Arrows';
import { Object3D } from 'three';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, cameraP, renderer, controls;
let vrCam;

window.addEventListener('load', step1BuildThreeJSElements );

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

	cameraP = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	camera = new Object3D();
	camera.add( cameraP );


	renderer = new THREE.WebGLRenderer( {
		antialias: true
	} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( cameraP, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();



	renderer.xr.addEventListener('sessionstart', ()=>{
		console.log("SEWSSIONB XR")

		console.log( renderer.xr );
		console.log( );

		vrCam = renderer.xr.getCamera(null);
		console.log( vrCam );
	})
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


	window.addEventListener( 'resize', onWindowResize );
}

//
function step2BuildThreeMeshUIElements() {

	// If we are going to display ThreeMeshUI Text elements
	// It is important to know that a Text MUST have a Block as parent
	// Using three-mesh-ui, we would usually have one or more rootBlock elements
	const rootBlock = new ThreeMeshUI.Block( {

		name: 'rootBlock',
		// A Block must define its "box-sizing" properties
		width: 1.2,
		height: 'auto', // the text will define the output height
		padding: 0.05,
		boxSizing: 'border-box',

		// A Block can define its "layout" properties
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'left',

		borderRadius: 0.015,

		backgroundColor : 0x000000,
		backgroundOpacity : 0.5,

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
	scene.add( rootBlock );

	// three-mesh-ui Block are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;

	const blockText = new ThreeMeshUI.Text({ textContent: "Block arrows", width: 'auto' });



	const arrowLeft = new ThreeMeshUI.Block({width:0.1,height:0.1} );
	const arrowRight = new ThreeMeshUI.Block({width:0.1,height:0.1, } );
	const arrowTop = new ThreeMeshUI.Block({width:0.1,height:0.1,marginLeft: 0.05} );
	const arrowBottom = new ThreeMeshUI.Block({width:0.1,height:0.1, marginLeft: 0.05} );



	Arrows( arrowLeft, 0.04, "left", 0xffffff );
	Arrows( arrowRight, 0.04, "right", 0xffffff );
	Arrows( arrowTop, 0.04, "top", 0xffffff );
	Arrows( arrowBottom, 0.04, "bottom", 0xffffff );


	const blockArrows = new ThreeMeshUI.Block({flexDirection:'row',margin: '0.05 0'});


	blockArrows.add(

		arrowLeft, arrowRight, arrowTop, arrowBottom,

	);

	rootBlock.add( blockText, blockArrows)



	const blockInlineText = new ThreeMeshUI.Text({ textContent: "Inline arrows", width: 'auto' });



	const arrowInlineLeft = new ThreeMeshUI.InlineBlock({width:'50%', height:'50%',} );
	const arrowInlineRight = new ThreeMeshUI.InlineBlock({width:'50%', height:'50%',} );
	const arrowInlineTop = new ThreeMeshUI.InlineBlock({width:'50%', height:'50%', marginLeft: 0.025} );
	const arrowInlineBottom = new ThreeMeshUI.InlineBlock({width:'50%', height:'50%', marginLeft: 0.025} );



	Arrows( arrowInlineLeft, 0.008, "left", 0xffffff );
	Arrows( arrowInlineRight, 0.008, "right", 0xffffff );
	Arrows( arrowInlineTop, 0.008, "top", 0xffffff );
	Arrows( arrowInlineBottom, 0.008, "bottom", 0xffffff );


	const inlineArrows = new ThreeMeshUI.Text({textContent:"text arrows : "});


	inlineArrows.add(

		arrowInlineLeft, arrowInlineRight, arrowInlineTop, arrowInlineBottom,

	);

	rootBlock.add( blockInlineText, inlineArrows)


	const but = new ThreeMeshUI.Text({textContent:"re-ordered"});
	const arrow1 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', order: -2});
	const arrow2 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', order: -1, marginRight: 0.025});
	Arrows( arrow1, 0.014, 'right', 0x00ff99 );
	Arrows( arrow2, 0.014, 'right', 0x00ff99 );

	const arrow3 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', marginLeft:0.025});
	const arrow4 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%'});
	Arrows( arrow3, 0.014, 'left', 0x00ff99 );
	Arrows( arrow4, 0.014, 'left', 0x00ff99 );

	but.add( arrow1, arrow2, arrow3, arrow4 );

	rootBlock.add( but );


	// but2

	const but2 = new ThreeMeshUI.Text({textContent:"re-ordered"});
	const arrow21 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', order: -2});
	const arrow22 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', order: -1, marginRight: 0.025});
	Arrows( arrow21, 0.014, 'left', 0x00ff99 );
	Arrows( arrow22, 0.014, 'left', 0x00ff99 );

	const arrow23 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%', marginLeft:0.025});
	const arrow24 = new ThreeMeshUI.InlineBlock({width:'50%',height:'50%'});
	Arrows( arrow23, 0.014, 'right', 0x00ff99 );
	Arrows( arrow24, 0.014, 'right', 0x00ff99 );
	// const arrow2 = arrow1.clone()


	but2.add( arrow21, arrow22, arrow23, arrow24 );

	rootBlock.add( but2 );


	ThreeMeshUI.update();
	console.log( arrow2._margin._value );

}

// In order to see things, we need to render them, usually on each frame
function step3AnimationLoop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	// camera.position.x = Math.random()*3;
	//
	// if( vrCam ) {
	// 	renderer.xr.updateCamera(cameraP);
	// }

	controls.update();
	renderer.render( scene, cameraP );

}


// handles resizing the renderer when the viewport is resized
// common threejs stuff
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


