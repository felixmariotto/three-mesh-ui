
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

	const raycaster = new THREE.Raycaster();

	return {
		controllers,
		controllerGrips
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
