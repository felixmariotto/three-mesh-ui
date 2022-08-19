import BaseProperty from './BaseProperty';
import { Vector3 } from 'three';
import { numberEquals, numberPrecise } from '../../utils/NumberUtils';

export default class BoundsBox extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new Vector3( 1, 1, 1 );

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
	 * @param element
	 * @param value
	 * @internal
	 */
	setOffsetWidth( element, value ) {

		// console.log( element.name, this._offsetWidth, value )
		if ( numberEquals( this._offsetWidth, value ) ) return;

		this._offsetWidth = value;

		this._innerWidth = _computeInnerWidth( element );
		this._centerX = _computeCenterX( element );

		this._size.x = this._offsetWidth;

		// trigger the whole rendering process
		element._flexDirection._needsProcess = true;

	}

	setStretchedWidth ( element, value ) {


		// console.log( 'set stretched width', element.name, value, this._offsetWidth );
		const margin = element._margin._value;
		value -= margin.w + margin.y;
		//
		// if( element._boxSizing._value === 'content-box' ) {
		//
		// 	const padding = element._padding._value;
		// 	const border = element._borderWidth._value;
		// 	value -= padding.w + padding.y + border.w + border.y;
		//
		// }
		// as this is from children offsetWidth, it means parent innerWidth
		if ( numberEquals( this._offsetWidth, value ) ) return;

		this._offsetWidth = value;

		this._innerWidth = _computeInnerWidth( element );
		this._centerX = _computeCenterX( element );

		this._size.x = this._offsetWidth;

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenWidth =  stretch && element._flexDirection._value.indexOf( 'column' ) === 0;

		// console.log( element.name, stretch, stretchChildrenWidth)
		if( stretch && stretchChildrenWidth ) {

			for ( const box of element._children._boxes ) {

				if ( box._width._auto ) {
					// if ( box._width._auto ) {

					box._bounds.setStretchedWidth( box, element._bounds._innerWidth );

				}

			}

		}

		// trigger the whole rendering process
		element._flexDirection._needsProcess = true;

	}

	setStretchedHeight ( element, value ) {

		// console.log( 'set stretched height', element.name, value, this._offsetHeight );
		const margin = element._margin._value;
		value -= margin.x + margin.z;
		//
		// if( element._boxSizing._value === 'content-box' ) {
		//
		// 	const padding = element._padding._value;
		// 	const border = element._borderWidth._value;
		// 	value -= padding.w + padding.y + border.w + border.y;
		//
		// }
		// as this is from children offsetWidth, it means parent innerWidth
		if ( numberEquals( this._offsetHeight, value ) ) return;

		this._offsetHeight = value;

		this._innerHeight = _computeInnerHeight( element );
		this._centerY = _computeCenterY( element );

		this._size.y = this._offsetHeight;

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenHeight =  stretch && element._flexDirection._value.indexOf( 'row' ) === 0;

		// console.log( element.name, stretch, stretchChildrenHeight)
		if( stretch && stretchChildrenHeight ) {

			for ( const box of element._children._boxes ) {

				if ( box._height._auto ) {
					// if ( box._width._auto ) {

					box._bounds.setStretchedHeight( box, element._bounds._innerWidth );

				}

			}

		}

		// trigger the whole rendering process
		element._flexDirection._needsProcess = true;

	}

	/**
	 *
	 * @param element
	 * @param value
	 * @internal
	 */
	setOffsetHeight( element, value ) {

		if ( numberEquals( this._offsetHeight, value ) ) return;

		this._offsetHeight = value;

		this._innerHeight = _computeInnerHeight( element );
		this._centerY = _computeCenterY( element );

		this._size.y = this._offsetHeight;

		// trigger the whole rendering process
		element._flexDirection._needsProcess = true;

	}

	update( element, out ) {

		const offsetWidth = _computeOffsetWidth( element );
		const widthHasChanged = !numberEquals( offsetWidth, this._offsetWidth );
		this._offsetWidth = offsetWidth;

		const offsetHeight = _computeOffsetHeight( element );
		const heightHasChanged = !numberEquals( offsetHeight, this._offsetHeight );
		this._offsetHeight = offsetHeight;

		if ( widthHasChanged || heightHasChanged ) {


			this._innerWidth = _computeInnerWidth( element );
			this._innerHeight = _computeInnerHeight( element );

			this._centerX = _computeCenterX( element );
			this._centerY = _computeCenterY( element );

			this._needsProcess = true;

		}

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

		//console.log( 'process bounds box', element.name );

		// update primitives or unbinded values


		// update binded values
		this._size.set( this._offsetWidth, this._offsetHeight, this._size.z );

		// require cascading processes
		element._flexDirection._needsProcess = true;

		element._borderRadius._needsProcess = true;
		element._borderWidth._needsProcess = true;

		element._layouter._needsProcess = true;

		// also change parent when require
		if ( element._parent._value ) element._parent._value._autoSize._needsProcess = true;


	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideWidth( element ) {

		return _computeChildrenSideWidth( element );

	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideHeight( element ) {

		return _computeChildrenSideHeight( element );

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

	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	let base = 0;
	if ( element._width._auto ) {

		// console.log( '        -> auto zero' );
		//console.log( '    from auto width compute' );
		base = 0;
		// base = 0;

	} else {

		// console.log( '        -> width' );
		//console.log( '    from value' );
		base = element._width._value;

	}

	// const base = _computeStretchedWidth( element ) || element._width._value || _computeAutoWidth( element );
	// let base = element._width._value || _computeAutoWidth( element );

	if ( element._boxSizing._value === 'content-box' ) {

		base += padding.y + padding.w + borderWidth.y + borderWidth.w;

	}

	return numberPrecise( base );

}

/**
 * Obtain the outer height according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeOffsetHeight( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	let base = 0;
	if ( element._height._auto ) {

		//console.log( '    from auto height compute' );
		// base = _computeAutoHeight( element );
		base = 0;

	} else {

		//console.log( '    from value' );
		base = element._height._value;

	}

	if ( element._boxSizing._value === 'content-box' ) {

		base += padding.x + padding.z + borderWidth.x + borderWidth.z;

	}

	return numberPrecise( base );

}

/**
 * Obtain the inner width according to box-sizing
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeInnerWidth( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const base = element._bounds._offsetWidth;

	if ( element._boxSizing._value === 'content-box' ) {

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


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	// const base = element._height._value || _computeAutoHeight( element );
	const base = element._bounds._offsetHeight;

	if ( element._boxSizing._value === 'content-box' ) {

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

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return _computeHighestChildHeight( element );


		case 'column' :
		case 'column-reverse' :
			return _computeChildrenSideHeight( element );

	}

}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 *
 */
function _computeAutoWidth( element ) {

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return _computeChildrenSideWidth( element );


		case 'column' :
		case 'column-reverse' :
			return _computeHighestChildWidth( element );

	}

}


/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideWidth( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		// if ( child._bounds._needsProcess ) child._bounds.process( child );

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


		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const CHILD_SIZE = child._bounds._offsetHeight + margin.x + margin.z;

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildWidth( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const maxSize = child._bounds._offsetWidth + margin.y + margin.w;

		return Math.max( accu, maxSize );

	}, 0 );

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildHeight( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const maxSize = child._bounds._offsetHeight + margin.x + margin.z;

		return Math.max( accu, maxSize );

	}, 0 );

}
