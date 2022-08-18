import BaseProperty from './BaseProperty';
import { Vector2 } from 'three';

export default class BoundsText extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector2}
		 * @internal
		 */
		this._size = new Vector2( 1, 1 );

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerX = 0.5;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerY = 0.5;


		this._needsProcess = true;

	}


	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	process( element ) {

		// update primitives or unbinded values
		this._offsetWidth = _computeOffsetWidth( element );
		this._offsetHeight = _computeOffsetHeight( element );

		this._innerWidth = _computeInnerWidth( element );
		this._innerHeight = _computeInnerHeight( element );

		this._centerX = _computeCenterX( element );
		this._centerY = _computeCenterY( element );

		// update binded values
		this._size.set( this._offsetWidth, this._offsetHeight );

		element._borderRadius._needsProcess = true;
		element._borderWidth._needsProcess = true;

		element._layouter._needsProcess = true;

	}

}


/***********************************************************************************************************************
 * INTERNAL FUNCTIONS
 **********************************************************************************************************************/

/**
 * Obtain the outer width according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeOffsetWidth( element ) {

	const base = _computeStretchedWidth( element ) || element._width._value || _computeAutoWidth( element );
	if ( element._boxSizing._value === 'border-box' ) {

		return base;

	}

	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	return base + padding.y + padding.w + borderWidth.y + borderWidth.w;

}

/**
 * Obtain the outer height according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeOffsetHeight( element ) {

	const base = _computeStretchedHeight( element ) || element._height._value || _computeAutoHeight( element );

	if ( element._boxSizing._value === 'border-box' ) {

		return base;

	}

	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	return base + padding.x + padding.z + borderWidth.x + borderWidth.z;

}

/**
 * Obtain the inner width according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeInnerWidth( element ) {

	const base = element._bounds._offsetWidth;

	if ( element._boxSizing.output === 'border-box' ) {

		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;

		return base - ( padding.y + padding.w + borderWidth.y + borderWidth.w );

	}

	return base;

}

/**
 * Obtain the inner height according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeInnerHeight( element ) {

	const base = element._bounds._offsetHeight;

	if ( element._boxSizing._value === 'border-box' ) {

		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;

		return base - ( padding.x + padding.z + borderWidth.x + borderWidth.z );

	}

	return base;

}

/**
 * Retrieve the center X according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterX( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const leftSide = padding.w + borderWidth.w;
	const rightSide = padding.y + borderWidth.y;

	return ( leftSide - rightSide ) / 2;
}

/**
 * Retrieve the center Y according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterY( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const topSide = padding.x + borderWidth.x;
	const bottomSide = padding.z + borderWidth.z;

	return ( bottomSide - topSide ) / 2;
}


/**
 * Retrieve the automatic height from children boxes
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeAutoHeight( element ) {

	if( element._layouter._value && element._layouter._value.length > 0 ) {

		//console.log( "ATUTO HEIGHT TEXT : ", element._layouter._value );
		return element._layouter._value.height;

	}
	// @TODO : Bounds properties from lines of inlines if whitespace not normal
	return 0.1;

}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 *
 */
function _computeAutoWidth( element ) {

	if( element._layouter._value && element._layouter._value.length > 0 ) {

		return element._layouter._value.width;

	}

	// @TODO : Bounds properties from lines of inlines if whitespace not normal
	return 0.1;

}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeStretchedHeight( element ) {

	const parent = element._parent._value;
	if ( parent && parent._alignItems._value === 'stretch' && parent._flexDirection._value.indexOf( 'row' ) !== -1 ) {

		return parent._bounds._innerHeight;

	}

	return 0;
}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeStretchedWidth( element ) {

	const parent = element._parent._value;
	if ( parent && parent._alignItems._value === 'stretch' && parent._flexDirection._value.indexOf( 'column' ) !== -1 ) {

		return parent._bounds._innerWidth;

	}

	return 0;
}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideWidth( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		if( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;
		const CHILD_SIZE = child._bounds._offsetWidth + margin.y + margin.w;

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideHeight( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {


		if( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const CHILD_SIZE = child._bounds._offsetHeight + margin.x + margin.z;

		return accu + CHILD_SIZE;

	}, 0 );

}
