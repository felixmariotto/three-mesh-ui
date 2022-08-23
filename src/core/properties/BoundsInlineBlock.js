import BaseProperty from './BaseProperty';
import { Vector3 } from 'three';

export default class BoundsInlineBlock extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new Vector3( 1, 1, 1 );

	}




	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		this.output( out );

		this._needsRender = true;

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = element._inlines._value[0].width;
		this._size.y = element._inlines._value[0].height;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}

}

