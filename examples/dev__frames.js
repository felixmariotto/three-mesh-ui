import * as THREE from 'three';
import { Color, Mesh, MeshStandardMaterial, PlaneBufferGeometry, PointLight, SpotLight, SpotLightHelper } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';
import Stats from 'three/examples/jsm/libs/stats.module';
import FrameDepthMaterial from '../src/frame/materials/FrameDepthMaterial';
import FramePhysicalMaterial from 'three-mesh-ui/examples/frame-materials/FramePhysicalMaterial';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, panel, panelScale, lightHelper, stats, topLeft, topMiddleRight, topRight;

window.addEventListener( 'load', init );
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
		new PlaneBufferGeometry(6,6,5,5),
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
	window.container = container;
	container.frame.visible = false;

	const top = makeRow();
	container.add( top );
	top.frame.visible = false;
	topLeft = makeBoxForBorder('borderTopLeft');
	topLeft.set({borderRadiusTopLeft:0.1, borderWidth:0.05, borderColor: new Color(0xff0000)});
	const topMiddleLeft = makeBoxForBorder('TopMiddleLeft?');
	topMiddleLeft.set({borderRadius:'0.05 0.25'})
	const topMiddle = makeBoxForBorder('borderTop');
	topMiddle.set({borderRadiusTop: 0.05})
	topMiddleRight = makeBoxForBorder('TopMiddleRight?');
	topMiddleRight.set({borderRadius: [0.25, 0.05], borderColor: new Color(0xff9900), borderWidth: 0.02});
	topRight = makeBoxForBorder('BorderTopRight');
	topRight.set({borderRadius:0.2, borderWidth:0.05, borderColor: new Color(0x99ff99)});
	top.add( topLeft, topMiddleLeft, topMiddle, topMiddleRight, topRight)
	//

	const middle = makeRow();
	middle.frame.visible = false;
	container.add( middle );
	const middleLeft = makeBoxForBorder('borderMiddleLeft');
	middleLeft.set({borderRadiusLeft:0.1});
	const middleMiddleLeft = makeBoxForBorder('MiddleMiddleLeft?');
	middleMiddleLeft.set({height: 0.2 ,borderRadiusTopRight: 0.25})
	const middleMiddle = makeBoxForBorder('borderMiddle');
	panel = middleMiddle;
	const middleMiddleRight = makeBoxForBorder('MiddleMiddleRight?');
	middleMiddleRight.set({borderRadiusRight:1, borderWidth:'0 0 0 0.25', borderColor: new Color(0x99ff00)});
	const middleRight = makeBoxForBorder('BorderMiddleRight');
	middleRight.set({borderRadiusRight:0.3});
	middle.add( middleLeft, middleMiddleLeft, middleMiddle, middleMiddleRight, middleRight)

	const bottom = makeRow();
	bottom.frame.visible = false;
	container.add( bottom );
	const bottomLeft = makeBoxForBorder('borderBottomLeft');
	bottomLeft.set({borderRadiusBottomLeft:0.1});
	const bottomMiddleLeft = makeBoxForBorder('BottomMiddleLeft?');
	bottomMiddleLeft.backgroundColor = new Color(0xffffff);
	bottomMiddleLeft.set({borderRadius:'0.2 0.1'})
	bottomMiddleLeft.material = new FramePhysicalMaterial({
		// side:DoubleSide,
		transmission: 1,
		opacity: 1,
		metalness: 0,
		roughness: 0,
		ior: 2,
		thickness: 0.1,
		specularIntensity: 1,
		envMapIntensity: 1});
	const bottomMiddle = makeBoxForBorder('borderBottom');
	bottomMiddle.set({borderRadiusBottom:0.1})
	const bottomMiddleRight = makeBoxForBorder('BottomMiddleRight?');
	panelScale = bottomMiddleRight;
	// bottomMiddleRight.frame.material = new MeshDepthMaterial();
	const bottomRight = makeBoxForBorder('BorderBottomRight');
	bottomRight.set({borderWidth:'0.1 0.2 0.3 0.05', borderColor: new Color(0x99ffff)});
	// middleRight.set({borderRadiusBottomRight:0.1});
	bottom.add( bottomLeft, bottomMiddleLeft, bottomMiddle, bottomMiddleRight, bottomRight)
	console.log( bottom.frame.customDepthMaterial );


	renderer.setAnimationLoop( loop );

}

//

function makeTextPanel() {

	const panel = new ThreeMeshUI.Block( {
		width: 3.1,
		height: 1.8,
		fontSize: 0.045,
		textAlign: 'center',
		justifyContent: 'space-evenly',
		backgroundOpacity: 0,
		fontFamily: FontJSON,
		fontTexture: FontImage
	} );

	panel.position.set( 0, 1, -1.8 );
	panel.rotation.x = -0.55;
	scene.add( panel );

	return panel;

}

function makeBoxForBorder( text ) {

	const panel = new ThreeMeshUI.Block( {
		width: 0.5,
		height: 0.5,
		justifyContent: 'center',
		textAlign: 'center',
	} );

	//
	panel.add(
		new ThreeMeshUI.Text( {
			content: text,
		} )
	);

	panel.customDepthMaterial = new FrameDepthMaterial();

	return panel;

}

function makeRow() {

	return new ThreeMeshUI.Block({
		width:3.1,
		height:0.5,
		contentDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundOpacity: 0
	});

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
		borderWidth: 0.05 - 0.06 * Math.sin( Date.now() / 500 ),
		borderColor: new THREE.Color( 0.5 + 0.5 * Math.sin( Date.now() / 500 ), 0.5, 1 ),
		borderOpacity: 1
	} );

	topMiddleRight.set({ borderWidth: Math.abs( 0.25 * Math.sin( Date.now() / 500 ) ) })

	topLeft.set({borderRadiusTopLeft: Math.abs( 0.5 * Math.sin( Date.now() / 500 ) )  })

	const size = 0.25 + Math.abs(0.25 * Math.sin( Date.now() / 500 ) );
	panelScale.set( {width: size, height: size});

	lightHelper.update();

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );

	stats.update()
}
