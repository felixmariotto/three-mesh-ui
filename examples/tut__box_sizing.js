// xfg:title BoxSizing
// xfg:category learn
// xfg:type explore

import { Block, Inline, Text } from 'three-mesh-ui';
let rootBlock;

function example() {

	// If we are going to display ThreeMeshUI Text elements
	// It is important to know that a Text MUST have a Block as parent
	// Using three-mesh-ui, we would usually have one or more rootBlock elements
	rootBlock = new Block( {

		name: "rootBlock",
		// A Block must define its "box-sizing" properties
		width: 1,
		height: 1,
		padding: 0.1,
		boxSizing: 'border-box',

		// A Block can define its "layout" properties
		justifyContent: 'center',
		textAlign: 'left',

		backgroundOpacity: 0.15,
		backgroundColor: 0x000000,

		borderWidth: 0.1,
		borderRadius: 0.05,

		// A Block can also define "text" properties that will propagate to any of its Text children
		fontSize: 0.055,
		fontFamily: '/assets/fonts/msdf/roboto/regular.json',
		fontTexture: '/assets/fonts/msdf/roboto/regular.png',
		// @Note: setting fontFamily
		// This looks very easy, but this isn't the best way for handling fonts
		// However it is perfect for a first glance on how to get started with three-mesh-ui
		// Be sure you next step will be `Getting started - Preload fonts`

	} );

	window.rootBlock = rootBlock;

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	scene.add( rootBlock );

	// three-mesh-ui Block are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set( 0, 1.5, -2.99 );

}




































/***********************************************************************************************************************
 * Above this comment, you could find the contextual setup of this example.
 * Not really related to the example itself : Creating three renderer, scene, lights, etc...
 **********************************************************************************************************************/

import { exampleAddResizer, exampleAddUpdate, exampleNoRenderLoop, exampleRender, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { exampleFontPreloadAll } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { exampleCameraOrthographic, exampleCameraOrthographicResize } from 'three-mesh-ui/examples/_setup/CameraOrthographic';
import { exampleRulers } from 'three-mesh-ui/examples/_setup/RulersVR';
import exampleGUI from 'three-mesh-ui/examples/_setup/gui/exampleGUI';
import BoxLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxLayoutBehavior';

/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraOrthographic();
exampleAddResizer( exampleCameraOrthographicResize );

const { scene } = exampleThreeSetup( camera );
exampleNoRenderLoop();

const { ruler, rulerHalf } = exampleRulers( scene );

// preload fonts and run example() after
exampleFontPreloadAll( () => { example(); exampleRender(); boxSizingUI(); });

function boxSizingUI() {

	const gui = exampleGUI();

	const boxlayout = new BoxLayoutBehavior( rootBlock, exampleRender );
	boxlayout.attach();

	const params = {
		boxLayout: true,
		boxSizing: rootBlock._boxSizing._value,
		width: rootBlock._width._value,
		height: rootBlock._height._value,
		padding: rootBlock._padding._value.x,
		margin: rootBlock._margin._value.x,
	}

	gui.add( params, 'boxLayout',  ).onChange( bl => {
		if( bl ) {
			boxlayout.attach();
		}else{
			boxlayout.detach();
		}

		exampleRender();

	})

	gui.add( params, 'boxSizing', {"border-box":"border-box", "content-box":"content-box"} ).onChange( bz => {
		rootBlock.set({boxSizing:bz});
		exampleRender();

	})

	gui.add( params, 'width', 0, 2, 0.1 ).onChange( bz => {
		rootBlock.set({width:bz});
		exampleRender();
	})

	gui.add( params, 'height', 0, 2, 0.1 ).onChange( bz => {
		rootBlock.set({height:bz});
		exampleRender();
	})

	gui.add( params, 'padding', 0, 2, 0.1 ).onChange( bz => {
		rootBlock.set({padding:bz});
		exampleRender();
	})

	gui.add( params, 'margin', 0, 2, 0.1 ).onChange( bz => {
		rootBlock.set({margin:bz});
		exampleRender();
	})


}
