import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';
import MSDFNormalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFNormalMaterial';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let container, justifyInRow, justifyInColumn;
const DIM_HIGH = 1.6;
const MIN_HIGH = 1.1;

const DIM_LOW = 0.25;

const justificationLegend = [
	{ id: 'start', color: 0xff9900 },
	{ id: 'end', color: 0xff0099 },
	{ id: 'center', color: 0x00ff99 },
	{ id: "space-between", color: 0x99ff00 },
	{ id: "space-around", color: 0x9900ff },
	{ id: "space-evenly", color: 0x0099ff }
];

let scene, camera, renderer, controls, stats;

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
			"400",

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

	init();


});

window.addEventListener( 'resize', onWindowResize );

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

	stats = new Stats();
	document.body.appendChild( stats.dom );

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

	makeTitlePanel();
	justifyInRow = makeTextPanel( 'column' );

	window.rootBlock = justifyInRow;

	justifyInColumn = makeTextPanel( 'row' );

	justifyInRow.position.x = -0.75;
	justifyInRow.scale.setScalar( 0.75 );

	justifyInColumn.position.x = 0.75;
	justifyInColumn.scale.setScalar( 0.75 );

	//

	renderer.setAnimationLoop( loop );

}

function makeTextPanel( flexDirection ) {

	container = new ThreeMeshUI.Block( {
		height: DIM_HIGH + 0.2,
		width: DIM_HIGH + 0.2,
		flexDirection: flexDirection,
		justifyContent: 'center',
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color( 'grey' ),
		overflow: 'hidden',
		fontFamily: "Roboto"
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = - 0.55;
	scene.add( container );

	for ( let i = 0; i < justificationLegend.length; i ++ ) {

		const color = new THREE.Color( justificationLegend[ i ].color );
		const id = justificationLegend[ i ].id;
		const panel = buildJustifiedPanel( id, color, flexDirection === 'column' ? 'row' : 'column' );

		container.add( panel );
	}

	return container;
}

function buildJustifiedPanel( id, color, flexDirection ) {

	const panel = new ThreeMeshUI.Block( {
		width: flexDirection === 'row' ? DIM_HIGH : DIM_LOW,
		height: flexDirection === 'row' ? DIM_LOW : DIM_HIGH,
		flexDirection: flexDirection,
		justifyContent: id,
		backgroundOpacity: 0.3,
		backgroundColor: 0xff9900,
		padding: 0.01,
		margin: 0.01,
		offset:0.0001
	} );
	container.add( panel );

	const letters = 'ABCDEF';


	const step = 0xFFFFFF / 5;
	for ( let i = 0; i < 5; i ++ ) {

		const blockText = new ThreeMeshUI.Block( {
			margin: 0.01,
			borderRadius: 0.05,
			backgroundColor: color,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: '0 0 0.01 0',
			borderColor: Math.floor( step * (5-i) ),
			offset:0.001,
			visible: i !== 2,
		} );

		if( i === 0 ) {
			blockText.set({ width:0.125, height:0.125 });
		}

		panel.add( blockText );

		const text = new ThreeMeshUI.Text( {
			textAlign: 'center',
			alignItems : 'center',
			lineHeight: 1,
			width: 0.125,
			height: 0.125,
			textContent: letters[ i ],
		} );
		blockText.add( text );

	}

	return panel;
}

function makeTitlePanel(){

	const panel = new ThreeMeshUI.Text( {
		width: DIM_HIGH * 1.85,
		height: 0.15,
		padding: 0.05,
		flexDirection: 'row',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundOpacity: 0.6,
		fontSize: 0.1,
		fontFamily: "Roboto"
	} );

	for ( let i = 0; i < justificationLegend.length; i ++ ) {

		const color = new THREE.Color( justificationLegend[ i ].color );
		const id = justificationLegend[ i ].id;

		panel.add(
			new ThreeMeshUI.Inline( {
				textContent: id + " ",
				color: color
			} )
		);

	}

	panel.scale.setScalar( 0.86 );
	panel.position.set( 0, 1.8, -2.1 );

	scene.add( panel );
}

// handles resizing the renderer when the viewport is resized
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

let isInverted = false;

setInterval( () => {

	isInverted = ! isInverted;

	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {
		justifyInRow.children[ i ].set( { flexDirection:isInverted ? 'row-reverse' : 'row' } );
	}

	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {
		justifyInColumn.children[ i ].set( { flexDirection:isInverted ? 'column-reverse' : 'column' } );
	}

}, 2500 );

let alignMode = 1;
const aligns = [ 'start', 'center', 'end', 'stretch'];

setInterval( () => {

	alignMode += 1;
	alignMode = alignMode >= aligns.length ? 0 : alignMode;

	const mode = aligns[alignMode];

	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {

		justifyInRow.children[ i ].set( { alignItems: mode } );

	}

	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {

		justifyInColumn.children[ i ].set( { alignItems: mode } );

	}

}, 1000 );

// let sizeMode = 1;
// const sizes = [ 0.125, 0.175, 0.225, 0.295 ];
//
// setInterval( () => {
//
// 	sizeMode += 1;
// 	sizeMode = sizeMode >= sizes.length ? 0 : sizeMode;
//
// 	const mode = sizes[ sizeMode ];
//
// 	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {
//
// 		for ( let j = 1; j < justifyInRow.children[ i ].children.length; j ++ ) {
//
// 			justifyInRow.children[ i ].children[ j ].set( { width: mode } );
//
// 		}
//
// 	}
//
// 	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {
//
// 		for ( let j = 1; j < justifyInColumn.children[ i ].children.length; j ++ ) {
//
// 			justifyInColumn.children[ i ].children[ j ].set( { height:mode } );
//
// 		}
// 	}
//
// }, 3000 );

// let childAlignMode = 1;
// const childAligns = [ 'center', 'stretch' ];
//
// setInterval( () => {
//
// 	childAlignMode += 1;
// 	childAlignMode = childAlignMode >= childAligns.length ? 0 : childAlignMode;
//
// 	const mode = childAligns[ childAlignMode ];
//
// 	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {
//
// 		for ( let j = 1; j < justifyInRow.children[ i ].children.length; j ++ ) {
//
// 			justifyInRow.children[ i ].children[ j ].set( { alignItems: mode } );
//
// 		}
//
// 	}
//
// 	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {
//
// 		for ( let j = 1; j < justifyInColumn.children[ i ].children.length; j ++ ) {
//
// 			justifyInColumn.children[ i ].children[ j ].set( { alignItems:mode } );
//
// 		}
// 	}
//
// }, 500 );


let currentBigSize = DIM_HIGH;
let currentSpeed = - 0.005;

function loop() {

	currentBigSize += currentSpeed;

	if ( currentBigSize >= DIM_HIGH ) {

		currentBigSize = DIM_HIGH;
		currentSpeed *= - 1;

	} else if ( currentBigSize <= MIN_HIGH ) {

		currentBigSize = MIN_HIGH;
		currentSpeed *= -1;

	}

	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {

		justifyInRow.children[ i ].set( { width: currentBigSize } );

	}

	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {

		justifyInColumn.children[ i ].set( { height: currentBigSize } );

	}

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

	stats.update();

}
