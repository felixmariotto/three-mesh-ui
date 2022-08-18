import { BufferAttribute, PlaneBufferGeometry } from 'three';
import { Mesh } from 'three';

/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( element ) {

		const geometry = new PlaneBufferGeometry( 1, 1, element._segments.value, element._segments.value );

		// Add additional uv for borders computations by copying initial uv
		const uvB = new BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
		geometry.setAttribute('uvB', uvB ).name = 'uvB';

		super( geometry, element.material );

		this.name = 'UIBackgroundBox';

	}

}
