import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { MSDFFontMaterialUtils, ShaderChunkUI } from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import * as HyperThreeMesh from 'three-mesh-ui/examples/hyperthreemesh/HyperThreeMesh';

import VRControl from 'three-mesh-ui/examples/controls/VRControl';
import InteractiveRaycaster from 'three-mesh-ui/examples/interactive/InteractiveRaycaster';
import InteractiveCursor from 'three-mesh-ui/examples/interactive/listeners/InteractiveCursor';

_injectCSS( `
button[type="radio"]{

}

button[type="radio"] ascent {

	width: 75%;
	height: 75%;
	border-radius:50rem;
	border-color: #FFFFFF;
	background-color: rgba(0,0,0,0.05);

}

button[type="radio"]:disabled {

	color: rgba( 255,255,255,0.5);

}

button[type="radio"]:disabled ascent {

	border-color: rgba( 128,128,128,0.5);

}

button[type="radio"]:disabled:hover ascent {

	rx : 0.015rem;

}

button[type="radio"]:active ascent {

	rx : 0.01rem;

}

button[type="radio"]:checked ascent {

	background-color : rgba(0,225,128,.85);

}

button[type="radio"]:checked:hover ascent {

	background-color : rgba(0,225,128,.99);

}

button[type="toggle"]{

	border-radius: 0.02rem;

}

button[type="toggle"] ascent {

	width: 75%;
	height: 75%;
	background-color : rgba(0,0,0,0.05);
	border-width: 0.008rem;
	border-color: rgba(255,255,255,.9);

}

button[type="toggle"]:disabled {

	color: rgba( 255,255,255,0.5);

}

button[type="toggle"]:disabled ascent {

	border-color: rgba( 128,128,128,0.5);

}


button[type="toggle"]:checked ascent {

	background-color : rgba(0,225,128,.85);

}

button[type="toggle"]:checked:hover ascent {

background-color : rgba(0,225,128,.99);

}

`)


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, interactiveRaycaster, text;

//


//

function example() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.02, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	////////////////
	// Controllers
	////////////////

	const vrControl = VRControl( renderer );

	scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

	interactiveRaycaster = new InteractiveRaycaster( camera, scene, renderer, vrControl );
	interactiveRaycaster.start();

	const interactiveCursor = new InteractiveCursor( renderer.domElement, 'pointer' );
	interactiveRaycaster.addListener( interactiveCursor );


	// TEXT PANEL

	makeTextPanel();

	//

	HyperThreeMesh.loadSheets();

	renderer.setAnimationLoop( loop );

	window.addEventListener( 'resize', onWindowResize );


}

//

function makeTextPanel() {

	const container = new HyperThreeMesh.createElement( 'div', {
		padding: 0.05,
		textType: 'MSDF',
		fontFamily: FontJSON,
		fontTexture: FontImage,
		flexDirection: 'row',
		height: 1.7

	} );

	container.position.set( 0, 1, -1.8 );
	container.rotation.x = -0.55;
	scene.add( container );

	//

	const bigTextContainer = HyperThreeMesh.createElement( 'p', {
		padding: 0.03,
		width: 1.2,
		margin: 0.03,
		justifyContent: 'center',
		textAlign: 'justify-left',
		fontSize: 0.033,
		color: 0xabf7bf,
		// color: 0xffffff,
		backgroundColor: 0x000000,
		backgroundOpacity: 0.5,
		fontOpacity: 0.9 // 0 is invisible, 1 is opaque
	} );

	bigTextContainer.add(
		HyperThreeMesh.createElement( 'span', {
			textContent: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,

		} ),
		HyperThreeMesh.createElement( 'span', {
			textContent: `"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"`,

		} ),
		HyperThreeMesh.createElement( 'span', {
			textContent: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."`,
		} )
	);

	text = bigTextContainer;

	const textOptions = makeFontOptions();
	const bgOptions = makeBackOptions();


	container.add( textOptions, bigTextContainer, bgOptions );

}

function makeFontOptions() {

	const textOptions = new HyperThreeMesh.createElement( 'div', {
		padding: 0.03,
		width: 0.55,
		margin: 0.03,
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'justify-left',
		fontSize: 0.055,
		lineHeight: 1.5,
		color: 0xffffff,
		backgroundColor: 0x000000,
		backgroundOpacity: 0.5,
		fontOpacity: 1 // 0 is invisible, 1 is opaque
	} );

	const fontTitle = HyperThreeMesh.createElement('h1',{
		textContent:'Font options',
		width: 'auto', marginBottom: 0.025,
		fontSize:0.07, lineHeight:1, borderColor: 0xffffff, borderBottomWidth:0.008, backgroundColor: 0x000000, backgroundOpacity: 0.001});

	const fontSmooth = HyperThreeMesh.createElement('toggle', {group:'fontSmooth', value:'antialiased', textContent:'fontSmooth'});
	const letterSpacing = HyperThreeMesh.createElement('toggle', {group:'letterSpacing', value:0.075, textContent:'letterSpaced'});

	const fontColor1 = HyperThreeMesh.createElement('radio', {group:'fontOpacity',value:1,textContent:'Opacity 1.0', marginTop: 0.025});
	const fontColor075 = HyperThreeMesh.createElement('radio', {group:'fontOpacity',value:0.75,textContent:'Opacity 0.75'});
	const fontColor05 = HyperThreeMesh.createElement('radio', {group:'fontOpacity',value:0.5,textContent:'Opacity 0.5'});

	const fontColorBright = HyperThreeMesh.createElement('radio', {group:'color',value:0xffffff,textContent:"Bright", marginTop: 0.025});
	const fontColorGreen = HyperThreeMesh.createElement('radio', {group:'color',value:0x00ff00,textContent:"Green"});
	const fontColorLightGreen = HyperThreeMesh.createElement('radio', {group:'color',value:0xabf7bf,textContent:"Light green"});

	const matDef = HyperThreeMesh.createElement( 'radio', {group:'material', value:"default", textContent: "Default material", marginTop: 0.025});
	const matBas = HyperThreeMesh.createElement( 'radio', {group:'material', value:"basic", textContent: "Basic material"});
	const matPla = HyperThreeMesh.createElement( 'radio', {group:'material', value:"plain", textContent: "Plain material"});
	const matDeb = HyperThreeMesh.createElement( 'radio', {group:'material', value:"debug", textContent: "Debug material"});


	textOptions.add(
		fontTitle,
		fontSmooth,
		letterSpacing,
		fontColor1, fontColor075, fontColor05 ,
		fontColorBright, fontColorGreen, fontColorLightGreen,
		matDef, matBas, matPla, matDeb,
	);

	interactiveRaycaster.addObject(
		fontSmooth,
		letterSpacing,
		fontColor1, fontColor075, fontColor05 ,
		fontColorBright, fontColorGreen, fontColorLightGreen,
		matDef, matBas, matPla, matDeb,
	)

	const materialDefault = new MSDFFontMaterial({});
	const materialBasic = new MSDFBasicMaterial({});
	const materialDebug = new FontMaterialDebugger({});
	const materialPlain = new FontMaterialPlain({});


	for ( const obj of textOptions.children ) {
		obj.addEventListener('change', (event)=>{

			const option = event.target;

			switch ( option._group._name ) {

				case 'fontSmooth':
					text.set({fontSmooth: option.checked ? 'none' : 'antialiased'});
					break;

				case 'letterSpacing':
					text.set({letterSpacing: option.checked ? option.value : 0});
					break;

				case 'material':
					if( option.value === 'default') {
						text.fontMaterial = materialDefault;
					}else if( option.value === 'basic' ) {
						text.fontMaterial = materialBasic;
					}
					else if( option.value === 'plain' ) {
						text.fontMaterial = materialPlain;
					}
					else {
						text.fontMaterial = materialDebug;
					}
					break;

				default:
					text.set({[option._group._name]:option.value})
			}

		})
	}

	return textOptions;
}

function makeBackOptions() {

	const backOptions = new HyperThreeMesh.createElement( 'div', {
		padding: 0.03,
		width: 0.55,
		margin: 0.03,
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'justify-left',
		fontSize: 0.055,
		lineHeight: 1.5,
		color: 0xffffff,
		backgroundColor: 0x000000,
		backgroundOpacity: 0.5,
		fontOpacity: 1 // 0 is invisible, 1 is opaque
	} );

	const fontTitle = HyperThreeMesh.createElement('h1',{
		textContent:'BG options',
		width: 'auto', marginBottom: 0.025,
		fontSize:0.07, lineHeight:1, borderColor: 0xffffff, borderBottomWidth:0.008, backgroundColor: 0x000000, backgroundOpacity: 0.001});

	const fontColor1 = HyperThreeMesh.createElement('radio', {group:'backgroundOpacity',value:1,textContent:'Opacity 1.0', marginTop: 0.025});
	const fontColor075 = HyperThreeMesh.createElement('radio', {group:'backgroundOpacity',value:0.75,textContent:'Opacity 0.75'});
	const fontColor05 = HyperThreeMesh.createElement('radio', {group:'backgroundOpacity',value:0.5,textContent:'Opacity 0.5'});
	const fontColor0 = HyperThreeMesh.createElement('radio', {group:'backgroundOpacity',value:0,textContent:'Opacity 0'});

	backOptions.add(
		fontTitle,
		fontColor1, fontColor075, fontColor05, fontColor0
	);

	interactiveRaycaster.addObject(
		fontColor1, fontColor075, fontColor05, fontColor0
	)


	for ( const obj of backOptions.children ) {
		obj.addEventListener('change', (event)=>{

			const option = event.target;

			switch ( option._group._name ) {

				default:
					text.set({[option._group._name]:option.value})
			}

		})
	}

	return backOptions;
}

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	HyperThreeMesh.update();

	interactiveRaycaster.update();

	controls.update();
	renderer.render( scene, camera );

}

import { exampleFontPreloadRoboto } from 'three-mesh-ui/examples/_setup/RobotoFont';
import { _injectCSS } from 'three-mesh-ui/examples/_setup/Html';
import MSDFFontMaterial from '../src/font/msdf/materials/MSDFFontMaterial';
import MSDFBasicMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFBasicMaterial';
import { MeshBasicMaterial } from 'three';
exampleFontPreloadRoboto( example );

class FontMaterialDebugger extends MeshBasicMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

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
				'#include <uv_pars_fragment>\n' + ShaderChunkUI.msdfAlphaglyphParsFragmentGlsl
			);

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				ShaderChunkUI.msdfAlphaglyphFragmentGlsl + `
				if( diffuseColor.a <= 0.02 ) {
					diffuseColor = vec4(1.-diffuseColor.x,1.-diffuseColor.y,1.-diffuseColor.z,0.75);
				}
				#include <alphamap_fragment>
`
			);

		};

	}

}


class FontMaterialPlain extends MeshBasicMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @override
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

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
				'#include <uv_pars_fragment>\n' + ShaderChunkUI.msdfAlphaglyphParsFragmentGlsl
			);

			// fragment chunks
			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <alphamap_fragment>',
				ShaderChunkUI.msdfAlphaglyphFragmentGlsl + `
				diffuseColor.a = opacity;
				#include <alphamap_fragment>
`
			);

		};

	}

}
