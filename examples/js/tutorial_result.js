
/* Import everything we need from Three.js */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';

/* Create the container object, the scene */

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x505050 );

/* Create the camera from which the scene will be seen */

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

/* Create the renderer object, with VR parameters enabled */

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild( renderer.domElement );

/* Orbit controls */

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 1.6, 0 );
controls.target = new THREE.Vector3( 0, 1, -1.8 );
controls.update();

// Create basic room mesh, and add it to the scene

const room = new THREE.LineSegments(
	new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
	new THREE.LineBasicMaterial( { color: 0x808080 } )
);

scene.add( room );

// UI panel creation

const container = ThreeMeshUI.Block({
	height: 1.5,
	width: 1
});

container.position.set( 0, 1, -1.8 );
container.rotation.x = -0.55;
scene.add( container );

//

const imageBlock = ThreeMeshUI.Block({
	height: 1.3,
	width: 1.6,
	offset: 0.1
});

const textBlock = ThreeMeshUI.Block({
	height: 0.4,
	width: 0.8,
	margin: 0.05,
	offset: 0.1
});

container.add( imageBlock, textBlock );

//

const loader = new THREE.TextureLoader();

loader.load( './assets/uv_grid.jpg' /* './assets/spiny_bush_viper.jpg' */, (texture)=> {

	const material = new THREE.MeshBasicMaterial({
		map: texture
	});

	imageBlock.set({
		backgroundMaterial: material
	});

});

//

container.set({
	textType: 'geometry',
	fontFamily: './assets/helvetiker_regular.typeface.json'
});

const text = new ThreeMeshUI.Text({
	content: 'The spiny bush viper is known for its extremely keeled dorsal scales.'
});

textBlock.add( text );

text.set({
	fontMaterial: new THREE.MeshBasicMaterial({ color: 0xd2ffbd }),
	fontSize: 0.04
});

textBlock.set({
	alignContent: 'right',
	justifyContent: 'end',
	padding: 0.03
});

textBlock.add(
	new ThreeMeshUI.Text({
		content: ' Mind your fingers.',
		fontMaterial: new THREE.MeshBasicMaterial({ color: 0xefffe8 })
	})
);

/* Render loop (called ~60 times/second, or more in VR) */

renderer.setAnimationLoop( loop );

function loop() {
	controls.update();
	renderer.render( scene, camera );
};
