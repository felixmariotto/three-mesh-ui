// xfg:title Preload Fonts
// xfg:category practice

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';
import MSDFNormalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFNormalMaterial';

/***********************************************************************************************************************
 * THREE-MESH-UI - FONT MANAGEMENT
 * -------------------------------
 *
 * This tutorial is made of 4 steps, the first starts just below
 * 		- FontLibrary.prepare(...)
 *
 * And others are split by functions:
 *    - step1BuildThreeJSElements()
 *    - step2BuildThreeMeshUIElements()
 *    - step3AnimationLoop()
 *
 * Be sure to read all of their comments, in the proper order before going for another tutorial.
 **********************************************************************************************************************/


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
					"normal",

					// The style of the variant 'normal'|'italic'|'oblique'|'oblique(x deg)'
					"normal",

					// The json definition of the msdf font 'urlToLoad'|loadedObject
					"./assets/fonts/msdf/roboto/regular.json",

					// The texture of the msdf font 'urlToLoad'|Texture
					"./assets/fonts/msdf/roboto/regular.png"
				)

				// Registering additional variants
				.addVariant("700", "italic", "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
				.addVariant("700", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
				.addVariant("400", "italic", "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

// FontLibrary.prepare() returns a Promise, we can therefore add a callback to be executed when all files are loaded
).then( () => {

	// Once font are registered, we can get the font family
	const RobotoFamily = FontLibrary.getFontFamily("Roboto");

	// And then retrieve a fontVariant defined in this Family
	const RobotoRegular = RobotoFamily.getVariant('normal','normal');

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



//
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

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

	// Retrieve font families defined
	const RobotoFamily = FontLibrary.getFontFamily("Roboto");

	// A rootBlock element
	const rootBlock = new ThreeMeshUI.Block( {
		// box sizing properties
		width: 1.65,
		height: 0.62,
		padding: 0.05,

		// layout properties
		justifyContent: 'center',
		textAlign: 'left',

		backgroundOpacity: 0.15,
		backgroundColor: 0x000000,

		// text properties
		fontSize: 0.05,
		// As we have prepare our fonts we can now use them
		fontFamily: RobotoFamily
		// We could also have chosen to use the font family name instead of the FontFamily
		//fontFamily: "Roboto"
	} );

	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;
	scene.add( rootBlock );


	// Lets build a first text that would be in bold, and use a MSDFNormalMaterial
	const text1 = new ThreeMeshUI.Text( {
			textContent: 'Managing fonts in three-mesh-ui',
			fontWeight: '700',
			fontSize: 0.08
		} );

	// as text1 explicitely requires the font variant `fontWeight:'700'`
	// and that we have set that font variant to use the MSDFNormalMaterial
	// there is no more need to manually set its material to MSDFNormalMaterial
	// text1.material = new MSDFNormalMaterial({});


	rootBlock.add(

		text1,

		new ThreeMeshUI.Text( {
			textContent: 'In this examples, 4 variants of the "Roboto" font are registered.',
		} ),

		new ThreeMeshUI.Text({margin:'0.05 0 0.05 0.1'}).add(
			new ThreeMeshUI.Inline({ textContent:"Regular "}),
			new ThreeMeshUI.Inline({ textContent:"Bold ",fontWeight:'700', margin: 0.05}),
			new ThreeMeshUI.Inline({ textContent:"Italic ",fontStyle:'italic'}),
			new ThreeMeshUI.Inline({ textContent:"Bold+Italic",fontWeight:'700',fontStyle:'italic'}),
		),

		new ThreeMeshUI.Text( {
			textContent: 'The registered bold variant in this example, will automatically set the material of a Text to use ',
		} ),

		new ThreeMeshUI.Text( {
			textContent: 'MSDFNormalMaterial.',
			fontWeight: '700',
		} ),

		new ThreeMeshUI.Text( {
			textContent: '\n\n* Managing and preloading fonts can display Text with no additional delays.',
			fontStyle: 'italic',
			fontSize: 0.035
		} )

	);

	ThreeMeshUI.update()

}

//

function step3AnimationLoop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	// ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}

// handles resizing the renderer when the viewport is resized
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}
