import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class ChildrenBox extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @private
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._boxes = [];

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

		this._compute( element );

		element._layouter._needsUpdate = true;
		element._renderOrder._needsUpdate = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		this._compute( element );

		element._flexDirection._needsProcess = true;
		element._layouter._needsProcess = true;

		element._overflow._needsRender = true;

	}

	_compute( element ) {

		// Stores all children that are box
		this._uis = element.children.filter( child => child.visible && child.isUI );
		this._boxes = this._uis.filter( child => child.isBox ).sort( this._sortOrder );

		// @TODO: check if it has changes boxes values? with array join to 'fingerprint'?
		// 				computation to remove computation? Does it worth it? When would it worth it?
		//				// Changed order property of children but doesn't impact the output of boxes => Order have change, okay to have more computation
		//				// Removed the Added the same element, at the same position => Rare case
		// 		Conclusion : Not worth it at the time of writing



	}



	/**
	 *
	 */
	dispose() {

		this._uis = null;
		this._boxes = null;

	}

	/**
	 *
	 * Sort children according to their .style.order property or fallback on children index
	 *
	 * @param {HTMLElementVR} a
	 * @param {HTMLElementVR} b
	 * @return {number}
	 * @private
	 */
	_sortOrder = ( a, b ) => {

		if( a._order._value < b._order._value ) return -1;
		if( a._order._value > b._order._value ) return 1;

		// if both children have the same order value, use their children index to order them
		if( this._uis.indexOf(a) < this._uis.indexOf(b) ) {
			return -1;
		}

		return 1;

	}

}
