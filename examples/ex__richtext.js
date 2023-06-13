// xfg:title Rich Text
// xfg:category learn
// xfg:type explore

import { Block } from 'three-mesh-ui';
let rootBlock, text;

function example() {

	// A rootBlock element
	rootBlock = new ThreeMeshUI.Block( {
		// box sizing properties
		width: 1.25,
		height: 0.32,
		padding: 0.05,

		// layout properties
		justifyContent: 'center',
		textAlign: 'center',

		backgroundOpacity: 0.15,
		backgroundColor: 0x000000,

		// text properties
		fontSize: 0.08,
		fontFamily: "Courier Prime"
	} );

	rootBlock.position.set( 0, 1, -1.8 );
	rootBlock.rotation.x = -0.55;
	scene.add( rootBlock );


	// Lets build a first text that would be in bold, and use a MSDFNormalMaterial
	text = new ThreeMeshUI.Text( {
		textContent: 'Use the gui to add rich text',
	} , {textContent:RichTextContentProperty});

	rootBlock.add( text )

	// three-mesh-ui Block, Text (or Boxes) are Object3D agreemented with three-mesh-ui capabilities
	// so you can use any existing Object3D methods and properties
	rootBlock.position.set(0, 1, -1.8);
	rootBlock.rotation.x = -0.55;

}




































/***********************************************************************************************************************
 * Above this comment, you could find the contextual setup of this example.
 * Not really related to the example itself : Creating three renderer, scene, lights, etc...
 **********************************************************************************************************************/

import { exampleAddResizer, exampleManualRenderThreeOnly, exampleNoRenderLoop, exampleRender, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { exampleFontPreloadRoboto } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { exampleFontPreloadCourier } from 'three-mesh-ui/examples/_setup/CourierFont';

import exampleGUI from 'three-mesh-ui/examples/_setup/gui/exampleGUI';
import { DefaultValues, Inline, Text } from 'three-mesh-ui';
import { LinearFilter, TextureLoader } from 'three';
import { exampleCameraPerspective, exampleCameraPerspectiveResize } from './_setup/CameraPerspective';
import { exampleRoomVR } from './_setup/RoomVR';
import RichTextContentProperty from './properties/text/RichTextContentProperty';
/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraPerspective();
exampleAddResizer( exampleCameraPerspectiveResize );

camera.position.set(0, 1.6, 0);
// controls.target = new THREE.Vector3(0, 1, -1.8);

const { scene, renderer } = exampleThreeSetup( camera );
exampleNoRenderLoop();
exampleAddResizer( exampleRender );

exampleRoomVR( scene );

// preload fonts and run example() after
exampleFontPreloadCourier( () => {
	const defaultFontFamily = exampleFontPreloadRoboto( () => { example(); additionalUI(); exampleRender(); boxSizingUI(); });
	DefaultValues.set({fontFamily:defaultFontFamily});
})


let infoBlock, border;
function additionalUI(){

	infoBlock = new Block({
		name: 'info-block',
		width: 'auto',
		padding: 0.05,
		height: 'auto',
		flexDirection: 'row',
		justifyContent: 'start',
		alignItems: 'center',
		backgroundColor: 0x000000,
		borderRadius : 0.025,
	});

	infoBlock.backgroundMaterial.depthWrite = false;

	infoBlock.position.z = -2
	infoBlock.position.y = 0.4;

	infoBlock.position.set(0, 0.6, -1.5);
	infoBlock.rotation.x = -0.35;

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
		lineHeight: 0.8
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

	const params = {
		infoBox: true,
		zoom: camera.zoom,
		width: rootBlock._width._value,
		height: rootBlock._height._value,
		render: exampleManualRenderThreeOnly,
		text: '',
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



	rootBlockGui.add( params, 'width', 0, 3, 0.01 ).onChange( w => {
		rootBlock.set({width:w});
		exampleRender();
	})

	rootBlockGui.add( params, 'height', 0, 3, 0.01 ).onChange( h => {
		rootBlock.set({height:h});
		// exampleRender();
	})

	const textController = rootBlockGui.add( params, 'text' ).onChange( t => {
		text.textContent = t;
		// exampleRender();
	})

	textController.domElement.style.flexDirection = 'column';
	textController.domElement.style.alignItems = 'start';

	textController.$input.style.height = '120px';
	textController.$input.style.border = '1px solid #969696';
	textController.$input.style.textAlign = 'left';
	textController.$input.style.display = 'none';

	const textArea = document.createElement('textarea');
	textArea.style.width = '100%';
	textArea.style.height = '80px';
	textArea.style.resize = 'vertical';
	textArea.value = text.textContent;
	textController.$widget.appendChild( textArea );
	console.log( textController );

	textArea.addEventListener('input',()=>{
		text.textContent = textArea.value;
		exampleRender();
	})


	rootBlockGui.add( params, 'render').name("update/render");

}
