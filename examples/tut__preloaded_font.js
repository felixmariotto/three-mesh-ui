import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

import * as FontWeight from '../src/utils/font/FontWeight';
import * as FontStyle from '../src/utils/font/FontStyle';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener( 'load', preload );
window.addEventListener( 'resize', onWindowResize );

//

import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';
import MSDFDepthMaterial from '../src/font/msdf/materials/MSDFDepthMaterial';

async function preload() {

	// Fighting FOIT
	// https://css-tricks.com/fighting-foit-and-fout-together/

	await FontLibrary.prepare(

			FontLibrary
				.addFontFamily("Roboto")
					.addVariant(FontWeight.NORMAL, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )
					.addVariant(FontWeight.BOLD, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
					.addVariant(FontWeight.BOLD, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
					.addVariant(FontWeight.NORMAL, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

	);

	// Adjusting font variants
	const FF = FontLibrary.getFontFamily("Roboto");

	// adjust material
	// @see TODO: FontVariant Documentation
	// Each component using that variant, will automatically use the defined material
	// Here is Bold Texts

	FF.getVariant('700','normal').fontMaterial = MSDFDepthMaterial;
	// adjust fonts
	// @see TODO:adjustDocumentation
	FF.getVariant('700','normal').adjustTypographyCharacters( ROBOTO_ADJUSTMENT );
	FF.getVariant('700','italic').adjustTypographyCharacters( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','italic').adjustTypographyCharacters( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','normal').adjustTypographyCharacters( ROBOTO_ADJUSTMENT );

	init();

}

//

function init() {

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

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const container = new ThreeMeshUI.Block( {
		width: 1.75,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: "Roboto"
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//
	const text1 = new ThreeMeshUI.Text( {
			content: 'three-mesh-ui and font variants',
			fontWeight: '700',
			fontSize: 0.08
		} );

	container.add(

		text1,

		new ThreeMeshUI.Text( {
			content: '\nYou can preload fonts with multiple variant definitions :',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: '\n\nRegular',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: ' Bold',
			fontWeight: '700',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: ' Italic',
			fontStyle: 'italic',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: ' Bold+Italic',
			fontWeight: '700',
			fontStyle: 'italic',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: '\n\nPreloading fonts will display texts with no loading delays and no FOIT*!',
			fontSize: 0.05
		} ),

		new ThreeMeshUI.Text( {
			content: '\n* : ',
			fontStyle: 'italic',
			fontSize: 0.03
		} ),

		new ThreeMeshUI.Text( {
			content: 'FOIT',
			fontStyle: 'italic',
			fontWeight: '700',
			fontSize: 0.03
		} ),

		new ThreeMeshUI.Text( {
			content: ' means Flash-Of-Invisible-Text and is a web annoyment!',
			fontStyle: 'italic',
			fontSize: 0.03
		} )

	);


	text1.onAfterUpdate = function(){

		if( text1.children.length ) {

			console.log( "Chjild 1 ", text1.children[0].material );

		}

	}

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
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
