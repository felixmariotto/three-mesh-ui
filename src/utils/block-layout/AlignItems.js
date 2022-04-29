import { ROW } from './ContentDirection';


export const START = "start";
export const CENTER = "center";
export const END = "end";
export const STRETCH = "stretch"; // Still bit experimental

export function alignItems( boxComponent, DIRECTION){

	const ALIGNMENT = boxComponent.getAlignItems();
	if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){

		console.warn( `alignItems === '${ALIGNMENT}' is not supported` );

	}

	let getSizeMethod = "getWidth";
	let axis = "x";
	if( DIRECTION.indexOf( ROW ) === 0 ){

		getSizeMethod = "getHeight";
		axis = "y";

	}
	const AXIS_TARGET = ( boxComponent[getSizeMethod]() / 2 ) - ( boxComponent.padding || 0 );

	boxComponent.childrenBoxes.forEach( ( child ) => {

		let offset;

		switch ( ALIGNMENT ){

			case END:
			case 'right': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'bottom': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 ) + ( child.margin || 0 );

				}else{

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 ) - ( child.margin || 0 );

				}

				break;

			case START:
			case 'left': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'top': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 ) - ( child.margin || 0 );

				}else{

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 ) + ( child.margin || 0 );

				}

				break;
		}

		boxComponent.childrenPos[ child.id ][axis] = offset || 0;

	} );

}

/**
 * @deprecated
 * // @TODO: Be remove upon 7.x.x
 * @param alignment
 */
export function warnAboutDeprecatedAlignItems( alignment ){

	if( DEPRECATED_ALIGN_ITEMS.indexOf(alignment) !== - 1){

		console.warn(`alignItems === '${alignment}' is deprecated and will be remove in 7.x.x. Fallback are 'start'|'end'`)

	}

}

const AVAILABLE_ALIGN_ITEMS = [
	START,
	CENTER,
	END,
	STRETCH,
	'top', // @TODO: Be remove upon 7.x.x
	'right', // @TODO: Be remove upon 7.x.x
	'bottom', // @TODO: Be remove upon 7.x.x
	'left' // @TODO: Be remove upon 7.x.x
];

// @TODO: Be remove upon 7.x.x
const DEPRECATED_ALIGN_ITEMS = [
	'top',
	'right',
	'bottom',
	'left'
];

