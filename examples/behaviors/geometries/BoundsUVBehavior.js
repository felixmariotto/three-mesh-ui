import { Vector3 } from 'three';

export default class BoundsUVBehavior {

	/**
	 *
	 * @param {MeshUIComponent} reference
	 * @param {Array.<MeshUIComponent|Mesh|Object3D>|MeshUIComponent|Mesh|Object3D} targets
	 * @param {"uv","uv2","uvG"} uvSet
	 */
	constructor( reference, targets, uvSet = 'uv' ) {

		if ( !Array.isArray( targets ) ) {

			targets = [ targets ];

		}

		reference.onAfterUpdate = function () {

			if ( reference.children.length > 0 ) {

				/**
				 * @Type {Mesh}
				 */
				const firstChild = reference.children[ 0 ];

				// be sure that box is computed before acquiring it
				// @NOTES : `text.children[0]` can currently work because `mergedGeometries`
				firstChild.geometry.computeBoundingBox();

				// this will return a THREE.Box3
				const bBox = firstChild.geometry.boundingBox;

				// compute the current bounding box with the world matrix
				bBox.applyMatrix4( firstChild.matrixWorld );

				// Using the reference THREE.Box3, we can compute
				// the width and the height of the whole geometry
				//    optionally the depth, but we don't need it for that sample
				const geometryW = bBox.max.x - bBox.min.x;
				const geometryH = bBox.max.y - bBox.min.y;
				// const depth = bBox.max.z - bBox.min.z;

				// Apply those uv for each targets
				for ( let i = 0; i < targets.length; i++ ) {

					let target = targets[ i ];
					if ( target.children && target.children.length ) {

						target = target.children[ 0 ];

					}

					if ( target.type !== 'Mesh' ) continue;

					const positionAttribute = target.geometry.getAttribute( 'position' );
					const uvAttribute = target.geometry.getAttribute( uvSet );

					const vertex = new Vector3();
					for ( let i = 0; i < positionAttribute.count; i++ ) {

						vertex.fromBufferAttribute( positionAttribute, i );

						uvAttribute.setXY( i, ( vertex.x / geometryW ) + 0.5, ( vertex.y / geometryH ) + 0.5 );

					}

					uvAttribute.needsUpdate = true;

				}

			}

		};

	}

}
