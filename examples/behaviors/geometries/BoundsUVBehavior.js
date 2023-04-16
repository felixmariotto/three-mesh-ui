import { Vector3 } from 'three';
import { Behavior } from 'three-mesh-ui';

export default class BoundsUVBehavior extends Behavior {

	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 * @param {Array.<MeshUIBaseElement|Mesh|Object3D>|MeshUIBaseElement|Mesh|Object3D} targets
	 * @param {"uv","uv2","uvG"} uvSet
	 */
	constructor( subject, targets, uvSet = 'uv' ) {

		super( subject );

		if ( !Array.isArray( targets ) ) {

			targets = [ targets ];

		}

		this._targets = targets;

		this._uvSet = uvSet;

		this._actor = this.act.bind( this );

	}

	attach() {

		this._subject.addAfterUpdate( this._actor );

	}

	detach() {

		this._subject.removeAfterUpdate( this._actor );

	}

	/**
	 * @returns {void}
	 */
	act() {

		if ( this._subject._backgroundMesh ) {

			const referenceMesh = this._subject._backgroundMesh;

			// be sure that box is computed before acquiring it
			// @NOTES : `text.children[0]` can currently work because `mergedGeometries`
			referenceMesh.geometry.computeBoundingBox();

			// this will return a THREE.Box3
			const bBox = referenceMesh.geometry.boundingBox;

			// compute the current bounding box with the world matrix
			bBox.applyMatrix4( referenceMesh.matrixWorld );

			// Using the subject THREE.Box3, we can compute
			// the width and the height of the whole geometry
			//    optionally the depth, but we don't need it for that sample
			const geometryW = bBox.max.x - bBox.min.x;
			const geometryH = bBox.max.y - bBox.min.y;
			// const depth = bBox.max.z - bBox.min.z;

			// Apply those uv for each targets
			for ( let i = 0; i < this._targets.length; i++ ) {

				const target = this._targets[ i ];
				let subTargets = [];
				if( target.isUI && target.isText ) {
					subTargets = [...target._children._inlines.filter( ie => ie._fontMesh ).map( ie => ie._fontMesh)];
				}else{
					subTargets = [target];
				}

				for ( let j = 0; j < subTargets.length; j++ ) {
					const subTarget = subTargets[ j ];

					if ( subTarget.type !== 'Mesh' ) continue;

					const positionAttribute = subTarget.geometry.getAttribute( 'position' );
					const uvAttribute = subTarget.geometry.getAttribute( this._uvSet );

					const vertex = new Vector3();
					for ( let i = 0; i < positionAttribute.count; i++ ) {

						vertex.fromBufferAttribute( positionAttribute, i );

						uvAttribute.setXY( i, ( vertex.x / geometryW ) + 0.5, ( vertex.y / geometryH ) + 0.5 );

					}

					uvAttribute.needsUpdate = true;

				}



			}

		}

	}

}
