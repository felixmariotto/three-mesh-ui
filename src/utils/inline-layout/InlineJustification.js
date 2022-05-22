
export function justifyInlines( boxComponent, lines, JUSTIFICATION, INNER_HEIGHT ){

	const textHeight = Math.abs( lines.height );


	// Line vertical positioning

	let justificationOffset = ( () => {
		switch ( JUSTIFICATION ) {

			case 'start':
				// return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight - boxComponent._padding.x ;
				// return boxComponent._padding.x - lines[0].lineHeight ;
				// return (INNER_HEIGHT * .5) + boxComponent._padding.x - (lines[0].lineHeight * .5);
				return (INNER_HEIGHT * .5) - lines[0].lineHeight;

			case 'end':
				return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 );

			case 'space-around':
			case 'space-between':
			case 'space-evenly':
			case 'center':
				return ( textHeight / 2 ) - lines[ 0 ].lineHeight ;

			default:
				console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

		}
	} )();

	// Apply padding
	justificationOffset += - (boxComponent._padding.x / 2) + (boxComponent._padding.z/2)

	//

	lines.forEach( ( line ) => {

		line.y += justificationOffset;
		line.forEach( ( inline ) => {

			inline.offsetY += justificationOffset;

		} );

	} );

}
