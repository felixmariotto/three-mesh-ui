// xfg:title Sprite
// xfg:category learn
// xfg:type explore

import { Block } from 'three-mesh-ui';
let rootBlock;

function example() {

	const texture = new TextureLoader().load("/assets/spiny_bush_viper_sprite.jpg", ()=>{
		exampleRender();
	});
	texture.minFilter = NearestFilter;

	// If we are going to display ThreeMeshUI Text elements
	rootBlock = new Block( {

		name: "rootBlock",
		width: 1,
		height: 1,
		boxSizing: 'border-box',


		// A Block can define its "layout" properties
		justifyContent: 'start',
		textAlign: 'left',

		backgroundOpacity: 0.75,
		backgroundColor: 'red',

		// Must be stretch for slice
		backgroundSize: "stretch",

		backgroundImage : texture,

		// Must provide slice in instanciation
		slice : {top:0.1,left:0.1,right:0.1,bottom:0.1, width: 2, height:2}

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	scene.add( rootBlock );

	// three-mesh-ui Block, Text (or Boxes) are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set( 0, 1.8, -3 );

	rootBlock._borderWidth.units = WORLD_UNITS;

}




































/***********************************************************************************************************************
 * Above this comment, you could find the contextual setup of this example.
 * Not really related to the example itself : Creating three renderer, scene, lights, etc...
 **********************************************************************************************************************/

import { exampleAddResizer, exampleManualRenderThreeOnly, exampleNoRenderLoop, exampleRender, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { exampleFontPreloadRoboto } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { exampleCameraOrthographic, exampleCameraOrthographicResize } from 'three-mesh-ui/examples/_setup/CameraOrthographic';
import { exampleRulers } from 'three-mesh-ui/examples/_setup/RulersVR';
import exampleGUI from 'three-mesh-ui/examples/_setup/gui/exampleGUI';
import BoxLayoutBehavior from 'three-mesh-ui/examples/behaviors/helpers/BoxLayoutBehavior';
import { DefaultValues, Inline, Text } from 'three-mesh-ui';
import { NearestFilter, SpriteMaterial, TextureLoader } from 'three';
import { PERCENT, UV, WORLD_UNITS } from '../src/utils/Units';
/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraOrthographic();
exampleAddResizer( exampleCameraOrthographicResize );

const { scene, renderer } = exampleThreeSetup( camera );
exampleNoRenderLoop();
exampleAddResizer( exampleRender );

const { ruler, rulerHalf } = exampleRulers( scene );

// preload fonts and run example() after
const defaultFontFamily = exampleFontPreloadRoboto( () => { example(); additionalUI(); exampleRender(); boxSizingUI(); });
DefaultValues.set({fontFamily:defaultFontFamily});

let infoBlock, border, content;
function additionalUI(){

	infoBlock = new Block({
		name: 'info-block',
		width:  2.4,
		padding: 0.05,
		height: 'auto',
		flexDirection: 'row',
		justifyContent: 'start',
		alignItems: 'center',
		backgroundColor: 0x000000,
		backgroundOpacity : 0.75,
		borderRadius : 0.025,
	});

	infoBlock.position.z = -2
	infoBlock.position.y = 0.4;
	scene.add( infoBlock );

	border = new Block({
		name: 'border-container',
		height: 'auto',
		flexDirection: 'column',
		justifyContent: "start",
		fontOpacity: 1
	})

	const borderTitle = new Text({name:'border-title', textContent: `Slice`, fontWeight: '700', fontSize: 0.08, lineHeight:1.5, width: 'auto',margin:0.05});
	const borderContent = new Text({
		name: 'border-content',
		textAlign: "left",
	}).add(
		new Inline({
			textContent: 'A slice definition '
		}),
		new Inline({
			textContent: 'MUST ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'be provided during instanciation. '
		}),
		new Inline({
			textContent: '\n\nbackgroundSize MUST ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'be set to '
		}),
		new Inline({
			textContent: '"stretch".',
			fontWeight: '700',
		}),
		new Inline({
			textContent: '\n\nborderRadius, borderWidth ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'may produce unexpected results.'
		}),

		new Inline({
			textContent: '\n\nDepending on the output size, texture',
		}),
		new Inline({
			textContent: '.minFilter ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'can be handy.',
		}),

	);

	border.add( borderTitle, borderContent )


	infoBlock.add( borderTitle,border);

}

function boxSizingUI() {

	const gui = exampleGUI();

	// const boxlayout = new BoxLayoutBehavior( rootBlock, exampleRender );
	// boxlayout.attach();

	const params = {
		infoBox: true,
		zoom: camera.zoom,
		width: rootBlock._width._value,
		height: rootBlock._height._value,
		borderWidth: rootBlock._borderWidth._value.clone(),
		backgroundSize: rootBlock._backgroundSize._value,
		render: exampleManualRenderThreeOnly,
	}

	gui.add( params, 'infoBox' ).onChange( ib => {
		infoBlock.visible = ib;

		exampleRender();

	});


	gui.add( params, 'zoom', 100, 800, 10).onChange( z => {
		camera.zoom = z;
		camera.updateProjectionMatrix();
		exampleRender();
	})

	const rootBlockGui = gui.addFolder( 'rootBlock properties' );



	rootBlockGui.add( params, 'width', 0, 2, 0.1 ).onChange( w => {
		rootBlock.set({width:w});
		exampleRender();
	})

	rootBlockGui.add( params, 'height', 0, 2, 0.1 ).onChange( h => {
		rootBlock.set({height:h});
		exampleRender();
	})

	rootBlockGui.add( params, 'backgroundSize', {"cover":"cover", "contain":"contain",'stretch':'stretch'}).onChange( bs => {
		rootBlock.set({backgroundSize:bs});
		exampleRender();
	})

	rootBlockGui.addD4( params, 'borderWidth', 0, 2, 0.1 ).onChange( bw => {
		rootBlock.set({borderWidth:bw});
		exampleRender();
	})

	rootBlockGui.add( params, 'render');

}
