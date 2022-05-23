/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */

import { COLUMN, COLUMN_REVERSE, contentDirection, ROW, ROW_REVERSE } from '../../utils/block-layout/ContentDirection';
import { alignItems } from '../../utils/block-layout/AlignItems';
import { justifyContent } from '../../utils/block-layout/JustifyContent';
import InlineManager from './InlineManager';

export default class BoxComponent extends InlineManager {


		constructor( options ) {

			super( options );

			this.isBoxComponent = true;
			this.childrenPos = {};

		}




		/** Return the sum of all this component's children sides + their margin */
		getChildrenSideSum( dimension ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = ( child.margin * 2 ) || 0;

				const CHILD_SIZE = ( dimension === 'width' ) ?
					( child.getWidth() + margin ) :
					( child.getHeight() + margin );

				return accu + CHILD_SIZE;

			}, 0 );

		}

		/** Look in parent record what is the instructed position for this component, then set its position */
		setPosFromParentRecords() {

			if ( this.parentUI && this.parentUI.childrenPos[ this.id ] ) {

				this.position.x = ( this.parentUI.childrenPos[ this.id ].x );
				this.position.y = ( this.parentUI.childrenPos[ this.id ].y );

			}

		}

		/** Position inner elements according to dimensions and layout parameters. */
		computeChildrenPosition() {

			if ( this.childrenUIs.length > 0 ) {

				const DIRECTION = this.getContentDirection();
				const JUSTIFICATION = this.getJustifyContent();
				const ALIGNMENT = this.getAlignItems();
				// if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){
				//
				// 	console.warn( `alignItems === '${ALIGNMENT}' is not supported` );
				//
				// }
				let directionalOffset;


				switch ( DIRECTION ) {

					case ROW :
						// directionalOffset = - this.getInnerWidth() / 2;
						directionalOffset = - this.getInsetWidth() / 2;
						break;

					case ROW_REVERSE :
						// directionalOffset = this.getInnerWidth() / 2;
						directionalOffset = this.getInsetWidth() / 2;
						break;

					case COLUMN :
						// directionalOffset = this.getInnerHeight() / 2;
						directionalOffset = this.getInsetHeight() / 2;
						break;

					case COLUMN_REVERSE :
						// directionalOffset = - this.getInnerHeight() / 2;
						directionalOffset = - this.getInsetHeight() / 2;
						break;

				}



				const REVERSE = - Math.sign( directionalOffset );

				contentDirection(this, DIRECTION, directionalOffset, REVERSE );
				justifyContent(this, DIRECTION, directionalOffset, REVERSE );
				alignItems( this, DIRECTION, ALIGNMENT );

				let snapXon = 'center';
				let snapYon = 'center';

				if( DIRECTION.indexOf('column') !== -1 ) {

					if( ALIGNMENT === 'start' ) {
						snapXon = 'left';
					}else if( ALIGNMENT === 'end' ){
						snapXon ='right';
					}

				} else {

					if( ALIGNMENT === 'start' ) {
						snapYon = 'top';
					}else if( ALIGNMENT === 'end' ){
						snapYon ='bottom';
					}

				}

				// apply 4 directional padding
				let y = -(this._padding.x - this._padding.z) / 2;
				let x = -(this._padding.y - this._padding.w) / 2;
				if( snapXon === 'left' ){
					x = this._padding.w;
				}else if( snapXon === 'right' ){
					x = -this._padding.y;
				}

				if( snapYon === 'top' ){
					y = -this._padding.x;
				}else if( snapYon === 'bottom' ){
					y = this._padding.z;
				}


				this.childrenBoxes.forEach( ( child ) => {

					this.childrenPos[ child.id ]['x'] += x;
					this.childrenPos[ child.id ]['y'] += y;

				} );


			}

		}

		/**
		 * Returns the highest linear dimension among all the children of the passed component
		 * MARGIN INCLUDED
		 */
		getHighestChildSizeOn( direction ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = child.margin || 0;
				const maxSize = direction === 'width' ?
					child.getWidth() + ( margin * 2 ) :
					child.getHeight() + ( margin * 2 );

				return Math.max( accu, maxSize );

			}, 0 );

		}

		/**
		 * Get width of this element
		 * With padding, without margin
		 */
		getWidth() {


			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			// @TODO : SIze according to box sizing
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				console.log("vava", this.parentUI.getContentDirection() )
				if( this.parentUI.getContentDirection().indexOf('column') !== -1 ) {

					console.log("bob")
					return this.parentUI.getBoxSizing() === 'content-box' ? this.parentUI.width : this.parentUI.getWidth() -  this.parentUI.getPaddingHorizontal();

				}

			}


			return this.width || this.getInnerWidth() + this.getPaddingHorizontal();

		}

	/**
	 * Obtain the outer width according to box-sizing
	 * @return {*}
	 */
		getOffsetWidth() {

			if ( this.getBoxSizing() === 'border-box' ) {

				return this.width || this.getInnerWidth();

			}

			return this.width + this._padding.y + this._padding.w;

		}

	/**
	 * Obtain the outer height according to box-sizing
	 * @return {*}
	 */
	getOffsetHeight() {

		if ( this.getBoxSizing() === 'border-box' ) {

			return this.height || this.getInnerHeight();

		}

		return this.height + this._padding.x + this._padding.z;

	}

	/**
	 * Obtain the inner width according to box-sizing
	 * @return {*}
	 */
	getInsetWidth() {

		if ( this.getBoxSizing() === 'border-box' ) {

			return this.width - ( this._padding.y + this._padding.w );

		}

		return this.width;

	}

	/**
	 * Obtain the inner height according to box-sizing
	 * @return {*}
	 */
	getInsetHeight() {

		if ( this.getBoxSizing() === 'border-box' ) {

			return this.height - (this._padding.x + this._padding.z);

		}

		return this.height;

	}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
		getHeight() {

			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			// @TODO : SIze according to box sizing
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				console.log("vava", this.parentUI.getContentDirection() )
				if( this.parentUI.getContentDirection().indexOf('row') !== -1 ) {

					console.log("BOB")
					return this.parentUI.getBoxSizing() === 'content-box' ? this.parentUI.height * 2 : this.parentUI.height * 2;


				}

			}

			return this.height || this.getInnerHeight() + this.getPaddingVertical();

		}

		getBoxSizing() { return this.boxSizing || 'border-box'; }

	/** Get width of this component minus its padding */
	getInnerWidth() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				if( this.getBoxSizing() === 'content-box' ) {
					return this.width || this.getChildrenSideSum( 'width' );
				}
				return this.width - this.getPaddingHorizontal() || this.getChildrenSideSum( 'width' );


			case 'column' :
			case 'column-reverse' :
				return this.width || this.getHighestChildSizeOn( 'width' );
				if( this.getBoxSizing() === 'content-box' ) {
					return this.width || this.getHighestChildSizeOn( 'width' );
				}
				return this.width - this.getPaddingHorizontal() || this.getHighestChildSizeOn( 'width' );

			default :
				console.error( `Invalid contentDirection : ${DIRECTION}` );
				break;

		}

	}

	/** Get height of this component minus its padding */
	getInnerHeight() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.height || this.getHighestChildSizeOn( 'height' );
				if( this.getBoxSizing() === 'content-box' ) {
					return this.height || this.getHighestChildSizeOn( 'height' );
				}
				return this.height - this.getPaddingVertical() || this.getHighestChildSizeOn( 'height' );


			case 'column' :
			case 'column-reverse' :
				if( this.getBoxSizing() === 'content-box' ) {
					return this.height || this.getChildrenSideSum( 'height' );
				}
				return this.height - this.getPaddingVertical() || this.getChildrenSideSum( 'height' );

			default :
				console.error( `Invalid contentDirection : ${DIRECTION}` );
				break;

		}

	}

		/**
		 *
		 * @return {number}
		 */
		getPaddingHorizontal() { return this._padding.y + this._padding.w; }

		/**
		 *
		 * @return {number}
		 */
		getPaddingVertical() { return this._padding.x + this._padding.z; }

}

