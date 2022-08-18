import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class ChildrenInline extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._inlines = [];

	}


	/* eslint-disable no-unused-vars */	update( element, out ) { /* eslint-enable no-unused-vars */

		this._needsProcess = true;

	}

	process( element ) {

		this._inlines = element.children.filter( child => child.isInline );


		// TODO: ?
		// element._bounds.checkAutoProcess( element );

	}

	/**
	 *
	 */
	dispose() {

		this._inlines = null;

	}

}
