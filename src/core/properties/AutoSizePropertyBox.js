import BaseProperty from './BaseProperty';

/**
 * Autosize are only trigger when natural size changed
 */
export default class AutoSizePropertyBox extends BaseProperty {

	constructor() {

		super( 'autosize' );

		this._needsProcess = true;
	}

	process( element ) {

		// if( parent ) return;


		// has auto size get the height from children
		if ( element._width._auto ) _processAutoWidth( element );
		if ( element._height._auto ) _processAutoHeight( element );

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenWidth = stretch && element._flexDirection._value.indexOf( 'column' ) !== -1;
		const stretchChildrenHeight = stretch && !stretchChildrenWidth;

		for ( const box of element._children._boxes ) {

			if ( ( box._width._auto && stretchChildrenWidth ) || box._width._relative ) {

				box._bounds.setReferenceWidth( box, element._bounds._innerWidth );

			}

			if ( ( box._height._auto && stretchChildrenHeight ) || box._height._relative ) {

				box._bounds.setReferenceHeight( box, element._bounds._innerHeight );

			}

		}

		// // justify stretch - Not that easy
		// const stretchD = element._justifyContent._value === 'stretch';
		// const stretchChildrenWidthD = stretchD && element._flexDirection._value.indexOf( 'row' ) !== -1;
		// const stretchChildrenHeightD = stretchD && !stretchChildrenWidthD;
		//
		//
		// if ( stretchChildrenWidthD ) {
		//
		// 	const used = _computeChildrenSideWidth( element );
		// 	const available = element._bounds._innerWidth - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._width._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const width = child._bounds._offsetWidth + distributed;
		// 			child._bounds.setReferenceWidth( child, width );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// } else if ( stretchChildrenHeightD ) {
		//
		// 	const used = _computeChildrenSideHeight( element );
		// 	const available = element._bounds._innerHeight - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._height._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const height = child._bounds._offsetHeight + distributed;
		// 			child._bounds.setReferenceHeight( child, height );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// }


	}

}

function _processAutoWidth( element ) {

	// column : retrieve the biggest child width
	// row : retrieve the sum of children width
	element._bounds.setChildrenWidth( element, _computeAutoWidth( element ) );

}

function _processAutoHeight( element ) {

	// column : retrieve the sum of children height
	// row : retrieve the biggest child height
	element._bounds.setChildrenHeight( element, _computeAutoHeight( element ) );

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

	let sumWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		sumWidth += width;

	}

	return sumWidth;

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideHeight( element ) {

	let sumHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		sumHeight += height;

	}

	return sumHeight;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildWidth( element ) {

	let maxWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		if ( width > maxWidth ) maxWidth = width;

	}

	return maxWidth;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildHeight( element ) {

	let maxHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		if ( height > maxHeight ) maxHeight = height;

	}

	return maxHeight;

}
