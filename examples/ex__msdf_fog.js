// xfg:title MSDF-Fog Materials
// xfg:category extend

import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

import MSDFStandardMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFStandardMaterial';


const color = new THREE.Color(0xffffff);
// this will be updated on each frame
let vertexMaterial;


function example() {

	// Make some fog
	scene.fog = new THREE.Fog( 0x000000, 0.5, 10 );

	var t = new TextureLoader().load("/assets/spiny_bush_viper.jpg", (t)=>{t.needsUpdate=true;})

	// make a Block to hold many Texts
	const container = new ThreeMeshUI.Block({
		width: 3.2,
		height: 0.2,
		justifyContent: 'center',
		alignItems: 'center',
		color: color,
		fontFamily: RobotoFontFamily,
		fontWeight: "700",
		fontSize: 0.15,
		lineHeight: 0.9,
		fog: true,
		backgroundColor: 0xffffff,
		backgroundImage : t,
		backgroundOpacity: 1,
	});

	container.position.set( 0, 1.25, -0.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	// Now, let's build different text, and set their material


	// default material provided by three-mesh-ui
	const defaultText = new ThreeMeshUI.Text({textContent:"FontMaterial(default fog:false)"});

	const defaultTextFog = new ThreeMeshUI.Text({textContent:"FontMaterial(fog:true)"});
	// defaultTextFog.fog = true;

	// StandardMaterial from three-mesh-ui/examples/materials/mdsf/
	const fogText = new ThreeMeshUI.Text({textContent:"MSDFStandardMaterial (fog enabled)"});

	// MSDFStandardMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFStandardMaterial';
	fogText.fontMaterial = new MSDFBasicMaterial({ /* material options */ });
	// fogText.fog = true;

	// place all created texts in the container
	container.add( defaultText, defaultTextFog, fogText );

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
import MSDFBasicMaterial from './materials/msdf/MSDFBasicMaterial';
import { TextureLoader } from 'three';

/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraPerspective();
exampleAddResizer( exampleCameraPerspectiveResize );


const { scene, renderer, controls, stats } = exampleThreeSetup( camera );

const { roomVR } = exampleRoomVR( scene );

// building pointLight
// const {pointLightContainer, pointLight, pointLightHelper} = exampleThreePointLight(scene);
// register an update for pointLight
// exampleAddUpdate( rollPointLightUpdate );

// building a cube
// const cube = exampleThreeCube( scene );
// register and update for cube
// exampleAddUpdate( rollCubeUpdate );

// preload fonts and run example() after
const RobotoFontFamily = exampleFontPreloadRoboto( example );

