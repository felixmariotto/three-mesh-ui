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

export default function BoxComponent( Base ) {

	return class BoxComponent extends Base {

		constructor( options ) {

			super( options );

			this.isBoxComponent = true;
			this.childrenPos = {};

		}


		/** Get width of this component minus its padding */
		getInnerWidth() {

			const DIRECTION = this.getContentDirection();

			switch ( DIRECTION ) {

				case 'row' :
				case 'row-reverse' :
					return this.width - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'width' );

				case 'column' :
				case 'column-reverse' :
					return this.getHighestChildSizeOn( 'width' );

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
					return this.getHighestChildSizeOn( 'height' );

				case 'column' :
				case 'column-reverse' :
					return this.height - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'height' );

				default :
					console.error( `Invalid contentDirection : ${DIRECTION}` );
					break;

			}

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

			if ( this.children.length > 0 ) {

				const DIRECTION = this.getContentDirection();
				let directionalOffset;

				switch ( DIRECTION ) {

					case ROW :
						directionalOffset = - this.getInnerWidth() / 2;
						break;

					case ROW_REVERSE :
						directionalOffset = this.getInnerWidth() / 2;
						break;

					case COLUMN :
						directionalOffset = this.getInnerHeight() / 2;
						break;

					case COLUMN_REVERSE :
						directionalOffset = - this.getInnerHeight() / 2;
						break;

				}

				const REVERSE = - Math.sign( directionalOffset );

				contentDirection(this, DIRECTION, directionalOffset, REVERSE );
				justifyContent(this, DIRECTION, directionalOffset, REVERSE );
				alignItems( this, DIRECTION );
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
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				if( this.parentUI.getContentDirection().indexOf('column') !== -1 ){

					return this.parentUI.getWidth() -  ( this.parentUI.padding * 2 || 0 );

				}

			}


			return this.width || this.getInnerWidth() + ( this.padding * 2 || 0 );

		}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
		getHeight() {

			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				if( this.parentUI.getContentDirection().indexOf('row') !== -1 ){

					return this.parentUI.getHeight() - ( this.parentUI.padding * 2 || 0 );

				}

			}

			return this.height || this.getInnerHeight() + ( this.padding * 2 || 0 );

		}

	};

}

