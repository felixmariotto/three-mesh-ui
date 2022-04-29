export const START = "start";
export const CENTER = "center";
export const END = "end";
export const SPACE_AROUND = 'space-around';
export const SPACE_BETWEEN = 'space-between';
export const SPACE_EVENLY = 'space-evenly';

export function justifyContent( boxComponent, direction, startPos, REVERSE){

	const JUSTIFICATION = boxComponent.getJustifyContent();
	if ( AVAILABLE_JUSTIFICATIONS.indexOf( JUSTIFICATION ) === -1 ) {

		console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

	}

	const side = direction.indexOf('row') === 0 ? 'width' : 'height'
	const usedDirectionSpace = boxComponent.getChildrenSideSum( side );

	const INNER_SIZE = side === 'width' ? boxComponent.getInnerWidth() : boxComponent.getInnerHeight();
	const remainingSpace = INNER_SIZE - usedDirectionSpace;

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	// const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * REVERSE );
	const justificationOffset = _getJustificationOffset( JUSTIFICATION, axisOffset );

	// Items margin
	const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );

	// Apply
	const axis = direction.indexOf( 'row' ) === 0 ? "x" : "y"
	boxComponent.childrenBoxes.forEach( ( child , childIndex ) => {

		boxComponent.childrenPos[ child.id ][axis] -= justificationOffset - justificationMargins[childIndex];

	} );
}

const AVAILABLE_JUSTIFICATIONS = [
	START,
	CENTER,
	END,
	SPACE_AROUND,
	SPACE_BETWEEN,
	SPACE_EVENLY
];

/**
 *
 * @param {string} justification
 * @param {number} axisOffset
 * @returns {number}
 */
function _getJustificationOffset( justification, axisOffset ){

	// Only end and center have justification offset
	switch ( justification ){

		case END:
			return axisOffset;

		case CENTER:
			return axisOffset / 2;
	}

	return 0;
}

/**
 *
 * @param items
 * @param spaceToDistribute
 * @param justification
 * @param reverse
 * @returns {any[]}
 */
function _getJustificationMargin( items, spaceToDistribute, justification, reverse ){

	const justificationMargins = Array( items.length ).fill( 0 );

	if ( spaceToDistribute > 0 ) {

		// Only space-*  have justification margin betweem items
		switch ( justification ) {

			case SPACE_BETWEEN:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length - 1 ) * reverse;
					// set this margin for any children

					// except for first child
					justificationMargins[ 0 ] = 0;

					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * i;

					}

				}

				break;

			case SPACE_EVENLY:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length + 1 ) * reverse;

					// set this margin for any children
					for ( let i = 0; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * ( i + 1 );

					}

				}

				break;

			case SPACE_AROUND:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length ) * reverse;

					const start = margin / 2;
					justificationMargins[ 0 ] = start;

					// set this margin for any children
					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = start + margin * i;

					}

				}

				break;

		}

	}

	return justificationMargins;

}
