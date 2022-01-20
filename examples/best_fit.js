
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from '../src/three-mesh-ui.js';

import FontJSON from './assets/Roboto-msdf.json';
import FontImage from './assets/Roboto-msdf.png';

import Stats from 'three/examples/jsm/libs/stats.module.js';

/*

This example demonstrate how a best fit works.

*/
const FPS = 5;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let scene, camera, renderer, controls, stats;
let innerContainers = [];
let text;
let currentFrame = 0;

window.addEventListener('load', init );
window.addEventListener('resize', onWindowResize );

//

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 100 );

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(renderer));
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	document.body.appendChild( stats.dom );

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 1.5 );
	controls.target = new THREE.Vector3( 0, 1, -1.8 );
	controls.update();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( room );

	// TEXT PANEL

	makeTextPanel();

	//

	renderer.setAnimationLoop( loop );

};

//

function makeTextPanel() {

    for(let i = 0; i < 4; i++)
    {

        let bestFit;
        switch(i){
            case 0:
                bestFit = 'none';
                break;
            case 1:
                bestFit = 'auto';
                break;
            case 2:
                bestFit = 'grow';
                break;
            case 3:
                bestFit = 'shrink';
                break;
        }

        const outerContainer = new ThreeMeshUI.Block({
            padding: 0.05,
            backgroundColor: new THREE.Color( 0xd9d9d9 ),
            backgroundOpacity: 0.5,
            justifyContent: 'end',
            alignContent: 'right',
            fontColor: new THREE.Color( 0x333333 ),
            fontFamily: FontJSON,
            fontTexture: FontImage,
            width: 1.35,
            height: 0.95
        });

        outerContainer.position.set( -2 + 1.4 * i, 1, -1.8 );
        outerContainer.rotation.x = -0.55;
        scene.add( outerContainer );

        //

        const innerContainer = new ThreeMeshUI.Block({
            width: 1,
            height: 0.7,
            padding: 0.05,
            backgroundColor: new THREE.Color( 0xffffff ),
            backgroundOpacity: 0.5,
            bestFit: bestFit
        });

        outerContainer.add( innerContainer );
        innerContainers.push(innerContainer);

        const firstTextBlock = new ThreeMeshUI.Text({
            content: "This first text component is going to be much shorter than the next one. ",
            fontSize: 0.075
        });

        innerContainer.add(firstTextBlock);

        const secondTextBlock = new ThreeMeshUI.Text({
            content: "This second text component is much longer than the previous one, yet they both fit in the same container and share the same font size.",
            fontSize: 0.05
        });

        innerContainer.add(secondTextBlock);
    }


	//

};

// handles resizing the renderer when the viewport is resized

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};



//

function loop() {

	const now = Date.now();

	innerContainers.forEach(innerContainer => {
        innerContainer.set({
		width: Math.sin( now / 1000 ) * 0 + 1,
		height: Math.sin( now / 500 ) * 0.25 + 0.6
        });
	});


	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();

	controls.update();
	renderer.render( scene, camera );
	// stats.update()
};
