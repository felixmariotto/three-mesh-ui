import AlignItemsProperty from './AlignItemsProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class AlignItemsPropertyBox extends AlignItemsProperty {

	constructor( ) {

		super();

		// configure this property
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(element:MeshUIBaseElement, (child:MeshUIBaseElement, parentOffset:number )=> number ) =>  void  }
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(child:MeshUIBaseElement, parentOffset:number )=> number}
		 * @private
		 */
		this._childAlign = this.emptyStrategyLogic;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		// Stretch : Current or previous requires a bounds update of children
		// if( this._value === 'stretch' || this._input === 'stretch' ) {
		//
		// 	for ( let i = 0; i < element._children._boxes.length; i++ ) {
		// 		element._children._boxes[ i ]._bounds._needsProcess = true;
		// 	}
		//
		// }

		this._value = this._inheritedInput;

		switch( element._flexDirection._value ) {

			case 'row':
			case 'row-reverse':
				this._process = _processRow;
				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildRowStart;
						break;
					case 'end':
						this._childAlign = _alignChildRowEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}
				break;

			case 'column':
			case 'column-reverse':
				this._process = _processColumn;

				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildColumnStart;
						break;
					case 'end':
						this._childAlign = _alignChildColumnEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}

				break;

		}

		this._needsProcess = true;
		// @TODO: Store children here
		element._autoSize._needsProcess = true;

		element._flexDirection._needsProcess = true; //not mandatory
		element._justifyContent._needsProcess = true;

		this._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @param element
	 */
	process( element ) {

		// return;
		// if( !element._children._boxes.length ) return;

		this._process( element, this._childAlign );

		// @TODO : Could be strategized
		let snap = 'center';
		let snapXon = 'center';
		let snapYon = 'center';

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		if( element._flexDirection._value.indexOf('column') !== -1 ) {

			if( this._value === 'start' ) {
				snap = snapXon = 'left';
			}else if( this._value === 'end' ){
				snap = snapXon ='right';
			}else {
				snap = 'centerX';
			}

		} else {

			/* eslint-disable no-lonely-if */
			if( this._value === 'start' ) {
				snap = snapYon = 'top';
			}else if( this._value === 'end' ){
				snap = snapYon ='bottom';
			}else{
				snap = 'centerY';
			}
			/* eslint-enable no-lonely-if */

		}

		// apply 4 directional padding and borders
		let y = -(padding.x - padding.z) / 2 - (border.x - border.z)  / 2;
		let x = -(padding.y - padding.w) / 2 - ( border.y - border.w ) / 2;


		if( snapXon === 'left' ) {

			x = (padding.w - padding.y) / 2 + (border.w - border.y) / 2;

		} else if( snapXon === 'right' ) {

			x = - ( padding.y - padding.w ) / 2 - ( border.y - border.w ) / 2;

		}

		if( snapYon === 'top' ) {

			y = - (padding.x - padding.z) / 2 - (border.x - border.z)  / 2;

		} else if( snapYon === 'bottom' ) {

			y = (padding.z - padding.x) / 2 + (border.z - border.x)  / 2;

		}


		element._children._boxes.forEach( ( child ) => {

			let marginX = 0;
			let marginY = 0;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;

			if( snap === 'top' ) {

				marginY = - child._margin._value.x;

			} else if( snap === 'bottom' ) {

				marginY = child._margin._value.z;

			} else if( snap === 'left' ) {

				marginX = child._margin._value.w;

			} else if( snap === 'right' ) {

				marginX = - child._margin._value.y;

			} else if( snap === 'centerX' ) {

				marginX = ( child._margin._value.w - child._margin._value.y ) /2;

			} else if( snap === 'centerY' ) {

				marginY = ( - child._margin._value.x + child._margin._value.z ) /2;

			}

			element._layouter._childrenPos[ child.id ].x += x + marginX;
			element._layouter._childrenPos[ child.id ].y += y + marginY;

		} );

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _alignChild() {
	return 0;
}

/**
 *
 * @param child
 * @param parentOffset
 * @return {number}
 * @private
 */
function _alignChildRowEnd( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetHeight / 2 );
}

function _alignChildRowStart( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetHeight / 2 );
}

function _alignChildColumnEnd( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetWidth / 2 );
}

function _alignChildColumnStart( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetWidth / 2 );
}

function _processColumn( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerWidth / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].x = childAligner( child, AXIS_TARGET );

	} );

}

function _processRow( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerHeight / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].y = childAligner( child, AXIS_TARGET );

	} );

}
