import * as THREE from 'three';
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, PointLight, SpotLight, SpotLightHelper } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI, { FontLibrary } from 'three-mesh-ui';

import Stats from 'three/examples/jsm/libs/stats.module';
import FrameDepthMaterial from '../src/frame/materials/FrameDepthMaterial';
import FramePhysicalMaterial from 'three-mesh-ui/examples/materials/frame/FramePhysicalMaterial';
import FrameBasicMaterial from 'three-mesh-ui/examples/materials/frame/FrameBasicMaterial';
import MSDFNormalMaterial from 'three-mesh-ui/examples/materials/msdf/MSDFNormalMaterial';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, panel, panelScale, lightHelper, stats, topLeft, topMiddleRight, topRight, bottomMiddle;

// Using `ThreeMeshUI.FontLibrary.prepare( fontFamily, [...fontFamily] )
// We can ensure any fontFamily passed in that function and theirs variants are properly loaded and setup
FontLibrary.prepare(

	FontLibrary
		// Registering a fontFamily called "Roboto", the name is up to us.
		.addFontFamily("Roboto")
		// On the fontFamily added, lets add a variant
		// a font variant usually requires 4 parameters
		.addVariant(
			// The weight of the variant '100'|'200'|'300'|'400'|'600'|'700'|'800'|'900'
			//														LIGHTER					NORMAL			BOLD				BOLDER
			'400',

			// The style of the variant 'normal'|'italic'|'oblique'|'oblique(x deg)'
			"normal",

			// The json definition of the msdf font 'urlToLoad'|loadedObject
			"./assets/fonts/msdf/roboto/regular.json",

			// The texture of the msdf font 'urlToLoad'|Texture
			"./assets/fonts/msdf/roboto/regular.png"
		)

		// Registering additional variants
		.addVariant("700", "italic", "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
		.addVariant("700", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
		.addVariant("400", "italic", "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

// FontLibrary.prepare() returns a Promise, we can therefore add a callback to be executed when all files are loaded
).then( () => {

	// Once font are registered, we can get the font family
	const RobotoFamily = FontLibrary.getFontFamily("Roboto");

	// And then retrieve a fontVariant defined in this Family
	const RobotoRegular = RobotoFamily.getVariant('400','normal');

	// Having font variant allows us to perform some modifications
	// 1. Adjustments
	// If you look closely the `Getting started - Basic Setup` you may have noticed that :
	// 		- the `h` character is slightly below the baseline
	// This can be adjusted per fontVariant
	RobotoRegular.adjustTypographicGlyphs( {
		// 'h' character must change some of its properties defined in the json
		h: {
			// the yoffset property should be 2 (instead of 4 in the json)
			yoffset: 2
		}
	} );
	// Once adjusted, any three-mesh-ui Text using this font variant will use the adjusted properties

	// 1. Material
	// Instead of assigning custom materials to Text one by one
	// We can assign a Material(class) to a font variant (Here the bold one)
	RobotoFamily.getVariant('700','normal').fontMaterial = MSDFNormalMaterial;
	// Once set, any three-mesh-ui Text using this font variant will use the defined material

	// We may encounter the following lines in other examples,
	// they are adjusting font variants to display a nice baseline
	RobotoFamily.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	RobotoFamily.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	RobotoFamily.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

	// Now that the font are loaded and adjusted,

	init();


});

window.addEventListener( 'resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

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

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0.5 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	room.position.z = -1.5;

	scene.add( room );

	// LIGHTS

	const floor = new Mesh(
		new PlaneGeometry(6,6,5,5),
		new MeshStandardMaterial( {color:0xffffff} )
	);
	floor.rotation.x = - Math.PI / 2;
	floor.position.z = -1.5;
	floor.position.y = -0.01
	floor.receiveShadow = true;

	scene.add(floor);


	const light = new SpotLight(0xffffff,1, 8, Math.PI / 6, 1.0, 1.0);
	window.light = light;
	light.position.set(0,5,0.75);
	light.castShadow = true;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 1024; // default
	light.shadow.mapSize.height = 1024; // default
	light.shadow.camera.near = 0.5; // default
	light.shadow.camera.far = 500; // default

	scene.add(light);
	scene.add(light.target);

	lightHelper = new SpotLightHelper(light,0xff0000);
	scene.add(lightHelper);

	light.target.position.set(0,0.75,-2);

	const plight = new PointLight( 0xffffff, 1, 8, 1.0);
	plight.position.set(0,2, -2)

	scene.add(plight)


	// TEXT PANEL

	const container = makeTextPanel();
	window.rootBlock = container;
	// container.frame.visible = false;

	const top = makeRow();
	container.add( top );

	// // top.frame.visible = false;
	topLeft = makeBoxForBorder('borderTopLeft');
	topLeft.set({borderRadius:'0.1 0 0 0', borderWidth:0.05, borderColor: new Color(0xff0000)});
	const topMiddleLeft = makeBoxForBorder('TopMiddleLeft?');
	topMiddleLeft.set({borderRadius:'0.05 0.25', borderLeftWidth:0.1})
	const topMiddle = makeBoxForBorder('borderTop');
	topMiddle.set({borderRadius: '0.05 0.05 0 0'})
	topMiddleRight = makeBoxForBorder('TopMiddleRight?');
	topMiddleRight.set({borderRadius: [0.25, 0.05], borderColor: new Color(0xff9900), borderWidth: 0.02});
	topRight = makeBoxForBorder('BorderTopRight');
	topRight.set({borderRadius:0.2, borderWidth:0.05, borderColor: new Color(0x99ff99)});
	top.add( topLeft, topMiddleLeft, topMiddle, topMiddleRight, topRight)
	//

	const middle = makeRow();
	container.add( middle );


	const middleLeft = makeBoxForBorder('borderMiddleLeft');
	middleLeft.set({borderRadius:"0.05 0 0 0.05"});
	const middleMiddleLeft = makeBoxForBorder('MiddleMiddleLeft?');
	middleMiddleLeft.set({height: 0.2 , borderRadius: '0.05 1 0.05 0'});
	const middleMiddle = makeBoxForBorder('borderMiddle');
	panel = middleMiddle;
	const middleMiddleRight = makeBoxForBorder('MiddleMiddleRight?');
	middleMiddleRight.set({borderRadius: "0 0.5 0.5 0", borderWidth:'0 0 0 0.05', borderColor: new Color(0x99ff00)});
	const middleRight = makeBoxForBorder('BorderMiddleRight');
	middleRight.set({borderRadius: "0 0.3 0.3 0"});
	middle.add( middleLeft, middleMiddleLeft, middleMiddle, middleMiddleRight, middleRight)

	const bottom = makeRow();
	container.add( bottom );



	const bottomLeft = makeBoxForBorder('borderBottomLeft');

	bottomLeft.set({flexDirection:"row"})

	bottomLeft.set({borderRadius: '0 0 0 0.1'});
	const bottomMiddleLeft = makeBoxForBorder('BottomMiddleLeft?');
	// bottomMiddleLeft.backgroundColor = new Color(0xffffff);
	bottomMiddleLeft.set({borderRadius:'0.2 0.1', backgroundColor: 0xffffff, backgroundOpacity:1});
	bottomMiddleLeft.backgroundMaterial = new FramePhysicalMaterial({
		side:DoubleSide,
		transmission: 1,
		opacity: 1,
		metalness: 0,
		roughness: 0,
		ior: 2,
		thickness: 0.1,
		specularIntensity: 1,
		envMapIntensity: 1});
	bottomMiddle = makeBoxForBorder('borderBottom');
	bottomMiddle.set({borderRadius:'0 0 0.1 0.1'})
	const bottomMiddleRight = makeBoxForBorder('BottomMiddleRight?');
	bottomMiddleRight.set({borderRadius:0.5,
		borderWidth:'0 0 0.05 0',borderColor:new Color(0xff9900)});
	bottomMiddleRight.backgroundMaterial = new FrameBasicMaterial({side:DoubleSide});
	panelScale = bottomMiddleRight;
	const bottomRight = makeBoxForBorder('BorderBottomRight');
	bottomRight.set({borderWidth:'0.1 0.2 0.1 0.05', borderRadius:0.5, borderColor: new Color(0x99ffff)});

	bottom.add( bottomLeft, bottomMiddleLeft, bottomMiddle, bottomMiddleRight, bottomRight)
	// console.log( bottom.frame.customDepthMaterial );


	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const panel = new ThreeMeshUI.Block( {
		width: 3.25,
		height: 3,
		fontSize: 0.045,
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'space-evenly',
		// backgroundOpacity: 0.5,
		// backgroundColor: 0xff9900,
		fontFamily: "Roboto",
	} );

	panel.position.set( 0, 1, -1.8 );
	panel.rotation.x = -0.55;
	panel.backgroundCastShadow = true;
	scene.add( panel );

	return panel;

}

function makeRow() {

	return new ThreeMeshUI.Block({

		// height: 0.9,
		// margin: 0.05,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundOpacity: 0.25,
	});

}


function makeBoxForBorder( text, visible = true ) {

	const panel = new ThreeMeshUI.Block( {
		width: 0.5,
		height: 0.5,
		margin: 0.05,
		justifyContent: 'center',
		textAlign: 'center',
		boxSizing: 'border-box',
		visible,
		backgroundColor: 0x000000,
		backgroundOpacity : 0.5,
	} );

	panel.backgroundSide = DoubleSide;
	panel.backgroundCastShadow = true;
	panel.backgroundCustomDepthMaterial = new FrameDepthMaterial();

	//
	panel.add(
		new ThreeMeshUI.Text( {
			textContent: text,
			backgroundColor: 'yellow'
		} )
	);

	return panel;

}


// handles resizing the renderer when the viewport is resized

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	panel.set( {
		borderRadius: 0.2 * Math.sin( Date.now() / 500 ),
		// borderRadius: [ 0, 0.2 + 0.2 * Math.sin( Date.now() / 500 ), 0, 0 ],
		borderWidth: 0.08 - 0.06 * Math.sin( Date.now() / 500 ),
		borderColor: new THREE.Color( 0.5 + 0.5 * Math.sin( Date.now() / 500 ), 0.5, 1 ),
		borderOpacity: 1
	} );

	topMiddleRight.set({ borderWidth: Math.abs( 0.15 * Math.sin( Date.now() / 500 ) ) })

	topLeft.set({borderRadius: [Math.abs( 0.5 * Math.sin( Date.now() / 500 ) ),0,0,0]  })

	const size = 0.15 + Math.abs(0.35 * Math.sin( Date.now() / 500 ) );
	panelScale.set( {width: size, height: size});

	lightHelper.update();

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	// ThreeMeshUI.update();
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

	stats.update()
}
