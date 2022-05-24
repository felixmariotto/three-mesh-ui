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



	/**
	 * Return the sum of all this component's children sides + their margin
	 * @param {string} side
	 * @return {number}
	 */
		getChildrenSideSum( side ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = ( child.margin * 2 ) || 0;

				const CHILD_SIZE = ( side === 'width' ) ?
					( child.getOffsetWidth() + margin ) :
					( child.getOffsetHeight() + margin );

				return accu + CHILD_SIZE;

			}, 0 );

		}

		/**
		 * Look in parent record what is the instructed position for this component, then set its position
		 **/
		setPosFromParentRecords() {

			if ( this.parentUI && this.parentUI.childrenPos[ this.id ] ) {

				this.position.x = this.parentUI.childrenPos[ this.id ].x;
				this.position.y = this.parentUI.childrenPos[ this.id ].y;

			}

		}

		/**
		 * Position inner elements according to dimensions and layout parameters.
		 * */
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
	 * @param {string} direction
	 * @return {number}
	 */
		getHighestChildSizeOn( direction ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = child.margin || 0;
				const maxSize = direction === 'width' ?
					child.getOffsetWidth() + ( margin * 2 ) :
					child.getOffsetHeight() + ( margin * 2 );

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
	 * @return {number}
	 */
		getOffsetWidth() {

			const base = this.getStretchedWidth() || this.width || this.getAutoWidth();
			if ( this.getBoxSizing() === 'border-box' ) {

				return base;

			}

			return base + this._padding.y + this._padding.w;

		}

	/**
	 * Obtain the outer height according to box-sizing
	 * @return {number}
	 */
	getOffsetHeight() {

		const base = this.getStretchedHeight() || this.height || this.getAutoHeight();

		if ( this.getBoxSizing() === 'border-box' ) {

			return base;

		}

		return base + this._padding.x + this._padding.z;

	}

	/**
	 * Obtain the inner width according to box-sizing
	 * @return {number}
	 */
	getInsetWidth() {

		const base = this.width || this.getAutoWidth();

		if ( this.getBoxSizing() === 'border-box' ) {

			return base - ( this._padding.y + this._padding.w );

		}

		return base;

	}

	/**
	 * Obtain the inner height according to box-sizing
	 * @return {number}
	 */
	getInsetHeight() {

		const base = this.height || this.getAutoHeight();

		if ( this.getBoxSizing() === 'border-box' ) {

			return base - (this._padding.x + this._padding.z);

		}

		return base;

	}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
	/**
	 * @deprecated
	 * @return {number|*}
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



	/**
	 * Retrieve the automatic height from children boxes
	 * @return {number}
	 */
	getAutoHeight() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.getHighestChildSizeOn( 'height' );


			case 'column' :
			case 'column-reverse' :
				return this.getChildrenSideSum( 'height' );

			default :
				console.error( `Invalid contentDirection : ${DIRECTION}` );
				break;

		}

	}

	/**
	 *
	 * @return {number}
	 */
	getAutoWidth() {

		const DIRECTION = this.getContentDirection();

		switch ( DIRECTION ) {

			case 'row' :
			case 'row-reverse' :
				return this.getChildrenSideSum( 'width' );


			case 'column' :
			case 'column-reverse' :
				return this.getHighestChildSizeOn( 'width' );

			default :
				console.error( `Invalid contentDirection : ${DIRECTION}` );
				break;

		}

	}

	/**
	 *
	 * @return {number}
	 */
	getStretchedHeight(){

		if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' && this.parentUI.getContentDirection().indexOf('row') !== -1 ) {

			return this.parentUI.getInsetHeight();

		}

		return 0;
	}

	/**
	 *
	 * @return {number}
	 */
	getStretchedWidth(){

		if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' && this.parentUI.getContentDirection().indexOf('column') !== -1 ) {

			return this.parentUI.getInsetWidth();

		}

		return 0;
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

