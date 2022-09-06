import * as THREE from 'three';
import { TextureLoader } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import Stats from 'three/examples/jsm/libs/stats.module';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, stats;
let rootBlock, columnContainer;

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
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0.5 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	room.position.z = -1.5;

	scene.add( room );

	// Fonts
	ThreeMeshUI.FontLibrary
		.addFontFamily("Roboto")
		.addVariant( "normal", "normal","./assets/fonts/msdf/roboto/regular.json","./assets/fonts/msdf/roboto/regular.png" );

	const uvTexture = new TextureLoader().load("./assets/uv_grid.jpg");

	// TEXT PANEL
	rootBlock = new ThreeMeshUI.Block({
		width:3.25,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	});

	const titleBlock = new ThreeMeshUI.Block({width:3.10,height:0.25});
	const title = new ThreeMeshUI.Text({
		fontFamily: 'Roboto',
		fontSize: 0.055,
		textContent: 'Border - Units and radiuses'
	})

	titleBlock.add( title );
	rootBlock.add( titleBlock );

	rootBlock.position.set(0,1,-2);

	columnContainer = new ThreeMeshUI.Block({width:3.25,flexDirection:'row', alignItems:'start', justifyContent: 'space-between'});

	rootBlock.add(columnContainer)

	const b1 = createColumn('WorldUnits = rem');
	for ( let i = 0; i < b1.blocks.length; i++ ) {
		const block = b1.blocks[ i ];
		block._borderRadius.units = 'rem';
		block.set({borderRadius: 0.1});
		block.set({backgroundImage: uvTexture, backgroundSize:'stretch',backgroundColor:new THREE.Color(0xFFFFFF)});
	}
	columnContainer.add(b1);

	const b2 = createColumn('UV = em');
	for ( let i = 0; i < b2.blocks.length; i++ ) {
		const block = b2.blocks[ i ];
		block._borderRadius.units = 'em';
		// block.set({borderTopLeftRadius: 0.5})
		block.set({borderRadius: 0.1});
		block.set({backgroundImage: uvTexture, backgroundSize:'stretch',backgroundColor:new THREE.Color(0xFFFFFF)});
	}


	columnContainer.add( b2 );

	const b3 = createColumn('Percent');
	for ( let i = 0; i < b3.blocks.length; i++ ) {
		const block = b3.blocks[ i ];
		block._borderRadius.units = '%';
		block.set({borderRadius: 10})
	}
	columnContainer.add(b3);

	scene.add( rootBlock );

	renderer.setAnimationLoop( loop );
}

function createColumn(text){

	const column = new ThreeMeshUI.Block({width:1, flexDirection: 'column', alignItems:'center', justifyContent: 'start'});

	const titleBlock = new ThreeMeshUI.Block({width:1,height:0.25});
	const title = new ThreeMeshUI.Text({
		fontFamily: 'Roboto',
		fontSize: 0.035,
		textContent: text
	})

	titleBlock.add( title );
	column.add( titleBlock );

	const blocks = [];
	for ( let i = 1; i < 4; i++ ) {
		const block = new ThreeMeshUI.Block({ margin:0.05, width: 1/i, height: 1.0, backgroundColor:new THREE.Color(0xff9900)});
		blocks.push( block );
		column.add( block )

	}

	column.blocks = blocks;

	return column;

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

	stats.update()
}
