import { BufferAttribute, PlaneBufferGeometry } from 'three';
import { Mesh } from 'three';

/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh {

	constructor( material ) {

		const geometry = new PlaneBufferGeometry();

		// Add uv for borders computations by copying uv
		geometry.setAttribute('uvB', new BufferAttribute(
			new Float32Array(
				geometry.getAttribute('uv').array
			), 2)).name = 'uvB';

		super( geometry, material );

		this.name = 'MeshUI-Frame';

	}

}
