// xfg:title BoxSizing
// xfg:category learn
// xfg:type explore

import { Block } from 'three-mesh-ui';
let rootBlock;

function example() {

	// If we are going to display ThreeMeshUI Text elements
	rootBlock = new Block( {

		name: "rootBlock",
		width: 1,
		height: 1,
		padding: 0.1,
		boxSizing: 'border-box',

		margin: 0,

		// A Block can define its "layout" properties
		justifyContent: 'start',
		textAlign: 'left',

		backgroundOpacity: 0.75,
		backgroundColor: 'red',

		borderWidth: 0.1,
		borderRadius: 0.05,
		borderColor: 'black',
		overflow: 'hidden',

	} );

	// three-mesh-ui root elements must be added on threejs display stack
	// In the scene, or in another Object3D of our choice
	scene.add( rootBlock );

	// three-mesh-ui Block, Text (or Boxes) are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set( 0, 1.5, -2.99 );


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
		justifyContent: 'space-between',
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
		width: '45%',
		height: 'auto',
		flexDirection: 'column',
		fontOpacity: 1
	})

	const borderTitle = new Text({name:'border-title', textContent: `border-box`, fontWeight: '700', fontSize: 0.08, lineHeight:1.5});
	const borderContent = new Text({
		name: 'border-content',
		textAlign: "left",
	}).add(
		new Inline({
			textContent: 'The '
		}),
		new Inline({
			textContent: '"width" & "height" ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'properties would be used as '
		}),
		new Inline({
			textContent: '"outerWidth" & "outerHeight"',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: '.'
		}),
		new Inline({
			textContent: '\n\n"borderWidth" & "padding" ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'would then be computed  '
		}),
		new Inline({
			textContent: 'INSIDE ',
			fontWeight: '700',
		}),
		new Inline({
			textContent: 'those values.'
		}),

	);

	border.add( borderTitle, borderContent )

	content = new Block({
		name: 'content-container',
		width: '45%',
		height: 'auto',
		flexDirection: 'column',
		textAlign : 'right',
		fontOpacity: 0.2
	})

	const contentTitle = new Text({textContent: `content-box`, fontWeight: '700', fontSize: 0.08, lineHeight: 1.5});
	const contentContent = new Text({
		name: 'border-content',
		textAlign: "right",
	}).add(
		new Inline({
			textContent: 'The '
		}),
		new Inline({
			textContent: '"width" & "height" ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'properties would be used as '
		}),
		new Inline({
			textContent: '"innerWidth" & "innerHeight"',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: '.'
		}),
		new Inline({
			textContent: '\n\n"borderWidth" & "padding" ',
			fontWeight: '700',
			fontStyle: 'italic'
		}),
		new Inline({
			textContent: 'would then be computed  '
		}),
		new Inline({
			textContent: 'OUTSIDE ',
			fontWeight: '700',
		}),
		new Inline({
			textContent: 'those values.'
		}),

	);

	content.add( contentTitle, contentContent )


	infoBlock.add( border, content);

}

function boxSizingUI() {

	const gui = exampleGUI();

	const boxlayout = new BoxLayoutBehavior( rootBlock, exampleRender );
	boxlayout.attach();

	const params = {
		infoBox: true,
		boxLayout: true,
		zoom: camera.zoom,
		boxSizing: rootBlock._boxSizing._value,
		width: rootBlock._width._value,
		height: rootBlock._height._value,
		borderWidth: rootBlock._borderWidth._value.clone(),
		padding: rootBlock._padding._value.clone(),
		margin: rootBlock._margin._value.clone(),
		render: exampleManualRenderThreeOnly,
	}

	gui.add( params, 'infoBox' ).onChange( ib => {
		infoBlock.visible = ib;

		exampleRender();

	});

	gui.add( params, 'boxLayout' ).onChange( bl => {
		if( bl ) {
			boxlayout.attach();
		}else{
			boxlayout.detach();
		}

		exampleRender();

	});

	gui.add( params, 'zoom', 100, 800, 10).onChange( z => {
		camera.zoom = z;
		camera.updateProjectionMatrix();
		exampleRender();
	})

	const rootBlockGui = gui.addFolder( 'rootBlock properties' );

	rootBlockGui.add( params, 'boxSizing', {"border-box":"border-box", "content-box":"content-box"} ).onChange( bz => {
		rootBlock.set({boxSizing:bz});

		if( bz === 'border-box' ) {
			border.set({fontOpacity: 1});
			content.set({fontOpacity: 0.2});
		}else {
			border.set({fontOpacity: 0.2});
			content.set({fontOpacity: 1});
		}

		exampleRender();

	})

	rootBlockGui.add( params, 'width', 0, 2, 0.1 ).onChange( w => {
		rootBlock.set({width:w});
		exampleRender();
	})

	rootBlockGui.add( params, 'height', 0, 2, 0.1 ).onChange( h => {
		rootBlock.set({height:h});
		exampleRender();
	})

	rootBlockGui.addD4( params, 'padding', 0, 2, 0.1 ).onChange( p => {
		rootBlock.set({padding:p});
		exampleRender();
	})

	rootBlockGui.addD4( params, 'borderWidth', 0, 2, 0.1 ).onChange( bw => {
		rootBlock.set({borderWidth:bw});
		exampleRender();
	})

	rootBlockGui.addD4( params, 'margin', 0, 2, 0.1 ).onChange( m => {
		rootBlock.set({margin:m});
		console.log( "D4 changes !", m)
		exampleRender();
	})

	rootBlockGui.add( params, 'render');

}
