export const ROW = "row";
export const ROW_REVERSE = "row-reverse";
export const COLUMN = "column";
export const COLUMN_REVERSE = "column-reverse";

export function contentDirection( container, DIRECTION, startPos, REVERSE ){

	// end to end children
	let accu = startPos;

	let childGetSize = "getWidth";
	let axisPrimary = "x";
	let axisSecondary = "y";

	if( DIRECTION.indexOf( COLUMN ) === 0 ){

		childGetSize = "getHeight";
		axisPrimary = "y";
		axisSecondary = "x";

	}

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < container.childrenBoxes.length; i++ ) {

		const child = container.childrenBoxes[ i ];

		const CHILD_ID = child.id;
		const CHILD_SIZE = child[childGetSize]();
		const CHILD_MARGIN = child.margin || 0;

		accu += CHILD_MARGIN * REVERSE;

		container.childrenPos[ CHILD_ID ] = {
			[axisPrimary]: accu + ( ( CHILD_SIZE / 2 ) * REVERSE ),
			[axisSecondary]: 0
		};

		// update accu for next children
		accu += ( REVERSE * ( CHILD_SIZE + CHILD_MARGIN ) );

	}

}
