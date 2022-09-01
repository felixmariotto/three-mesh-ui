import BaseProperty from '../BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import { Object3D } from 'three';
/* eslint-enable no-unused-vars */

export default class ParentProperty extends BaseProperty {

	constructor() {

		super('parent', null, false);

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update when :
	 * 		- element has been added
	 * 		- element has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) {
		/* eslint-enable no-unused-vars */

		if ( element.parent && element.parent.isUI ) {

			this._value = element.parent;
			// this.position.z = this.getOffset();

		} else {

			this._value = null;

		}

		// @TODO : parentElement
		// // set elements as root
		// if ( element.isBlock && !this._value ) {
		//
		// 	ThreeMeshUI.addRoot( element );
		// 	element.pseudoClassList.add('root');
		//
		// } else {
		//
		// 	ThreeMeshUI.removeRoot( element );
		// 	element.pseudoClassList.remove('root');
		//
		// }


	}

	set value( value ) {

		console.warn('ParentProperty is readonly');

	}

	/**
	 *
	 * @return {MeshUIBaseElement}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @param {(p:Object3D)=>boolean } conditionCallback
	 */
	find( conditionCallback ) {

		if( this._value ) {

			if( conditionCallback( this._value) ) {

				return this._value;

			}

			return this._value._parent.find( conditionCallback );

		}

		return null;

	}


	/**
	 *
	 */
	dispose() {

		this._value = null;

	}


}
