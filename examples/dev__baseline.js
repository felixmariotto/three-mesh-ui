/* global lil */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

// import FontJSON from './assets/Roboto-msdf.json';
// import FontImage from './assets/Roboto-msdf.png';


import { Mesh, MeshBasicMaterial, PlaneBufferGeometry } from 'three';

// Add lil-gui
const script = document.createElement( 'script' );
script.src = 'https://cdn.jsdelivr.net/npm/lil-gui@0.16';
document.body.appendChild( script );


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, text, container;

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

	container = makeUI();
	scene.add( container );

	const cont2 = makeUI(false);
	scene.add( cont2 );
	//

	renderer.setAnimationLoop( loop );

	buildGUI();
}

//

/**
 * @return {Block}
 */
function makeUI(fixed = true ) {
	const container = new ThreeMeshUI.Block( {
		height: 0.55,
		width: 0.85,
		justifyContent: 'center',
		alignContent: 'center',
		fontFamily: fixed ? 'Roboto' : 'Roboto-unfixed',
		backgroundOpacity: fixed ? 1.0 : 0
	} );

	container.position.set( 0, fixed ? 1.0 : 0.930, -1.8 );

	//

	const textBlock = new ThreeMeshUI.Block( {
		height: 0.4,
		width: 0.73,
		margin: 0.05,
		alignContent: 'right',
		justifyContent: 'center',
		padding: 0.03,
		interLine: 0.08,
		letterSpacing: 0,
		backgroundOpacity:0,
	} );

	container.add( textBlock );


	// const textContent = FontLibrary.getFontFamily("Roboto").getVariant('400',"normal").typographic.charset;
	const textContent = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const _text = new ThreeMeshUI.Text( {
		fontSize: 0.06,
		content: textContent,
	} );

	if( fixed ){

		text = _text;

	}


	// Lines properties. Lines are planes manually added behind each text lines
	// in order to perceive and validate line width

	const lineMat = new MeshBasicMaterial( { color: fixed ? 0x0099FF : 0xcacaca, opacity: 0.5 } );
	let lines = [];

	_text.onAfterUpdate = function () {


		// only process when texts are not empty
		if ( _text.children.length == 0 ) return;

		// remove all lines previously added
		for ( let i = 0; i < lines.length; i++ ) {
			const line = lines[ i ];
			container.remove( line );
		}
		lines = [];

		// retrieve all lines sent by InlineManager for the textBlock
		for ( let i = 0; i < textBlock.lines.length; i++ ) {

			const lineProperty = textBlock.lines[ i ];

			if ( !lineProperty[ 0 ] ) continue;

			// ( I was unable to quickly match lineHeight )
			// lineHeight doesn't fit
			// const lineHeight = lineProperty.lineHeight / 4;
			const lineHeight = lineProperty.lineHeight;
			const lineBase = lineProperty.lineBase;

			// create a mesh for each line
			const lineGeo = new PlaneBufferGeometry( lineProperty.width, lineBase );
			const lineMesh = new Mesh( lineGeo, lineMat );

			lineMesh.position.x = lineProperty[ 0 ].offsetX + ( lineProperty.width / 2 );
			lineMesh.position.y = lineProperty[ 0 ].offsetY + ( lineHeight / 2.89 );

			lineMesh.position.z = 0.018;

			lines.push( lineMesh );
			container.add( lineMesh );
		}

	};

	textBlock.add( _text );

	return container;

}

function buildGUI() {

	const gui = new lil.GUI();

	const alterations = {};

	const letters = {};
	for ( let i = 0; i < text.content.length; i++ ) {
		const letter = text.content[ i ];
		letters[ letter ] = letter;
	}

	const fontVariant = FontLibrary.getFontFamily( 'Roboto' ).getVariant( '400', 'normal' );
	let charDesc = fontVariant.getTypographyCharacter( 'a' );
	const p = {
		letter: 'a',
		yoffset: charDesc.yoffset,
	};

	gui.add( p, 'letter', letters ).onChange( v => {

		charDesc = fontVariant.getTypographyCharacter( v );
		p.yoffset = charDesc.yoffset;

		yoffsetController.updateDisplay();
	} );

	const yoffsetController = gui.add( p, 'yoffset', -20, 20, 0.01 ).onChange( v => {

		alterations[ p.letter ] = v;

		charDesc._yoffset = v;
		text.update( true, true, true );
		container.update( true, true, true );

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
