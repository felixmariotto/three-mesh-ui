/* Import everything we need from Three.js */

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI, { FontLibrary, MSDFFontMaterialUtils, ShaderChunkUI } from 'three-mesh-ui';


import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, ShaderMaterial, UniformsUtils } from 'three';
import * as FontWeight from '../src/utils/font/FontWeight';
import * as FontStyle from '../src/utils/font/FontStyle';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls;

window.addEventListener( 'load', preloadFonts );
window.addEventListener( 'resize', onWindowResize );

function preloadFonts(){
	FontLibrary.prepare(

		FontLibrary
			.addFontFamily("Roboto")
			.addVariant(FontWeight.NORMAL, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )

	).then( () => {

		// Adjusting font variants
		const FF = FontLibrary.getFontFamily("Roboto");
		FF.getVariant('400','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

		init();

	});


}

//

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	// use of orthgraphic camera to increase matching
	camera = new THREE.OrthographicCamera( WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 0.925, 0 );

	camera.zoom = 1275;
	camera.updateProjectionMatrix();

	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	makeUI();

	//

	renderer.setAnimationLoop( loop );
}

//

function makeUI() {
	const container = new ThreeMeshUI.Block( {
		height: 1.5,
		width: 0.55,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundOpacity: 0,
	} );

	container.position.set( 0, 0.925, -1.8 );
	// container.rotation.x = -0.55;
	scene.add( container );

	//

	const textBlock = new ThreeMeshUI.Block( {
		height: 0.4,
		width: 0.73,
		margin: 0.05,
		textAlign: 'right',
		justifyContent: 'center',
		padding: 0.025,
		interLine: 0.01,
		letterSpacing: 0,
		breakOn: "- \n"
	} );

	container.add( textBlock );

	//

	container.set( {
		fontFamily: "Roboto"
	} );

	const textContent = 'The spiny bush viper is known for its extremely keeled dorsal scales.';
	// const textContent = 'The spiny bush viper is';
	const text = new ThreeMeshUI.Text( {
		fontSize: 0.06,
		fontOpacity: 0.75,
		content: textContent,
	} );

	const text2 = new ThreeMeshUI.Text( {
		fontSize: 0.015,
		fontOpacity: 0.75,
		content: 'The spiny bush viper is known for its extremely keeled dorsal scales.',
	} );

	text.material = new FontMaterialDebugger();

	// Lines properties. Lines are planes manually added behind each text lines
	// in order to perceive and validate line width

	const lineMat = new MeshBasicMaterial( { color: 0x696969, opacity: 0.5 } );
	const baseMat = new MeshBasicMaterial( { color: 0xff00ff } );
	const medianMat = new MeshBasicMaterial( { color: 0x99ff00 } );
	let lines = [];

	text.addAfterUpdate( function () {

		// remove all lines previously added
		for ( let i = 0; i < lines.length; i++ ) {
			const lineMesh = lines[ i ];
			text.remove( lineMesh );
		}
		lines = [];


		// retrieve all lines sent by InlineManager for the textBlock
		for ( let i = 0; i < textBlock.lines.length; i++ ) {

			const line = textBlock.lines[ i ];

			if ( !line[ 0 ] ) continue;

			const lineHeight = line.lineHeight;
			const lineBase = line.lineBase;

			const deltaLine = lineHeight - lineBase;

			// TextBackground
			const lineGeo = new PlaneBufferGeometry( line.width, lineHeight );
			const lineMesh = new Mesh( lineGeo, lineMat );

			lineMesh.position.x = line[ 0 ].offsetX + ( line.width / 2 );
			lineMesh.position.y = line.y + lineHeight/2 - deltaLine/4; // Background


			lines.push( lineMesh );
			text.add( lineMesh );

			// baseline
			const baselineMesh = new Mesh( new PlaneBufferGeometry( line.width, 0.001 ), baseMat );
			baselineMesh.position.x = line[ 0 ].offsetX + ( line.width / 2 );
			baselineMesh.position.y = line.y + lineBase/2 - (lineHeight-lineBase) + 0.0005; // Baseline

			lines.push( baselineMesh );
			text.add( baselineMesh );


			// Median
			const medianMesh = new Mesh( new PlaneBufferGeometry( line.width, 0.001 ), medianMat );

			medianMesh.position.x = line[ 0 ].offsetX + ( line.width / 2 );

			const delta = baselineMesh.position.y - lineMesh.position.y;


			medianMesh.position.y =  lineMesh.position.y - delta - 0.0005; // Baseline
			lines.push( medianMesh );
			text.add( medianMesh );

			baselineMesh.position.z = medianMesh.position.z = text.children[0].position.z + 0.006;


		}


		//
		// const heightMesh = new Mesh( new PlaneBufferGeometry( 0.5, textBlock.lines.height ),
		// 	new MeshBasicMaterial({color:0xff0000}));
		//
		// lines.push( heightMesh );
		// text.add( heightMesh );



	});

	textBlock.add( text , text2 );


	//build html overlay for comparison and selection
	const overlay = document.createElement( 'div' );
	overlay.classList.add( 'overlay' );

	overlay.innerHTML = `
    <div style="flex-grow: 1; display: flex; flex-direction: column">
    <!-- Text Area for input -->
    <textarea></textarea>
    <!-- Buttons for preset text contents -->
    <div style="display: flex">
        <button data-tc="The spiny bush viper is known for its extremely keeled dorsal scales.">Default</button>
        <button data-tc="The spiny bush viper is \nknown for its extremely \nkeeled dorsal scales.">Default formatted</button>
        <button data-tc="The spiny bush viper is\nknown for its extremely\nkeeled dorsal scales.">Default formatted trimmed</button>
        <button data-tc="          d         \n          d         \n          d         ">Untrimmed matrix</button>
        <button data-tc="a................................. a....."> Issue: html dont break</button>
    </div>
    </div>

    <div>
        <!-- html visualizers of what the render should look like with different white-space value -->
        <fieldset data-ws="normal">
            <legend>white-space:normal</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right"></p>
        </fieldset>
        <fieldset data-ws="pre-wrap">
            <legend>white-space:pre-wrap</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right" class="selected"></p>
        </fieldset>
        <fieldset data-ws="pre-line">
            <legend>white-space:pre-line</legend>
            <p data-a="left"></p>
            <p data-a="center"></p>
            <p data-a="right"></p>
        </fieldset>
    </div>`;

	//
	const tA = overlay.querySelector( 'textarea' );
	tA.value = textContent;

	const paragraphs = overlay.querySelectorAll( 'p' );
	for ( let i = 0; i < paragraphs.length; i++ ) {
		paragraphs[ i ].textContent = textContent;
		paragraphs[ i ].addEventListener( 'click', ( e ) => {

			for ( let j = 0; j < paragraphs.length; j++ ) {
				paragraphs[ j ].classList.remove( 'selected' );
			}

			const selectedParagraph = e.currentTarget;
			selectedParagraph.classList.add( 'selected' );

			const align = selectedParagraph.getAttribute( 'data-a' );
			const whiteSpace = selectedParagraph.parentElement.getAttribute( 'data-ws' );

			// Block whitespace will helps to compute size and collapsing whitespace chars
			textBlock.set( {
				textAlign: align,
				whiteSpace: whiteSpace,// but this is not propagated to children
			} );

			// so setting Text whitespace is required to know whitespace behaviour of \n ;
			// lineBreak : mandatory|possible ( done in Text );
			text.set( { whiteSpace: whiteSpace } );
		} );
	}

	// preset content buttons interactions
	const textButtons = overlay.querySelectorAll( 'button' );
	for ( let i = 0; i < textButtons.length; i++ ) {
		textButtons[ i ].addEventListener( 'click', ( e ) => {
			const buttonClicked = e.currentTarget;
			tA.value = buttonClicked.getAttribute( 'data-tc' );
			tA.dispatchEvent( new Event( 'input' ) );
		} );
	}


	// inject styles
	const style = document.createElement( 'style' );
	style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        .overlay { position:fixed; top:20px; right:20px; display:flex; width:95% }
        .overlay fieldset{ display:flex; height: fit-content; padding:0.25rem }
        .overlay fieldset legend { color: orange; font-weight: 700; background: #222; margin: auto; }
        .overlay p, .overlay textarea { border-radius: 5px;}
        .overlay textarea { height: 60px; border-radius: 5px; white-space: nowrap; }
        .overlay p { margin: 0 15px; font-family: 'Roboto', sans-serif; border-bottom: 3px solid transparent; }
        .overlay p.selected { border-bottom-color: greenyellow; }
        .overlay p { cursor: pointer; width:180px; color:whitesmoke; background: #000; padding:15px; }
        [data-ws="pre-wrap"] p { white-space: pre-wrap; }
        [data-ws="pre-line"] p { white-space: pre-line; }
        [data-a="left"] { text-align: left; }
        [data-a="center"] { text-align: center; }
        [data-a="right"] { text-align: right; }
    `;
	document.head.appendChild( style );
	document.body.appendChild( overlay );


	// update texts as soon textarea changes
	tA.addEventListener( 'input', () => {
		const tc = tA.value;

		// update html paragraph
		for ( let i = 0; i < paragraphs.length; i++ ) {
			paragraphs[ i ].textContent = tc;
		}
		// and threemeshui text
		text.set( { content: tc } );
	} );

}

// Function that resize the renderer when the browser window is resized

function onWindowResize() {

	const W = window.innerWidth;
	const H = window.innerHeight;

	const aspect = W / H;
	// camera.aspectRatio = aspect;

	camera.left = W * aspect / -2;
	camera.right = W * aspect / 2;
	camera.top = H * aspect / 2;
	camera.bottom = -H * aspect / 2;

	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// Render loop (called ~60 times/second, or more in VR)

function loop() {
	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
}

class FontMaterialDebugger extends MeshBasicMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.fontMaterialProperties}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get fontMaterialProperties() {

		return MSDFFontMaterialUtils.fontMaterialProperties;

	}


	constructor( options = {} ) {

		// be sure transparent and alphaTest are set
		MSDFFontMaterialUtils.ensureMaterialOptions( options );

		// build this material
		super( options );

		// ensure this material support webgl preprocessors
		MSDFFontMaterialUtils.ensureDefines( this );

		// ensure this material has the proper userData properties (api for uniforms)
		MSDFFontMaterialUtils.ensureUserData( this, options );

		// override the shaders
		this.onBeforeCompile = shader => {

			// links this material userDatas with its uniforms
			MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

			// default vertex shader
			MSDFFontMaterialUtils.injectVertexShaderChunks( shader );

			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <uv_pars_fragment>',
				'#include <uv_pars_fragment>\n' + ShaderChunkUI.msdf_alphaglyph_pars_fragment
			);

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				ShaderChunkUI.msdf_alphaglyph_fragment + `
				if( diffuseColor.a <= 0.02 ) {
					diffuseColor = vec4(0.,0.,0.,0.75);
				}
				#include <alphamap_fragment>
`
			);

		};

	}

}
