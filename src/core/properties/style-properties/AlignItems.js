import SubStyleProperty from './SubStyleProperty';


export default class AlignItems extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'alignItems', defaultValue );

		// strategies
		this._process = null;
		this._childAlign = null;

		this.isValidValue = _isValid;
	}

	update( vrElement, out ) {

		switch( vrElement.style._flexDirection.output ) {

			case 'row':
			case 'row-reverse':
				this._process = _process__ROW;
				switch ( this._output ) {
					case 'start':
						this._childAlign = _alignChild__ROW__START;
						break;
					case 'end':
						this._childAlign = _alignChild__ROW__END;
						break;

					default:
						this._childAlign = _alignChild;
				}
				break;

			case 'column':
			case 'column-reverse':
				this._process = _process__COLUMN;

				switch ( this._output ) {
					case 'start':
						this._childAlign = _alignChild__COLUMN__START;
						break;
					case 'end':
						this._childAlign = _alignChild__COLUMN__END;
						break;

					default:
						this._childAlign = _alignChild;
				}

				break;

		}

	}

	process( vrElement ) {
		this._process( vrElement, this._childAlign );

		// pad items
		// @TODO : Should be strategized
		let snap = 'center';
		let snapXon = 'center';
		let snapYon = 'center';

		const padding = vrElement.style._padding.output;
		const border = vrElement.style._borderWidth.output;

		if( vrElement.style._flexDirection.output.indexOf('column') !== -1 ) {

			if( this._output === 'start' ) {
				snap = snapXon = 'left';
			}else if( this._output === 'end' ){
				snap = snapXon ='right';
			}else {
				snap = 'centerX';
			}

		} else {

			/* eslint-disable no-lonely-if */
			if( this._output === 'start' ) {
				snap = snapYon = 'top';
			}else if( this._output === 'end' ){
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


		vrElement.childrenBoxes.forEach( ( child ) => {

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

			vrElement._boxManager._childrenPos[ child.id ].x += x + marginX;
			vrElement._boxManager._childrenPos[ child.id ].y += y + marginY;



		} );

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _alignChild() { return 0; }

function _alignChild__ROW__END( child, parentOffset ) {
	return - parentOffset + ( child.getInnerHeight() / 2 );
}

function _alignChild__ROW__START( child, parentOffset ) {
	return - parentOffset + ( child.getInnerHeight() / 2 );
}

function _alignChild__COLUMN__END( child, parentOffset ) {
	return parentOffset - ( child.getInnerWidth() / 2 );
}

function _alignChild__COLUMN__START( child, parentOffset ) {
	return - parentOffset + ( child.getInnerWidth() / 2 );
}

function _process__COLUMN( vrElement, childAligner ) {

	const AXIS_TARGET = vrElement.getInnerWidth() / 2;

	vrElement.childrenBoxes.forEach( ( child ) => {

		vrElement._boxManager._childrenPos[ child.id ].x = childAligner( AXIS_TARGET, child);

	} );

}

function _process__ROW( vrElement, childAligner ) {

	const AXIS_TARGET = vrElement.getInnerHeight() / 2;

	vrElement.childrenBoxes.forEach( ( child ) => {

		vrElement._boxManager._childrenPos[ child.id ].y = childAligner( AXIS_TARGET, child);

	} );

}


const AVAILABLE_VALUES = ['start', 'center', 'end', 'stretch'];
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) alignItems value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
