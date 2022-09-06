// xfg:title Baseline
// xfg:type tool
// xfg:copyright Rye font author is Nicole Fally

import { Block, Text } from 'three-mesh-ui';

let text;
//

function example(){


	text = new Text( {
		width: 2.4,
		textAlign: 'center',
		alignItems: 'start',
		fontSize: 0.2,
		textContent : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	} );

	text.position.z = -2;
	text.position.y = 1.41

	scene.add( text );

	// Lines properties. Lines are planes manually added behind each text lines
	// in order to perceive and validate line width

	const lineMat = new MeshBasicMaterial( { color: 0x9e9e9e, opacity: 1 } );
	const baseMat = new MeshBasicMaterial( { color: 0x000000, opacity: 1 } );
	const medianMat = new MeshBasicMaterial( { color: 0x000000 } );
	let lines = [];

	text.addAfterUpdate( function () {

		// remove all lines previously added
		for ( let i = 0; i < lines.length; i++ ) {
			const lineMesh = lines[ i ];
			text.remove( lineMesh );
		}
		lines = [];



		// retrieve all lines sent by InlineManager for the textBlock
		for ( let i = 0; i < text.lines.length; i++ ) {

			const line = text.lines[ i ];

			if ( !line[ 0 ] ) continue;

			const lineHeight = line.lineHeight;
			const lineBase = line.lineBase;

			const deltaLine = lineHeight - lineBase;

			// TextBackground
			const lineGeo = new PlaneGeometry( line.width, lineHeight );
			const lineMesh = new Mesh( lineGeo, lineMat );
			lineMesh.name = 'DevLineMesh';

			lineMesh.position.x = line[0].offsetX + line.width/2;
			lineMesh.position.y = line[0].offsetY + line.lineBase / 2 - deltaLine / 4;

			lines.push( lineMesh );
			text.add( lineMesh );

			// baseline
			const baselineMesh = new Mesh( new PlaneGeometry( line.width, 0.002 ), baseMat );
			baselineMesh.position.x = lineMesh.position.x;
			// baselineMesh.position.y = line.y -  // Baseline
			baselineMesh.position.y = lineMesh.position.y - lineBase/2 + 0.002;

			lines.push( baselineMesh );
			text.add( baselineMesh );


			// Median
			const medianMesh = new Mesh( new PlaneGeometry( line.width, 0.002 ), medianMat );

			medianMesh.position.x = lineMesh.position.x;
			medianMesh.position.y =  lineMesh.position.y + deltaLine/2 - 0.002; // Baseline

			lines.push( medianMesh );
			text.add( medianMesh );

			baselineMesh.position.z = medianMesh.position.z = text.children[0].position.z + 0.006;


		}


	});


}



















































/***********************************************************************************************************************
 * Above this comment, you could find the contextual setup of this example.
 * Not really related to the example itself : Creating three renderer, scene, lights, etc...
 **********************************************************************************************************************/

import { exampleAddResizer, exampleManualRender, exampleNoRenderLoop, exampleRender, exampleThreeSetup } from 'three-mesh-ui/examples/_setup/ThreeSetup';
import { adjustRobotoAndVariants, registerRobotoAndVariants } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { exampleCameraOrthographic, exampleCameraOrthographicResize } from 'three-mesh-ui/examples/_setup/CameraOrthographic';
import exampleGUI from 'three-mesh-ui/examples/_setup/gui/exampleGUI';
import { DefaultValues, FontLibrary, Inline } from 'three-mesh-ui';
import { Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';
/* eslint-disable no-unused-vars */

// building three setup
const { camera } = exampleCameraOrthographic();
exampleAddResizer( exampleCameraOrthographicResize );

const { scene, controls } = exampleThreeSetup( camera );
controls.enableRotate = false;
controls.enableZoom = false;
exampleNoRenderLoop();
exampleAddResizer( exampleRender );

let fontFamily, fontVariant;
FontLibrary.prepare(
	registerRobotoAndVariants(),
	FontLibrary.addFontFamily('imported')
		.addVariant(
			'400',
			'normal',
			'./assets/fonts/msdf/rye/regular.json',
			'./assets/fonts/msdf/rye/regular.png')
).then( () => {

	fontFamily = FontLibrary.getFontFamily('imported');
	fontVariant = fontFamily.getVariant('400', 'normal');


	// preload fonts and run example() after
	DefaultValues.set({fontFamily});

	adjustRobotoAndVariants();
	example();
	additionalUI();
	exampleRender();
	baselineGUI();
})


let infoBlock;
function additionalUI(){

	infoBlock = new Block({
		name: 'info-block',
		width:  2.4,
		padding: 0.05,
		height: 'auto',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 0x000000,
		backgroundOpacity : 0.75,
		borderRadius : 0.025,
		fontFamily: "Roboto",
	});

	infoBlock.position.z = -2
	infoBlock.position.y = 0.4;
	scene.add( infoBlock );

	const borderTitle = new Text({
		textContent: `Adjusting glyphs`,
		fontWeight: '700',
		fontSize: 0.08,
		lineHeight:1.5});

	const borderContent = new Text({
		name: 'border-content',
		textAlign: "left",
	}).add(
		new Inline({textContent:`If you look closely, you would notice that some glyphs of the "rye" font are not correctly placed.\nThat's the case for `}),
		new Inline({textContent:`g, j, p, q, y and Q `, fontWeight: '700'}),
		new Inline({textContent:`glyphs.`}),
		new Inline({textContent:`\n\nUse the provided GUI to select one faulty glyph, and then adjust its yoffset property. Repeat that operation for each faulty glyphs in your charset.`}),
		new Inline({textContent:` Once completed, you can export those adjustments.`}),

		new Inline({textContent:`\n\nYou can import your own msdf font.`, fontStyle: 'italic'})
	);


	infoBlock.add(  borderTitle, borderContent);

}

let charDesc, alterations, letterController,yoffsetController;
const p = {};


/**
 * Build the gui of this tool
 */
function baselineGUI() {

	const gui = exampleGUI();

	// alterations would be exportable adjustments
	alterations = {};

	// Convert the textContent into an object
	let letters = {};
	for ( let i = 0; i < text.textContent.length; i++ ) {
		const letter = text.textContent[ i ];
		letters[ letter ] = letter;
	}

	// retrive the glyphDescriptor
	charDesc = fontVariant.getTypographicGlyph( 'a' );

	// Feed gui params
	p.zoom = camera.zoom;
	p.letter = 'a';
	p.yoffset = charDesc.yoffset;
	p.lineHeight = text._lineHeight._value;
	p.textContent = text._textContent._value;
	p.export = () => {
		console.log( `{MSDFVariant}.adjustTypographicGlyphs ( ${JSON.stringify(alterations, null, 2 )} );` );
		navigator.clipboard.writeText( `{MSDFVariant}.adjustTypographicGlyphs ( ${JSON.stringify(alterations, null, 2 )} );` );
		/* eslint-disable no-alert */
		alert('Adjustments have been copied in your clipboard and in the console.')
		/* eslint-enable no-alert */
	}

	gui.add( p, 'zoom', 100, 800, 10).onChange( z => {
		camera.zoom = z;
		camera.updateProjectionMatrix();
		exampleRender();
	})

	gui.add( p, 'lineHeight', 1,3,0.01).onChange( v => {
		text.set({lineHeight:v});
		exampleRender();
	})

	gui.add( p, 'textContent').onChange( textContent => {
		text.set({textContent});

		// Rebuild the letter and then the letterController options
		if( textContent !== "" ){

			p.letter = textContent[0];

			letters = {};
			for ( let i = 0; i < text.textContent.length; i++ ) {
				const letter = text.textContent[ i ];
				letters[ letter ] = letter;
			}

			letterController._values = Array.isArray( letters ) ? letters : Object.values( letters );
			letterController._names = Array.isArray( letters ) ? letters : Object.keys( letters );


			while( letterController.$select.children.length ) {
				letterController.$select.removeChild( letterController.$select.firstElementChild );
			}

			letterController._names.forEach( name => {
				const $option = document.createElement( 'option' );
				$option.innerHTML = name;
				letterController.$select.appendChild( $option );
			} );

			letterController.updateDisplay();

			_resetOffset();

		}

		exampleRender();
	})

	// Font - Folder + custom controller
	const fontFolder = gui.addFolder('Import your font').close();

	fontFolder.addFontLoader({fake:""},"fake").onChange( x => {

		// Create a new FontFamily
		const ff = FontLibrary.addFontFamily( "import"+Math.random(), );
		// Add a new variant
		ff.addVariant('400', 'normal', x.json, new Texture(x.img), true );
		fontVariant = ff.getVariant('400','normal');

		// Set the fontFamily on the text
		text.set({fontFamily:ff});

		_resetOffset();

		exampleManualRender();

	});


	const folder = gui.addFolder('Glyphs Adjustments')

	letterController = folder.add( p, 'letter', letters ).name('Glyph').onChange( v => {

		_resetOffset();

	});

	yoffsetController = folder.add( p, 'yoffset', -30, 30, 0.01 ).onChange( v => {

		alterations[ p.letter ] = {yoffset:v};

		charDesc._yoffset = v;

		text._renderer._needsRender = true;

		exampleRender();

	} );

	folder.add( p, 'export');

}

/**
 * Reset yOffset value and controller
 * @private
 */
function _resetOffset(){

	charDesc = fontVariant.getTypographicGlyph( p.letter );
	p.yoffset = charDesc.yoffset;
	yoffsetController.updateDisplay();

}
