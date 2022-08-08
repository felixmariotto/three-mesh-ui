import SubStyleProperty from './SubStyleProperty';


export default class FlexDirection extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'flexDirection', defaultValue );

		this._offset = 0;

		this.isValidValue = _isValid;

	}

	update( vrElement, out ) {

		switch ( this._output ) {
			case "row":
				this.process = _process__ROW;
				this._offset = - vrElement.innerWidth / 2;
				return;

			case "row-reverse":
				this.process = _process__ROW__REVERSE;
				this._offset = vrElement.innerWidth / 2;
				return;

			case "column":
				this.process = _process__COLUMN;
				this._offset = vrElement.innerHeight / 2;
				return;

			case "column-reverse":
				this.process = _process__COLUMN__REVERSE;
				this._offset = - vrElement.innerHeight / 2;
				return;
		}

	}

	process( vrElement ) {
		// this will be defined from strategy
	}

	/**
	 *
	 * @return {number}
	 */
	get anchor() {

		return this._offset;

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _process__ROW( vrElement ) {

	// end to end children
	let accu = vrElement.style._flexDirection.anchor;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < vrElement.childrenBoxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIComponent}
		 */
		const child = vrElement.childrenBoxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child.getOffsetWidth();

		// increase with the left margin before placing the child
		accu += child._margin.w;


		vrElement._boxManager._childrenPos[ CHILD_ID ] = {
			x: accu + ( CHILD_SIZE / 2 ),
			y: 0
		};

		// increase the next child with this child right margin
		accu += CHILD_SIZE + child._margin.y ;

	}

}

function _process__ROW__REVERSE( vrElement ) {

	// end to end children
	let accu = vrElement.style._flexDirection.anchor;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < vrElement.childrenBoxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIComponent}
		 */
		const child = vrElement.childrenBoxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child.getOffsetWidth();

		// decrease with the right margin before placing the child
		accu -= child._margin.y;


		vrElement._boxManager._childrenPos[ CHILD_ID ] = {
			x: accu - ( CHILD_SIZE / 2 ),
			y: 0
		};

		// decrease the next child with this child left margin
		accu -= CHILD_SIZE + child._margin.w ;

	}

}

function _process__COLUMN( vrElement ) {

	// end to end children
	let accu = vrElement.style._flexDirection.anchor;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < vrElement.childrenBoxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIComponent}
		 */
		const child = vrElement.childrenBoxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child.getOffsetHeight();

		// increase with the top margin before placing the child
		accu += child._margin.x;


		vrElement._boxManager._childrenPos[ CHILD_ID ] = {
			x: accu + ( CHILD_SIZE / 2 ),
			y: 0
		};

		// increase the next child with this child bottom margin
		accu += CHILD_SIZE + child._margin.z ;

	}
}

function _process__COLUMN__REVERSE( vrElement ) {

	// end to end children
	let accu = vrElement.style._flexDirection.anchor;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < vrElement.childrenBoxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIComponent}
		 */
		const child = vrElement.childrenBoxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child.getOffsetHeight();

		// decrease with the bottom margin before placing the child
		accu -= child._margin.z;


		vrElement._boxManager._childrenPos[ CHILD_ID ] = {
			x: accu - ( CHILD_SIZE / 2 ),
			y: 0
		};

		// decrease the next child with this child top margin
		accu -= CHILD_SIZE + child._margin.x ;

	}

}

const AVAILABLE_VALUES = ['row','row-reverse', 'column', 'column-reverse'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) flexDirection value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
