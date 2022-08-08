import BaseProperty from './BaseProperty';

export default class BoundsProperty extends BaseProperty {

	constructor() {

		super('bounds');

		this._needsProcess = true;
	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 */
	process( vrElement ) {

		this._offsetWidth = _computeOffsetWidth( vrElement );
		this._offsetHeight = _computeOffsetHeight( vrElement );

		this._innerWidth = _computeInnerWidth( vrElement );
		this._innerHeight = _computeInnerHeight( vrElement );

		this._centerX = _computeCenterX( vrElement );
		this._centerY = _computeCenterY( vrElement );


		vrElement._background._needsProcess = true;

		vrElement._styles._borderRadius._needsProcess = true;
		vrElement._styles._needsProcess = true;

	}

}


/***********************************************************************************************************************
 * INTERNAL FUNCTIONS
 **********************************************************************************************************************/

/**
 * Obtain the outer width according to box-sizing
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeOffsetWidth( vrElement ) {

	const elementStyle = vrElement.style;

	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const base = _computeStretchedWidth( vrElement) || elementStyle._width._output || _computeAutoWidth(vrElement);
	if ( elementStyle._boxSizing._output === 'border-box' ) {

		return base;

	}

	return base + padding.y + padding.w + borderWidth.y + borderWidth.w;

}

/**
 * Obtain the outer height according to box-sizing
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeOffsetHeight( vrElement ) {

	const elementStyle = vrElement.style;
	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const base = _computeStretchedHeight(vrElement) || elementStyle._height._output || _computeAutoHeight(vrElement);

	if ( elementStyle._boxSizing._output === 'border-box' ) {

		return base;

	}

	return base + padding.x + padding.z + borderWidth.x + borderWidth.z;

}

/**
 * Obtain the inner width according to box-sizing
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeInnerWidth( vrElement ) {

	const elementStyle = vrElement.style;

	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const base = elementStyle._width._output || _computeAutoWidth(vrElement);

	if ( elementStyle._boxSizing.output === 'border-box' ) {

		return base - ( padding.y + padding.w + borderWidth.y + borderWidth.w );

	}

	return base;

}

/**
 * Obtain the inner height according to box-sizing
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeInnerHeight( vrElement ) {

	const elementStyle = vrElement.style;

	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const base = elementStyle._height._output || _computeAutoHeight( vrElement );

	if ( elementStyle._boxSizing._output === 'border-box' ) {

		return base - (padding.x + padding.z + borderWidth.x + borderWidth.z );

	}

	return base;

}

/**
 * Retrieve the center X according to box sized dimensions
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeCenterX( vrElement ) {

	const elementStyle = vrElement.style;

	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const leftSide = padding.w + borderWidth.w;
	const rightSide = padding.y + borderWidth.y;

	return (leftSide - rightSide ) / 2;
}

/**
 * Retrieve the center Y according to box sized dimensions
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeCenterY( vrElement ) {

	const elementStyle = vrElement.style;

	const padding = elementStyle._padding._output;
	const borderWidth = elementStyle._borderWidth._output;

	const topSide = padding.x + borderWidth.x;
	const bottomSide = padding.z + borderWidth.z;

	return ( bottomSide - topSide ) / 2;
}


/**
 * Retrieve the automatic height from children boxes
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeAutoHeight( vrElement ) {

	switch ( vrElement.style._flexDirection.output ) {

		case 'row' :
		case 'row-reverse' :
			return _computeHighestChildHeight( vrElement );


		case 'column' :
		case 'column-reverse' :
			return _computeChildrenSideHeight( vrElement );

	}

}

/**
 * @param {ElementVR} vrElement
 * @return {number}
 *
 */
function _computeAutoWidth( vrElement ) {

	switch ( vrElement.style._flexDirection.output ) {

		case 'row' :
		case 'row-reverse' :
			return _computeChildrenSideWidth( vrElement );


		case 'column' :
		case 'column-reverse' :
			return _computeHighestChildWidth( vrElement );

	}

}

/**
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeStretchedHeight( vrElement ){

	if( vrElement._parent.value && vrElement._parent.value.style._alignItems._output === 'stretch' && vrElement._parent.value.style._flexDirection._output.indexOf('row') !== -1 ) {

		return vrElement._parent.value.innerHeight;

	}

	return 0;
}

/**
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeStretchedWidth( vrElement ){

	if( vrElement._parent.value && vrElement._parent.value.style._alignItems.output === 'stretch' && vrElement._parent.value.style._flexDirection._output.indexOf('column') !== -1 ) {

		return vrElement._parent.value.innerWidth;

	}

	return 0;
}

/**
 * Return the sum of all this component's children width
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeChildrenSideWidth( vrElement ) {

	return vrElement._children.childrenBoxes.reduce( ( accu, child ) => {

		const margin = child.style._margin._output;
		const CHILD_SIZE = ( _computeOffsetWidth( child ) + margin.y + margin.w  )

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Return the sum of all this component's children width
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeChildrenSideHeight( vrElement ) {

	return vrElement._children.childrenBoxes.reduce( ( accu, child ) => {

		const margin = child.style._margin._output;

		const CHILD_SIZE = ( _computeOffsetHeight( child ) + margin.x + margin.z  )

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeHighestChildWidth( vrElement ) {

	return vrElement._children.childrenBoxes.reduce( ( accu, child ) => {

		const margin = child.style._margin._output;

		const maxSize = _computeOffsetWidth( child ) + margin.y + margin.w;

		return Math.max( accu, maxSize );

	}, 0 );

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {ElementVR} vrElement
 * @return {number}
 */
function _computeHighestChildHeight( vrElement ) {

	return vrElement._children.childrenBoxes.reduce( ( accu, child ) => {

		const margin = child.style._margin._output;

		const maxSize = _computeOffsetHeight( child ) + margin.x + margin.z;

		return Math.max( accu, maxSize );

	}, 0 );

}
