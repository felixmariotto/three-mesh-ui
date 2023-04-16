import HTMBaseElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBaseElement';
import BoxElement from '../../../../src/elements/basic/BoxElement';
import { Vector3 } from 'three';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMBoxElement extends HTMBaseElement {

	/**
	 *
	 * @param {Object.<string,Class>} [properties={}]
	 * @param {Object.<string,any>} [values={}]
	 */
	constructor( properties= {}, values= {}) {


		BoxElement.definePropertiesValues( properties, values );
		super( properties, values );
		BoxElement.init( this );

	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsProcess = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new Vector3(1,1,1);
		this._bounds._needsProcess = true;

	}

}
