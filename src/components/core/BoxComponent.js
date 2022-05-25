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
import { padItems } from '../../utils/block-layout/Padding';

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
				const ALIGNMENT = this.getAlignItems();

				let directionalOffset;


				switch ( DIRECTION ) {

					case ROW :
						directionalOffset = -this.getInsetWidth() / 2;
						break;

					case ROW_REVERSE :
						directionalOffset = this.getInsetWidth() / 2;
						break;

					case COLUMN :
						directionalOffset = this.getInsetHeight() / 2;
						break;

					case COLUMN_REVERSE :
						directionalOffset = -this.getInsetHeight() / 2;
						break;

				}


				const REVERSE = -Math.sign( directionalOffset );

				contentDirection( this, DIRECTION, directionalOffset, REVERSE );
				justifyContent( this, DIRECTION, directionalOffset, REVERSE );
				alignItems( this, DIRECTION );
				padItems( this, DIRECTION, ALIGNMENT );

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
	 * Obtain the outer width according to box-sizing
	 * @return {number}
	 */
		getOffsetWidth() {

			const base = this.getStretchedWidth() || this.width || this.getAutoWidth();
			if ( this.getBoxSizing() === 'border-box' ) {

				return base;

			}

			return base + this._padding.y + this._padding.w + this._borderWidth.y + this._borderWidth.w;

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

		return base + this._padding.x + this._padding.z + this._borderWidth.x + this._borderWidth.z;

	}

	/**
	 * Obtain the inner width according to box-sizing
	 * @return {number}
	 */
	getInsetWidth() {

		const base = this.width || this.getAutoWidth();

		if ( this.getBoxSizing() === 'border-box' ) {

			return base - ( this._padding.y + this._padding.w + this._borderWidth.y + this._borderWidth.w );

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

			return base - (this._padding.x + this._padding.z + this._borderWidth.x + this._borderWidth.z );

		}

		return base;

	}


		getBoxSizing() { return this.boxSizing || 'border-box'; }




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

}

