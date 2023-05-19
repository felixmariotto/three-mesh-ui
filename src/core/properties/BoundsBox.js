import BaseProperty from './BaseProperty';
import { Vector3 } from 'three';
import { numberEquals } from '../../utils/NumberUtils';

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
	 * Set the value of the width 100%
	 * @param element
	 * @param value
	 */
	setReferenceWidth( element, value ) {

		const width = element._width;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = width._auto ? 1 : width._value;
		// const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		if ( numberEquals( newOffsetWidth, this._offsetWidth ) ) return;

		this._offsetWidth = newOffsetWidth;
		this._innerWidth = this._offsetWidth - ( padding.y + padding.w + borderWidth.y + borderWidth.w );

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );

		this._triggerCascadingDependencies( element );

	}

	/**
	 * Set the value of the height 100%
	 * @param element
	 * @param value
	 */
	setReferenceHeight( element, value ) {

		const height = element._height;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = height._auto ? 1 : height._value;

		const newOffsetHeight = (value * factor) - ( margin.x + margin.z );
		if ( numberEquals( newOffsetHeight, this._offsetHeight ) ) return;

		this._offsetHeight = newOffsetHeight;
		this._innerHeight = this._offsetHeight - ( padding.x + padding.z + borderWidth.x + borderWidth.z );
		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );

		this._triggerCascadingDependencies( element );

	}

	setChildrenWidth( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerWidth = value;
		this._offsetWidth = this._innerWidth + ( padding.y + padding.w + border.y + border.w )

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );
		this._triggerCascadingDependencies( element );


	}

	setChildrenHeight( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerHeight = value;
		this._offsetHeight = this._innerHeight + ( padding.x + padding.z + border.x + border.z )

		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );
		this._triggerCascadingDependencies( element );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		// only compute new width if explicitely defined
		const width = element._width;
		if( !width._auto && !width._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerWidth = width._value;
				this._offsetWidth = this._innerWidth + padding.y + padding.w + border.y + border.w;

			} else {

				this._offsetWidth = width._value;
				this._innerWidth = this._offsetWidth - ( padding.y + padding.w + border.y + border.w );

			}

			this._centerX = _computeCenterX( element );
			this._needsProcess = true;

			// tells children width has changed
			this._propagateWidth( element );
			this._triggerCascadingDependencies( element );

		}

		const height = element._height;
		if( !height._auto && !height._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerHeight = height._value;
				this._offsetHeight = this._innerHeight + padding.x + padding.z + border.x + border.z;

			} else {

				this._offsetHeight = height._value;
				this._innerHeight = this._offsetHeight - ( padding.x + padding.z + border.x + border.z );

			}

			this._centerY = _computeCenterY( element );
			this._needsProcess = true;

			// tells children height has changed
			this._propagateHeight( element );
			this._triggerCascadingDependencies( element );

		}

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

		if( element._backgroundMesh ){
			element._backgroundMesh.updateScale();
		}

		element._renderer._needsRender = true;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._triggerCascadingDependencies( element )

		//console.log( 'process bounds box', element.name );

		// update primitives or unbinded values

		// require cascading processes

		element._overflow._needsRender = true;


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

	_propagateWidth( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const width = box._width;

			if( width._relative ) box._bounds.setReferenceWidth( box, this._innerWidth );

		}

	}

	_propagateHeight( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const height = box._height;

			if( height._relative ) box._bounds.setReferenceHeight( box, this._innerHeight );

		}

	}

	_triggerCascadingDependencies( element ) {

		// also change parent when require
		if ( element._parent._value ) {
			element._parent._value._autoSize._needsProcess = true;
		}

		element._flexDirection._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

		element._overflow._needsRender = true;

	}

}




/***********************************************************************************************************************
 * INTERNAL FUNCTIONS
 **********************************************************************************************************************/

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

