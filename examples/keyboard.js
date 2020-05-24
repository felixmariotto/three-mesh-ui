
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, vrControl;
let objsToTest = [];

const raycaster = new THREE.Raycaster();

// calculate mouse position in normalized device coordinates
// (-1 to +1) for both directions.
// Used to raycasting against the interactive elements

const mouse = new THREE.Vector2();
mouse.x = mouse.y = null;

let selectState = false;

window.addEventListener( 'mousemove', ( event )=>{
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

window.addEventListener( 'mousedown', ()=> { selectState = true });

window.addEventListener( 'mouseup', ()=> { selectState = false });

window.addEventListener( 'touchstart', ( event )=> {
	selectState = true;
	mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
});

window.addEventListener( 'touchend', ()=> {
	selectState = false;
	mouse.x = null;
	mouse.y = null;
});

//

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );

	// LIGHT

	const light = ShadowedLight({
		z: 10,
		width: 6,
		bias: -0.0001
	});

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

	vrControl.controllers[ 0 ].addEventListener( 'selectstart', ()=> { selectState = true } );
	vrControl.controllers[ 0 ].addEventListener( 'selectend', ()=> { selectState = false } );

	// ROOM

	const room = new THREE.LineSegments(
        new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	
	const roomMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial({ side: THREE.BackSide }),
	);

	scene.add( room );
    objsToTest.push(roomMesh);

    // USER INTERFACE

    makeUI();

	// LOOP

	renderer.setAnimationLoop( loop );

};

//

function makeUI() {

	// TEXT PANEL

    const textPanel = ThreeMeshUI.Block({
    	fontFamily: './assets/Roboto-msdf.json',
		fontTexture: './assets/Roboto-msdf.png',
    	width: 1,
    	height: 0.5
    });

    textPanel.position.set( 0, 1.4, -1.2 );
	textPanel.rotation.x = -0.15;
    scene.add( textPanel );

    //

    const title = ThreeMeshUI.Block({
    	width: 1,
    	height: 0.1,
    	justifyContent: 'center',
    	fontSize: 0.045
    }).add(

    	ThreeMeshUI.Text({
    		content: 'Type some text on the keyboard'
    	})

    );

    const userText = ThreeMeshUI.Text({
		content: ''
	});

    const textField = ThreeMeshUI.Block({
    	width: 1,
    	height: 0.4,
    	fontSize: 0.033,
    	padding: 0.02
    }).add( userText );

    title.frameContainer.visible = textField.frameContainer.visible = false;

    textPanel.add( title, textField );

	// KEYBOARD

	const keyboard = ThreeMeshUI.Keyboard({
		fontFamily: './assets/Roboto-msdf.json',
		fontTexture: './assets/Roboto-msdf.png'
	});

	keyboard.position.set( 0, 0.88, -1 );
	keyboard.rotation.x = -0.55;
	scene.add( keyboard );

	//

	const hoveredMaterial = new THREE.MeshBasicMaterial({
		color: 0x7d7d7d,
		transparent: true,
		opacity: 0.2
	});

	const selectedMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.2
	});

	keyboard.keys.forEach( (key)=> {

		objsToTest.push( key );

		key.setupState({
			state: 'idle',
			attributes: {
				offset: 0,
				backgroundMaterial: null
			}
		});

		key.setupState({
			state: 'hovered',
			attributes: {
				offset: 0,
				backgroundMaterial: hoveredMaterial
			}
		});

		key.setupState({
			state: 'selected',
			attributes: {
				offset: -0.005,
				backgroundMaterial: selectedMaterial
			},
			onSet: ()=> {
				userText.set({
					content: userText.content += key.char
				});
			}
		});

	});

};

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

//

function loop() {
	controls.update();
	renderer.render( scene, camera );
	updateButtons()
};

// Called in the loop, get intersection with either the mouse or the VR controllers,
// then update the buttons states according to result

function updateButtons() {

	// Find closest intersecting object

	let intersect;

	if ( renderer.xr.isPresenting ) {

		vrControl.setFromController( 0, raycaster.ray );

		intersect = raycast();

		// Position the little white dot at the end of the controller pointing ray
		vrControl.setPointerAt( 0, intersect.point );

	} else if ( mouse.x !== null && mouse.y !== null ) {

		raycaster.setFromCamera( mouse, camera );

		intersect = raycast();

	};

	// Update targeted button state (if any)

	if ( intersect && intersect.object.isUI ) {

		if ( selectState ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			intersect.object.setState( 'selected' );

		} else {

			// Component.setState internally call component.set with the options you defined in component.setupState
			intersect.object.setState( 'hovered' );

		};

	};

	// Update non-targeted buttons state

	objsToTest.forEach( (obj)=> {

		if ( (!intersect || obj !== intersect.object) && obj.isUI ) {

			// Component.setState internally call component.set with the options you defined in component.setupState
			obj.setState( 'idle' );

		};

	});

};

//

function raycast() {

	return objsToTest.reduce( (closestIntersection, obj)=> {

		const intersection = raycaster.intersectObject( obj, true );

		if ( !intersection[0] ) return closestIntersection

		if ( !closestIntersection || intersection[0].distance < closestIntersection.distance ) {

			intersection[0].object = obj;

			return intersection[0]

		} else {

			return closestIntersection

		};

	}, null );

};
