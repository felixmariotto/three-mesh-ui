/*

This example is an advanced demo.

For a better first step into this library, you should :
- check the tutorial at https://github.com/felixmariotto/three-mesh-ui/wiki/Getting-started
- consult more simple examples at https://three-mesh-ui.herokuapp.com/#basic_setup

*/

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

import Backspace from './assets/backspace.png';
import Enter from './assets/enter.png';
import Shift from './assets/shift.png';

let scene,
	camera,
	renderer,
	controls,
	vrControl,
	keyboard,
	userText,
	currentLayoutButton,
	intersectionRoom,
	layoutOptions;
// stats;

const objsToTest = [];

// Colors

const colors = {
	keyboardBack: 0x858585,
	panelBack: 0x262626,
	button: 0x363636,
	hovered: 0x1c1c1c,
	selected: 0x109c5d
};

//

const raycaster = new THREE.Raycaster();

// compute mouse position in normalized device coordinates
// (-1 to +1) for both directions.
// Used to raycasting against the interactive elements

const mouse = new THREE.Vector2();
mouse.x = mouse.y = null;

let selectState = false;
let touchState = false;

window.addEventListener( 'pointermove', ( event ) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

} );

window.addEventListener( 'pointerdown', () => {

	selectState = true;

} );

window.addEventListener( 'pointerup', () => {

	selectState = false;

} );

window.addEventListener( 'touchstart', ( event ) => {

	touchState = true;
	mouse.x = ( event.touches[ 0 ].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.touches[ 0 ].clientY / window.innerHeight ) * 2 + 1;

} );

window.addEventListener( 'touchend', () => {

	touchState = false;
	mouse.x = null;
	mouse.y = null;

} );

//

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//////////////////
// THREE.JS INIT
//////////////////

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMap.enabled = true;

	// STATS

	/*
	stats = new Stats();
	stats.dom.style.left = 'auto';
	stats.dom.style.right = '0px';
	document.body.appendChild( stats.dom );
	*/

	// LIGHT

	const light = ShadowedLight( {
		z: 10,
		width: 6,
		bias: -0.0001
	} );

	const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	scene.add( light, hemLight );

	// CONTROLLERS

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1.2, -1 );
	controls.update();

	//

	vrControl = VRControl( renderer, camera, scene );

	scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

	vrControl.controllers[ 0 ].addEventListener( 'selectstart', () => {

		selectState = true;

	} );
	vrControl.controllers[ 0 ].addEventListener( 'selectend', () => {

		selectState = false;

	} );

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	intersectionRoom = new THREE.Mesh(
		new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial( {
			side: THREE.BackSide,
			transparent: true,
			opacity: 0
		} )
	);

	scene.add( room, intersectionRoom );
	objsToTest.push( intersectionRoom );

	// USER INTERFACE

	makeUI();

	// LOOP

	renderer.setAnimationLoop( loop );

}

//

function makeUI() {

	const container = new THREE.Group();
	container.position.set( 0, 1.4, -1.2 );
	container.rotation.x = -0.15;
	scene.add( container );

	//////////////
	// TEXT PANEL
	//////////////

	const textPanel = new ThreeMeshUI.Block( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		width: 1,
		height: 0.35,
		backgroundColor: new THREE.Color( colors.panelBack ),
		backgroundOpacity: 1
	} );

	textPanel.position.set( 0, -0.15, 0 );
	container.add( textPanel );

	//

	const title = new ThreeMeshUI.Block( {
		width: 1,
		height: 0.1,
		justifyContent: 'center',
		fontSize: 0.045,
		backgroundOpacity: 0
	} ).add(
		new ThreeMeshUI.Text( { content: 'Type some text on the keyboard' } )
	);

	userText = new ThreeMeshUI.Text( { content: '' } );

	const textField = new ThreeMeshUI.Block( {
		width: 1,
		height: 0.4,
		fontSize: 0.033,
		padding: 0.02,
		backgroundOpacity: 0
	} ).add( userText );

	textPanel.add( title, textField );

	////////////////////////
	// LAYOUT OPTIONS PANEL
	////////////////////////

	// BUTTONS

	let layoutButtons = [
		[ 'English', 'eng' ],
		[ 'Nordic', 'nord' ],
		[ 'German', 'de' ],
		[ 'Spanish', 'es' ],
		[ 'French', 'fr' ],
		[ 'Russian', 'ru' ],
		[ 'Greek', 'el' ]
	];

	layoutButtons = layoutButtons.map( ( options ) => {

		const button = new ThreeMeshUI.Block( {
			height: 0.06,
			width: 0.2,
			margin: 0.012,
			justifyContent: 'center',
			backgroundColor: new THREE.Color( colors.button ),
			backgroundOpacity: 1
		} ).add(
			new ThreeMeshUI.Text( {
				offset: 0,
				fontSize: 0.035,
				content: options[ 0 ]
			} )
		);

		button.setupState( {
			state: 'idle',
			attributes: {
				offset: 0.02,
				backgroundColor: new THREE.Color( colors.button ),
				backgroundOpacity: 1
			}
		} );

		button.setupState( {
			state: 'hovered',
			attributes: {
				offset: 0.02,
				backgroundColor: new THREE.Color( colors.hovered ),
				backgroundOpacity: 1
			}
		} );

		button.setupState( {
			state: 'selected',
			attributes: {
				offset: 0.01,
				backgroundColor: new THREE.Color( colors.selected ),
				backgroundOpacity: 1
			},
			onSet: () => {

				// enable intersection checking for the previous layout button,
				// then disable it for the current button

				if ( currentLayoutButton ) objsToTest.push( currentLayoutButton );

				if ( keyboard ) {

					clear( keyboard );

					keyboard.panels.forEach( panel => clear( panel ) );

				}

				currentLayoutButton = button;

				makeKeyboard( options[ 1 ] );

			}

		} );

		objsToTest.push( button );

		// Set English button as selected from the start

		if ( options[ 1 ] === 'eng' ) {

			button.setState( 'selected' );

			currentLayoutButton = button;

		}

		return button;

	} );

	// CONTAINER

	layoutOptions = new ThreeMeshUI.Block( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		height: 0.25,
		width: 1,
		offset: 0,
		backgroundColor: new THREE.Color( colors.panelBack ),
		backgroundOpacity: 1
	} ).add(
		new ThreeMeshUI.Block( {
			height: 0.1,
			width: 0.6,
			offset: 0,
			justifyContent: 'center',
			backgroundOpacity: 0
		} ).add(
			new ThreeMeshUI.Text( {
				fontSize: 0.04,
				content: 'Select a keyboard layout :'
			} )
		),

		new ThreeMeshUI.Block( {
			height: 0.075,
			width: 1,
			offset: 0,
			contentDirection: 'row',
			justifyContent: 'center',
			backgroundOpacity: 0
		} ).add(
			layoutButtons[ 0 ],
			layoutButtons[ 1 ],
			layoutButtons[ 2 ],
			layoutButtons[ 3 ]
		),

		new ThreeMeshUI.Block( {
			height: 0.075,
			width: 1,
			offset: 0,
			contentDirection: 'row',
			justifyContent: 'center',
			backgroundOpacity: 0
		} ).add(
			layoutButtons[ 4 ],
			layoutButtons[ 5 ],
			layoutButtons[ 6 ]
		)
	);

	layoutOptions.position.set( 0, 0.2, 0 );
	container.add( layoutOptions );
	objsToTest.push( layoutOptions );

}

/*

Create a keyboard UI with three-mesh-ui, and assign states to each keys.
Three-mesh-ui strictly provides user interfaces, with tools to manage
UI state (component.setupState and component.setState).

It does not handle interacting with the UI. The reason for that is simple :
with webXR, the number of way a mesh can be interacted had no limit. Therefore,
this is left to the user. three-mesh-ui components are THREE.Object3Ds, so
you might want to refer to three.js documentation to know how to interact with objects.

If you want to get started quickly, just copy and paste this example, it manages
mouse and touch interaction, and VR controllers pointing rays.

*/

function makeKeyboard( language ) {

	keyboard = new ThreeMeshUI.Keyboard( {
		language: language,
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.035, // fontSize will propagate to the keys blocks
		backgroundColor: new THREE.Color( colors.keyboardBack ),
		backgroundOpacity: 1,
		backspaceTexture: Backspace,
		shiftTexture: Shift,
		enterTexture: Enter
	} );

	keyboard.position.set( 0, 0.88, -1 );
	keyboard.rotation.x = -0.55;
	scene.add( keyboard );

	//

	keyboard.keys.forEach( ( key ) => {

		objsToTest.push( key );

		key.setupState( {
			state: 'idle',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color( colors.button ),
				backgroundOpacity: 1
			}
		} );

		key.setupState( {
			state: 'hovered',
			attributes: {
				offset: 0,
				backgroundColor: new THREE.Color( colors.hovered ),
				backgroundOpacity: 1
			}
		} );

		key.setupState( {
			state: 'selected',
			attributes: {
				offset: -0.009,
				backgroundColor: new THREE.Color( colors.selected ),
				backgroundOpacity: 1
			},
			// triggered when the user clicked on a keyboard's key
			onSet: () => {

				// if the key have a command (eg: 'backspace', 'switch', 'enter'...)
				// special actions are taken
				if ( key.info.command ) {

					switch ( key.info.command ) {

						// switch between panels
						case 'switch' :
							keyboard.setNextPanel();
							break;

						// switch between panel charsets (eg: russian/english)
						case 'switch-set' :
							keyboard.setNextCharset();
							break;

						case 'enter' :
							userText.set( { content: userText.content + '\n' } );
							break;

						case 'space' :
							userText.set( { content: userText.content + ' ' } );
							break;

						case 'backspace' :
							if ( !userText.content.length ) break;
							userText.set( {
								content: userText.content.substring( 0, userText.content.length - 1 ) || ''
							} );
							break;

						case 'shift' :
							keyboard.toggleCase();
							break;

					}

					// print a glyph, if any
				} else if ( key.info.input ) {

					userText.set( { content: userText.content + key.info.input } );

				}

			}
		} );

	} );

}

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	updateButtons();

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	// stats.update();
	renderer.render( scene, camera );

}

/*

Called in the loop, get intersection with either the mouse or the VR controllers,
then update the buttons states according to result.

As written above, three-mesh-ui provides only and strictly user interfaces, with tools to manage
UI state (component.setupState and component.setState).

Interacting with this UI must be done manually by the user, given the wide range of
possibilities in this regard.

*/

function updateButtons() {

	// Find closest intersecting object

	let intersect;

	if ( renderer.xr.isPresenting ) {

		vrControl.setFromController( 0, raycaster.ray );

		intersect = raycast();

		if ( intersect ) console.log( intersect.point );

		// Position the little white dot at the end of the controller pointing ray
		if ( intersect ) vrControl.setPointerAt( 0, intersect.point );

	} else if ( mouse.x !== null && mouse.y !== null ) {

		raycaster.setFromCamera( mouse, camera );

		intersect = raycast();

	}

	// Update targeted button state (if any)

	if ( intersect && intersect.object.isUI ) {

		if ( ( selectState && intersect.object.currentState === 'hovered' ) || touchState ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			if ( intersect.object.states[ 'selected' ] ) intersect.object.setState( 'selected' );

		} else if ( !selectState && !touchState ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			if ( intersect.object.states[ 'hovered' ] ) intersect.object.setState( 'hovered' );

		}

	}

	// Update non-targeted buttons state

	objsToTest.forEach( ( obj ) => {

		if ( ( !intersect || obj !== intersect.object ) && obj.isUI ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			if ( obj.states[ 'idle' ] ) obj.setState( 'idle' );

		}

	} );

}

//

function raycast() {

	return objsToTest.reduce( ( closestIntersection, obj ) => {

		// keys in panels that are hidden are not tested
		if ( !layoutOptions.getObjectById( obj.id ) &&
			!keyboard.getObjectById( obj.id ) &&
			intersectionRoom !== obj
		) {

			return closestIntersection;

		}

		const intersection = raycaster.intersectObject( obj, true );

		// if intersection is an empty array, we skip
		if ( !intersection[ 0 ] ) return closestIntersection;

		// if this intersection is closer than any previous intersection, we keep it
		if ( !closestIntersection || intersection[ 0 ].distance < closestIntersection.distance ) {

			// Make sure to return the UI object, and not one of its children (text, frame...)
			intersection[ 0 ].object = obj;

			return intersection[ 0 ];

		}

		return closestIntersection;

	}, null );

}

// Remove this ui component cleanly

function clear( uiComponent ) {

	scene.remove( uiComponent );

	// We must call this method when removing a component,
	// to make sure it's removed from the update registry.
	uiComponent.clear();

	uiComponent.traverse( ( child ) => {

		if ( objsToTest.includes( child ) ) objsToTest.splice( objsToTest.indexOf( child ), 1 );

	} );

}
