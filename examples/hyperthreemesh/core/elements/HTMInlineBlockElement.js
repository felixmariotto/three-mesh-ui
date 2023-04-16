import HTMBaseElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBaseElement';
import { Vector3 } from 'three';
import { InlineBlock } from 'three-mesh-ui';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMInlineBlockElement extends HTMBaseElement {

	/**
	 *
	 * @param {Object.<string,any>} [values={}]
	 */
	constructor( values = {}) {

		const properties = {};
		InlineBlock.definePropertiesValues( properties, values );
		super( properties, values );
		InlineBlock.init( this );

	}

	clear() {

		// remove cross reference
		for ( const inline of this._inlines._value ) {
			inline.clear();
		}

		return super.clear();
	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsUpdate = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new Vector3(1,1,1);
		this._bounds._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'ThreeMeshUI::InlineBlockElement cannot contains UI Elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

}
