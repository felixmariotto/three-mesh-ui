import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/bold.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/bold.png';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { BoxGeometry, Mesh, MeshLambertMaterial, MeshStandardMaterial, Object3D, PointLight, PointLightHelper } from "three";

import MSDFStandardMaterial from 'three-mesh-ui/examples/msdf-materials/MSDFStandardMaterial'
import MSDFPhysicalMaterial from 'three-mesh-ui/examples/msdf-materials/MSDFPhysicalMaterial';
import MSDFLambertMaterial from 'three-mesh-ui/examples/msdf-materials/MSDFLambertMaterial';
import MSDFNormalMaterial from 'three-mesh-ui/examples/msdf-materials/MSDFNormalMaterial';
import MSDFVertexMaterialExample from 'three-mesh-ui/examples/msdf-materials/MSDFVertexMaterialExample';
import MSDFFontMaterialUtils from '../src/font/msdf/utils/MSDFFontMaterialUtils';


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let cube, scene, camera, renderer, controls, stats;
let light, lightContainer, lightHelper;
let outerContainer, innerContainer;
let vertexMaterial;

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
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 32, 32, 32 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );


	lightContainer = new Object3D();
	lightContainer.rotation.z = 0.45;
	lightContainer.position.set(0,1,-1.8);

	light = new PointLight(0xffFF99,3);
	light.position.set(1.45,0,0);
	lightContainer.add(light)

	lightHelper = new PointLightHelper(light,0.15,0xff0000);
	scene.add(lightHelper);

	scene.add(lightContainer);

	cube = new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new MeshLambertMaterial({color:0x99ff00})
	)
	cube.position.set(0,1,-2.5);
	scene.add( cube );



	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function makeTextPanel() {

	outerContainer = new ThreeMeshUI.Block({
		width: 3.2,
		height: 0.2,
		padding: 0.05,
		backgroundColor: new THREE.Color( 0x121212 ),
		backgroundOpacity: 0,
		interLine:-0.05,
		justifyContent: 'center',
		alignContent: 'center',
		// fontColor: new THREE.Color( 0xFF9900 ),
		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.25,
	});

	outerContainer.position.set( 0, 1, -1.8 );
	outerContainer.rotation.x = -0.55;
	scene.add( outerContainer );


	let defaultText = new ThreeMeshUI.Text({content:"FontMaterial(default)\n", fontColor: new THREE.Color(0x0099ff)});

	let standardText = new ThreeMeshUI.Text({content:"MSDFStandardMaterial\n", fontColor: new THREE.Color(0x0099ff).convertSRGBToLinear()});
	let standardMaterial = new MSDFStandardMaterial();
	standardText.fontMaterial = standardMaterial;

	let physicalText = new ThreeMeshUI.Text({content:"MSDFPhysicalMaterial\n"});
	let physicalMaterial = new MSDFPhysicalMaterial({color: 0xffffff,
		transmission: 1,
		opacity: 1,
		metalness: 0,
		roughness: 0,
		ior: 2,
		thickness: 0.1,
		specularIntensity: 1,
		specularColor: 0xffffff,
		envMapIntensity: 1});
	physicalText.fontMaterial = physicalMaterial;

	let lambertText = new ThreeMeshUI.Text({content:"MSDFLambertMaterial\n", fontColor:new THREE.Color(0x0099ff).convertSRGBToLinear()});
	let lambertMaterial = new MSDFLambertMaterial({});
	lambertText.fontMaterial = lambertMaterial;

	let normalText = new ThreeMeshUI.Text({content:"MSDFNormalMaterial\n", fontColor:new THREE.Color(0x0099ff).convertSRGBToLinear()});
	let normalMaterial = new MSDFNormalMaterial({});
	normalText.fontMaterial = normalMaterial;

	let wireText = new ThreeMeshUI.Text({content:"WireframeProperty\n", fontColor:new THREE.Color(0x0099ff), segments:12});
	let wireMaterial = new MSDFStandardMaterial({wireframe:true});
	wireText.fontMaterial = wireMaterial;

	let vertexText = new ThreeMeshUI.Text({content:"VertexShaderExample\n", fontColor:new THREE.Color(0x0099ff), segments:12});
	vertexMaterial = new MSDFVertexMaterialExample();
	vertexText.fontMaterial = vertexMaterial;

	let mixedText = new ThreeMeshUI.Text({content:"CustomMaterial .from()",fontColor:new THREE.Color(0x99ff00)});

	// Mix a threejs material to obtain an TMU Font Material
	const mixedMaterial = MSDFFontMaterialUtils.from(MeshStandardMaterial);
	mixedText.fontMaterial = new mixedMaterial();

	mixedText.fontMaterial.onBeforeCompile = (shader) => {
		// custom user code
	}


	setInterval(()=>{


		// vertexMaterial.wireframe = !vertexMaterial.wireframe;

		// setting segments, could only replace the text geometry
		// currently any other inline components on the same levels are rebuilt
		// which is a performance issue
		// its also recompile any existing material
		// geometryNeedUpdate = true ? Overkill? Could gather splitChars and splitLines


		//vertexText.set({segments:Math.ceil(Math.random()*24)})



	}, 500)

	// setInterval( ()=>{
	//
	//     let color = new THREE.Color(Math.random(),Math.random(),Math.random());
	//     text.set({fontColor: color, fontOpacity:Math.random()});
	//
	// },2500);
	//
	//
	// change segments
	// setInterval( ()=>{
	//     text.set({segments: Math.ceil(Math.random()*15 ) });
	//
	// },500);

	outerContainer.add( defaultText, standardText , lambertText, physicalText, normalText, wireText, vertexText , mixedText );

};


// handles resizing the renderer when the viewport is resized

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};



//

let vertexSpeed = 1;
function loop() {

	lightContainer.rotation.y += 1 / 60;


	vertexMaterial.userData.progress.value += 1 / 60 * vertexSpeed;
	if( vertexMaterial.userData.progress.value >= 1 ){
		vertexMaterial.userData.progress.value = 1;
		vertexSpeed *= - 1;
	}

	if( vertexMaterial.userData.progress.value <= 0 ){
		vertexMaterial.userData.progress.value = 0;
		vertexSpeed *= - 1;
	}


	cube.rotation.y += 1/30;
	cube.rotation.z += 1/30;

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
	stats.update()
};
