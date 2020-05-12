
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import ThreeMeshUI from '../../src/three-mesh-ui.js';
import VRControl from './utils/VRControl.js';
import ShadowedLight from './utils/ShadowedLight.js';

var scene, camera, renderer, controls, raycaster, control;
var meshContainer, meshes, currentMesh;
var targets = [];
var objsToTest = [];
var statefulComponents = new Set();

window.addEventListener('load', ()=> {
	init();
});

window.addEventListener('resize', ()=> {
	onWindowResize();
});

function init() {

	////////////////////////
	//  Basic Three Setup
	////////////////////////

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );
	renderer.shadowMap.enabled = true ;

	// Orbit controls for no-vr

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	/////////
	// Room
	/////////

	const room = new THREE.LineSegments(
        new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	const roomMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial({ side: THREE.BackSide }),
	);

	scene.add( room );
    objsToTest.push(roomMesh);

	//////////
	// Light
	//////////

	const light = ShadowedLight({
		z: 10,
		width: 6,
		bias: -0.0001
	});

	const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	scene.add( light, hemLight );

	////////////////
	// Controllers
	////////////////

	control = VRControl( renderer, camera, scene );

	control.controllers.forEach( (controller)=> {
		scene.add( controller );
	});

	control.controllerGrips.forEach( (controllerGrip)=> {
		scene.add( controllerGrip );
	});

	////////////////////
	// Primitive Meshes
	////////////////////

	meshContainer = new THREE.Group();
	meshContainer.position.set( 0, 1, -1.9 );
	scene.add( meshContainer );

	const sphere = new THREE.Mesh(
		new THREE.IcosahedronBufferGeometry( 0.3, 1 ),
		new THREE.MeshStandardMaterial({ color: 0x3de364, flatShading: true })
	);
	sphere.visible = false;

	const box = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 0.45, 0.45, 0.45 ),
		new THREE.MeshStandardMaterial({ color: 0x643de3, flatShading: true })
	);
	box.visible = false;

	const cone = new THREE.Mesh(
		new THREE.ConeBufferGeometry( 0.28, 0.5, 10 ),
		new THREE.MeshStandardMaterial({ color: 0xe33d4e, flatShading: true })
	);
	cone.visible = false;

	meshContainer.add( sphere, box, cone );

	meshes = [ sphere, box, cone ];
	currentMesh = 0;

	showMesh( currentMesh );
 	
 	//////////
	// Panel
	//////////

	makePanel();

	//

	renderer.setAnimationLoop( loop );

};

// Shows the primitive mesh with the passed ID and hide the others

function showMesh( id ) {

	meshes.forEach( (mesh, i)=> {
		mesh.visible = i === id ? true : false;
	});

};

///////////////////
// UI contruction
///////////////////

function makePanel() {

	// Group object in which we put everything

	const uiContainer = new THREE.Group();
	uiContainer.position.set( 0, 0.6, -1.2 );
	uiContainer.rotation.x = -0.55;
	scene.add( uiContainer );

	// Materials used by the buttons on idle and hover

	const opaqueMaterial = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.5
	});

	const clearMaterial = new THREE.MeshLambertMaterial({
		side: THREE.DoubleSide
	});

	// Container block, in which we put the two buttons.
	// We don't define width and height, it will be set automatically from the children's dimensions
	// Note that we set contentDirection: "row-reverse", in order to orient the buttons horizontally

	const container = ThreeMeshUI.Block({
		justifyContent: 'center',
		alignContent: 'center',
		contentDirection: "row-reverse",
		fontFamily: './assets/helvetiker_regular.typeface.json',
		backgroundMaterial: opaqueMaterial
	});

	objsToTest.push( container.threeOBJ ); // Array for raycasting in the loop

	// BUTTONS

	// We start by creating objects containing options that we will use with the two buttons,
	// in order to write less code.

	const buttonOptions = {
		width: 0.5,
		height: 0.2,
		padding: 0.05,
		justifyContent: 'center',
		alignContent: 'center',
		offset: 0.05,
		fontSize: 0.07,
		margin: 0.05
	};

	// Options for component.setupState().
	// It must contain a 'state' parameter, which you will refer to with component.setState( 'name-of-the-state' ).

	const hoveredStateOptions = {
		state: "hovered",
		attributes: {
			offset: 0.05,
			backgroundMaterial: clearMaterial
		},
		onSet: ()=> { /* console.log('I get called when button is set hovered') */ }
	};

	const idleStateOptions = {
		state: "idle",
		attributes: {
			offset: 0.05,
			backgroundMaterial: opaqueMaterial
		},
		onSet: ()=> { /* console.log('I get called when button is set idle') */ }
	};

	// Buttons creation, with the options objects passed in parameters.

	const buttonNext = ThreeMeshUI.Block( buttonOptions );
	const buttonPrevious = ThreeMeshUI.Block( buttonOptions );

	buttonNext.appendChild(
		ThreeMeshUI.Text({
			content: "next",
		})
	);

	buttonPrevious.appendChild(
		ThreeMeshUI.Text({
			content: "previous"
		})
	);

	buttonNext.setupState({
		state: "selected",
		attributes: {
			offset: 0.02,
			backgroundMaterial: clearMaterial
		},
		onSet: ()=> {
			currentMesh = (currentMesh + 1) % 3 ;
			showMesh( currentMesh );
		}
	});
	buttonNext.setupState( hoveredStateOptions );
	buttonNext.setupState( idleStateOptions );

	buttonPrevious.setupState({
		state: "selected",
		attributes: {
			offset: 0.02,
			backgroundMaterial: clearMaterial
		},
		onSet: ()=> {
			currentMesh -= 1;
			if ( currentMesh < 0 ) currentMesh = 2;
			showMesh( currentMesh );
		}
	});
	buttonPrevious.setupState( hoveredStateOptions );
	buttonPrevious.setupState( idleStateOptions );

	container.appendChild( buttonNext, buttonPrevious );
	objsToTest.push( buttonNext.threeOBJ, buttonPrevious.threeOBJ );
	statefulComponents.add( buttonNext );
    statefulComponents.add( buttonPrevious );
    //We need to keep track of if the trigger/mouse is still pressed after
    //moving off of the component
    statefulComponents.forEach((component) => {
        component.selectedOwners = new Set();
    });

	//

	uiContainer.add( container.threeOBJ );

};

// Handle resizing the viewport

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

};

//

function loop() {

	controls.update();

	meshContainer.rotation.z += 0.01;
	meshContainer.rotation.y += 0.01;

	renderer.render( scene, camera );

	raycast();

};

function updateControllerPoint(hand, selector) {
    if(selector['raycaster'] != null && selector['closestPointDistance'] != Number.MAX_SAFE_INTEGER) {
        control.setPoint('controller-' + hand, selector['closestPoint']);
    } else {
        control.clearPoint('controller-' + hand);
    }
};

// Called in the loop. Get intersections with the mouse and/or the VR
// controllers, updating the buttons states accordingly

function raycast() {
    const selectors = {};
    const selectorOptions = ['left', 'right', 'mouse'];
    for(let i = 0; i < selectorOptions.length; i++) {
        const option = selectorOptions[i];
        selectors[option] = {
            raycaster: control.getRaycaster(option),
            selectedField: option + "ControlSelected",
            closestPoint: null,
            closestPointDistance: Number.MAX_SAFE_INTEGER,
        };
    }

    //Due to the nature of having 2 controllers, it's easier to determine if a
    //component is idle by going through each ui element 1 by 1 using all
    //raycasters. This way of adjusting state does not take the UI being behind
    //another mesh into account, but does allow stacked component state changes
    for(let i = 0; i < objsToTest.length; i++) {
        const obj = objsToTest[i];
        const component = obj.uiComponent; //Null for non-stateful components
        const isStateful = statefulComponents.has(obj.uiComponent);
        let raycasted = false;
        for(let option in selectors) {
            const selector = selectors[option];
            const raycaster = selector['raycaster'];
            const selected = control[selector['selectedField']];
            let intersections;
            if(raycaster == null) {
                intersections = [];
            } else {
                intersections = raycaster.intersectObject(obj, true);
            }
            if(intersections.length != 0) {
                const distance = intersections[0].distance;
                if(distance < selector['closestPointDistance']) {
                    selector['closestPointDistance'] = distance;
                    selector['closestPoint'] = intersections[0].point;
                }
                raycasted = true;
                if(isStateful) {
                    if(selected) {
                        if(!component.selectedOwners.has(option)) {
                            component.selectedOwners.add(option);
                        }
                        if(component.currentState != "selected") {
                            component.setState("selected");
                        }
                    } else {
                        if(component.selectedOwners.has(option)) {
                            component.selectedOwners.delete(option);
                        }
                        if(component.currentState != "hovered"
                            && component.selectedOwners.size == 0)
                        {
                            component.setState("hovered");
                        }
                    }
                }
            } else if(isStateful && component.selectedOwners.has(option)) {
                if(!selected) {
                    component.selectedOwners.delete(option);
                }
            }
        }
        if(isStateful && !raycasted && component.selectedOwners.size == 0) {
            component.setState("idle");
        }
    }

    //Now we need to set the point for right and left controllers
    updateControllerPoint('left', selectors['left']);
    updateControllerPoint('right', selectors['right']);

};
