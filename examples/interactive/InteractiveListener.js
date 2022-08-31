/**
 * @abstract
 */
export default class InteractiveListener {

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @abstract
	 * @param {MeshUIBaseElement|Object3D|null} element
	 * @returns {void}
	 */
	hoveredElementHasChanged( element ) {  /* eslint-enable no-unused-vars */
		throw new Error( "Abstract method need to be implemented.")
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @abstract
	 * @param {MeshUIBaseElement|Object3D|null} element
	 * @returns {void}
	 */
	selectedElementHasChanged( element ) { /* eslint-enable no-unused-vars */
		throw new Error( 'Abstract method need to be implemented.' );
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @abstract
	 * @param {MeshUIBaseElement|Object3D|null} element
	 */
	clicked( element ) {  /* eslint-enable no-unused-vars */
		throw new Error( 'Abstract method need to be implemented.' )
	}

}
