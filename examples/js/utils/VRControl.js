
import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

export default function VRControl( renderer ) {

	const controllers = [];
	const controllerGrips = [];

	const controllerModelFactory = new XRControllerModelFactory();

	// pointer

	var texture = new THREE.CanvasTexture( generateTexture() );

	var material = new THREE.MeshBasicMaterial( {
		color: 0xffffff,
		alphaMap: texture,
		transparent: true
	});

	const geometry = new THREE.BoxBufferGeometry( 0.004, 0.004, 0.35 );
	geometry.translate( 0, 0, -0.15 );

	var uvAttribute = geometry.attributes.uv;
		
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

	const line = new THREE.Mesh( geometry, material );

	//

	const controller1 = renderer.xr.getController( 0 );
	const controller2 = renderer.xr.getController( 1 );
	const controllerGrip1 = renderer.xr.getControllerGrip( 0 );
	const controllerGrip2 = renderer.xr.getControllerGrip( 1 );

	if ( controller1 ) controllers.push( controller1 );
	if ( controller2 ) controllers.push( controller2 );
	if ( controllerGrip1 ) controllerGrips.push( controllerGrip1 );
	if ( controllerGrip2 ) controllerGrips.push( controllerGrip2 );

	// controller2.addEventListener( 'selectstart', onSelectStart );
	// controller2.addEventListener( 'selectend', onSelectEnd );

	controllers.forEach( (controller)=> {
		controller.add( line.clone() );
	});

	controllerGrips.forEach( (controllerGrip)=> {
		controllerGrip.add( controllerModelFactory.createControllerModel( controllerGrip ) );
	});

	//

	const pointer = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 0.015, 16, 16 ),
		new THREE.MeshBasicMaterial()
	);
	pointer.visible = false;

	//

	const raycaster = new THREE.Raycaster();

	const planeIntersect = new THREE.Vector3();
	const dummyVec = new THREE.Vector3();
	const dummyMatrix = new THREE.Matrix4();

	//

	function intersect( objects, scene ) {

		const meshes = objects.filter((obj)=> {
			return obj.type === 'Mesh';
		});

		const planes = objects.filter((obj)=> {
			return obj.normal !== undefined && obj.constant !== undefined
		});

		// raycaster.ray.origin.set( 0, 1, 0 );
		// raycaster.ray.direction.set( 0, 0, -1 );

		dummyMatrix.identity().extractRotation( controllers[0].matrixWorld );

		raycaster.ray.origin.setFromMatrixPosition( controllers[0].matrixWorld );
		raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( dummyMatrix );

		// var arrowHelper = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 10, 0xffffff );
		// scene.add( arrowHelper );

		let target = raycaster.intersectObjects( meshes )[0];

		planes.forEach( (plane)=> {

			const intersection = raycaster.ray.intersectPlane( plane, planeIntersect );
			if ( intersection ) dummyVec.copy( intersection );

			if ( intersection ) {

				if ( target && target.distance > dummyVec.sub( raycaster.ray.origin ).length() ) {

					target = {
						point: new THREE.Vector3().copy( intersection )
					};

				} else if ( !target ) {

					target = {
						point: new THREE.Vector3().copy( intersection )
					};

				};

			};

		});

		if ( target ) {

			// console.log( target.point )

			pointer.position.copy( target.point );
			pointer.visible = true;

			return target

		} else {

			pointer.visible = false;

			return null

		};

	};

	return {
		controllers,
		controllerGrips,
		pointer,
		intersect
	};

};

//

function generateTexture() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 64;
	canvas.height = 64;

	var ctx = canvas.getContext("2d");

	var grd = ctx.createLinearGradient(0, 0, 64, 0);
	grd.addColorStop(0, "black");
	grd.addColorStop(1, "white");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 64, 64);

	return canvas;

};
