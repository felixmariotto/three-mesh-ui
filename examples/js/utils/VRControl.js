
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
		transparent: true,
		depthTest: false
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
	linesHelper.renderOrder = 1;

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
	pointer.renderOrder = 1;

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

	// Public function that call intersectObjects after sorting the passed UI components so that
	// Raycaster can work on the component's meshes.

	let threeOBJs;
	let intersectedComponents;

	function intersectUI( uiComponents ) {

		for ( let component of uiComponents ) {

			if ( !component.type || !component.type === "Block" ) {
				console.error("VRControl.intersectUI : passed component is not a Block instance");
				return
			};

		};

		threeOBJs = uiComponents.map( (component)=> {
			component.frameContainer.owner = component;
			return component.frameContainer
		});

		intersectedComponents = intersectObjects( threeOBJs, true );

		intersectedComponents = intersectedComponents.map( (target)=> {
			target.object = findOwner( target.object );
			return target
		});

		return intersectedComponents;

	};

	// Resursive function that look for a "owner" prop in this obj or its parents

	function findOwner( obj ) {
		return obj.owner || findOwner( obj.parent );
	};

	// Public function that get called from outside, with an array of objects to intersect.
	// If intersects, returns the intersected object. Position the helper at the intersection point.

	let result, obj3Ds, planes, targets;

	function intersectObjects( objects, recursive ) {

		if ( !objects ) return []

		obj3Ds = objects.filter((obj)=> {
			return obj.type === 'Mesh' || obj.type === "Object3D";
		});

		planes = objects.filter((obj)=> {
			return obj.normal !== undefined && obj.constant !== undefined
		});

		if ( obj3Ds.length === 0 && planes.length === 0 );

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

				result = testIntersections( obj3Ds, planes, recursive );

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

			const result = testIntersections( obj3Ds, planes, recursive );

			return result ? [result] : [];

		};

	};

	//

	let target, intersection, distance;

	function testIntersections( obj3Ds, planes, recursive ) {

		target = raycaster.intersectObjects( obj3Ds, recursive )[0];

		// Rays must be intersected manually as its not supported by raycaster.intersectObjects

		planes.forEach( (plane)=> {

			intersection = raycaster.ray.intersectPlane( plane, planeIntersect );
			if ( intersection ) dummyVec.copy( intersection );

			if ( intersection ) {

				distance = dummyVec.sub( raycaster.ray.origin ).length();

				if ( target && target.distance > distance ) {

					target = {
						point: new THREE.Vector3().copy( intersection ),
						distance: distance,
						object: plane
					};

				} else if ( !target ) {

					target = {
						point: new THREE.Vector3().copy( intersection ),
						distance: distance,
						object: plane
					};

				};

			};

		});

		return target

	};

	//

	module = {
		controllers,
		controllerGrips,
		intersectObjects,
		intersectUI,
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