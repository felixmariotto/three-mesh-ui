import * as THREE from 'three';
import { DoubleSide, Mesh, MeshStandardMaterial, PlaneBufferGeometry, PointLight, SpotLight, SpotLightHelper } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/bold.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/bold.png';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import MSDFStandardMaterial from 'three-mesh-ui/examples/msdf-materials/MSDFStandardMaterial';
import MSDFDepthMaterial from '../src/font/msdf/materials/MSDFDepthMaterial';


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, stats;
let light, lightHelper;
let outerContainer;

window.addEventListener('load', init );
window.addEventListener('resize', onWindowResize );


//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );


	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	// renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	// camera.position.set( 0, 1.6, 0 );
	camera.position.set( -1.879175122304695,  0.40789135911811525, -4.003052293517432 );



	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.target = new THREE.Vector3( -0.11631162548590937, -0.14189791309117597, -1.932889854781583 );

	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 32, 32, 32 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	room.position.z = -1.5;
	scene.add( room );

	const floor = new Mesh(
		new PlaneBufferGeometry(6,6,5,5),
		new MeshStandardMaterial( {color:0xffffff} )
	);
	floor.rotation.x = - Math.PI / 2;
	floor.position.z = -1.5;
	floor.position.y = -0.01
	floor.receiveShadow = true;

	scene.add(floor);


	light = new SpotLight(0xffffff,1, 8, Math.PI / 6, 1.0, 1.0);
	light.position.set(0,2,0.75);
	light.castShadow = true;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 1024; // default
	light.shadow.mapSize.height = 1024; // default
	light.shadow.camera.near = 0.5; // default
	light.shadow.camera.far = 500; // default

	scene.add(light);
	scene.add(light.target);

	lightHelper = new SpotLightHelper(light,0xff0000);
	scene.add(lightHelper);

	light.target.position.set(0,0.75,-2);

	const plight = new PointLight( 0xffffff, 1, 8, 1.0);
	plight.position.set(0,2, -2)

	scene.add(plight)


	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	outerContainer = new ThreeMeshUI.Block({
		width: 3.2,
		height: 0.2,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0x121212 ),
		backgroundOpacity: 0,
		interLine:0,
		justifyContent: 'center',
		alignItems: 'center',
		// fontColor: new THREE.Color( 0xFF9900 ),
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.25,
	});

	outerContainer.position.set( 0, 0.75, -1.8 );
	// outerContainer.rotation.x = -0.35;
	outerContainer.rotation.y = Math.PI;
	scene.add( outerContainer );

	// making sure background is not casting shadows too
	outerContainer.frame.visible = false;

	// outerContainer.onAfterUpdate = function( ) {
	//
	// 	outerContainer.frame.visible = false;
	//
	// }

	const defaultText = new ThreeMeshUI.Text({content:"FontMaterial(default)\n", fontColor: new THREE.Color(0x0099ff)});
	const defaultTextInverted = new ThreeMeshUI.Text({content:"FontMaterial(default)\n", fontColor: new THREE.Color(0x0099ff)});

	const standardText = new ThreeMeshUI.Text({content:"MSDFStandardMaterial\n", fontColor: new THREE.Color(0x0099ff).convertSRGBToLinear()});
	standardText.fontMaterial = new MSDFStandardMaterial({});

	const standardTextInverted = new ThreeMeshUI.Text({content:"MSDFStandardMaterial\n", fontColor: new THREE.Color(0x99ff00).convertSRGBToLinear()});
	standardTextInverted.fontMaterial = new MSDFStandardMaterial();
	standardTextInverted.fontMaterial.defines['INVERT_ALPHA'] = '';

	outerContainer.add( defaultText, defaultTextInverted, standardText, standardTextInverted );

	standardText.onAfterUpdate = function() {

		if( standardText.children.length ){

			standardText.children[0].castShadow = true;
			standardText.children[0].material.side = DoubleSide;

			const depthMat = new MSDFDepthMaterial();

			if( standardText.children[0].material.isDefault ) {
				depthMat.userData.glyphMap.value = standardText.children[0].material.glyphMap;
				depthMat.userData.unitRange.value = standardText.children[0].material.unitRange;
			} else {
				depthMat.userData.glyphMap.value = standardText.children[0].material.userData.glyphMap.value;
				depthMat.userData.unitRange.value = standardText.children[0].material.userData.unitRange.value;
			}

			standardText.children[0].customDepthMaterial = depthMat;

		}

	}

	standardTextInverted.onAfterUpdate = function() {

		if( standardTextInverted.children.length ){

			standardTextInverted.children[0].castShadow = true;
			standardTextInverted.children[0].material.side = DoubleSide;

			const depthMat = new MSDFDepthMaterial();

			// ! Retrieving glyphMap on the default material is
			//     defaultMsdfMaterial.glyphMap;
			// instead of
			//     customMsdfMaterial.userData.glyphMap.value
			if( standardTextInverted.children[0].material.isDefault ) {
				depthMat.userData.glyphMap.value = standardTextInverted.children[0].material.glyphMap;
				depthMat.userData.unitRange.value = standardTextInverted.children[0].material.unitRange;
			} else {
				depthMat.userData.glyphMap.value = standardTextInverted.children[0].material.userData.glyphMap.value;
				depthMat.userData.unitRange.value = standardTextInverted.children[0].material.userData.unitRange.value;
			}
			// depthMat.userData.glyphMap.value = standardTextInverted.children[0].material.userData.glyphMap.value;
			depthMat.defines['INVERT_ALPHA'] = ''
			standardTextInverted.children[0].customDepthMaterial = depthMat;
		}

	}

	defaultTextInverted.onAfterUpdate = function() {

		if( defaultTextInverted.children.length ){

			defaultTextInverted.children[0].castShadow = true;
			defaultTextInverted.children[0].material.side = DoubleSide;

			const depthMat = new MSDFDepthMaterial();
			if( defaultTextInverted.children[0].material.isDefault ) {
				depthMat.userData.glyphMap.value = defaultTextInverted.children[0].material.glyphMap;
				depthMat.userData.unitRange.value = defaultTextInverted.children[0].material.unitRange;
			} else {
				depthMat.userData.glyphMap.value = defaultTextInverted.children[0].material.userData.glyphMap.value;
				depthMat.userData.unitRange.value = defaultTextInverted.children[0].material.userData.unitRange.value;
			}

			depthMat.defines['INVERT_ALPHA'] = ''
			defaultTextInverted.children[0].customDepthMaterial = depthMat;
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

let lightSpeed = 0.01;
function loop() {

	// lightContainer.rotation.y += 1 / 60;
	light.position.x += lightSpeed;

	if( light.position.x <= -1 ){
		light.position.x = -1;
		lightSpeed *= -1;
	}
	if( light.position.x >= 1 ){
		light.position.x = 1;
		lightSpeed *= -1;
	}

	lightHelper.update();

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
	stats.update()
}
