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

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		// this._compute( element );
		//
		// this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._compute( element );

	}

	/* eslint-disable no-unused-vars */ _compute( element ) { /* eslint-enable no-unused-vars */

		// this._uis = element.children.filter( child => child.visible && child.isUI );
		//
		// this._inlines = this._uis.filter( child => child.isInline );

	}

	/**
	 *
	 */
	dispose() {

		// this._inlines = null;

	}

}
