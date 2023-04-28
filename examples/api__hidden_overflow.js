// xfg:title Overflow
// xfg:category learn

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import BoxLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxLayoutBehavior';
import { TextureLoader } from 'three';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls,
	container, textContainer;

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );
	camera.position.set( 0, 1.6, 0 );
	camera.lookAt( 0, 1, -1.8 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.localClippingEnabled = true;
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

	const title = new ThreeMeshUI.Text( {
		height: 0.2,
		width: 1.2,
		fontSize: 0.09,
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		backgroundColor: new THREE.Color( 'blue' ),
		backgroundOpacity: 0.2,
		renderOrder: 150
	} ).add(
		new ThreeMeshUI.Inline( { textContent: 'hiddenOverflow attribute :' } )
	);

	window.title = title;

	title.position.set( 0, 1.8, -2 );
	scene.add( title );

	// !!! BEWARE !!!
	// three-mesh-ui uses three.js local clipping to hide overflows, so don't
	// forget to enable local clipping with renderer.localClippingEnabled = true;

	container = new ThreeMeshUI.Block( {
		height: 1,
		width: 1,
		boxSizing: 'border-box',
		// padding: '0 0.1 0.2 0',
		// padding: '0.05 0.1 0.2 0.025',
		padding: '0.1 0.2 0.1 0.1',
		borderRadius: 0.05,
		// padding: 0.09,
		justifyContent: 'center',
		borderOpacity: 1,
		borderWidth: 0.1,
		borderColor: new THREE.Color(0xff99ff),
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color(0xffffff),
		backgroundImage : new TextureLoader().load("./assets/uv_grid.jpg"),
		backgroundSize: 'stretch',
		overflow: 'hidden'
	} );

	// container.setupState( {
	// 	state: 'hidden-on',
	// 	attributes: { hiddenOverflow: true }
	// } );
	//
	// container.setupState( {
	// 	state: 'hidden-off',
	// 	attributes: { hiddenOverflow: false }
	// } );
	//
	// container.setState( 'hidden-on' );

	container.position.set( 0, 1, -1.8 );
	// container.rotation.x = -0.55;
	scene.add( container );

	//

	textContainer = new ThreeMeshUI.Block( {
		width: 1.3,
		height: 1.3,
		offset: 0.025,
		// padding: 0.09,
		backgroundColor: new THREE.Color( 'blue' ),
		backgroundOpacity: 0.5,
		justifyContent: 'center'
	} );

	window.textContainer = textContainer;

	container.add( textContainer );

	//

	const text = new ThreeMeshUI.Text( {
		textContent: 'hiddenOverflow '.repeat( 28 ),
		fontSize: 0.054,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	window.text = text;

	textContainer.add( text );

	new BoxLayoutBehavior( container );

	setInterval( () => {

		// console.log( container.get('overflow') );
		if( container.get('overflow') === 'hidden' ) {

			container.set({ overflow:'visible'});

		} else {

			container.set({ overflow: 'hidden'});

		}
		// if ( container.get('overflow'))
		// if ( container.currentState === 'hidden-on' ) {
		//
		// 	container.setState( 'hidden-off' );
		//
		// } else {
		//
		// 	container.setState( 'hidden-on' );
		//
		// }

	}, 1500 );

}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// animate user interface

	const x = Math.sin( Date.now() / 2000 ) * 0.25;
	const y = ( Math.cos( Date.now() / 2000 ) * 0.25 );

	container.position.x = x;
	container.position.y = y + 0.85;

	textContainer.position.x = x * 0.6;
	textContainer.position.y = y * 0.6;

	container.getProperty("overflow").requestUpdate();
	// container._overflow._needsUpdate = true;
	// container._overflow._needsUpdate = true;

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	//

	controls.update();
	renderer.render( scene, camera );

}
