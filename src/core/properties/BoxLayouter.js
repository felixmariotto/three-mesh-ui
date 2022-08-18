import BaseProperty from './BaseProperty';

export default class BoxLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false);

		// configure
		this._needsUpdate = true;

		/**
		 *
		 * @type {Object.<string,any>}
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
	 * @param element
	 * @param out
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

		//console.log( "   ",this._childrenPos );

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 * @return {Lines}
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
