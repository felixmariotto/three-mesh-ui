export const ROW = "row";
export const ROW_REVERSE = "row-reverse";
export const COLUMN = "column";
export const COLUMN_REVERSE = "column-reverse";

export function contentDirection( container, DIRECTION, startPos, REVERSE ){

	// end to end children
	let accu = startPos;

	let childGetSize = "getOffsetWidth";
	let axisPrimary = "x";
	let axisSecondary = "y";

	// left right
	let margins = ['w','y'];

	if( DIRECTION.indexOf( COLUMN ) === 0 ){

		childGetSize = "getOffsetHeight";

		axisPrimary = "y";
		axisSecondary = "x";

		// top bttom
		margins = ['x', 'z'];

	}

	if ( DIRECTION.indexOf('-reverse') !== -1 ) {

		margins.reverse();

	}

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < container.childrenBoxes.length; i++ ) {

		const child = container.childrenBoxes[ i ];

		const CHILD_ID = child.id;
		const CHILD_SIZE = child[childGetSize]();

		accu += child._margin[margins[0]] * REVERSE;

		container.childrenPos[ CHILD_ID ] = {
			[axisPrimary]: accu + ( ( CHILD_SIZE / 2 ) * REVERSE ),
			[axisSecondary]: 0
		};

		// update accu for next children
		accu += ( REVERSE * ( CHILD_SIZE + child._margin[margins[1]] ) );

	}

}


