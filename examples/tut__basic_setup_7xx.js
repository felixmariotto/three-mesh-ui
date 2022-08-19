import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';
import * as FontWeight from '../src/utils/font/FontWeight';
import * as FontStyle from '../src/utils/font/FontStyle';
import MSDFNormalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFNormalMaterial';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

// Using `ThreeMeshUI.FontLibrary.prepare( fontFamily, [...fontFamily] )
// We can ensure any fontFamily passed in that function and theirs variants are properly loaded and setup
FontLibrary.prepare(

	FontLibrary
		// Registering a fontFamily called "Roboto", the name is up to us.
		.addFontFamily("Roboto")
		// On the fontFamily added, lets add a variant
		// a font variant usually requires 4 parameters
		.addVariant(
			// The weight of the variant '100'|'200'|'300'|'400'|'600'|'700'|'800'|'900'
			//														LIGHTER					NORMAL			BOLD				BOLDER
			FontWeight.NORMAL,

			// The style of the variant 'normal'|'italic'|'oblique'|'oblique(x deg)'
			FontStyle.NORMAL,

			// The json definition of the msdf font 'urlToLoad'|loadedObject
			"./assets/fonts/msdf/roboto/regular.json",

			// The texture of the msdf font 'urlToLoad'|Texture
			"./assets/fonts/msdf/roboto/regular.png"
		)

		// Registering additional variants
		.addVariant(FontWeight.BOLD, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
		.addVariant(FontWeight.BOLD, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
		.addVariant(FontWeight.NORMAL, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

// FontLibrary.prepare() returns a Promise, we can therefore add a callback to be executed when all files are loaded
).then( () => {

	// Once font are registered, we can get the font family
	const RobotoFamily = FontLibrary.getFontFamily("Roboto");

	// And then retrieve a fontVariant defined in this Family
	const RobotoRegular = RobotoFamily.getVariant('400','normal');

	// Having font variant allows us to perform some modifications
	// 1. Adjustments
	// If you look closely the `Getting started - Basic Setup` you may have noticed that :
	// 		- the `h` character is slightly below the baseline
	// This can be adjusted per fontVariant
	RobotoRegular.adjustTypographicGlyphs( {
		// 'h' character must change some of its properties defined in the json
		h: {
			// the yoffset property should be 2 (instead of 4 in the json)
			yoffset: 2
		}
	} );
	// Once adjusted, any three-mesh-ui Text using this font variant will use the adjusted properties

	// 1. Material
	// Instead of assigning custom materials to Text one by one
	// We can assign a Material(class) to a font variant (Here the bold one)
	RobotoFamily.getVariant('700','normal').fontMaterial = MSDFNormalMaterial;
	// Once set, any three-mesh-ui Text using this font variant will use the defined material

	// We may encounter the following lines in other examples,
	// they are adjusting font variants to display a nice baseline
	RobotoFamily.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	RobotoFamily.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	RobotoFamily.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

	// Now that the font are loaded and adjusted,
	step1BuildThreeJSElements();


});

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
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM
	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 12, 12, 12 ),
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

	// If we are going to display ThreeMeshUI Text elements
	// It is important to know that a Text MUST have a Block as parent
	// Using three-mesh-ui, we would usually have one or more rootBlock elements
	const rootBlock = new ThreeMeshUI.Block( {

		name: 'rootBlock',
		// A Block must define its "box-sizing" properties
		// width: 2,
		// height: 2,
		padding: 0.25,
		boxSizing: 'content-box',
		// boxSizing: 'border-box',

		// A Block can define its "layout" properties
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		textAlign: 'left',

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: 'Roboto',
		backgroundColor: 'red',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	window.rootBlock = rootBlock;

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	scene.add( rootBlock );

	// three-mesh-ui Block are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set( 0, 1, -2.999 );
	// rootBlock.rotation.x = -0.55;


	// Now that we have a three-mesh-ui Block, we can add three-mesh-ui Text's in it
	// rootBlock.add(
	//
	//
	// 	new ThreeMeshUI.Text( {
	// 		// width:1.5,
	// 		backgroundColor: "brown",
	// 		// three-mesh-ui Text should defined their content to display
	// 		content: 'This library supports line-break-friendly,',
	//
	// 		// if a Text is going to use the exact same Text properties as defined in its parent
	// 		// there is no need to set those properties again
	// 		// fontSize: 0.055,
	// 		// fontFamily: '/assets/fonts/msdf/roboto/regular.json',
	// 		// fontTexture: '/assets/fonts/msdf/roboto/regular.png',
	//
	// 	} ),
	//
	// 	new ThreeMeshUI.Text( {
	// 		fontSize: 0.1,
	// 		// width:1.5,
	// 		backgroundColor: "blue",
	// 		// three-mesh-ui Text should defined their content to display
	// 		content: 'Bob !',
	//
	// 		// if a Text is going to use the exact same Text properties as defined in its parent
	// 		// there is no need to set those properties again
	// 		// fontSize: 0.055,
	// 		// fontFamily: '/assets/fonts/msdf/roboto/regular.json',
	// 		// fontTexture: '/assets/fonts/msdf/roboto/regular.png',
	//
	// 	} ),
	//
	// 	new ThreeMeshUI.Text( {
	// 		// width:1.5,
	// 		backgroundColor: "green",
	// 		// three-mesh-ui Text should defined their content to display
	// 		content: 'Abracadabra',
	//
	// 		// if a Text is going to use the exact same Text properties as defined in its parent
	// 		// there is no need to set those properties again
	// 		// fontSize: 0.055,
	// 		// fontFamily: '/assets/fonts/msdf/roboto/regular.json',
	// 		// fontTexture: '/assets/fonts/msdf/roboto/regular.png',
	//
	// 	} ),
	//
	// 	// new ThreeMeshUI.Text( {
	// 	// 	content: ' As well as multi-font-size lines with consistent vertical',
	// 	//
	// 	// 	// If a Text must have different Text properties as defined in its parent
	// 	// 	// We just have to define it on a specific Text
	// 	// 	fontSize: 0.08,
	// 	// } ),
	// 	//
	// 	// new ThreeMeshUI.Text( {
	// 	// 	content: ' spacing!',
	// 	// 	fontSize: 0.08,
	// 	// } )
	//
	// );



	rootBlock.add(


		// new ThreeMeshUI.Block({name:'yellow',backgroundColor:"yellow", boxSizing:'content-box', height:1, width:1, margin:0.25}),


		new ThreeMeshUI.Block({name: 'innerBlock', backgroundColor:"black", flexDirection: 'column', boxSizing:'content-box' , padding:0.25, alignItems:'stretch', margin: 0.25 }).add(

			// new ThreeMeshUI.Block({backgroundColor:"blue", backgroundOpacity:0.5, height:0.25, width:1.5}),
			// new ThreeMeshUI.Block({name:'bluebox',backgroundColor:"blue", backgroundOpacity:0.5, boxSizing:'content-box', height:0.1, width:0.1}),
			new ThreeMeshUI.Block({name:'bluebox',backgroundColor:"blue", backgroundOpacity:0.5, boxSizing:'content-box', height:0.1, margin: '0.05'}),
			new ThreeMeshUI.Block({name:'yellow',backgroundColor:"yellow", boxSizing:'content-box', height:0.4, width:0.5})

		),
		// new ThreeMeshUI.Block({name: 'innerBlock', backgroundColor:"black", flexDirection: 'row-reverse', boxSizing:'border-box' , padding:0.25, alignItems:'stretch', margin: 0.25 }).add(
		//
		// 	// new ThreeMeshUI.Block({backgroundColor:"blue", backgroundOpacity:0.5, height:0.25, width:1.5}),
		// 	// new ThreeMeshUI.Block({name:'bluebox',backgroundColor:"blue", backgroundOpacity:0.5, boxSizing:'content-box', height:0.1, width:0.1}),
		// 	new ThreeMeshUI.Block({name:'bluebox',backgroundColor:"blue", backgroundOpacity:0.5, boxSizing:'border-box', width:0.1, margin: '0.05'}),
		// 	new ThreeMeshUI.Block({name:'yellow',backgroundColor:"yellow", boxSizing:'content-box', height:0.4, width:0.5})
		//
		// )
	)

	window.update = ThreeMeshUI.update;
	ThreeMeshUI.update()
	// ThreeMeshUI.update()
	// ThreeMeshUI.update()

}

// In order to see things, we need to render them, usually on each frame
function step3AnimationLoop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	// ThreeMeshUI.update();

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


