
export function justifyInlines( lines, JUSTIFICATION, INNER_HEIGHT ){

	const textHeight = Math.abs( lines.height );


	// Line vertical positioning

	const justificationOffset = ( () => {
		switch ( JUSTIFICATION ) {

			case 'start':
				return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight;

			case 'end':
				return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 ) + ( lines[ lines.length - 1 ].lineHeight - lines[ lines.length - 1 ].lineHeight );

			case 'space-around':
			case 'space-between':
			case 'space-evenly':
			case 'center':
				return ( textHeight / 2 ) - lines[ 0 ].lineHeight;

			default:
				console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

		}
	} )();


	//

	lines.forEach( ( line ) => {

		line.y += justificationOffset;
		line.forEach( ( inline ) => {

			inline.offsetY += justificationOffset;

		} );

	} );

}
