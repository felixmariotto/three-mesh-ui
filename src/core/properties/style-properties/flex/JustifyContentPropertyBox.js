import JustifyContentProperty from './JustifyContentProperty';

export default class JustifyContentPropertyBox extends JustifyContentProperty {

	constructor( defaultValue ) {

		super( 'justifyContent', defaultValue, true );

		// configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(axisOffset:number) => number}
		 * @private
		 */
		this._computeOffset = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement, availableSpace:number, reverse:number) => Array.<number> }
		 * @private
		 */
		this._computeMargin = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement) => void}
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}


	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		//console.log( element._flexDirection._value );
		switch ( element._flexDirection._value ) {

			case 'column-reverse':
			case 'column':
				this._process = _column.bind( this );
				break;


			case 'row-reverse':
			case 'row':
				this._process = _row.bind( this );
				break;

		}

		switch ( this._value ) {
			case 'end':
				this._computeOffset = _justificationOffsetEnd;
				this._computeMargin = _justificationMargin;
				break;

			case 'center':
				this._computeOffset = _justificationOffsetCenter;
				this._computeMargin = _justificationMargin;
				break;

			case 'start':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin;
				break;

			case 'space-between':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceBetween;
				break;

			case 'space-around':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceAround;
				break;

			case 'space-evenly':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceEvenly;
				break;
		}

		// @TODO : 	If flexDirection was keeping its children position,
		//  				it won't be necessary to compute the same result again
		//					but it will increase the memory footprint
		element._flexDirection._needsProcess = true;

	}

	process( element ) {

		this._process( element );

		element._alignItems._needsProcess = true; // not mandatory : Layout could sum each

	}

}

function _row( element ) {

	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _rowRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	// const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );


	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].x -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

function _column( element ) {


	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _columnRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );

	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].y -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

/**
 *
 * @param {MeshUIBaseElement} element
 * @return {{usedDirectionSpace: *, remainingSpace: number}}
 * @private
 */
function _rowRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideWidth( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerWidth - usedDirectionSpace };

}

function _columnRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideHeight( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerHeight - usedDirectionSpace };

}


/* eslint-disable no-unused-vars */ function _justificationOffset( axisOffset ) { /* eslint-enable no-unused-vars */

	return 0;

}

function _justificationOffsetEnd( axisOffset ) {

	return axisOffset;

}

function _justificationOffsetCenter( axisOffset ) {

	return axisOffset / 2;

}

/* eslint-disable no-unused-vars */
function _justificationMargin( element, availableSpace = 0, reverse = 1 ) { /* eslint-enable no-unused-vars */

	return Array( element._children._boxes.length ).fill( 0 );

}

function _justificationMarginSpaceBetween( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		// only one children would act as start
		if ( length > 1 ) {

			const margin = availableSpace / ( length - 1 ) * reverse;
			// set this margin for any children

			// except for first child
			justificationMargins[ 0 ] = 0;

			for ( let i = 1; i < length; i++ ) {

				justificationMargins[ i ] = margin * i;

			}

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceEvenly( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		const margin = availableSpace / ( length + 1 ) * reverse;

		// set this margin for any children
		for ( let i = 0; i < length; i++ ) {

			justificationMargins[ i ] = margin * ( i + 1 );

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceAround( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {


		const margin = availableSpace / ( length ) * reverse;

		const start = margin / 2;
		justificationMargins[ 0 ] = start;

		// set this margin for any children
		for ( let i = 1; i < length; i++ ) {

			justificationMargins[ i ] = start + margin * i;

		}


	}

	return justificationMargins;

}
