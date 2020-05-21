
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls ;

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf2f2f2 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
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

};

//

function makeTextPanel() {

	const whiteMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});

	const greenMaterial = new THREE.MeshBasicMaterial({
		color: 0x92e66c
	});

	const uiContainer = new THREE.Group();
	uiContainer.position.set( 0, 1, -1.8 );
	uiContainer.rotation.x = -0.55;
	scene.add( uiContainer );

	const container = ThreeMeshUI.Block({
		ref: 'container',
		padding: 0.025,
		fontFamily: './assets/helvetiker_regular.typeface.json',
		textType: 'geometry',
		fontMaterial: whiteMaterial
	});

	uiContainer.add( container );

	//

	const title = ThreeMeshUI.Block({
		height: 0.2,
		width: 1.5,
		margin: 0.025,
		justifyContent: 'center',
		fontSize: 0.08
	});

	title.add(
		ThreeMeshUI.Text({
			content: "spiny bush viper"
		})
	);

	container.add( title );

	//

	const leftSubBlock = ThreeMeshUI.Block({
		height: 0.95,
		width: 1.0,
		margin: 0.025,
		padding: 0.025,
		alignContent: "left",
		justifyContent: "end"
	});

	const caption = ThreeMeshUI.Block({
		height: 0.07,
		width: 0.37,
		alignContent: 'center',
		justifyContent: 'center',
		backgroundMaterial: null
	});

	caption.add(
		ThreeMeshUI.Text({
			content: "Mind you fingers",
			fontSize: 0.03
		})
	);

	leftSubBlock.add( caption );

	//

	const rightSubBlock = ThreeMeshUI.Block({
		margin: 0.025
	});

	const subSubBlock1 = ThreeMeshUI.Block({
		height: 0.35,
		width: 0.5,
		margin: 0.025,
		padding: 0.01,
		justifyContent: 'center'
	}).add(

		ThreeMeshUI.Text({
			content: "Known for its extremely keeled dorsal scales that give it a ",
			fontSize: 0.035
		}),

		ThreeMeshUI.Text({
			content: "bristly",
			fontMaterial: greenMaterial,
			fontSize: 0.042
		}),

		ThreeMeshUI.Text({
			content: " appearance.",
			fontSize: 0.035
		})

	);

	const subSubBlock2 = ThreeMeshUI.Block({
		height: 0.525,
		width: 0.5,
		margin: 0.01,
		padding: 0.02,
		fontSize: 0.019,
		alignContent: 'left'
	}).add(

		ThreeMeshUI.Text({
			content: "The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\nThe head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales.\nThe nostril is like a slit and separated from the eye by two scales.\nThe eye and the supralabials are separated by a single row of scales."
		})

	);

	rightSubBlock.add( subSubBlock1, subSubBlock2 );

	//

	const contentContainer = ThreeMeshUI.Block({
		contentDirection: "row",
		padding: 0.02,
		margin: 0.025
	});

	contentContainer.add( leftSubBlock, rightSubBlock );
	container.add( contentContainer );

	//

	new THREE.TextureLoader().load('./assets/spiny_bush_viper.jpg', (texture)=> {

		leftSubBlock.set({
			backgroundMaterial: new THREE.MeshBasicMaterial({
				map: texture
			})
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
};
