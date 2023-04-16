import BaseProperty from './BaseProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../core/elements/MeshUIBaseElement';
import Line from './../../core/elements/glyphs/Line';
import { Vector3 } from 'three';
/* eslint-enable no-unused-vars */

export default class BoxLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false);

		// configure
		this._needsUpdate = true;

		/**
		 * @typedef ChildrenPos
		 * @type {Object & Object.<string,Vector3>}
		 */

		/**
		 *
		 * @type {ChildrenPos}
		 * @internal
		 */
		this._childrenPos = {};

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Updated when :
	 * 	- New child added
	 * 	- Child removed
	 * 	- Child position changed
	 * 	- Child visibility changed
	 * 	- ...?
	 * 	@override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		//console.log( "BoxLayouter update", element.name );
		// reset
		this._childrenPos = {};

		for ( const uiBoxElement of element._children._boxes ) {

			//console.log( uiBoxElement._position._value )
			if( uiBoxElement._position._value === 'static' ) {

				// bind position
				this._childrenPos[ uiBoxElement.id ] = uiBoxElement.position;

			}

		}

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ process( element ) { 	/* eslint-enable no-unused-vars */

		// As _childrenPos are bounds with child.position, this is not required anymore
		//
		// element._position._needsProcess = true;
		//
		// for ( const box of element._children._boxes ) {
		//
		// 	if( this._childrenPos[box.id] ) {
		//
		// 		box.position.x = this._childrenPos[box.id].x;
		// 		box.position.y = this._childrenPos[box.id].y;
		//
		// 	}
		//
		// }

	}

}
