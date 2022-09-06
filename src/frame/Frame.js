import { BufferAttribute, PlaneGeometry } from 'three';
import { Mesh } from 'three';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( element ) {

		const geometry = new PlaneGeometry( 1, 1, element._segments.value, element._segments.value );

		// Add additional uv for borders computations by copying initial uv
		const uvB = new BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
		geometry.setAttribute('uvB', uvB ).name = 'uvB';

		super( geometry, element.backgroundMaterial );

		this.name = 'UIBackgroundBox';

	}

}
