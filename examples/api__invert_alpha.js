// xfg:title InvertAlpha
// xfg:type MSDF Only
// xfg:category learn

import * as THREE from 'three';
import { Color } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener( 'load', preloadFonts );
window.addEventListener( 'resize', onWindowResize );

function preloadFonts() {

	// Fighting FOIT
	// https://css-tricks.com/fighting-foit-and-fout-together/

	FontLibrary.prepare(

		FontLibrary
			.addFontFamily("Roboto")
				.addVariant("400", "normal", "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )
				.addVariant("700", "italic", "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
				.addVariant("700", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
				.addVariant("400", "italic", "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

	).then( init );

}

//

function init() {


	// adjust fonts
	// @see TODO:adjustDocumentation
	const FF = FontLibrary.getFontFamily("Roboto");
	FF.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

	// Build three

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
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

	// TEXT PANEL

	makeTextPanel();

	//

	ThreeMeshUI.update();

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const container = new ThreeMeshUI.Block( {
		width: 2,
		height: 0.3,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: "Roboto", // As we preloaded fontFamily("Roboto") with variants, we can directly reference the font name
		backgroundOpacity: 0,
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.25;
	scene.add( container );

	//

	const infoBox = new ThreeMeshUI.Block( {
		width: 2,
		height: 0.175,
		margin: 0.01,
		padding: 0.025,
		textAlign: 'center',
	} );

	infoBox.add( new ThreeMeshUI.Text( {
		textContent: '.invertAlpha ',
		fontWeight: '700',
	} ) );

	infoBox.add( new ThreeMeshUI.Text( {
		textContent: '(* works on msdf font variants)',
		fontStyle: 'italic',
		fontSize: 0.035
	} ) );

	infoBox.add( new ThreeMeshUI.Text( {
		textContent: ' inverts the alpha of the glyph.\n',
		fontWeight: '700',
	} ) );

	infoBox.add( new ThreeMeshUI.Text( {
		textContent: 'The rendering will be a boxed char, with transparent inner.\n',
		letterSpacing: 0.05
	} ) );

	container.add( infoBox );

	container.add( makeKernedContainer( false ) );
	container.add( makeKernedContainer( true ) );

}

function makeKernedContainer( kerning ) {

	const container = new ThreeMeshUI.Block( {
		width: 1.8,
		height: 0.126,
		padding: 0.05,
		flexDirection: "row",
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: "Roboto",
		backgroundOpacity: 0
	} );

	const titleBox = new ThreeMeshUI.Block( {
		width: 0.8,
		height: 0.1,
		margin: 0.01,
		padding: 0.025,
		justifyContent: 'center',
		backgroundColor: new Color( 0xff9900 ),
		textAlign: 'left'
	} );

	const title = new ThreeMeshUI.Text( {
		textContent: `.set({invertAlpha: "${kerning}"})`,
		fontSize: 0.055
	} );

	titleBox.add( title );

	const textBox = new ThreeMeshUI.Block( {
		width: 1.4,
		height: 0.125,
		margin: 0.01,
		padding: 0.02,
		justifyContent: 'center',
		backgroundOpacity: 0,
		fontSize: 0.08,
		fontWeight: '700'
	} );

	textBox.add(
		new ThreeMeshUI.Text( {
			textContent: '.invertAlpha works on msdf texts',
			letterSpacing: 0.05,
			invertAlpha: kerning,
		} )
	);

	container.add( titleBox );
	container.add( textBox );

	return container;


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
	// ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
