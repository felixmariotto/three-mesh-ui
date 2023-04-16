import BaseProperty from './BaseProperty';

export default class InlineLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @private
		 */
		this._value = null;

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		// find the first text parent;
		this._value = element._parent.find( (p) => { return p.isUI && p.isText } );

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ) { 	/* eslint-enable no-unused-vars */


		// layout has been changed
		if( this._value ) {

			this._value._layouter._needsProcess = true;

		}

	}

}
