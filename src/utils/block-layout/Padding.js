/**
 * @TODO: This could be integrated in AlignItems
 * @param {BoxComponent} boxComponent
 * @param {string} DIRECTION
 * @param {string} ALIGNMENT
 */
export const padItems = function( boxComponent, DIRECTION, ALIGNMENT ){

	let snapXon = 'center';
	let snapYon = 'center';

	const padding = boxComponent._padding;
	const border = boxComponent._borderWidth;

	if( DIRECTION.indexOf('column') !== -1 ) {

		if( ALIGNMENT === 'start' ) {
			snapXon = 'left';
		}else if( ALIGNMENT === 'end' ){
			snapXon ='right';
		}

	} else {

		/* eslint-disable no-lonely-if */
		if( ALIGNMENT === 'start' ) {
			snapYon = 'top';
		}else if( ALIGNMENT === 'end' ){
			snapYon ='bottom';
		}
		/* eslint-enable no-lonely-if */

	}

	// apply 4 directional padding and borders
	let y = -(padding.x - padding.z) / 2 - (border.x - border.z) / 2;
	let x = -(padding.y - padding.w) / 2 - ( border.y - border.w ) / 2;


	if( snapXon === 'left' ) {

		x = (padding.w - padding.y) / 2 + (border.w - border.y) / 2;

	} else if( snapXon === 'right' ) {

		x = - ( padding.y - padding.w ) / 2 - ( border.y - border.w ) / 2;

	}

	if( snapYon === 'top' ) {

		y = - (padding.x - padding.z) / 2 - (border.x - border.z) / 2;

	} else if( snapYon === 'bottom' ) {

		y = (padding.z - padding.x) / 2 + (border.z - border.x) / 2;

	}


	boxComponent.childrenBoxes.forEach( ( child ) => {

		boxComponent.childrenPos[ child.id ]['x'] += x;
		boxComponent.childrenPos[ child.id ]['y'] += y;

	} );


}
