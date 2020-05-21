
/*
	Job: creating the VR controllers and their pointers
*/

import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export default function VRControl( renderer, camera, scene ) {

	let module;

	const controllers = [];
	const controllerGrips = [];

	const controllerModelFactory = new XRControllerModelFactory();

	//////////////////
	// Lines helpers
	//////////////////

	const material = new THREE.MeshBasicMaterial( {
		color: 0xffffff,
		alphaMap: new THREE.CanvasTexture( generateRayTexture() ),
		transparent: true
	});

	const geometry = new THREE.BoxBufferGeometry( 0.004, 0.004, 0.35 );

	geometry.translate( 0, 0, -0.15 );

	const uvAttribute = geometry.attributes.uv;
		
	for ( var i = 0; i < uvAttribute.count; i ++ ) {
			
	    var u = uvAttribute.getX( i );
	    var v = uvAttribute.getY( i );
				
	    [ u, v ] = (()=> {
	    	switch ( i ) {
	    		case 0 : return [ 1, 1 ]
	    		case 1 : return [ 0, 0 ]
	    		case 2 : return [ 1, 1 ]
	    		case 3 : return [ 0, 0 ]
	    		case 4 : return [ 0, 0 ]
	    		case 5 : return [ 1, 1 ]
	    		case 6 : return [ 0, 0 ]
	    		case 7 : return [ 1, 1 ]
	    		case 8 : return [ 0, 0 ]
	    		case 9 : return [ 0, 0 ]
	    		case 10 : return [ 1, 1 ]
	    		case 11 : return [ 1, 1 ]
	    		case 12 : return [ 1, 1 ]
	    		case 13 : return [ 1, 1 ]
	    		case 14 : return [ 0, 0 ]
	    		case 15 : return [ 0, 0 ]
	    		default : return [ 0, 0 ]
	    	};
	    })();
				
	    uvAttribute.setXY( i, u, v );
			
	};

	const linesHelper = new THREE.Mesh( geometry, material );
	linesHelper.renderOrder = 1000;

	/////////////////
	// Point helper
	/////////////////

	const spriteMaterial = new THREE.SpriteMaterial({
		map: new THREE.CanvasTexture( generatePointerTexture() ),
		sizeAttenuation: false,
		depthTest: false
	});

	const pointer = new THREE.Sprite( spriteMaterial );

	pointer.scale.set(0.015, 0.015, 1)
	pointer.renderOrder = 1000;

	////////////////
	// Controllers
	////////////////

	const controller1 = renderer.xr.getController( 0 );
	const controller2 = renderer.xr.getController( 1 );

	controller1.name = "controller-right";
	controller2.name = "controller-left";

	const controllerGrip1 = renderer.xr.getControllerGrip( 0 );
	const controllerGrip2 = renderer.xr.getControllerGrip( 1 );

	if ( controller1 ) controllers.push( controller1 );
	if ( controller2 ) controllers.push( controller2 );

	if ( controllerGrip1 ) controllerGrips.push( controllerGrip1 );
	if ( controllerGrip2 ) controllerGrips.push( controllerGrip2 );

	controllers.forEach( (controller)=> {

		const ray = linesHelper.clone();
		const point = pointer.clone();

		controller.add( ray, point );
		controller.ray = ray;
		controller.point = point;

	});

	controllerGrips.forEach( (controllerGrip)=> {
		controllerGrip.add( controllerModelFactory.createControllerModel( controllerGrip ) );
	});

	//////////////
	// Functions
	//////////////


	/*

	// Public function that get called from outside, with an array of objects to intersect.
	// If intersects, returns the intersected object. Position the helper at the intersection point.

	let result, targets;

	function intersectObjects( objects, recursive ) {

		if ( recursive === undefined ) recursive = true;

		if ( !objects ) return []

		// If immersion is on, then we check intersection with the controllers.
		// Otherwise, we emulate them with the mouse

		if ( renderer.xr.isPresenting ) {

			targets = [];
			
			controllers.forEach( (controller, i)=> {

				// Position the intersection ray

				dummyMatrix.identity().extractRotation( controller.matrixWorld );

				raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
				raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( dummyMatrix );

				// Intersect

				result = raycaster.intersectObjects( objects, recursive )[0];

				if ( !result ) return

				result.caster = controller.name

				// Position the helper and return the intersected object if any

				if ( result ) {

					const localVec = controller.worldToLocal( result.point );
					controller.userData.point.position.copy( localVec );
					controller.userData.point.visible = true;

					targets.push( result );

					return

				} else {

					controller.userData.point.visible = false;

					return

				};

			});

			return targets

		} else {

			if ( mouse.x === null && mouse.y === null ) return []

			raycaster.setFromCamera( mouse, camera );

			result = intersect( objects, recursive );

			return result ? [result] : [];

		};

	};

	*/

	const dummyMatrix = new THREE.Matrix4();

	function setFromController( controllerID, ray ) {

		const controller = controllers[ controllerID ];

		// Position the intersection ray

		dummyMatrix.identity().extractRotation( controller.matrixWorld );

		ray.origin.setFromMatrixPosition( controller.matrixWorld );
		ray.direction.set( 0, 0, - 1 ).applyMatrix4( dummyMatrix );

	};

	//

	function setPointerAt( controllerID, vec ) {

		const controller = controllers[ controllerID ];
		const localVec = controller.worldToLocal( vec );

		controller.point.position.copy( localVec );
		controller.point.visible = true;

	};

	//

	return {
		controllers,
		controllerGrips,
		setFromController,
		setPointerAt
	};

};

//////////////////////////////
// CANVAS TEXTURE GENERATION
//////////////////////////////

// Generate the texture needed to make the intersection ray fade away

function generateRayTexture() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 64;
	canvas.height = 64;

	var ctx = canvas.getContext("2d");

	var gradient = ctx.createLinearGradient(0, 0, 64, 0);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(1, "white");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 64, 64);

	return canvas;

};

// Generate the texture of the point helper sprite

function generatePointerTexture() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 64;
	canvas.height = 64;

	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.arc(32, 32, 29, 0, 2 * Math.PI);
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.fill();

	return canvas;

};
