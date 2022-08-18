import BaseProperty from './BaseProperty';

/**
 * Autosize are only trigger when natural size changed
 */
export default class BoxAutoSize extends BaseProperty {

	constructor() {

		super( 'autosize' );

	}

	process( element ) {


		//console.log( element.name, 'AutoSizeBox' );
		const parent = element._parent._value;

		// if( parent ) return;


		// has auto size
		if ( element._width._auto ) _processAutoWidth( element );


		// //console.log( element._display._value );
		// if( element._display._value === 'flex' && element._flexDirection._value.indexOf('column') === 0 ) {
		//
		// 	//console.log( 'stretch children width')
		// 	for ( const box of element._children._boxes ) {
		//
		// 		//console.log( '   ',box._position._value );
		// 		if( box._position._value === 'static' ) {
		// 			//console.log( '   ',box._width._auto );
		// 			if( box._width._auto ) {
		//
		// 				box._actualWidth.setElementValue( box, element._bounds._innerWidth );
		//
		// 			}
		// 		}
		// 	}
		//
		// }

		if ( element._height._auto ) _processAutoHeight( element );

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenWidth =  stretch && element._flexDirection._value.indexOf( 'column' ) !== -1;
		const stretchChildrenHeight = stretch && !stretchChildrenWidth;

		for ( const box of element._children._boxes ) {

			// if ( box._width._auto && stretchChildrenWidth ) {
			if ( box._width._auto ) {

				// box._actualWidth.setParentValue( box, element._bounds._innerWidth );

			}

			// if ( box._height._auto && stretchChildrenHeight ) {
			if ( box._height._auto ) {

				// box._actualHeight.setParentValue( box, element._bounds._innerHeight );

			}

		}

	}

}

function _processAutoWidth( element ) {

	// column : retrieve the biggest child width
	// row : retrieve the sum of children width
	let sizeFromChild = _computeAutoWidth( element );

	// as this is from children offsetWidth, it means parent innerWidth
	const padding = element._padding._value;
	const border = element._borderWidth._value;

	// and autoSize is always content-box
	sizeFromChild += padding.w + padding.y + border.w + border.y;

	element._bounds.setOffsetWidth( element, sizeFromChild );

}

function _processAutoHeight( element ) {

	// column : retrieve the sum of children height
	// row : retrieve the biggest child height
	let sizeFromChild = _computeAutoHeight( element );

	// as this is from children offsetHeight, it means parent innerWidth
	const padding = element._padding._value;
	const border = element._borderWidth._value;

	// and autoSize is always content-box
	sizeFromChild += padding.x + padding.z + border.x + border.z;

	element._bounds.setOffsetHeight( element, sizeFromChild );

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
