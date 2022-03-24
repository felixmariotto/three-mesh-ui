import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

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

window.addEventListener( 'load', init );
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
	justifyInColumn = makeTextPanel( 'row' );

	justifyInRow.position.x = -0.75;
	justifyInRow.scale.setScalar( 0.75 );

	justifyInColumn.position.x = 0.75;
	justifyInColumn.scale.setScalar( 0.75 );

	//

	renderer.setAnimationLoop( loop );

}

function makeTextPanel( contentDirection ) {

	container = new ThreeMeshUI.Block( {
		height: DIM_HIGH + 0.2,
		width: DIM_HIGH + 0.2,
		contentDirection: contentDirection,
		justifyContent: 'center',
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color( 'grey' ),
		hiddenOverflow: true,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = - 0.55;
	scene.add( container );

	for ( let i = 0; i < justificationLegend.length; i ++ ) {

		const color = new THREE.Color( justificationLegend[ i ].color );
		const id = justificationLegend[ i ].id;
		const panel = buildJustifiedPanel( id, color, contentDirection === 'column' ? 'row' : 'column' );

		container.add( panel );
	}

	return container;
}

function buildJustifiedPanel( id, color, contentDirection ) {

	const panel = new ThreeMeshUI.Block( {
		width: contentDirection === 'row' ? DIM_HIGH : DIM_LOW,
		height: contentDirection === 'row' ? DIM_LOW : DIM_HIGH,
		contentDirection: contentDirection,
		justifyContent: id,
		backgroundOpacity: 0.5,
		padding: 0.02,
		margin: 0.01,
		offset:0.0001
	} );
	container.add( panel );

	const letters = 'ABCDEF';

	for ( let i = 0; i < 5; i ++ ) {

		const blockText = new ThreeMeshUI.Block( {
			width: 0.125,
			height: 0.125,
			margin: 0.01,
			borderRadius: 0.02,
			backgroundColor: color,
			justifyContent: 'center',
			alignItems: 'center',
			offset:0.001
		} );
		panel.add( blockText );

		// const text = new ThreeMeshUI.Text( {
		// 	content: letters[ i ]
		// } );
		// blockText.add( text );

	}

	return panel;
}

function makeTitlePanel(){

	const panel = new ThreeMeshUI.Block( {
		width: DIM_HIGH * 1.85,
		height: 0.15,
		padding: 0.05,
		contentDirection: 'row',
		justifyContent: 'center',
		textAlign: 'justify',
		backgroundOpacity: 0.6,
		fontSize: 0.1,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	for ( let i = 0; i < justificationLegend.length; i ++ ) {

		const color = new THREE.Color( justificationLegend[ i ].color );
		const id = justificationLegend[ i ].id;

		panel.add(
			new ThreeMeshUI.Text( {
				content: id + " ",
				fontColor: color
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
		justifyInRow.children[ i ].set( { contentDirection:isInverted ? 'row-reverse' : 'row' } );
	}

	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {
		justifyInColumn.children[ i ].set( { contentDirection:isInverted ? 'column-reverse' : 'column' } );
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

let sizeMode = 1;
const sizes = [ 0.125, 0.175, 0.225, 0.295 ];

setInterval( () => {

	sizeMode += 1;
	sizeMode = sizeMode >= sizes.length ? 0 : sizeMode;

	const mode = sizes[ sizeMode ];

	for ( let i = 1; i < justifyInRow.children.length; i ++ ) {

		for ( let j = 1; j < justifyInRow.children[ i ].children.length; j ++ ) {

			justifyInRow.children[ i ].children[ j ].set( { width: mode } );

		}

	}

	for ( let i = 1; i < justifyInColumn.children.length; i ++ ) {

		for ( let j = 1; j < justifyInColumn.children[ i ].children.length; j ++ ) {

			justifyInColumn.children[ i ].children[ j ].set( { height:mode } );

		}
	}

}, 3000 );

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
