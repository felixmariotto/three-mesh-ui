import BaseProperty from './BaseProperty';

export default class InlineJustificator extends BaseProperty {

	constructor() {
		super( 'inlineJustificator' );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	update( vrElement, out ) {

	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @return {Lines}
	 */
	process( vrElement ) {


		const INNER_HEIGHT = vrElement.innerHeight;
		const lines = vrElement.lines;
		const textHeight = Math.abs( lines.height );


		// Line vertical positioning
		let justificationOffset = ( () => {

			switch ( vrElement.style._justifyContent.output ) {

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

			}
		} )();

		// Apply padding
		const padding = vrElement.style._padding;
		const border = vrElement.style._borderWidth;

		justificationOffset += ( - padding.x + padding.z ) / 2 + ( - border.x + border.z ) / 2;

		//

		lines.forEach( ( line ) => {

			line.y += justificationOffset;

			line.forEach( ( inline ) => {

				inline.offsetY += justificationOffset;

			} );

		} );

	}

}
