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

		this._offsetWidth = 0;
		this._offsetHeight = 0;

		this._innerWidth = 0;
		this._innerHeight = 0;
	}




	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		this.output( out );

		this._needsProcess = true;

	}

	process( element ) {

		this._offsetWidth = this._innerWidth = element._inlines._value[0].width;
		this._offsetHeight = this._innerHeight = element._inlines._value[0].height;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}

}

