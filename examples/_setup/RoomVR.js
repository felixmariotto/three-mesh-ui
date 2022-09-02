import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { LineBasicMaterial, LineSegments } from 'three';

let roomVR;

export const exampleRoomVR = function ( scene ) {

	roomVR = new LineSegments(
		new BoxLineGeometry( 6, 6, 6, 12, 12, 12 ).translate( 0, 3, 0 ),
		new LineBasicMaterial( { color: 0x808080 } )
	);

	scene.add( roomVR );

	return {roomVR};

}
