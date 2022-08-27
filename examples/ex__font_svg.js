import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

import SVGFontVariant from 'three-mesh-ui/examples/font/svg/SVGFontVariant';


// Using `ThreeMeshUI.FontLibrary.prepare( fontFamily, [...fontFamily] )
// We can ensure any fontFamily passed in that function and theirs variants are properly loaded and setup
FontLibrary.prepare(

		FontLibrary

			.addFontFamily("BadComic")
				// On the fontFamily added, lets add a variant
				// a font variant usually requires 4 parameters
				.addCustomImplementationVariant(
					new SVGFontVariant ( '400', 'normal', './assets/fonts/svg/BadComic.svg' )
				)

// FontLibrary.prepare() returns a Promise, we can therefore add a callback to be executed when all files are loaded
).then( step1BuildThreeJSElements );



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

		// text properties
		fontSize: 0.05,
		// As we have prepare our fonts we can now use them
		fontFamily: "BadComic"
		// We could also have chosen to use the font family name instead of the FontFamily
		//fontFamily: "Roboto"
	} );

	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;
	scene.add( rootBlock );


	// Lets build a first text that would be in bold, and use a MSDFNormalMaterial
	const text1 = new ThreeMeshUI.Text( {
			content: 'Managing fonts in three-mesh-ui',
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
			content: '\nIn this examples, 4 variants of the "Roboto" font are registered.',
		} ),

		new ThreeMeshUI.Text( {
			content: '\n\nRegular',
		} ),

		new ThreeMeshUI.Text( {
			content: ' Bold',
			fontWeight: '700',
		} ),

		new ThreeMeshUI.Text( {
			content: ' Italic',
			fontStyle: 'italic',
		} ),

		new ThreeMeshUI.Text( {
			content: ' Bold+Italic',
			fontWeight: '700',
			fontStyle: 'italic',
		} ),

		new ThreeMeshUI.Text( {
			content: '\n\nThe registered bold variant in this example, will automatically set the material of a Text to use ',
		} ),

		new ThreeMeshUI.Text( {
			content: 'MSDFNormalMaterial.',
			fontWeight: '700',
		} ),

		new ThreeMeshUI.Text( {
			content: '\n\n* Managing and preloading fonts can display Text with no additional delays.',
			fontStyle: 'italic',
			fontSize: 0.035
		} )

	);

}

//

function step3AnimationLoop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}

// handles resizing the renderer when the viewport is resized
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}
