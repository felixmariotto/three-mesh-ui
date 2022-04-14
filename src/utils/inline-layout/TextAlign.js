export const LEFT = 'left';
export const RIGHT = 'right';
export const CENTER = 'center';
export const JUSTIFY = 'justify';
export const JUSTIFY_LEFT = 'justify-left';
export const JUSTIFY_RIGHT = 'justify-right';
export const JUSTIFY_CENTER = 'justify-center';

export function textAlign( lines, ALIGNMENT, INNER_WIDTH ) {

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( line, ALIGNMENT, INNER_WIDTH, i === lines.length - 1 );

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX;

		}

	}

	// last operations for justifications alignments
	if ( ALIGNMENT.indexOf( JUSTIFY ) === 0 ) {

		for ( let i = 0; i < lines.length; i++ ) {

			const line = lines[ i ];


			// do not process last line for justify-left or justify-right
			if ( ALIGNMENT.indexOf( '-' ) !== -1 && i === lines.length - 1 ) return;

			// can only justify is space is remaining
			const REMAINING_SPACE = INNER_WIDTH - line.width;
			if ( REMAINING_SPACE <= 0 ) return;

			// count the valid spaces to extend
			// Do not take the first nor the last space into account
			let validSpaces = 0;
			for ( let j = 1; j < line.length - 1; j++ ) {

				validSpaces += line[ j ].glyph === ' ' ? 1 : 0;

			}
			const additionalSpace = REMAINING_SPACE / validSpaces;


			// for right justification, process the loop in reverse
			let inverter = 1;
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {

				line.reverse();
				inverter = -1;

			}

			let incrementalOffsetX = 0;

			// start at ONE to avoid first space
			for ( let j = 1; j <= line.length - 1; j++ ) {

				// apply offset on each char
				const char = line[ j ];
				char.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += char.glyph === ' ' ? additionalSpace : 0;

			}

			// for right justification, the loop was processed in reverse
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {
				line.reverse();
			}


		}

	}

}


const _computeLineOffset = ( line, ALIGNMENT, INNER_WIDTH, lastLine ) => {

	switch ( ALIGNMENT ) {

		case JUSTIFY_LEFT:
		case JUSTIFY:
		case LEFT:
			return -INNER_WIDTH / 2;

		case JUSTIFY_RIGHT:
		case RIGHT:
			return -line.width + ( INNER_WIDTH / 2 );


		case CENTER:
			return -line.width / 2;

		case JUSTIFY_CENTER:
			if ( lastLine ) {

				// center alignement
				return -line.width / 2;

			}

				// left alignment
				return -INNER_WIDTH / 2;

		default:
			console.warn( `textAlign: '${ALIGNMENT}' is not valid` );

	}

};
