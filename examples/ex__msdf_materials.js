// xfg:title MSDF-Font Materials
// xfg:category extend

import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

import MSDFStandardMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFStandardMaterial';
import MSDFPhysicalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFPhysicalMaterial';
import MSDFLambertMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFLambertMaterial';
import MSDFVertexMaterialExample from 'three-mesh-ui/examples/materials/msdf/MSDFVertexMaterialExample';


const color = new THREE.Color(0xff9900);
// this will be updated on each frame
let vertexMaterial;


function example() {

	// make a Block to hold many Texts
	const container = new ThreeMeshUI.Block({
		width: 3.2,
		height: 0.2,
		justifyContent: 'center',
		alignItems: 'center',
		color: color,
		fontFamily: RobotoFontFamily,
		fontWeight: "700",
		fontSize: 0.25,
		lineHeight: 0.9
	});

	container.position.set( 0, 1.25, -0.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	// Now, let's build different text, and set their material


	// default material provided by three-mesh-ui
	const defaultText = new ThreeMeshUI.Text({textContent:"FontMaterial(default)"});

	// StandardMaterial from three-mesh-ui/examples/materials/mdsf/
	const standardText = new ThreeMeshUI.Text({textContent:"MSDFStandardMaterial"});
	standardText.fontMaterial = new MSDFStandardMaterial({ /* material options */ });

	// LambertMaterial from three-mesh-ui/examples/materials/mdsf/
	const lambertText = new ThreeMeshUI.Text({textContent:"MSDFLambertMaterial"});
	lambertText.fontMaterial = new MSDFLambertMaterial({ /* material options */ });


	// PhysicalMaterial from three-mesh-ui/examples/materials/mdsf/
	const physicalText = new ThreeMeshUI.Text({textContent:"MSDFPhysicalMaterial",color: new THREE.Color(0xffffff)});
	physicalText.fontMaterial = new MSDFPhysicalMaterial({
		color: 0xffffff,
		transmission: 1,
		opacity: 1,
		roughness: 0,
		ior: 2,
		thickness: 0.1,
		specularIntensity: 1,
		envMapIntensity: 1});

	// WireframeProperty - When using three materials, you can then access to their properties such as wireframe
	// Note that segments are increased to 12 instead of 1(default) - Showing more wireframe edges
	const wireText = new ThreeMeshUI.Text({textContent:"WireframeProperty", segments:12});
	wireText.fontMaterial = new MSDFStandardMaterial({wireframe:true});

	// VertexShader example from three-mesh-ui/examples/materials/mdsf/
	// Note that segments are increased to 12 instead of 1(default) - Smoothing triangles deformations
	const vertexText = new ThreeMeshUI.Text({textContent:"VertexShaderExample", segments:12});
	vertexText.fontMaterial = new MSDFVertexMaterialExample();
	// set the vertexMaterial in this case, to access it during render update
	vertexMaterial = vertexText.fontMaterial;

	// Mixed Material - three-mesh-ui provides a way to provide a compatibility
	// Preventing you to create a Material class such as showed above
	const mixedText = new ThreeMeshUI.Text({textContent:"Mixed class .from()", fontSize:0.2});

	// Pass a three material class to MSDFFontMaterialUtils.from()
	const customMaterialClass = ThreeMeshUI.MSDFFontMaterialUtils.from(THREE.MeshStandardMaterial);
	// It returns a mixined class that might be compatible to MSDF material (within limitation)
	mixedText.fontMaterial = new customMaterialClass();

	// And we can now use onBeforeCompile to customize its shader
	mixedText.fontMaterial.onBeforeCompile = ( shader) => {
		console.log( "this is the shader you can customize", shader);
		console.log( "it already has the msdf chunks applyied on it");
	}


	// place all created texts in the container
	container.add( defaultText, standardText, lambertText, physicalText, wireText, vertexText , mixedText );


	// providing some addition update function for this example.
	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	exampleAddUpdate( vertexShaderUpdate );

}

let vertexSpeed = 1;
function vertexShaderUpdate() {

	// In MSDFVertexMaterialExample, their is an accessible uniform that provide deformations
	// so update it on each frame
	vertexMaterial.userData.progress.value += 1 / 60 * vertexSpeed;

	// and ping-pong it in a range of [0,1]
	if( vertexMaterial.userData.progress.value >= 1 ){
		vertexMaterial.userData.progress.value = 1;
		vertexSpeed *= - 1;
	}

	if( vertexMaterial.userData.progress.value <= 0 ){
		vertexMaterial.userData.progress.value = 0;
		vertexSpeed *= - 1;
	}

}



































/***********************************************************************************************************************
 * Above this comment, you could find the contextual setup of this example.
 * Not really related to the example itself : Creating three renderer, scene, lights, etc...
 **********************************************************************************************************************/

import { exampleAddResizer, exampleAddUpdate, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { exampleThreePointLight, rollPointLightUpdate } from 'three-mesh-ui/examples/_setup/ThreePointLight';
import { exampleThreeCube, rollCubeUpdate } from 'three-mesh-ui/examples/_setup/ThreeCube';
import { exampleFontPreloadRoboto } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { exampleRoomVR } from 'three-mesh-ui/examples/_setup/RoomVR';
import { exampleCameraPerspective, exampleCameraPerspectiveResize } from 'three-mesh-ui/examples/_setup/CameraPerspective';

/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraPerspective();
exampleAddResizer( exampleCameraPerspectiveResize );


const { scene, renderer, controls, stats } = exampleThreeSetup( camera );

const { roomVR } = exampleRoomVR( scene );

// building pointLight
const {pointLightContainer, pointLight, pointLightHelper} = exampleThreePointLight(scene);
// register an update for pointLight
exampleAddUpdate( rollPointLightUpdate );

// building a cube
const cube = exampleThreeCube( scene );
// register and update for cube
exampleAddUpdate( rollCubeUpdate );

// preload fonts and run example() after
const RobotoFontFamily = exampleFontPreloadRoboto( example );

