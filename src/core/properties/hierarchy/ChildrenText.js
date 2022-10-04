import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class ChildrenText extends BaseProperty {

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

		this._needsProcess = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		this._compute( element );

		element._overflow._needsRender = true;

	}

	_compute( element ) {

		this._uis = element.children.filter( child => child.visible && child.isUI );

		this._inlines = this._uis.filter( child => child.isInline ).sort( this._sortOrder );

	}

	/**
	 *
	 */
	dispose() {

		this._inlines = null;

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
