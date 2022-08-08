import BaseProperty from './BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import ElementVR from '../elements/ElementVR';
/* eslint-enable no-unused-vars */

export default class ChildrenProperty extends BaseProperty {

	constructor() {

		super( 'children' );

		/**
		 *
		 * @type {Array.<ElementVR>}
		 */
		this._childrenUIs = [];

		/**
		 *
		 * @type {Array.<ElementVR>}
		 */
		this._childrenBoxes = [];

		/**
		 *
		 * @type {Array.<ElementVR>}
		 */
		this._childrenTexts = [];

		/**
		 *
		 * @type {Array.<ElementVR>}
		 */
		this._childrenInlines = [];

	}

	update( vrElement ) {

		// Stores all children that are ui
		this._childrenUIs = vrElement.children.filter( child => child.isUI && child.visible );

		// Stores all children that are box
		this._childrenBoxes = this._childrenUIs.filter( child => child.isBoxComponent ).sort( this._sortOrder );

		// Stores all children that are inline
		this._childrenInlines = this._childrenUIs.filter( child => child.isInline );

		// Stores all children that are text
		this._childrenTexts = this._childrenUIs.filter( child => child.isText );

		this._needsUpdate = false;

	}

	/**
	 *
	 * @return {Array<ElementVR>}
	 */
	get childrenUIs() { return this._childrenUIs; }

	/**
	 *
	 * @return {Array<ElementVR>}
	 */
	get childrenBoxes() { return this._childrenBoxes; }

	/**
	 *
	 * @return {Array<ElementVR>}
	 */
	get childrenInlines() { return this._childrenInlines; }

	/**
	 *
	 * @return {Array<ElementVR>}
	 */
	get childrenTexts() { return this._childrenTexts; }


	/**
	 *
	 */
	dispose() {

		this._childrenUIs = null;
		this._childrenBoxes = null;
		this._childrenTexts = null;
		this._childrenInlines = null;

	}

	/**
	 *
	 * Sort children according to their .style.order property or fallback on children index
	 *
	 * @param {ElementVR} a
	 * @param {ElementVR} b
	 * @return {number}
	 * @private
	 */
	_sortOrder( a, b ) {

		if( a.style._order.output < b.style._order.output ) return -1;
		if( a.style._order.output > b.style._order.output ) return 1;

		// if both children have the same order value, use their children index to order them
		if( this._childrenUIs.indexOf(a) < this._childrenUIs.indexOf(b) ) {
			return -1;
		}

		return 1;

	}

}
