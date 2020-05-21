
/*
	Job: creating the VR controllers, and do the ray casting with objects
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
		controller.userData.ray = ray;
		controller.userData.point = point;

	});

	controllerGrips.forEach( (controllerGrip)=> {
		controllerGrip.add( controllerModelFactory.createControllerModel( controllerGrip ) );
	});

	controller1.addEventListener( 'selectstart', onSelectStart );
	controller1.addEventListener( 'selectend', onSelectEnd );

	controller2.addEventListener( 'selectstart', onSelectStart );
	controller2.addEventListener( 'selectend', onSelectEnd );

	window.addEventListener( 'mousedown', onSelectStart );
	window.addEventListener( 'mouseup', onSelectEnd );

	function onSelectStart( event ) {

		var controller = event.target;

		module.handleSelectStart( controller.name );

		switch ( controller.name ) {
			case 'controller-right': module.rightControlSelected = true; break;
			case 'controller-left': module.leftControlSelected = true; break;
			default : module.mouseControlSelected = true; break;
		};

	};

	function onSelectEnd( event ) {

		var controller = event.target;

		module.handleSelectEnd( controller.name );

		switch ( controller.name ) {
			case 'controller-right': module.rightControlSelected = false; break;
			case 'controller-left': module.leftControlSelected = false; break;
			default : module.mouseControlSelected = false; break;
		};


	};

	//////////////
	// Functions
	//////////////

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	mouse.x = null;
	mouse.y = null;

	const planeIntersect = new THREE.Vector3();
	const dummyVec = new THREE.Vector3();
	const dummyMatrix = new THREE.Matrix4();

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	window.addEventListener( 'mousemove', onMouseMove, false );

	function onMouseMove( event ) {

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	};

	// Resursive function that look for a "owner" prop in this obj or its parents

	function findOwner( obj ) {
		return obj.owner || findOwner( obj.parent );
	};

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

	//

	let intersection, target;

	function intersect( objects, recursive ) {

		intersection = undefined;

		target = objects.reduce( (closestObj, object)=> {

			// If the object is a UI object, we want to manually check intersections with the childrens,
			// because in case of intersection, we return the object, not the child.
			if ( object.isUI && recursive ) {

				let distance;
				let tempIntersection;

				object.traverse( (child)=> {

					tempIntersection = raycaster.intersectObject( object, true );

					tempIntersection = tempIntersection[0] || null

					if ( !tempIntersection ) return

					if ( !intersection ||
						 intersection.distance > tempIntersection.distance ) {

						intersection = tempIntersection;

					};

				});

				if ( intersection ) intersection.object = object;

			} else {

				intersection = raycaster.intersectObject( object, object.isUI ? false : recursive );

				intersection = intersection[0] || null

			};

			//

			if ( !intersection ) {

				return closestObj

			} else if ( !closestObj ) {

				return intersection

			} else {

				return closestObj.distance > intersection.distance ? intersection : closestObj;

			};

		}, null );

		//

		if ( target ) {

			target.object = target.object.uiComponent ? target.object.uiComponent : target.object

		};

		return target

	};

	//

	module = {
		controllers,
		controllerGrips,
		intersectObjects,
		handleSelectStart: ()=> {},
		handleSelectEnd: ()=> {}
	};

	return module

};


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

	/*
	ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 64, 64);
    */

	ctx.beginPath();
	ctx.arc(32, 32, 29, 0, 2 * Math.PI);
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.fillStyle = "white";
	ctx.fill();

	return canvas;

};

/*
function generatePointerAlphaMap() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 64;
	canvas.height = 64;

	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.arc(32, 32, 32, 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();

	return canvas;

};
*/