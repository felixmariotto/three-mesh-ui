// xfg:title SVG Fonts
// xfg:category extend
// xfg:description This example use SVG Fonts format to shows how to implements custom font type in three-mesh-ui.
// xfg:copyright FluxArchitect font was created by <a href="http://www.orangemodern.com/">Clayton Cowan</a>

import * as THREE from 'three';
import { MeshNormalMaterial } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

import SVGFontVariant from 'three-mesh-ui/examples/font/svg/SVGFontVariant';


// Using `ThreeMeshUI.FontLibrary.prepare( fontFamily, [...fontFamily] )
// We can ensure any fontFamily passed in that function and theirs variants are properly loaded and setup
FontLibrary.prepare(

		FontLibrary

			.addFontFamily("FluxArchitect")

				// This is where you can register font variant with you custom type implementation
				// @see three-mesh-ui/examples/font/svg/SVGFontVariant.js which is the implementation
				.addCustomImplementationVariant( new SVGFontVariant ( '400', 'normal', './assets/fonts/svg/flux/regular.svg' ) )
				.addCustomImplementationVariant( new SVGFontVariant ( '400', 'italic', './assets/fonts/svg/flux/italic.svg' ) )
				.addCustomImplementationVariant( new SVGFontVariant ( '700', 'normal', './assets/fonts/svg/flux/bold.svg' ) )
				.addCustomImplementationVariant( new SVGFontVariant ( '700', 'italic', './assets/fonts/svg/flux/bold-italic.svg' ) )

// FontLibrary.prepare() returns a Promise, we can therefore add a callback to be executed when all files are loaded
).then( () => {

	// Once font are registered, we can get the font family
	const FluxFamily = FontLibrary.getFontFamily("FluxArchitect");

	// 1. Material
	// Instead of assigning custom materials to Text one by one
	// We can assign a Material(class) to a font variant (Here the bold one)
	FluxFamily.getVariant('700','normal').fontMaterial = MeshNormalMaterial;
	// Once set, any three-mesh-ui Text using this font variant will use the defined material

	// Now that the font are loaded and adjusted,
	step1BuildThreeJSElements();


} );



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

	// A rootBlock element
	const rootBlock = new ThreeMeshUI.Block( {
		// box sizing properties
		width: 1.85,
		padding: 0.05,

		// layout properties
		justifyContent: 'center',
		textAlign: 'left',

		fontKerning: 'none',
		backgroundColor: 0x000000,
		backgroundOpacity : 0.25,

		// lineHeight:0,
		borderRadius: 0.025,

		// text properties
		fontSize: 0.05,
		// As we have prepare our fonts we can now use them
		fontFamily: "FluxArchitect",
	} );

	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;
	scene.add( rootBlock );


	// Lets build a first text that would be in bold, and use a MSDFNormalMaterial
	const text1 = new ThreeMeshUI.Text( {
			width: 'auto',
			justifyContent: 'center',
			textContent: 'Extending font types (SVG)',
			fontWeight: '700',
			fontSize: 0.08,
			marginBottom: 0.025,
			backgroundColor: 0x000000,
			backgroundOpacity: 0.3,
			padding: '0.01 0.05',
			borderRadius: 0.025,
			borderColor: 0xffffff,
			borderWidth: 0.01,
		} );



	// as text1 explicitely requires the font variant `fontWeight:'700'`
	// and that we have set that font variant to use the MSDFNormalMaterial
	// there is no more need to manually set its material to MSDFNormalMaterial
	// text1.material = new MSDFNormalMaterial({});

	window.rootBlock = rootBlock;

	rootBlock.add(

		text1,

		new ThreeMeshUI.Text( {
			width: '100%',
			textContent: 'In this examples, 4 variants of the "FluxArchitect" font in svg format are registered.',
			marginBottom: 0.025,
		} ),

		new ThreeMeshUI.Text({}).add(
			new ThreeMeshUI.Inline( {
				textContent: '\n\nRegular',
			} ),

			new ThreeMeshUI.Inline( {
				textContent: ' Bold',
				margin: '0 0.05',
				fontWeight: '700',
			} ),

			new ThreeMeshUI.Inline( {
				textContent: ' Italic',
				fontStyle: 'italic',
			} ),

			new ThreeMeshUI.Inline( {
				textContent: ' Bold+Italic',
				fontWeight: '700',
				fontStyle: 'italic',
			} ),
		),



		new ThreeMeshUI.Text( {
			textContent: 'The registered bold variant in this example, will automatically set the material of a Text to use',
			margin: '0.025 0',
			textAlign: 'justify-left',
		} ).add( new ThreeMeshUI.Inline( {
			textContent: ' MeshNormalMaterial.',
			fontWeight: '700',
		} ), ),



		new ThreeMeshUI.Text( {
			width: '100%',
			textContent: '* Some font type implementation, such as this one, will allow to have 3D glyphs and additional parameters such as depth, ...',
			fontSize: 0.035,
			color: new THREE.Color(0x00ff99)
		} )

	);

	// If we want to have to ability to control fontDepth from parent, to children,
	// we need to register them here
	SVGFontVariant.appendProperties( rootBlock, ...rootBlock.children );
	SVGFontVariant.appendProperties( text1, ...rootBlock.children );

	// now we can control parent value, cascading to inherited children
	text1.set({fontDepth:0.02});
	rootBlock.set({fontDepth:0.006});

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
