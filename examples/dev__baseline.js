/* global lil */

// import FontJSON from './assets/Roboto-msdf.json';
// import FontImage from './assets/Roboto-msdf.png';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';
import TypographicLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/TypographicLayoutBehavior';

// Add lil-gui
const script = document.createElement( 'script' );
script.src = 'https://cdn.jsdelivr.net/npm/lil-gui@0.16';
document.body.appendChild( script );


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, text;

window.addEventListener( 'load', () => {

	FontLibrary.prepare(
		FontLibrary
			.addFontFamily( 'Roboto' )
			.addVariant( '400', 'normal', './assets/fonts/msdf/roboto/regular.json', './assets/fonts/msdf/roboto/regular.png' ),
		FontLibrary
			.addFontFamily( 'Roboto-unfixed' )
			.addVariant( '400', 'normal', './assets/fonts/msdf/roboto/regular.json', './assets/fonts/msdf/roboto/regular.png' )
	).then( () => {
		init();
	} );

} );


window.addEventListener( 'resize', onWindowResize );

//

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	// use of orthgraphic camera to increase matching
	camera = new THREE.OrthographicCamera( WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 0.925, 0 );

	camera.zoom = 1275;
	camera.updateProjectionMatrix();

	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	const rootBlock = new ThreeMeshUI.Block({
		alignItems: 'center',
		padding: 0.05,
		borderRadius: 0.01,
		backgroundColor : 0x000000,
		backgroundOpacity : 0.8
	})

	rootBlock.position.set( 0, 0.930, -1.8 );

	scene.add( rootBlock );

	rootBlock.add( makeUI() );

	rootBlock.add( makeUI(false) );
	//

	renderer.setAnimationLoop( loop );

	buildGUI();
}

//

/**
 * @return {Block}
 */
function makeUI(fixed = true ) {
	// const container = new ThreeMeshUI.Block( {
	// 	width: 0.85,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	//
	// 	backgroundOpacity: fixed ? 1.0 : 0
	// } );

	//

	const textBlock = new ThreeMeshUI.Text( {
		width: 0.73,
		textAlign: 'left',
		justifyContent: 'center',
		fontSize: 0.06,
		fontFamily: fixed ? 'Roboto' : 'Roboto-unfixed',
		textContent : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	} );

	// container.add( textBlock );


	// const textContent = FontLibrary.getFontFamily("Roboto").getVariant('400',"normal").typographic.charset;

	if( fixed ){

		text = textBlock;

	}


	// Lines properties. Lines are planes manually added behind each text lines
	// in order to perceive and validate line width

	new TypographicLayoutBehavior( text ).attach();


	return textBlock;

}

function buildGUI() {

	const gui = new lil.GUI();

	const alterations = {};

	const letters = {};
	for ( let i = 0; i < text.textContent.length; i++ ) {
		const letter = text.textContent[ i ];
		letters[ letter ] = letter;
	}

	const fontVariant = FontLibrary.getFontFamily( 'Roboto' ).getVariant( '400', 'normal' );
	let charDesc = fontVariant.getTypographicGlyph( 'a' );
	const p = {
		letter: 'a',
		yoffset: charDesc.yoffset,
	};

	gui.add( p, 'letter', letters ).onChange( v => {

		charDesc = fontVariant.getTypographicGlyph( v );
		p.yoffset = charDesc.yoffset;

		yoffsetController.updateDisplay();
	} );

	const yoffsetController = gui.add( p, 'yoffset', -20, 20, 0.01 ).onChange( v => {

		alterations[ p.letter ] = v;

		charDesc._yoffset = v;

		text._layouter._needsProcess = true;

	} );

}


// Function that resize the renderer when the browser window is resized

function onWindowResize() {

	const W = window.innerWidth;
	const H = window.innerHeight;

	const aspect = W / H;
	// camera.aspectRatio = aspect;

	camera.left = W * aspect / -2;
	camera.right = W * aspect / 2;
	camera.top = H * aspect / 2;
	camera.bottom = -H * aspect / 2;

	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// Render loop (called ~60 times/second, or more in VR)

function loop() {
	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
}
