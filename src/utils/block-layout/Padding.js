/**
 * @TODO: This could be integrated in AlignItems
 * @param {BoxComponent} boxComponent
 * @param {string} DIRECTION
 * @param {string} ALIGNMENT
 */
export const padItems = function( boxComponent, DIRECTION, ALIGNMENT ){

	let snap = 'center';
	let snapXon = 'center';
	let snapYon = 'center';

	const padding = boxComponent._padding;
	const border = boxComponent._borderWidth;

	if( DIRECTION.indexOf('column') !== -1 ) {

		if( ALIGNMENT === 'start' ) {
			snap = snapXon = 'left';
		}else if( ALIGNMENT === 'end' ){
			snap = snapXon ='right';
		}else {
			snap = 'centerX';
		}

	} else {

		/* eslint-disable no-lonely-if */
		if( ALIGNMENT === 'start' ) {
			snap = snapYon = 'top';
		}else if( ALIGNMENT === 'end' ){
			snap = snapYon ='bottom';
		}else{
			snap = 'centerY';
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

		let marginX = 0;
		let marginY = 0;
		// let marginY = ( -child._margin.x + child._margin.z ) /2;
		// let marginY = ( -child._margin.x + child._margin.z ) /2;

		if( snap === 'top' ) {

			marginY = - child._margin.x;

		} else if( snap === 'bottom' ) {

			marginY = child._margin.z;

		} else if( snap === 'left' ) {

			marginX = child._margin.w;

		} else if( snap === 'right' ) {

			marginX = - child._margin.y;

		} else if( snap === 'centerX' ) {

			marginX = ( child._margin.w - child._margin.y ) /2;

		} else if( snap === 'centerY' ) {

			marginY = ( - child._margin.x + child._margin.z ) /2;

		}

		boxComponent.childrenPos[ child.id ].x += x + marginX;
		boxComponent.childrenPos[ child.id ].y += y + marginY;



	} );


}
