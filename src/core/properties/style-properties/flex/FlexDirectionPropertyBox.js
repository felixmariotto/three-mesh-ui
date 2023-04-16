import FlexDirectionProperty from './FlexDirectionProperty';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../../elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */

export default class FlexDirectionPropertyBox extends FlexDirectionProperty {

	constructor( ) {

		super();

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offset = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._reverse = 1;

		/**
		 *
		 * @param { (element:MeshUIBaseElement) => void} element
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		switch ( this._value ) {
			case "row":
				this._process = _processRow;
				// this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._process = _processRowReverse;
				// this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._process = _processColumn;
				// this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._process = _processColumnReverse;
				// this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		// also update dependencies
		if( !element._justifyContent._needsUpdate ) element._justifyContent.computeOutputValue( element );
		if( !element._alignItems._needsUpdate ) element._alignItems.computeOutputValue( element );

		this._needsProcess = true;

	}

	process( element ) {
		// this will be defined from strategy

		//console.log( element.name, 'flexDirection process');


		switch ( this._value ) {
			case "row":
				this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		this._reverse = -Math.sign( this._offset );
		if( this._reverse === 0 ) {
			this._reverse = 1;
		}


		this._process( element );

		element._justifyContent._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _processRow( element ) {

	// end to end children
	let accu = element._flexDirection._offset;

	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// increase with the left margin before placing the child
		accu += child._margin._value.w * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;


		// increase the next child with this child right margin
		accu += REVERSE * ( CHILD_SIZE + child._margin._value.y ) ;

	}

}

function _processRowReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// decrease with the right margin before placing the child
		accu += child._margin._value.y * REVERSE;


		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;

		// decrease the next child with this child left margin
		accu += (CHILD_SIZE + child._margin._value.w) * REVERSE ;

	}

}

function _processColumn( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// increase with the top margin before placing the child
		accu += child._margin._value.x * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// increase the next child with this child bottom margin
		accu += (CHILD_SIZE + child._margin._value.z) * REVERSE ;

	}

}

function _processColumnReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// decrease with the bottom margin before placing the child
		accu += child._margin._value.z * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// decrease the next child with this child top margin
		accu += ( CHILD_SIZE + child._margin._value.x ) * REVERSE ;

	}

}
