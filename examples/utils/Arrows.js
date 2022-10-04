const _rotations = {
	"top": Math.PI/4,
	"right": -Math.PI/4,
	"bottom": Math.PI + Math.PI/4,
	"left": Math.PI - Math.PI/4
}

/**
 *
 * @param {MeshUIBaseElement} element
 * @param {number} width
 * @param {"top"|"right"|"bottom"|"left"} side
 * @param {"string"|Color|number} color
 * @returns {void}
 */
export default function ( element, width, side, color ) {

	if ( element.isText ) {
		console.warn( 'ThreeMeshUI::Arrows cannot process Text elements. Aborted');
		return;
	}

	element.set({borderColor: color, borderWidth: [width,width,0,0], backgroundOpacity:0, backgroundColor: 0x000000});
	element._backgroundMesh.rotation.z = _rotations[side];


}
