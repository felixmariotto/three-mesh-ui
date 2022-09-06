import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { LineBasicMaterial, LineSegments } from 'three';

let ruler,rulerHalf;

export const exampleRulers = function ( scene ) {

	// ROOM
	ruler = new LineSegments(
		new BoxLineGeometry( 6, 6, 6, 60, 60, 60 ).translate( 0, 0, 0.01 ),
		new LineBasicMaterial( { color: 0xdd99dd, transparent:true, opacity: 0.5 } )
	);

	rulerHalf = new LineSegments(
		new BoxLineGeometry( 6, 6, 6, 12, 12, 12 ).translate( 0, 0, 0.01 ),
		new LineBasicMaterial( { linewidth:1, color: 0xffffff, transparent:true, opacity:0.5} )
	);

	scene.add( ruler );
	scene.add( rulerHalf );

	return {ruler, rulerHalf};

}
