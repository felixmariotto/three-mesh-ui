import * as THREE from 'three';
import * as ThreeMeshUI from 'three-mesh-ui';

import MSDFStandardMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFStandardMaterial';
import MSDFPhysicalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFPhysicalMaterial';
import MSDFLambertMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFLambertMaterial';
import MSDFVertexMaterialExample from 'three-mesh-ui/examples/materials/msdf/MSDFVertexMaterialExample';


const fontColor = new THREE.Color(0xff9900);
// this will be updated on each frame
let vertexMaterial;


function example() {

	// make a Block to hold many Texts
	const container = new ThreeMeshUI.Block({
		width: 3.2,
		height: 0.2,
		backgroundOpacity: 0,
		interLine:-0.05,
		justifyContent: 'center',
		alignItems: 'center',
		fontColor,
		fontFamily: RobotoFontFamily,
		fontWeight: ThreeMeshUI.FontWeight.BOLD,
		fontSize: 0.25,
	});

	container.position.set( 0, 1.25, -0.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	// Now, let's build different text, and set their material


	// default material provided by three-mesh-ui
	const defaultText = new ThreeMeshUI.Text({content:"FontMaterial(default)\n"});

	// StandardMaterial from three-mesh-ui/examples/materials/mdsf/
	const standardText = new ThreeMeshUI.Text({content:"MSDFStandardMaterial\n"});
	standardText.material = new MSDFStandardMaterial({ /* material options */ });

	// LambertMaterial from three-mesh-ui/examples/materials/mdsf/
	const lambertText = new ThreeMeshUI.Text({content:"MSDFLambertMaterial\n"});
	lambertText.material = new MSDFLambertMaterial({ /* material options */ });


	// PhysicalMaterial from three-mesh-ui/examples/materials/mdsf/
	const physicalText = new ThreeMeshUI.Text({content:"MSDFPhysicalMaterial\n",fontColor: new THREE.Color(0xffffff)});
	physicalText.material = new MSDFPhysicalMaterial({
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
	const wireText = new ThreeMeshUI.Text({content:"WireframeProperty\n", segments:12});
	wireText.material = new MSDFStandardMaterial({wireframe:true});

	// VertexShader example from three-mesh-ui/examples/materials/mdsf/
	// Note that segments are increased to 12 instead of 1(default) - Smoothing triangles deformations
	const vertexText = new ThreeMeshUI.Text({content:"VertexShaderExample\n", segments:12});
	vertexText.material = new MSDFVertexMaterialExample();
	// set the vertexMaterial in this case, to access it during render update
	vertexMaterial = vertexText.material;

	// Mixed Material - three-mesh-ui provides a way to provide a compatibility
	// Preventing you to create a Material class such as showed above
	const mixedText = new ThreeMeshUI.Text({content:"Mixed class .from()", fontSize:0.2});

	// Pass a three material class to MSDFFontMaterialUtils.from()
	const customMaterialClass = ThreeMeshUI.MSDFFontMaterialUtils.from(THREE.MeshStandardMaterial);
	// It returns a mixined class that might be compatible to MSDF material (within limitation)
	mixedText.material = new customMaterialClass();

	// And we can now use onBeforeCompile to customize its shader
	mixedText.material.onBeforeCompile = ( shader) => {
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

import { exampleAddUpdate, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { exampleThreePointLight, rollPointLightUpdate } from 'three-mesh-ui/examples/_setup/ThreePointLight';
import { exampleThreeCube, rollCubeUpdate } from 'three-mesh-ui/examples/_setup/ThreeCube';
import { exampleFontPreloadAll } from 'three-mesh-ui/examples/_setup/RobotoFont';

/* eslint-disable no-unused-vars */

// building three setup
const { scene, camera, renderer, controls, stats } = exampleThreeSetup();

// building pointLight
const {pointLightContainer, pointLight, pointLightHelper} = exampleThreePointLight(scene);
// register an update for pointLight
exampleAddUpdate( rollPointLightUpdate );

// building a cube
const cube = exampleThreeCube( scene );
// register and update for cube
exampleAddUpdate( rollCubeUpdate );

// preload fonts and run example() after
const RobotoFontFamily = exampleFontPreloadAll( example );

