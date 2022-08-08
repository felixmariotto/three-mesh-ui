import { BufferAttribute, PlaneBufferGeometry } from 'three';
import { Mesh } from 'three';

/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh {

	constructor( vrElement ) {

		const geometry = new PlaneBufferGeometry( 1, 1, vrElement._segments.value, vrElement._segments.value );

		// Add uv for borders computations by copying uv
		geometry.setAttribute('uvB', new BufferAttribute(
			new Float32Array(
				geometry.getAttribute('uv').array
			), 2)).name = 'uvB';

		super( geometry, vrElement.material );

		this.name = 'MeshUI-Frame';

	}

}
