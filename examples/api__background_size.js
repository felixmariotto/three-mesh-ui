// xfg:title BackgroundSize
// xfg:category learn

import * as THREE from 'three';
import { TextureLoader } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from 'three-mesh-ui';

// assets URLs
import UVImage from 'three-mesh-ui/examples/assets/uv_grid.jpg';
import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, snakeTexture;
const imageBlocks = [];

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

	makePanels();

	//

	renderer.setAnimationLoop( loop );

}

//

function makePanels() {

	const container = new ThreeMeshUI.Block( {
		height: 1.6,
		width: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundOpacity: 0
	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const loader = new THREE.TextureLoader();

	loader.load( UVImage, ( texture ) => {

		// necessary for backgroundSize: 'contain'
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;

		texture.needsUpdate = true;

		texture.matrixAutoUpdate = true;

		const stretchSection = makeSection(
			texture,
			'stretch',
			'backgroundSize: "stretch"',
			' stretches each size of the image\'s texture to fit the borders of the Block.'
		);

		const containSection = makeSection(
			texture,
			'contain',
			'backgroundSize: "contain"',
			' fits the texture inside a Block, while keeping its aspect ratio and showing all of its surface.'
		);

		const coverSection = makeSection(
			texture,
			'cover',
			'backgroundSize: "cover"',
			' extends the texture while keeping its aspect ratio, so that it covers the Block entirely.'
		);

		container.add( stretchSection, containSection, coverSection );

	} );


	snakeTexture = new TextureLoader().load('./assets/spiny_bush_viper.jpg');
	setTimeout( () => {
		for ( let i = 0; i < imageBlocks.length; i++ ) {
			const imageBlock = imageBlocks[ i ];
			imageBlock.set({backgroundImage:snakeTexture});
		}
	}, 3000 );

}

//

function makeSection( texture, backgroundSize, text1, text2 ) {

	const block = new ThreeMeshUI.Block( {
		height: 1.6,
		width: 0.6,
		margin: 0.05,
		backgroundOpacity: 0,
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'center'
	} );

	const imageHBlock = new ThreeMeshUI.Block( {
		height: 0.4,
		width: 0.6,
		borderRadius: 0.05,
		margin: 0.05,
		backgroundImage: texture,
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color(0xffffff),
		backgroundSize
	} );


	const imageBlock = new ThreeMeshUI.Block( {
		height: 0.9,
		width: 0.6,
		borderRadius: 0.05,
		backgroundImage: texture,
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color(0xffffff),
		backgroundSize
	} );

	window.block = imageBlock;

	imageBlocks.push( imageHBlock, imageBlock );

	const textBlock = new ThreeMeshUI.Block( {
		height: 'auto',
		width: 0.5,
		margin: 0.05,
		padding: 0.03,
		borderRadius : 0.025,
		justifyContent: 'center',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		backgroundColor: 0x000000,
		backgroundOpacity: 0.3,
		fontSize: 0.04
	} );

	textBlock.add(
		new ThreeMeshUI.Text( {
			textContent: text1 + '\n',
			color: new THREE.Color( 0x96ffba )
		} ),

		new ThreeMeshUI.Text( {
			textContent: text2
		} )
	);

	block.add( imageHBlock, imageBlock, textBlock );

	return block;

}

// handles resizing the viewport

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

	renderer.render( scene, camera );

}
