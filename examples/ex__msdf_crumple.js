// xfg:title MSDF-Geometry alteration
// xfg:category extend

import * as THREE from 'three';
import { AmbientLight, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, SpotLight, SpotLightHelper } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';
import MSDFToonMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFToonMaterial';
import MSDFDepthMaterial from '../src/font/msdf/materials/MSDFDepthMaterial';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, spotLight, spotLightHelper;

window.addEventListener( 'load', preload );
window.addEventListener( 'resize', onWindowResize );

//

async function preload() {

	// Fighting FOIT
	// https://css-tricks.com/fighting-foit-and-fout-together/

	await FontLibrary.prepare(

		FontLibrary
			.addFontFamily("Roboto")
			.addVariant("400", "normal", "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )
			.addVariant("700", "italic", "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
			.addVariant("700", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
			.addVariant("400", "italic", "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" ),


		FontLibrary
				.addFontFamily("RobotoAltered")
					.addVariant("700", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )

	);

	// Retrieve a font family from the library
	let FF = FontLibrary.getFontFamily("RobotoAltered");

	// retrieve the variant to have altered geometry
	const boldVariant = FF.getVariant('700', 'normal');

	// Store is default geometry factory function
	const defaultGeometry = boldVariant.getGeometricGlyph;

	// And let's re define what will happend when running its factory method
	boldVariant.getGeometricGlyph = function ( inline, element ) {

		// let's get the default geometry
		const characterGeometry = defaultGeometry( inline, element );

		// and now alter it
		const frequency = 0.85; // Decrease this value to reduce the amount of vertices to be moved
		const amplitudeMax = 0.25; // Decrease or increase this value to set the move offset maximum


		// loop through each vertices
		const positionAttribute = characterGeometry.getAttribute( 'position' );
		const vertex = new THREE.Vector3();
		for ( let i = 0; i < positionAttribute.count; i++ ) {

			// might be ignored according to frequency
			if( Math.random() > frequency ) continue;


			vertex.fromBufferAttribute( positionAttribute, i ); // read vertex
			// modify its z position
			positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z + ( -amplitudeMax + Math.random() * ( 2 * amplitudeMax ) ) ); // write coordinates bac

		}

		// After moving vertices, it might be useful to rebuild normals
		characterGeometry.computeVertexNormals();

		// send the altered geometry
		return characterGeometry;
	}

	// And why not setting the default material of this variant to-*TOon
	// boldVariant.fontMaterial = MSDFToonMaterial;


	// adjust fonts
	// @see TODO:adjustDocumentation
	FF = FontLibrary.getFontFamily("Roboto");
	FF.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('400','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

	init();

}

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	window.camera = camera;

	renderer = new THREE.WebGLRenderer( {
		antialias: true
	} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );

	camera.position.set( 0, 0.464861265371722, -1.037827557320681 );
	controls.target = new THREE.Vector3( 0, 1.3522629190714086, -1.6957289402054931 );

	window.target = controls.target;

	controls.update();

	spotLight = new SpotLight(0xffffff, 1.15, 4.25, Math.PI/5, 1.0, 1.0);
	spotLight.position.set(0,2,0);
	scene.add( spotLight );

	spotLight.castShadow = true;

	//Set up shadow properties for the light
	spotLight.shadow.mapSize.width = 2048; // default
	spotLight.shadow.mapSize.height = 2048; // default
	spotLight.shadow.camera.near = 0.5; // default
	spotLight.shadow.camera.far = 500; // default

	spotLight.target.position.set( 0, 2, -2 )
	scene.add( spotLight.target );


	spotLightHelper = new SpotLightHelper( spotLight, 0xff0000);
	scene.add( spotLightHelper );

	scene.add( new AmbientLight(0xffffff, 0.25) )
	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	const wall = new Mesh(
		new PlaneGeometry(6,6,5,5),
		new MeshStandardMaterial( {color:0xffffff} )
	);
	wall.position.y = 3;
	wall.position.z =  - 3.01;
	wall.receiveShadow = true;

	scene.add(wall);

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const container = new ThreeMeshUI.Block( {
		width: 3,
		height: 0.5,
		padding: 0.05,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: "RobotoAltered",
		backgroundOpacity: 0,
	} );

	window.rootBlock = container;
	// container.frame.visible = false;

	container.position.set( 0, 2, -1.8 );
	scene.add( container );

	//
	const text1 = new ThreeMeshUI.Text( {
			textContent: 'Geometry',
			fontWeight: '700',
			color: 0x00ff99,
			fontSize: 0.7,
			segments: 4,
			letterSpacing: -0.08,
			fontCastShadow: true,
			fontMaterial : new MSDFToonMaterial({}),
			fontCustomDepthMaterial: new MSDFDepthMaterial({}),
			fontSide: DoubleSide
		} );

	window.textBlock = text1;

	container.add(

		text1,

	);

	const container2 = new ThreeMeshUI.Block( {
		width: 2,
		height: 0.3,
		padding: 0.05,
		justifyContent: 'center',
		textAlign: 'left',
		fontFamily: "Roboto", // As we preloaded fontFamily("Roboto") with variants, we can directly reference the font name
		backgroundOpacity: 0,
	} );

	container2.position.set( 0, 1.7, -2 );
	container2.rotation.x = 0.65;
	scene.add( container2 );

	//

	const infoBox = new ThreeMeshUI.Text( {
		width: 2,
		margin: '0.2 0.01 0.01 0.01',
		padding: 0.025,
		textAlign: 'center',
		backgroundColor: 0x000000,
	} );


	infoBox.add( new ThreeMeshUI.Inline( {
		textContent: 'This example shows how to alter glyph ................... from',
		fontWeight: '700',
	} ) );

	infoBox.add( new ThreeMeshUI.Inline( {
		textContent: ' FontVariant.\n',
		fontWeight: '700',
		fontStyle: 'italic',
	} ) );

	infoBox.add( new ThreeMeshUI.Inline( {
		textContent: 'It also shows ',
		fontStyle: 'italic',
		letterSpacing: 0.05
	} ) );

	infoBox.add( new ThreeMeshUI.Inline( {
		textContent: 'MSDFToonMaterial',
		fontStyle: 'italic',
		fontWeight: '700',
		letterSpacing: 0.05,
		color: 0x00ff99,
		fontMaterial: new MSDFToonMaterial({})
	} ) );

	container2.add( infoBox );


}

// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

// let speed = 0.005;
let speed = 0.005;
function loop() {

	spotLight.target.position.x += speed;
	spotLight.position.x += speed;
	if( spotLight.target.position.x <= -1 ) {
		spotLight.target.position.x = -1;
		spotLight.position.x = -1;
		speed*=-1;
	} else if( spotLight.target.position.x >= 1 ) {
		spotLight.target.position.x = 1;
		spotLight.position.x = 1;
		speed*=-1;
	}

	spotLightHelper.update();

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

}
