/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// UNUSED EXPORTS: AlignItems, Block, ContentDirection, FontLibrary, InlineBlock, JustifyContent, Keyboard, Text, TextAlign, Whitespace, default, update

// NAMESPACE OBJECT: ./src/utils/block-layout/ContentDirection.js
var ContentDirection_namespaceObject = {};
__webpack_require__.r(ContentDirection_namespaceObject);
__webpack_require__.d(ContentDirection_namespaceObject, {
  "COLUMN": () => (COLUMN),
  "COLUMN_REVERSE": () => (COLUMN_REVERSE),
  "ROW": () => (ROW),
  "ROW_REVERSE": () => (ROW_REVERSE),
  "contentDirection": () => (contentDirection)
});

// NAMESPACE OBJECT: ./src/utils/block-layout/AlignItems.js
var AlignItems_namespaceObject = {};
__webpack_require__.r(AlignItems_namespaceObject);
__webpack_require__.d(AlignItems_namespaceObject, {
  "CENTER": () => (CENTER),
  "END": () => (END),
  "START": () => (START),
  "STRETCH": () => (STRETCH),
  "alignItems": () => (alignItems),
  "warnAboutDeprecatedAlignItems": () => (warnAboutDeprecatedAlignItems)
});

// NAMESPACE OBJECT: ./src/utils/block-layout/JustifyContent.js
var JustifyContent_namespaceObject = {};
__webpack_require__.r(JustifyContent_namespaceObject);
__webpack_require__.d(JustifyContent_namespaceObject, {
  "CENTER": () => (JustifyContent_CENTER),
  "END": () => (JustifyContent_END),
  "SPACE_AROUND": () => (SPACE_AROUND),
  "SPACE_BETWEEN": () => (SPACE_BETWEEN),
  "SPACE_EVENLY": () => (SPACE_EVENLY),
  "START": () => (JustifyContent_START),
  "justifyContent": () => (justifyContent)
});

// NAMESPACE OBJECT: ./src/utils/inline-layout/Whitespace.js
var Whitespace_namespaceObject = {};
__webpack_require__.r(Whitespace_namespaceObject);
__webpack_require__.d(Whitespace_namespaceObject, {
  "NORMAL": () => (NORMAL),
  "NOWRAP": () => (NOWRAP),
  "PRE": () => (PRE),
  "PRE_LINE": () => (PRE_LINE),
  "PRE_WRAP": () => (PRE_WRAP),
  "WHITE_CHARS": () => (WHITE_CHARS),
  "collapseWhitespaceOnInlines": () => (collapseWhitespaceOnInlines),
  "collapseWhitespaceOnString": () => (collapseWhitespaceOnString),
  "newlineBreakability": () => (newlineBreakability),
  "shouldBreak": () => (Whitespace_shouldBreak)
});

// NAMESPACE OBJECT: ./src/utils/inline-layout/TextAlign.js
var TextAlign_namespaceObject = {};
__webpack_require__.r(TextAlign_namespaceObject);
__webpack_require__.d(TextAlign_namespaceObject, {
  "CENTER": () => (TextAlign_CENTER),
  "JUSTIFY": () => (JUSTIFY),
  "JUSTIFY_CENTER": () => (JUSTIFY_CENTER),
  "JUSTIFY_LEFT": () => (JUSTIFY_LEFT),
  "JUSTIFY_RIGHT": () => (JUSTIFY_RIGHT),
  "LEFT": () => (LEFT),
  "RIGHT": () => (RIGHT),
  "textAlign": () => (textAlign)
});

;// CONCATENATED MODULE: external "THREE"
const external_THREE_namespaceObject = THREE;
;// CONCATENATED MODULE: ./src/utils/block-layout/ContentDirection.js
const ROW = "row";
const ROW_REVERSE = "row-reverse";
const COLUMN = "column";
const COLUMN_REVERSE = "column-reverse";

function contentDirection( container, DIRECTION, startPos, REVERSE ){

	// end to end children
	let accu = startPos;

	let childGetSize = "getWidth";
	let axisPrimary = "x";
	let axisSecondary = "y";

	if( DIRECTION.indexOf( COLUMN ) === 0 ){

		childGetSize = "getHeight";
		axisPrimary = "y";
		axisSecondary = "x";

	}

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < container.childrenBoxes.length; i++ ) {

		const child = container.childrenBoxes[ i ];

		const CHILD_ID = child.id;
		const CHILD_SIZE = child[childGetSize]();
		const CHILD_MARGIN = child.margin || 0;

		accu += CHILD_MARGIN * REVERSE;

		container.childrenPos[ CHILD_ID ] = {
			[axisPrimary]: accu + ( ( CHILD_SIZE / 2 ) * REVERSE ),
			[axisSecondary]: 0
		};

		// update accu for next children
		accu += ( REVERSE * ( CHILD_SIZE + CHILD_MARGIN ) );

	}

}

;// CONCATENATED MODULE: ./src/utils/block-layout/AlignItems.js



const START = "start";
const CENTER = "center";
const END = "end";
const STRETCH = "stretch"; // Still bit experimental

function alignItems( boxComponent, DIRECTION){

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
function warnAboutDeprecatedAlignItems( alignment ){

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


;// CONCATENATED MODULE: ./src/utils/block-layout/JustifyContent.js
const JustifyContent_START = "start";
const JustifyContent_CENTER = "center";
const JustifyContent_END = "end";
const SPACE_AROUND = 'space-around';
const SPACE_BETWEEN = 'space-between';
const SPACE_EVENLY = 'space-evenly';

function justifyContent( boxComponent, direction, startPos, REVERSE){

	const JUSTIFICATION = boxComponent.getJustifyContent();
	if ( AVAILABLE_JUSTIFICATIONS.indexOf( JUSTIFICATION ) === -1 ) {

		console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

	}

	const side = direction.indexOf('row') === 0 ? 'width' : 'height'
	const usedDirectionSpace = boxComponent.getChildrenSideSum( side );

	const INNER_SIZE = side === 'width' ? boxComponent.getInnerWidth() : boxComponent.getInnerHeight();
	const remainingSpace = INNER_SIZE - usedDirectionSpace;

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	// const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * REVERSE );
	const justificationOffset = _getJustificationOffset( JUSTIFICATION, axisOffset );

	// Items margin
	const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );

	// Apply
	const axis = direction.indexOf( 'row' ) === 0 ? "x" : "y"
	boxComponent.childrenBoxes.forEach( ( child , childIndex ) => {

		boxComponent.childrenPos[ child.id ][axis] -= justificationOffset - justificationMargins[childIndex];

	} );
}

const AVAILABLE_JUSTIFICATIONS = [
	JustifyContent_START,
	JustifyContent_CENTER,
	JustifyContent_END,
	SPACE_AROUND,
	SPACE_BETWEEN,
	SPACE_EVENLY
];

/**
 *
 * @param {string} justification
 * @param {number} axisOffset
 * @returns {number}
 */
function _getJustificationOffset( justification, axisOffset ){

	// Only end and center have justification offset
	switch ( justification ){

		case JustifyContent_END:
			return axisOffset;

		case JustifyContent_CENTER:
			return axisOffset / 2;
	}

	return 0;
}

/**
 *
 * @param items
 * @param spaceToDistribute
 * @param justification
 * @param reverse
 * @returns {any[]}
 */
function _getJustificationMargin( items, spaceToDistribute, justification, reverse ){

	const justificationMargins = Array( items.length ).fill( 0 );

	if ( spaceToDistribute > 0 ) {

		// Only space-*  have justification margin betweem items
		switch ( justification ) {

			case SPACE_BETWEEN:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length - 1 ) * reverse;
					// set this margin for any children

					// except for first child
					justificationMargins[ 0 ] = 0;

					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * i;

					}

				}

				break;

			case SPACE_EVENLY:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length + 1 ) * reverse;

					// set this margin for any children
					for ( let i = 0; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * ( i + 1 );

					}

				}

				break;

			case SPACE_AROUND:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length ) * reverse;

					const start = margin / 2;
					justificationMargins[ 0 ] = start;

					// set this margin for any children
					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = start + margin * i;

					}

				}

				break;

		}

	}

	return justificationMargins;

}

;// CONCATENATED MODULE: ./src/components/core/BoxComponent.js
/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */





function BoxComponent( Base ) {

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


;// CONCATENATED MODULE: ./src/utils/inline-layout/Whitespace.js
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
 *
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 **/
const WHITE_CHARS = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

const NORMAL = 'normal';
const NOWRAP = 'nowrap';
const PRE = 'pre';
const PRE_LINE = 'pre-line';
const PRE_WRAP = 'pre-wrap';

/**
 * Collapse whitespaces and sequence of whitespaces on string
 *
 * @param textContent
 * @param whiteSpace
 * @returns {*}
 */
const collapseWhitespaceOnString = function ( textContent, whiteSpace ) {

	switch ( whiteSpace ) {

		case NOWRAP:
		case NORMAL:
			// newlines are treated as other whitespace characters
			textContent = textContent.replace( /\n/g, ' ' );
		//falls through

		case PRE_LINE:
			// collapsed white spaces sequences
			textContent = textContent.replace( /[ ]{2,}/g, ' ' );
			break;

		default:

	}

	return textContent;

};

/**
 * Get the breakability of a newline character according to white-space property
 *
 * @param whiteSpace
 * @returns {string}
 */
const newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case PRE:
		case PRE_WRAP:
		case PRE_LINE:
			return 'mandatory';

		case NOWRAP:
		case NORMAL:
		default:
		// do not automatically break on newline

	}

};

/**
 * Check for breaks in inlines according to whiteSpace value
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @returns {boolean}
 */
const Whitespace_shouldBreak = function( inlines, i, lastInlineOffset, options){
	const inline = inlines[i];

	switch ( options.WHITESPACE ){

		case NORMAL:
		case PRE_LINE:
		case PRE_WRAP:

			// prevent additional computation if line break is mandatory
			if( inline.lineBreak === 'mandatory' ) return true;


			const kerning = inline.kerning ? inline.kerning : 0;
			const xoffset = inline.xoffset ? inline.xoffset : 0;
			const xadvance = inline.xadvance ? inline.xadvance : inline.width;

			// prevent additional computation if this character already exceed the available size
			if( lastInlineOffset + xadvance + xoffset + kerning > options.INNER_WIDTH ) return true;


			const nextBreak = _distanceToNextBreak( inlines, i, options );
			return _shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, options );

		case PRE:
			return inline.lineBreak === 'mandatory';

		case NOWRAP:
		default:
			return false;
	}
}


/**
 * Alter a line of inlines according to white-space property
 * @param line
 * @param {('normal'|'pre-wrap'|'pre-line')} whiteSpace
 */
const collapseWhitespaceOnInlines = function ( line, whiteSpace ) {

	const firstInline = line[ 0 ];
	const lastInline = line[ line.length - 1 ];

	// @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
	//
	// current implementation is 'pre-line'
	// if the breaking character is a space, get the previous one
	switch ( whiteSpace ) {

		// trim/collapse first and last whitespace characters of a line
		case PRE_WRAP:
			// only process whiteChars glyphs inlines
			// if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
			if ( firstInline.glyph && firstInline.glyph === '\n' && line.length > 1 ) {

				_collapseLeftInlines( [ firstInline ], line[ 1 ] );

			}

			// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
			if ( lastInline.glyph && lastInline.glyph === '\n' && line.length > 1 ) {

				_collapseRightInlines( [ lastInline ], line[ line.length - 2 ] );

			}

			break;


		case PRE_LINE:
		case NOWRAP:
		case NORMAL:
			let inlinesToCollapse = [];
			let collapsingTarget;
			// collect starting whitespaces to collapse
			for ( let i = 0; i < line.length; i++ ) {

				const inline = line[ i ];

				if ( inline.glyph && WHITE_CHARS[ inline.glyph ] && line.length > i ) {

					inlinesToCollapse.push( inline );
					collapsingTarget = line[ i + 1 ];
					continue;

				}

				break;

			}

			_collapseLeftInlines( inlinesToCollapse, collapsingTarget );


			inlinesToCollapse = [];
			collapsingTarget = null;
			// collect ending whitespace to collapse
			for ( let i = line.length - 1; i > 0; i-- ) {

				const inline = line[ i ];
				if ( inline.glyph && WHITE_CHARS[ inline.glyph ] && i > 0 ) {

					inlinesToCollapse.push( inline );
					collapsingTarget = line[ i - 1 ];
					continue;

				}

				break;

			}

			_collapseRightInlines( inlinesToCollapse, collapsingTarget );
			break;

		case PRE:
			break;


		default:
			console.warn( `whiteSpace: '${whiteSpace}' is not valid` );
			return 0;

	}

	return firstInline.offsetX;

};


/***********************************************************************************************************************
 * Internal logics
 **********************************************************************************************************************/


/**
 * Visually collapse inlines from right to left ( endtrim )
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseRightInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.width = 0;
		inline.height = 0;
		inline.offsetX = targetInline.offsetX + targetInline.width;

	}

}

/**
 * Visually collapse inlines from left to right (starttrim)
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseLeftInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.width = 0;
		inline.height = 0;
		inline.offsetX = targetInline.offsetX;

	}

}

/**
 * get the distance in world coord to the next glyph defined
 * as break-line-safe ( like whitespace for instance )
 * @private
 */
function _distanceToNextBreak( inlines, currentIdx, options, accu ) {

	accu = accu || 0;

	// end of the text
	if ( !inlines[ currentIdx ] ) return accu;

	const inline = inlines[ currentIdx ];
	const kerning = inline.kerning ? inline.kerning : 0;
	const xoffset = inline.xoffset ? inline.xoffset : 0;
	const xadvance = inline.xadvance ? inline.xadvance : inline.width;

	// if inline.lineBreak is set, it is 'mandatory' or 'possible'
	if ( inline.lineBreak ) return accu + xadvance;

	// no line break is possible on this character
	return _distanceToNextBreak(
		inlines,
		currentIdx + 1,
		options,
		accu + xadvance + options.LETTERSPACING + xoffset + kerning
	);

}

/**
 * Test if we should line break here even if the current glyph is not out of boundary.
 * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
 * and the distance to the next friendly glyph is out of boundary.
 */
function _shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, options ) {

	// We can't check if last glyph is break-line-friendly it does not exist
	if ( !prevChar || !prevChar.glyph ) return false;

	// Next break-line-friendly glyph is inside boundary
	if ( lastInlineOffset + nextBreak < options.INNER_WIDTH ) return false;

	// Previous glyph was break-line-friendly
	return options.BREAKON.indexOf( prevChar.glyph ) > -1;

}

;// CONCATENATED MODULE: ./src/utils/inline-layout/TextAlign.js
const LEFT = 'left';
const RIGHT = 'right';
const TextAlign_CENTER = 'center';
const JUSTIFY = 'justify';
const JUSTIFY_LEFT = 'justify-left';
const JUSTIFY_RIGHT = 'justify-right';
const JUSTIFY_CENTER = 'justify-center';

function textAlign( lines, ALIGNMENT, INNER_WIDTH ) {

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( line, ALIGNMENT, INNER_WIDTH, i === lines.length - 1 );

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX;

		}

		line.x = offsetX;

	}

	// last operations for justifications alignments
	if ( ALIGNMENT.indexOf( JUSTIFY ) === 0 ) {

		for ( let i = 0; i < lines.length; i++ ) {

			const line = lines[ i ];


			// do not process last line for justify-left or justify-right
			if ( ALIGNMENT.indexOf( '-' ) !== -1 && i === lines.length - 1 ) return;

			// can only justify is space is remaining
			const REMAINING_SPACE = INNER_WIDTH - line.width;
			if ( REMAINING_SPACE <= 0 ) return;

			// count the valid spaces to extend
			// Do not take the first nor the last space into account
			let validSpaces = 0;
			for ( let j = 1; j < line.length - 1; j++ ) {

				validSpaces += line[ j ].glyph === ' ' ? 1 : 0;

			}
			const additionalSpace = REMAINING_SPACE / validSpaces;


			// for right justification, process the loop in reverse
			let inverter = 1;
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {

				line.reverse();
				inverter = -1;

			}

			let incrementalOffsetX = 0;

			// start at ONE to avoid first space
			for ( let j = 1; j <= line.length - 1; j++ ) {

				// apply offset on each char
				const char = line[ j ];
				char.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += char.glyph === ' ' ? additionalSpace : 0;

			}

			// for right justification, the loop was processed in reverse
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {
				line.reverse();
			}


		}

	}

}


const _computeLineOffset = ( line, ALIGNMENT, INNER_WIDTH, lastLine ) => {

	switch ( ALIGNMENT ) {

		case JUSTIFY_LEFT:
		case JUSTIFY:
		case LEFT:
			return -INNER_WIDTH / 2;

		case JUSTIFY_RIGHT:
		case RIGHT:
			return -line.width + ( INNER_WIDTH / 2 );


		case TextAlign_CENTER:
			return -line.width / 2;

		case JUSTIFY_CENTER:
			if ( lastLine ) {

				// center alignement
				return -line.width / 2;

			}

				// left alignment
				return -INNER_WIDTH / 2;

		default:
			console.warn( `textAlign: '${ALIGNMENT}' is not valid` );

	}

};

;// CONCATENATED MODULE: ./src/components/core/InlineManager.js
/**

Job: Positioning inline elements according to their dimensions inside this component

Knows: This component dimensions, and its children dimensions

This module is used for Block composition (Object.assign). A Block is responsible
for the positioning of its inline elements. In order for it to know what is the
size of these inline components, parseParams must be called on its children first.

It's worth noting that a Text is not positioned as a whole, but letter per letter,
in order to create a line break when necessary. It's Text that merge the various letters
in its own updateLayout function.

 */



function InlineManager( Base ) {

	return class InlineManager extends Base {

		/** Compute children .inlines objects position, according to their pre-computed dimensions */
		computeInlinesPosition() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );
			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// got by MeshUIComponent
			const JUSTIFICATION = this.getJustifyContent();
			const ALIGNMENT = this.getTextAlign();

			const INTERLINE = this.getInterLine();

			// Compute lines
			const lines = this.computeLines();
			lines.interLine = INTERLINE;

			/////////////////////////////////////////////////////////////////
			// Position lines according to justifyContent and contentAlign
			/////////////////////////////////////////////////////////////////

			const textHeight = Math.abs( lines.height );

			// Line vertical positioning

			const justificationOffset = ( () => {
				switch ( JUSTIFICATION ) {

					case 'start':
						return (INNER_HEIGHT/2);

					case 'end':
						return textHeight - ( INNER_HEIGHT / 2 );

					case 'center':
						return ( textHeight / 2 );

					default:
						console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

				}
			} )();


			//

			lines.forEach( ( line ) => {

				line.y += justificationOffset;

				line.forEach( ( inline ) => {

					inline.offsetY += justificationOffset;

				} );

			} );

			// Horizontal positioning
			textAlign( lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}


		calculateBestFit( bestFit ) {

			if ( this.childrenInlines.length === 0 ) return;

			switch ( bestFit ) {
				case 'grow':
					this.calculateGrowFit();
					break;
				case 'shrink':
					this.calculateShrinkFit();
					break;
				case 'auto':
					this.calculateAutoFit();
					break;
			}

		}

		calculateGrowFit() {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 1;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					if ( fontMultiplier <= minFontMultiplier ) { // can't shrink text

						this.childrenInlines.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not shrink
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );

		}

		calculateShrinkFit() {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 1;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( fontMultiplier >= maxFontMultiplier ) { // can't grow text

						this.childrenInlines.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not grow
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
		}

		calculateAutoFit()  {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
		}

		/**
		 * computes lines based on children's inlines array.
		 * @private
		 */
		computeLines() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );

			// Will stock the characters of each line, so that we can
			// correct lines position before to merge
			const lines = [ [] ];
			lines.height = 0;

			const INTERLINE = this.getInterLine();

			this.childrenInlines.reduce( ( lastInlineOffset, inlineComponent ) => {

					// Abort condition

					if ( !inlineComponent.inlines ) return;

					//////////////////////////////////////////////////////////////
					// Compute offset of each children according to its dimensions
					//////////////////////////////////////////////////////////////

					const FONTSIZE = inlineComponent._fitFontSize || inlineComponent.getFontSize();
					const LETTERSPACING = inlineComponent.isText ? inlineComponent.getLetterSpacing() * FONTSIZE : 0;
					const WHITESPACE = inlineComponent.getWhiteSpace();
					const BREAKON = inlineComponent.getBreakOn();

					const whiteSpaceOptions = {
						WHITESPACE,
						LETTERSPACING,
						BREAKON,
						INNER_WIDTH
					}

					const currentInlineInfo = inlineComponent.inlines.reduce( ( lastInlineOffset, inline, i, inlines ) => {

						const kerning = inline.kerning ? inline.kerning : 0;
						const xoffset = inline.xoffset ? inline.xoffset : 0;
						const xadvance = inline.xadvance ? inline.xadvance : inline.width;

						// Line break
						const shouldBreak = Whitespace_shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

						if ( shouldBreak ) {

							lines.push( [ inline ] );

							inline.offsetX = xoffset;

							// restart the lastInlineOffset as zero.
							if ( inline.width === 0 ) return 0;

							// compute lastInlineOffset normally
							// except for kerning which won't apply
							// as there is visually no lefthanded glyph to kern with
							return xadvance + LETTERSPACING;

						}

						lines[ lines.length - 1 ].push( inline );

						inline.offsetX = lastInlineOffset + xoffset + kerning;

						return lastInlineOffset + xadvance + kerning + LETTERSPACING;

					}, lastInlineOffset );

					//

					return currentInlineInfo;

				}, 0 );

			// Compute lines dimensions

			let width = 0, height =0, lineOffsetY = -INTERLINE/2;
			lines.forEach( ( line ) => {

				//

				line.lineHeight = line.reduce( ( height, inline ) => {

					const charHeight = inline.lineHeight !== undefined ? inline.lineHeight : inline.height;

					return Math.max( height, charHeight );

				}, 0 );

				//

				line.lineBase = line.reduce( ( lineBase, inline ) => {

					const newLineBase = inline.lineBase !== undefined ? inline.lineBase : inline.height;

					return Math.max( lineBase, newLineBase );

				}, 0 );

				//

				line.width = 0;
				line.height = line.lineHeight;
				const lineHasInlines = line[ 0 ];

				if ( lineHasInlines ) {

					// starts by processing whitespace, it will return a collapsed left offset
					const WHITESPACE = this.getWhiteSpace();
					const whiteSpaceOffset = collapseWhitespaceOnInlines( line, WHITESPACE );

					// apply the collapsed left offset to ensure the starting offset is 0
					line.forEach( ( inline ) => {

						inline.offsetX -= whiteSpaceOffset;

					} );

					// compute its width: length from firstInline:LEFT to lastInline:RIGHT
					line.width = this.computeLineWidth( line );
					if( line.width > width ){
						width = line.width;
					}

					line.forEach( ( inline ) => {

						inline.offsetY = (lineOffsetY - inline.height) - inline.anchor;

						if( inline.lineHeight < line.lineHeight ){
							inline.offsetY -= line.lineBase- inline.lineBase;
						}

					} );

					line.y = lineOffsetY;
					// line.x will be set by textAlign

					height += ( line.lineHeight + INTERLINE );

					lineOffsetY = lineOffsetY - (line.lineHeight + INTERLINE );

				}

			} );

			lines.height = height;
			lines.width = width;


			return lines;
		}

		calculateHeight( fontMultiplier ) {

			this.childrenInlines.forEach( inlineComponent => {

				if ( inlineComponent.isInlineBlock ) return;

				// Set font size and recalculate dimensions
				inlineComponent._fitFontSize = inlineComponent.getFontSize() * fontMultiplier;
				inlineComponent.calculateInlines( inlineComponent._fitFontSize );

			} );

			const lines = this.computeLines();
			return Math.abs( lines.height );
		}

		/**
		 * Compute the width of a line
		 * @param line
		 * @returns {number}
		 */
		computeLineWidth( line ) {

			// only by the length of its extremities
			const firstInline = line[ 0 ];

			const lastInline = line[ line.length - 1 ];

			// Right + Left ( left is negative )
			return (lastInline.offsetX + lastInline.width) + firstInline.offsetX;

		}

	};

}

;// CONCATENATED MODULE: ./src/components/core/FontLibrary.js
/*

Job:
Keeping record of all the loaded fonts, which component use which font,
and load new fonts if necessary

Knows: Which component use which font, loaded fonts

This is one of the only modules in the 'component' folder that is not used
for composition (Object.assign). MeshUIComponent is the only module with
a reference to it, it uses FontLibrary for recording fonts accross components.
This way, if a component uses the same font as another, FontLibrary will skip
loading it twice, even if the two component are not in the same parent/child hierarchy

*/



const fileLoader = new external_THREE_namespaceObject.FileLoader();
const requiredFontFamilies = [];
const fontFamilies = {};

const textureLoader = new external_THREE_namespaceObject.TextureLoader();
const requiredFontTextures = [];
const fontTextures = {};

const records = {};

/**

Called by MeshUIComponent after fontFamily was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
function setFontFamily( component, fontFamily ) {

	if ( typeof fontFamily === 'string' ) {

		loadFontJSON( component, fontFamily );

	} else {

		// keep record of the font that this component use
		if ( !records[ component.id ] ) records[ component.id ] = { component };

		// Ensure the font json is processed
		_buildFriendlyKerningValues( fontFamily );

		records[ component.id ].json = fontFamily;

		component._updateFontFamily( fontFamily );

	}

}

/**

Called by MeshUIComponent after fontTexture was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
function setFontTexture( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontTextures.indexOf( url ) === -1 ) {

		requiredFontTextures.push( url );

		textureLoader.load( url, ( texture ) => {

			texture.generateMipmaps = false;
			texture.minFilter = external_THREE_namespaceObject.LinearFilter;
			texture.magFilter = external_THREE_namespaceObject.LinearFilter;

			fontTextures[ url ] = texture;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].textureURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontTexture( texture );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].textureURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontTextures[ url ] ) {

		component._updateFontTexture( fontTextures[ url ] );

	}

}

/** used by Text to know if a warning must be thrown */
function getFontOf( component ) {

	const record = records[ component.id ];

	if ( !record && component.parentUI ) {

		return getFontOf( component.parentUI );

	}

	return record;

}

/** Load JSON file at the url provided by the user at the component attribute 'fontFamily' */
function loadFontJSON( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontFamilies.indexOf( url ) === -1 ) {

		requiredFontFamilies.push( url );

		fileLoader.load( url, ( text ) => {

			// FileLoader import as  a JSON string
			const font = JSON.parse( text );

			// Ensure the font json is processed
			_buildFriendlyKerningValues( font );

			fontFamilies[ url ] = font;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].jsonURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontFamily( font );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].jsonURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontFamilies[ url ] ) {

		component._updateFontFamily( fontFamilies[ url ] );

	}

}

/**
 * From the original json font kernings array
 * First  : Reduce the number of values by ignoring any kerning defining an amount of 0
 * Second : Update the data structure of kernings from
 * 			{Array} : [{first: 97, second: 121, amount: 0},{first: 97, second: 122, amount: -1},...]
 * 			to
 * 			{Object}: {"ij":-2,"WA":-3,...}}
 *
 * @private
 */
function _buildFriendlyKerningValues( font ) {

	// As "font registering" can comes from different paths : addFont, loadFontJSON, setFontFamily
	// Be sure we don't repeat this operation
	if ( font._kernings ) return;

	const friendlyKernings = {};

	for ( let i = 0; i < font.kernings.length; i++ ) {

		const kerning = font.kernings[ i ];

		// ignore zero kerned glyph pair
		if ( kerning.amount === 0 ) continue;

		// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
		const glyphPair = String.fromCharCode( kerning.first, kerning.second );
		friendlyKernings[ glyphPair ] = kerning.amount;

	}

	// update the font to keep it
	font._kernings = friendlyKernings;

}

/*

This method is intended for adding manually loaded fonts. Method assumes font hasn't been loaded or requested yet. If it was,
font with specified name will be overwritten, but components using it won't be updated.

*/
function addFont( name, json, texture ) {

	texture.generateMipmaps = false;
	texture.minFilter = external_THREE_namespaceObject.LinearFilter;
	texture.magFilter = external_THREE_namespaceObject.LinearFilter;

	requiredFontFamilies.push( name );
	fontFamilies[ name ] = json;

	// Ensure the font json is processed
	_buildFriendlyKerningValues( json );

	if ( texture ) {
		requiredFontTextures.push( name );
		fontTextures[ name ] = texture;
	}
}

//

const FontLibrary = {
	setFontFamily,
	setFontTexture,
	getFontOf,
	addFont
};

/* harmony default export */ const core_FontLibrary = (FontLibrary);

;// CONCATENATED MODULE: ./src/components/core/UpdateManager.js
/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
class UpdateManager {

	/*
	 * get called by MeshUIComponent when component.set has been used.
	 * It registers this component and all its descendants for the different types of updates that were required.
	 */
	static requestUpdate( component, updateParsing, updateLayout, updateInner ) {

		component.traverse( ( child ) => {

			if ( !child.isUI ) return;

			// request updates for all descendants of the passed components
			if ( !this.requestedUpdates[ child.id ] ) {

				this.requestedUpdates[ child.id ] = {
					updateParsing,
					updateLayout,
					updateInner,
					needCallback: ( updateParsing || updateLayout || updateInner )
				};

			} else {

				if ( updateParsing ) this.requestedUpdates[ child.id ].updateParsing = true;
				if ( updateLayout ) this.requestedUpdates[ child.id ].updateLayout = true;
				if ( updateInner ) this.requestedUpdates[ child.id ].updateInner = true;

			}

		} );

	}

	/** Register a passed component for later updates */
	static register( component ) {

		if ( !this.components.includes( component ) ) {

			this.components.push( component );

		}

	}

	/** Unregister a component (when it's deleted for instance) */
	static disposeOf( component ) {

		const idx = this.components.indexOf( component );

		if ( idx > -1 ) {

			this.components.splice( idx, 1 );

		}

	}

	/** Trigger all requested updates of registered components */
	static update() {

		if ( Object.keys( this.requestedUpdates ).length > 0 ) {

			const roots = this.components.filter( ( component ) => {

				return !component.parentUI;

			} );

			roots.forEach( root => this.traverseParsing( root ) );
			roots.forEach( root => this.traverseUpdates( root ) );

		}

	}

	/**
	 * Calls parseParams update of all components from parent to children
	 * @private
	 */
	static traverseParsing( component ) {

		const request = this.requestedUpdates[ component.id ];

		if ( request && request.updateParsing ) {

			component.parseParams();

			request.updateParsing = false;

		}

		component.childrenUIs.forEach( child => this.traverseParsing( child ) );

	}

	/**
	 * Calls updateLayout and updateInner functions of components that need an update
	 * @private
	 */
	static traverseUpdates( component ) {

		const request = this.requestedUpdates[ component.id ];
		// instant remove the requested update,
		// allowing code below ( especially onAfterUpdate ) to add it without being directly remove
		delete this.requestedUpdates[ component.id ];

		//

		if ( request && request.updateLayout ) {

			request.updateLayout = false;

			component.updateLayout();

		}

		//

		if ( request && request.updateInner ) {

			request.updateInner = false;

			component.updateInner();

		}


		// Update any child
		component.childrenUIs.forEach( ( childUI ) => {

			this.traverseUpdates( childUI );

		} );

		// before sending onAfterUpdate
		if ( request && request.needCallback ) {

			component.onAfterUpdate();

		}

	}

}

// TODO move these into the class (Webpack unfortunately doesn't understand
// `static` property syntax, despite browsers already supporting this)
UpdateManager.components = [];
UpdateManager.requestedUpdates = {};

;// CONCATENATED MODULE: ./src/utils/Defaults.js









/** List the default values of the lib components */
/* harmony default export */ const Defaults = ({
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal', // FontKerning would act like css : "none"|"normal"|"auto"("auto" not yet implemented)
	bestFit: 'none',
	offset: 0.01,
	interLine: 0.01,
	breakOn: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: PRE_LINE,
	contentDirection: COLUMN,
	alignItems: CENTER,
	justifyContent: JustifyContent_START,
	textAlign: TextAlign_CENTER,
	textType: 'MSDF',
	fontColor: new external_THREE_namespaceObject.Color( 0xffffff ),
	fontOpacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	borderRadius: 0.01,
	borderWidth: 0,
	borderColor: new external_THREE_namespaceObject.Color( 'black' ),
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: new external_THREE_namespaceObject.Color( 0x222222 ),
	backgroundWhiteColor: new external_THREE_namespaceObject.Color( 0xffffff ),
	backgroundOpacity: 0.8,
	backgroundOpaqueOpacity: 1.0,
	// this default value is a function to avoid initialization issues (see issue #126)
	getDefaultTexture,
	hiddenOverflow: false,
	letterSpacing: 0
});

//

let defaultTexture;

function getDefaultTexture() {

	if ( !defaultTexture ) {

		const ctx = document.createElement( 'canvas' ).getContext( '2d' );
		ctx.canvas.width = 1;
		ctx.canvas.height = 1;
		ctx.fillStyle = '#ffffff';
		ctx.fillRect( 0, 0, 1, 1 );
		defaultTexture = new external_THREE_namespaceObject.CanvasTexture( ctx.canvas );
		defaultTexture.isDefault = true;

	}

	return defaultTexture;

}

;// CONCATENATED MODULE: ./src/components/core/MeshUIComponent.js









/**

Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

 */
function MeshUIComponent( Base ) {

	return class MeshUIComponent extends Base {

		constructor( options ) {

			super( options );

			this.states = {};
			this.currentState = undefined;
			this.isUI = true;
			this.autoLayout = true;

			// children
			this.childrenUIs = [];
			this.childrenBoxes = [];
			this.childrenTexts = [];
			this.childrenInlines = [];

			// parents
			this.parentUI = null;
			// update parentUI when this component will be added or removed
			this.addEventListener( 'added', this._rebuildParentUI );
			this.addEventListener( 'removed', this._rebuildParentUI );
		}

		/////////////
		/// GETTERS
		/////////////

		getClippingPlanes() {

			const planes = [];

			if ( this.parentUI ) {

				if ( this.isBlock && this.parentUI.getHiddenOverflow() ) {

					const yLimit = ( this.parentUI.getHeight() / 2 ) - ( this.parentUI.padding || 0 );
					const xLimit = ( this.parentUI.getWidth() / 2 ) - ( this.parentUI.padding || 0 );

					const newPlanes = [
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 0, 1, 0 ), yLimit ),
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 0, -1, 0 ), yLimit ),
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 1, 0, 0 ), xLimit ),
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( -1, 0, 0 ), xLimit )
					];

					newPlanes.forEach( plane => {

						plane.applyMatrix4( this.parent.matrixWorld );

					} );

					planes.push( ...newPlanes );

				}

				if ( this.parentUI.parentUI ) {

					planes.push( ...this.parentUI.getClippingPlanes() );

				}

			}

			return planes;

		}

		/** Get the highest parent of this component (the parent that has no parent on top of it) */
		getHighestParent() {

			if ( !this.parentUI ) {

				return this;

			}

			return this.parent.getHighestParent();


		}

		/**
		 * look for a property in this object, and if does not find it, find in parents or return default value
		 * @private
		 */
		_getProperty( propName ) {

			if ( this[ propName ] === undefined && this.parentUI ) {

				return this.parent._getProperty( propName );

			} else if ( this[ propName ] !== undefined ) {

				return this[ propName ];

			}

			return Defaults[ propName ];

		}

		//

		getFontSize() {

			return this._getProperty( 'fontSize' );

		}

		getFontKerning() {

			return this._getProperty( 'fontKerning' );

		}

		getLetterSpacing() {

			return this._getProperty( 'letterSpacing' );

		}

		getFontTexture() {

			if ( this[ 'fontTexture' ] === undefined && this.parentUI ) {

				return this.parent._getProperty( 'fontTexture' );

			} else if ( this[ 'fontTexture' ] !== undefined ) {

				return this[ 'fontTexture' ];

			}

			return Defaults.getDefaultTexture();

		}

		getFontFamily() {

			return this._getProperty( 'fontFamily' );

		}

		getBreakOn() {

			return this._getProperty( 'breakOn' );

		}

		getWhiteSpace() {

			return this._getProperty( 'whiteSpace' );

		}

		getTextAlign() {

			return this._getProperty( 'textAlign' );

		}

		getTextType() {

			return this._getProperty( 'textType' );

		}

		getFontColor() {

			return this._getProperty( 'fontColor' );

		}


		getFontSupersampling() {

			return this._getProperty( 'fontSupersampling' );

		}

		getFontOpacity() {

			return this._getProperty( 'fontOpacity' );

		}

		getFontPXRange() {

			return this._getProperty( 'fontPXRange' );

		}

		getBorderRadius() {

			return this._getProperty( 'borderRadius' );

		}

		getBorderWidth() {

			return this._getProperty( 'borderWidth' );

		}

		getBorderColor() {

			return this._getProperty( 'borderColor' );

		}

		getBorderOpacity() {

			return this._getProperty( 'borderOpacity' );

		}

		/// SPECIALS

		/** return the first parent with a 'threeOBJ' property */
		getContainer() {

			if ( !this.threeOBJ && this.parent ) {

				return this.parent.getContainer();

			} else if ( this.threeOBJ ) {

				return this;

			}

			return Defaults.container;


		}

		/** Get the number of UI parents above this elements (0 if no parent) */
		getParentsNumber( i ) {

			i = i || 0;

			if ( this.parentUI ) {

				return this.parentUI.getParentsNumber( i + 1 );

			}

			return i;

		}

		////////////////////////////////////
		/// GETTERS WITH NO PARENTS LOOKUP
		////////////////////////////////////

		getBackgroundOpacity() {

			return ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
				Defaults.backgroundOpacity : this.backgroundOpacity;

		}

		getBackgroundColor() {

			return this.backgroundColor || Defaults.backgroundColor;

		}

		getBackgroundTexture() {

			return this.backgroundTexture || Defaults.getDefaultTexture();

		}

		/**
		 * @deprecated
		 * @returns {string}
		 */
		getAlignContent() {

			return this.alignContent || Defaults.alignContent;

		}

		getAlignItems() {

			return this.alignItems || Defaults.alignItems;

		}

		getContentDirection() {

			return this.contentDirection || Defaults.contentDirection;

		}

		getJustifyContent() {

			return this.justifyContent || Defaults.justifyContent;

		}

		getInterLine() {

			return ( this.interLine === undefined ) ? Defaults.interLine : this.interLine;

		}

		getOffset() {

			return ( this.offset === undefined ) ? Defaults.offset : this.offset;

		}

		getBackgroundSize() {

			return ( this.backgroundSize === undefined ) ? Defaults.backgroundSize : this.backgroundSize;

		}

		getHiddenOverflow() {

			return ( this.hiddenOverflow === undefined ) ? Defaults.hiddenOverflow : this.hiddenOverflow;

		}

		getBestFit() {

			return ( this.bestFit === undefined ) ? Defaults.bestFit : this.bestFit;

		}

		///////////////
		///  UPDATE
		///////////////

		/**
		 * Filters children in order to compute only one times children lists
		 * @private
		 */
		_rebuildChildrenLists() {

			// Stores all children that are ui
			this.childrenUIs = this.children.filter( child => child.isUI );

			// Stores all children that are box
			this.childrenBoxes = this.children.filter( child => child.isBoxComponent );

			// Stores all children that are inline
			this.childrenInlines = this.children.filter( child => child.isInline );

			// Stores all children that are text
			this.childrenTexts = this.children.filter( child => child.isText );
		}

		/**
		 * Try to retrieve parentUI after each structural change
		 * @private
		 */
		_rebuildParentUI = ( ) => {

			if ( this.parent && this.parent.isUI ) {

				this.parentUI = this.parent;

			} else {

				this.parentUI = null;

			}

		};

		/**
		 * When the user calls component.add, it registers for updates,
		 * then call THREE.Object3D.add.
		 */
		add() {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isInline ) this.update( null, true );

			}

			const result = super.add( ...arguments );

			this._rebuildChildrenLists();

			return result;

		}

		/**
		 * When the user calls component.remove, it registers for updates,
		 * then call THREE.Object3D.remove.
		 */
		remove() {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isInline ) this.update( null, true );

			}

			const result = super.remove( ...arguments );

			this._rebuildChildrenLists();

			return result;

		}

		//

		update( updateParsing, updateLayout, updateInner ) {

			UpdateManager.requestUpdate( this, updateParsing, updateLayout, updateInner );

		}

		onAfterUpdate() {

		}

		/**
		 * Called by FontLibrary when the font requested for the current component is ready.
		 * Trigger an update for the component whose font is now available.
		 * @private - "package protected"
		 */
		_updateFontFamily( font ) {

			this.fontFamily = font;

			this.traverse( ( child ) => {

				if ( child.isUI ) child.update( true, true, false );

			} );

			this.getHighestParent().update( false, true, false );

		}

		/** @private - "package protected" */
		_updateFontTexture( texture ) {

			this.fontTexture = texture;

			this.getHighestParent().update( false, true, false );

		}

		/**
		 * Set this component's passed parameters.
		 * If necessary, take special actions.
		 * Update this component unless otherwise specified.
		 */
		set( options ) {

			let parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate;

			// Register to the update manager, so that it knows when to update

			UpdateManager.register( this );

			// Abort if no option passed

			if ( !options || JSON.stringify( options ) === JSON.stringify( {} ) ) return;

			// DEPRECATION Warnings until -------------------------------------- 7.x.x ---------------------------------------

			// Align content has been removed
			if( options["alignContent"] ){

				options["alignItems"] = options["alignContent"];

				if( !options["textAlign"] ){

					options["textAlign"] = options["alignContent"];

				}

				console.warn("`alignContent` property has been deprecated, please rely on `alignItems` and `textAlign` instead.")

				delete options["alignContent"];

			}

			// Align items left top bottom right will be removed
			if( options['alignItems'] ){

				warnAboutDeprecatedAlignItems( options['alignItems'] );

			}


			// Set this component parameters according to options, and trigger updates accordingly
			// The benefit of having two types of updates, is to put everthing that takes time
			// in one batch, and the rest in the other. This way, efficient animation is possible with
			// attribute from the light batch.

			for ( const prop of Object.keys( options ) ) {

				if ( this[ prop ] != options[ prop ] ) {

					switch ( prop ) {

						case 'content' :
						case 'fontSize' :
						case 'fontKerning' :
						case 'breakOn':
						case 'whiteSpace':
							if ( this.isText ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'bestFit' :
							if ( this.isBlock ) {
								parsingNeedsUpdate = true;
								layoutNeedsUpdate = true;
							}
							this[ prop ] = options[ prop ];
							break;

						case 'width' :
						case 'height' :
						case 'padding' :
							if ( this.isInlineBlock || ( this.isBlock && this.getBestFit() != 'none' ) ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'letterSpacing' :
						case 'interLine' :
							if ( this.isBlock && this.getBestFit() != 'none' ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'margin' :
						case 'contentDirection' :
						case 'justifyContent' :
						case 'alignContent' :
						case 'alignItems' :
						case 'textAlign' :
						case 'textType' :
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'fontColor' :
						case 'fontOpacity' :
						case 'fontSupersampling' :
						case 'offset' :
						case 'backgroundColor' :
						case 'backgroundOpacity' :
						case 'backgroundTexture' :
						case 'backgroundSize' :
						case 'borderRadius' :
						case 'borderWidth' :
						case 'borderColor' :
						case 'borderOpacity' :
							innerNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'hiddenOverflow' :
							this[ prop ] = options[ prop ];
							break;

					}

				}

			}

			// special cases, this.update() must be called only when some files finished loading

			if ( options.fontFamily ) {

				core_FontLibrary.setFontFamily( this, options.fontFamily );

			}

			if ( options.fontTexture ) {

				core_FontLibrary.setFontTexture( this, options.fontTexture );

			}

			// if font kerning changes for a child of a block with Best Fit enabled, we need to trigger parsing for the parent as well.
			if ( this.parentUI && this.parentUI.getBestFit() != 'none' ) this.parentUI.update( true, true, false );

			// Call component update

			this.update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );


			if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );

		}

		/////////////////////
		// STATES MANAGEMENT
		/////////////////////

		/** Store a new state in this component, with linked attributes */
		setupState( options ) {

			this.states[ options.state ] = {
				attributes: options.attributes,
				onSet: options.onSet
			};

		}

		/** Set the attributes of a stored state of this component */
		setState( state ) {

			const savedState = this.states[ state ];

			if ( !savedState ) {
				console.warn( `state "${state}" does not exist within this component:`, this.name );
				return;
			}

			if ( state === this.currentState ) return;

			this.currentState = state;

			if ( savedState.onSet ) savedState.onSet();

			if ( savedState.attributes ) this.set( savedState.attributes );

		}

		/** Get completely rid of this component and its children, also unregister it for updates */
		clear() {

			this.traverse( ( obj ) => {

				UpdateManager.disposeOf( obj );

				if ( obj.material ) obj.material.dispose();

				if ( obj.geometry ) obj.geometry.dispose();

			} );

		}
	};

}

;// CONCATENATED MODULE: ./src/components/core/MaterialManager.js
/* eslint-disable camelcase */
//@TODO: Get rid of non camelcase uniforms




/**

Job:
- Host the materials of a given component.
- Update a component's materials clipping planes.
- Update a material uniforms and such.

Knows:
- Its component materials.
- Its component ancestors clipping planes.

 */
function MaterialManager( Base ) {

	return class MaterialManager extends Base {

		constructor( options ) {

			super( options );

			this.textUniforms = {
				u_texture: { value: this.getFontTexture() },
				u_color: { value: this.getFontColor() },
				u_opacity: { value: this.getFontOpacity() },
				u_pxRange: { value: this.getFontPXRange() },
				u_useRGSS: { value: this.getFontSupersampling() },
			};

			this.backgroundUniforms = {
				u_texture: { value: this.getBackgroundTexture() },
				u_color: { value: this.getBackgroundColor() },
				u_opacity: { value: this.getBackgroundOpacity() },
				u_backgroundMapping: { value: this.getBackgroundSize() },
				u_borderWidth: { value: this.getBorderWidth() },
				u_borderColor: { value: this.getBorderColor() },
				u_borderRadiusTopLeft: { value: this.getBorderRadius() },
				u_borderRadiusTopRight: { value: this.getBorderRadius() },
				u_borderRadiusBottomRight: { value: this.getBorderRadius() },
				u_borderRadiusBottomLeft: { value: this.getBorderRadius() },
				u_borderOpacity: { value: this.getBorderOpacity() },
				u_size: { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) },
				u_tSize: { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) }
			};

		}

		/**
		 * Update backgroundMaterial uniforms.
		 * Used within MaterialManager and in Block and InlineBlock innerUpdates.
		 */
		updateBackgroundMaterial() {

			this.backgroundUniforms.u_texture.value = this.getBackgroundTexture();

			this.backgroundUniforms.u_tSize.value.set(
				this.backgroundUniforms.u_texture.value.image.width,
				this.backgroundUniforms.u_texture.value.image.height
			);

			if ( this.size ) this.backgroundUniforms.u_size.value.copy( this.size );

			if ( this.backgroundUniforms.u_texture.value.isDefault ) {

				this.backgroundUniforms.u_color.value = this.getBackgroundColor();

				this.backgroundUniforms.u_opacity.value = this.getBackgroundOpacity();

			} else {

				this.backgroundUniforms.u_color.value = this.backgroundColor || Defaults.backgroundWhiteColor;

				this.backgroundUniforms.u_opacity.value = ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
					Defaults.backgroundOpaqueOpacity :
					this.backgroundOpacity;

			}

			this.backgroundUniforms.u_backgroundMapping.value = ( () => {

				switch ( this.getBackgroundSize() ) {

					case 'stretch':
						return 0;
					case 'contain':
						return 1;
					case 'cover':
						return 2;

				}

			} )();

			const borderRadius = this.getBorderRadius();
			this.backgroundUniforms.u_borderWidth.value = this.getBorderWidth();
			this.backgroundUniforms.u_borderColor.value = this.getBorderColor();
			this.backgroundUniforms.u_borderOpacity.value = this.getBorderOpacity();

			//

			if ( Array.isArray( borderRadius ) ) {

				this.backgroundUniforms.u_borderRadiusTopLeft.value = borderRadius[ 0 ];
				this.backgroundUniforms.u_borderRadiusTopRight.value = borderRadius[ 1 ];
				this.backgroundUniforms.u_borderRadiusBottomRight.value = borderRadius[ 2 ];
				this.backgroundUniforms.u_borderRadiusBottomLeft.value = borderRadius[ 3 ];

			} else {

				this.backgroundUniforms.u_borderRadiusTopLeft.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusTopRight.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusBottomRight.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusBottomLeft.value = borderRadius;

			}

		}

		/**
		 * Update backgroundMaterial uniforms.
		 * Used within MaterialManager and in Text innerUpdates.
		 */
		updateTextMaterial() {

			this.textUniforms.u_texture.value = this.getFontTexture();
			this.textUniforms.u_color.value = this.getFontColor();
			this.textUniforms.u_opacity.value = this.getFontOpacity();
			this.textUniforms.u_pxRange.value = this.getFontPXRange();
			this.textUniforms.u_useRGSS.value = this.getFontSupersampling();

		}

		/** Called by Block, which needs the background material to create a mesh */
		getBackgroundMaterial() {

			if ( !this.backgroundMaterial || !this.backgroundUniforms ) {

				this.backgroundMaterial = this._makeBackgroundMaterial();

			}

			return this.backgroundMaterial;

		}

		/** Called by Text to get the font material */
		getFontMaterial() {

			if ( !this.fontMaterial || !this.textUniforms ) {

				this.fontMaterial = this._makeTextMaterial();

			}

			return this.fontMaterial;

		}

		/** @private */
		_makeTextMaterial() {

			return new external_THREE_namespaceObject.ShaderMaterial( {
				uniforms: this.textUniforms,
				transparent: true,
				clipping: true,
				vertexShader: textVertex,
				fragmentShader: textFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

		/** @private */
		_makeBackgroundMaterial() {

			return new external_THREE_namespaceObject.ShaderMaterial( {
				uniforms: this.backgroundUniforms,
				transparent: true,
				clipping: true,
				vertexShader: backgroundVertex,
				fragmentShader: backgroundFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

		/**
		 * Update a component's materials clipping planes.
		 * Called every frame.
		 */
		updateClippingPlanes( value ) {

			const newClippingPlanes = value !== undefined ? value : this.getClippingPlanes();

			if ( JSON.stringify( newClippingPlanes ) !== JSON.stringify( this.clippingPlanes ) ) {

				this.clippingPlanes = newClippingPlanes;

				if ( this.fontMaterial ) this.fontMaterial.clippingPlanes = this.clippingPlanes;

				if ( this.backgroundMaterial ) this.backgroundMaterial.clippingPlanes = this.clippingPlanes;

			}

		}

	};

}

////////////////
// Text shaders
////////////////

const textVertex = `
varying vec2 vUv;

#include <clipping_planes_pars_vertex>

void main() {

	vUv = uv;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	gl_Position.z -= 0.00001;

	#include <clipping_planes_vertex>

}
`;

//

const textFragment = `

uniform sampler2D u_texture;
uniform vec3 u_color;
uniform float u_opacity;
uniform float u_pxRange;
uniform bool u_useRGSS;

varying vec2 vUv;

#include <clipping_planes_pars_fragment>

// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field

float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}

float screenPxRange() {
	vec2 unitRange = vec2(u_pxRange)/vec2(textureSize(u_texture, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUv);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}

float tap(vec2 offsetUV) {
	vec3 msd = texture( u_texture, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}

void main() {

	float alpha;

	if ( u_useRGSS ) {

		// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
		// per pixel partial derivatives
		vec2 dx = dFdx(vUv);
		vec2 dy = dFdy(vUv);

		// rotated grid uv offsets
		vec2 uvOffsets = vec2(0.125, 0.375);
		vec2 offsetUV = vec2(0.0, 0.0);

		// supersampled using 2x2 rotated grid
		alpha = 0.0;
		offsetUV.xy = vUv + uvOffsets.x * dx + uvOffsets.y * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv - uvOffsets.x * dx - uvOffsets.y * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv + uvOffsets.y * dx - uvOffsets.x * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv - uvOffsets.y * dx + uvOffsets.x * dy;
		alpha += tap(offsetUV);
		alpha *= 0.25;

	} else {

		alpha = tap( vUv );

	}


	// apply the opacity
	alpha *= u_opacity;

	// this is useful to avoid z-fighting when quads overlap because of kerning
	if ( alpha < 0.02) discard;


	gl_FragColor = vec4( u_color, alpha );

	#include <clipping_planes_fragment>

}
`;

//////////////////////
// Background shaders
//////////////////////

const backgroundVertex = `
varying vec2 vUv;

#include <clipping_planes_pars_vertex>

void main() {

	vUv = uv;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>

}
`;

//

const backgroundFragment = `

uniform sampler2D u_texture;
uniform vec3 u_color;
uniform float u_opacity;

uniform float u_borderRadiusTopLeft;
uniform float u_borderRadiusTopRight;
uniform float u_borderRadiusBottomLeft;
uniform float u_borderRadiusBottomRight;
uniform float u_borderWidth;
uniform vec3 u_borderColor;
uniform float u_borderOpacity;
uniform vec2 u_size;
uniform vec2 u_tSize;
uniform int u_backgroundMapping;

varying vec2 vUv;

#include <clipping_planes_pars_fragment>

float getEdgeDist() {
	vec2 ndc = vec2( vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0 );
	vec2 planeSpaceCoord = vec2( u_size.x * 0.5 * ndc.x, u_size.y * 0.5 * ndc.y );
	vec2 corner = u_size * 0.5;
	vec2 offsetCorner = corner - abs( planeSpaceCoord );
	float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;
	if (vUv.x < 0.5 && vUv.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopLeft, 0.0 ) ) - u_borderRadiusTopLeft;
		float s = step( innerRadDist * -1.0, u_borderRadiusTopLeft );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x >= 0.5 && vUv.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopRight, 0.0 ) ) - u_borderRadiusTopRight;
		float s = step( innerRadDist * -1.0, u_borderRadiusTopRight );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x >= 0.5 && vUv.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomRight, 0.0 ) ) - u_borderRadiusBottomRight;
		float s = step( innerRadDist * -1.0, u_borderRadiusBottomRight );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x < 0.5 && vUv.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomLeft, 0.0 ) ) - u_borderRadiusBottomLeft;
		float s = step( innerRadDist * -1.0, u_borderRadiusBottomLeft );
		return mix( innerRadDist, roundedDist, s );
	}
}

vec4 sampleTexture() {
	float textureRatio = u_tSize.x / u_tSize.y;
	float panelRatio = u_size.x / u_size.y;
	vec2 uv = vUv;
	if ( u_backgroundMapping == 1 ) { // contain
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ( panelRatio / textureRatio );
			newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ( textureRatio / panelRatio );
			newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
			uv.y = newY;
		}
	} else if ( u_backgroundMapping == 2 ) { // cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ( textureRatio / panelRatio );
			newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ( panelRatio / textureRatio );
			newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
			uv.x = newX;
		}
	}
	return texture2D( u_texture, uv ).rgba;
}

void main() {

	float edgeDist = getEdgeDist();
	float change = fwidth( edgeDist );

	vec4 textureSample = sampleTexture();
	vec3 blendedColor = textureSample.rgb * u_color;

	float alpha = smoothstep( change, 0.0, edgeDist );
	float blendedOpacity = u_opacity * textureSample.a * alpha;

	vec4 frameColor = vec4( blendedColor, blendedOpacity );

	if ( u_borderWidth <= 0.0 ) {
		gl_FragColor = frameColor;
	} else {
		vec4 borderColor = vec4( u_borderColor, u_borderOpacity * alpha );
		float stp = smoothstep( edgeDist + change, edgeDist, u_borderWidth * -1.0 );
		gl_FragColor = mix( frameColor, borderColor, stp );
	}

	#include <clipping_planes_fragment>
}
`;

;// CONCATENATED MODULE: ./src/content/Frame.js



/**
 * Returns a basic plane mesh.
 */
class Frame extends external_THREE_namespaceObject.Mesh {

	constructor( material ) {

		const geometry = new external_THREE_namespaceObject.PlaneGeometry();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

		this.name = 'MeshUI-Frame';

	}

}

;// CONCATENATED MODULE: ./src/utils/mix.js
let _Base = null;

/**
 * A function for applying multiple mixins more tersely (less verbose)
 * @param {Function[]} mixins - All args to this function should be mixins that take a class and return a class.
 */
function mix( ...mixins ) {

	// console.log('initial Base: ', _Base);

	if( !_Base ){
		throw new Error("Cannot use mixins with Base null");
	}

	let Base = _Base;

	_Base = null;

	let i = mixins.length;
	let mixin;

	while ( --i >= 0 ) {

		mixin = mixins[ i ];
		Base = mixin( Base );

	}

	return Base;

}

mix.withBase = ( Base ) => {

	_Base = Base;

	return mix;

};

;// CONCATENATED MODULE: ./src/components/Block.js










/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes

 */
class Block extends mix.withBase( external_THREE_namespaceObject.Object3D )(
	BoxComponent,
	InlineManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isBlock = true;

		//

		this.size = new external_THREE_namespaceObject.Vector2( 1, 1 );

		this.frame = new Frame( this.getBackgroundMaterial() );

		// This is for hiddenOverflow to work
		this.frame.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this.frame );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {

		const bestFit = this.getBestFit();

		if ( bestFit != 'none' && this.childrenTexts.length ) {

			this.calculateBestFit( bestFit );

		} else {

			this.childrenTexts.forEach( child => {

				child._fitFontSize = undefined;

			} );
		}
	}

	updateLayout() {

		// Get temporary dimension

		const WIDTH = this.getWidth();

		const HEIGHT = this.getHeight();

		if ( !WIDTH || !HEIGHT ) {

			console.warn( 'Block got no dimension from its parameters or from children parameters' );
			return;

		}

		this.size.set( WIDTH, HEIGHT );
		this.frame.scale.set( WIDTH, HEIGHT, 1 );

		if ( this.frame ) this.updateBackgroundMaterial();

		this.frame.renderOrder = this.getParentsNumber();

		// Position this element according to earlier parent computation.
		// Delegate to BoxComponent.

		if ( this.autoLayout ) {

			this.setPosFromParentRecords();

		}

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.childrenInlines.length ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

	}

	//

	updateInner() {

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

		if ( this.frame ) this.updateBackgroundMaterial();

	}

}

;// CONCATENATED MODULE: ./src/components/core/InlineComponent.js
/**

Job: nothing yet, but adding a isInline parameter to an inline component

Knows: parent dimensions

 */
function InlineComponent( Base ) {

	return class InlineComponent extends Base {

		constructor( options ) {

			super( options );

			this.isInline = true;

		}

	};
}

;// CONCATENATED MODULE: ./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js


function computeTangents() {

	throw new Error( 'BufferGeometryUtils: computeTangents renamed to computeMikkTSpaceTangents.' );

}

function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const srcArray = attribute.isInterleavedBufferAttribute ? attribute.data.array : attribute.array;
			const dstArray = new Float32Array( attribute.getCount() * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.getCount(); i ++ ) {

				dstArray[ j ++ ] = MathUtils.denormalize( attribute.getX( i ), srcArray );
				dstArray[ j ++ ] = MathUtils.denormalize( attribute.getY( i ), srcArray );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = MathUtils.denormalize( attribute.getZ( i ), srcArray );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeBufferGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new external_THREE_namespaceObject.BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		// gather .userData

		mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
		mergedGeometry.userData.mergedUserData.push( geometry.userData );

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeBufferAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( attribute.isInterleavedBufferAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
			return null;

		}

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.array.length;

	}

	const array = new TypedArray( arrayLength );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		array.set( attributes[ i ].array, offset );

		offset += attributes[ i ].array.length;

	}

	return new external_THREE_namespaceObject.BufferAttribute( array, itemSize, normalized );

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {Array<InterleavedBufferAttribute>}
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

// returns a new, non-interleaved version of the provided attribute
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

// deinterleaves all attributes on the geometry
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * @param {Array<BufferGeometry>} geometry
 * @return {number}
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry>}
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const attrArrays = {};
	const morphAttrsArrays = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];

	// initialize the arrays
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];

		attrArrays[ name ] = [];

		const morphAttr = geometry.morphAttributes[ name ];
		if ( morphAttr ) {

			morphAttrsArrays[ name ] = new Array( morphAttr.length ).fill().map( () => [] );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const decimalShift = Math.log10( 1 / tolerance );
	const shiftMultiplier = Math.pow( 10, decimalShift );
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * shiftMultiplier ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the attribute arrays
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttr = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newarray = attrArrays[ name ];
				const newMorphArrays = morphAttrsArrays[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					newarray.push( attribute[ getterFunc ]( index ) );

					if ( morphAttr ) {

						for ( let m = 0, ml = morphAttr.length; m < ml; m ++ ) {

							newMorphArrays[ m ].push( morphAttr[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// Generate typed arrays from new attribute arrays and update
	// the attributeBuffers
	const result = geometry.clone();
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const oldAttribute = geometry.getAttribute( name );

		const buffer = new oldAttribute.array.constructor( attrArrays[ name ] );
		const attribute = new BufferAttribute( buffer, oldAttribute.itemSize, oldAttribute.normalized );

		result.setAttribute( name, attribute );

		// Update the attribute arrays
		if ( name in morphAttrsArrays ) {

			for ( let j = 0; j < morphAttrsArrays[ name ].length; j ++ ) {

				const oldMorphAttribute = geometry.morphAttributes[ name ][ j ];

				const buffer = new oldMorphAttribute.array.constructor( morphAttrsArrays[ name ][ j ] );
				const morphAttribute = new BufferAttribute( buffer, oldMorphAttribute.itemSize, oldMorphAttribute.normalized );
				result.morphAttributes[ name ][ j ] = morphAttribute;

			}

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} drawMode
 * @return {BufferGeometry>}
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 * Helpful for Raytracing or Decals.
 * @param {Mesh | Line | Points} object An instance of Mesh, Line or Points.
 * @return {Object} An Object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	if ( object.geometry.isBufferGeometry !== true ) {

		console.error( 'THREE.BufferGeometryUtils: Geometry is not of type BufferGeometry.' );
		return null;

	}

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.boneTransform( a, _vA );
			object.boneTransform( b, _vB );
			object.boneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}



;// CONCATENATED MODULE: ./src/content/MSDFGlyph.js


/**
 * Job: create a plane geometry with the right UVs to map the MSDF texture on the wanted glyph.
 *
 * Knows: dimension of the plane to create, specs of the font used, glyph requireed
 */
class MSDFGlyph extends external_THREE_namespaceObject.PlaneGeometry {

	constructor( inline, font ) {

		const char = inline.glyph;
		const fontSize = inline.fontSize;

		// super( fontSize, fontSize );
		super( inline.width, inline.height );

		// Misc glyphs
		if ( char.match( /\s/g ) === null ) {

			if ( font.info.charset.indexOf( char ) === -1 ) console.error( `The character '${char}' is not included in the font characters set.` );

			this.mapUVs( font, char );

			this.transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this.nullifyUVs();

			this.scale( 0, 0, 1 );
			this.translate( 0, fontSize / 2, 0 );

		}

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @private
	 */
	mapUVs( font, char ) {

		const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

		const common = font.common;

		const xMin = charOBJ.x / common.scaleW;

		const xMax = ( charOBJ.x + charOBJ.width ) / common.scaleW;

		const yMin = 1 - ( ( charOBJ.y + charOBJ.height ) / common.scaleH );

		const yMax = 1 - ( charOBJ.y / common.scaleH );

		//

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			let u = uvAttribute.getX( i );
			let v = uvAttribute.getY( i );

			[ u, v ] = ( () => {

				switch ( i ) {

					case 0 :
						return [ xMin, yMax ];
					case 1 :
						return [ xMax, yMax ];
					case 2 :
						return [ xMin, yMin ];
					case 3 :
						return [ xMax, yMin ];

				}

			} )();

			uvAttribute.setXY( i, u, v );

		}

	}

	/** Set all UVs to 0, so that none of the glyphs on the texture will appear */
	nullifyUVs() {

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			uvAttribute.setXY( i, 0, 0 );

		}

	}

	/** Gives the previously computed scale and offset to the geometry */
	transformGeometry( inline ) {

		this.translate(
			inline.width / 2,
				inline.height / 2,
			0
		);

	}

}

;// CONCATENATED MODULE: ./src/content/MSDFText.js





/**

Job:
- Computing glyphs dimensions according to this component's font and content
- Create the text Mesh (call MSDFGlyph for each letter)

Knows:
- The Text component for which it creates Meshes
- The parameters of the text mesh it must return

 */

function getGlyphDimensions( options ) {

	const FONT = options.font;

	const FONT_SIZE = options.fontSize;

	const GLYPH = options.glyph;

	const SCALE_MULT = FONT_SIZE / FONT.info.size;

	//

	const charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

	let width = charOBJ ? charOBJ.width * SCALE_MULT : FONT_SIZE / 3;

	let height = charOBJ ? charOBJ.height * SCALE_MULT : 0;

	// handle exported whitespaces
	if ( width === 0 ) {

		// if this whitespaces in is the charset, use its xadvance value
		// or fallback to fontSize
		width = charOBJ ? charOBJ.xadvance * SCALE_MULT : FONT_SIZE;

	}


	if ( height === 0 ) height = FONT_SIZE * 0.7;

	if ( GLYPH === '\n' ) width = 0;

	const xadvance = charOBJ ? charOBJ.xadvance * SCALE_MULT : width;
	const xoffset = charOBJ ? charOBJ.xoffset * SCALE_MULT : 0;

	// world-space length between lowest point and the text cursor position
	// const anchor = charOBJ ? ( ( charOBJ.yoffset + charOBJ.height - FONT.common.base ) * FONT_SIZE ) / FONT.common.lineHeight : 0;

	const anchor = charOBJ ? charOBJ.yoffset * SCALE_MULT : 0;

	// console.log( lineHeight )

	return {
		// lineHeight,
		width,
		height,
		anchor,
		xadvance,
		xoffset
	};

}


/**
 * Try to find the kerning amount of a
 * @param font
 * @param {string} glyphPair
 * @returns {number}
 */
function getGlyphPairKerning( font, glyphPair ) {

	const KERNINGS = font._kernings;
	return KERNINGS[ glyphPair ] ? KERNINGS[ glyphPair ] : 0;

}


//

/**
 * Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
 * glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
 * creates a THREE.Mesh, returns it.
 * @private
 */
function buildText() {

	const translatedGeom = [];

	this.inlines.forEach( ( inline, i ) => {

		translatedGeom[ i ] = new MSDFGlyph( inline, this.getFontFamily() );

		translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

	} );

	const mergedGeom = mergeBufferGeometries( translatedGeom );

	const mesh = new external_THREE_namespaceObject.Mesh( mergedGeom, this.getFontMaterial() );

	return mesh;

}

//

/* harmony default export */ const MSDFText = ({
	getGlyphDimensions,
	getGlyphPairKerning,
	buildText
});

;// CONCATENATED MODULE: ./src/components/core/TextManager.js


/**

Job:
- Routing the request for Text dimensions and Text creation depending on Text type.

Knows:
- this component's textType attribute

Note:
Only one Text type is natively supported by the library at the moment,
but the architecture allows you to easily stick in your custom Text type.
More information here :
https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type

 */
function TextManager( Base ) {

	return class TextManager extends Base {

		createText() {

			const component = this;

			const mesh = ( () => {

				switch ( this.getTextType() ) {

					case 'MSDF' :
						return MSDFText.buildText.call( this );

					default :
						console.warn( `'${this.getTextType()}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
						break;

				}

			} )();

			mesh.renderOrder = Infinity;

			// This is for hiddenOverflow to work
			mesh.onBeforeRender = function () {

				if ( component.updateClippingPlanes ) {

					component.updateClippingPlanes();

				}

			};

			return mesh;

		}

		/**
		 * Called by Text to get the dimensions of a particular glyph,
		 * in order for InlineManager to compute its position
		 */
		getGlyphDimensions( options ) {

			switch ( options.textType ) {

				case 'MSDF' :

					return MSDFText.getGlyphDimensions( options );

				default :
					console.warn( `'${options.textType}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
					break;

			}

		}


		/**
		 * Called by Text to get the amount of kerning for pair of glyph
		 * @param textType
		 * @param font
		 * @param glyphPair
		 * @returns {number}
		 */
		getGlyphPairKerning( textType, font, glyphPair ) {

			switch ( textType ) {

				case 'MSDF' :

					return MSDFText.getGlyphPairKerning( font, glyphPair );

				default :
					console.warn( `'${textType}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
					break;

			}

		}
	};

}

;// CONCATENATED MODULE: ./src/utils/deepDelete.js


/** Recursively erase THE CHILDREN of the passed object */
function deepDelete( object3D ) {

	object3D.children.forEach( ( child ) => {

		if ( child.children.length > 0 ) deepDelete( child );

		object3D.remove( child );

		UpdateManager.disposeOf( child );

		if ( child.material ) child.material.dispose();

		if ( child.geometry ) child.geometry.dispose();

	} );

	object3D.children = [];

}

/* harmony default export */ const utils_deepDelete = (deepDelete);

;// CONCATENATED MODULE: ./src/components/Text.js












/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

 */
class Text extends mix.withBase( external_THREE_namespaceObject.Object3D )(
	InlineComponent,
	TextManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isText = true;

		this.set( options );

	}

	///////////
	// UPDATES
	///////////


	/**
	 * Here we compute each glyph dimension, and we store it in this
	 * component's inlines parameter. This way the parent Block will
	 * compute each glyph position on updateLayout.
	 */
	parseParams() {

		this.calculateInlines( this._fitFontSize || this.getFontSize() );

	}

	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 */
	updateLayout() {

		utils_deepDelete( this );

		if ( this.inlines ) {

			// happening in TextManager
			this.textContent = this.createText();

			this.updateTextMaterial();

			this.add( this.textContent );

		}

		this.position.z = this.getOffset();

	}

	updateInner() {

		this.position.z = this.getOffset();

		if ( this.textContent ) this.updateTextMaterial();

	}

	calculateInlines( fontSize ) {

		const content = this.content;
		const font = this.getFontFamily();
		const breakChars = this.getBreakOn();
		const textType = this.getTextType();
		const whiteSpace = this.getWhiteSpace();

		// Abort condition

		if ( !font || typeof font === 'string' ) {

			if ( !core_FontLibrary.getFontOf( this ) ) console.warn( 'no font was found' );
			return;

		}

		if ( !this.content ) {

			this.inlines = null;
			return;

		}

		if ( !textType ) {

			console.error( `You must provide a 'textType' attribute so three-mesh-ui knows how to render your text.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
			return;

		}

		// collapse whitespace for white-space normal
		const whitespaceProcessedContent = collapseWhitespaceOnString( content, whiteSpace );
		const chars = Array.from ? Array.from( whitespaceProcessedContent ) : String( whitespaceProcessedContent ).split( '' );


		// Compute glyphs sizes

		const SCALE_MULT = fontSize / font.info.size;
		const lineHeight = font.common.lineHeight * SCALE_MULT;
		const lineBase = font.common.base * SCALE_MULT;

		const glyphInfos = chars.map( ( glyph ) => {

			// Get height, width, and anchor point of this glyph
			const dimensions = this.getGlyphDimensions( {
				textType,
				glyph,
				font,
				fontSize
			} );

			//

			let lineBreak = null;

			if( whiteSpace !== NOWRAP ) {

				if ( breakChars.includes( glyph ) || glyph.match( /\s/g ) ) lineBreak = 'possible';

			}


			if ( glyph.match( /\n/g ) ) {

				lineBreak = newlineBreakability( whiteSpace );

			}

			//

			return {
				height: dimensions.height,
				width: dimensions.width,
				anchor: dimensions.anchor,
				xadvance: dimensions.xadvance,
				xoffset: dimensions.xoffset,
				lineBreak,
				glyph,
				fontSize,
				lineHeight,
				lineBase
			};

		} );

		// apply kerning
		if ( this.getFontKerning() !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			for ( let i = 1; i < glyphInfos.length; i++ ) {

				const glyphInfo = glyphInfos[ i ];
				const glyphPair = glyphInfos[ i - 1 ].glyph + glyphInfos[ i ].glyph;

				// retrieve the kerning from the font
				const kerning = this.getGlyphPairKerning( textType, font, glyphPair );

				// compute the final kerning value according to requested fontSize
				glyphInfo[ 'kerning' ] = kerning * ( fontSize / font.info.size );

			}
		}


		// Update 'inlines' property, so that the parent can compute each glyph position

		this.inlines = glyphInfos;
	}

}

;// CONCATENATED MODULE: ./src/components/InlineBlock.js











/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
class InlineBlock extends mix.withBase( external_THREE_namespaceObject.Object3D )(
	InlineComponent,
	BoxComponent,
	InlineManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isInlineBlock = true;

		//

		this.size = new external_THREE_namespaceObject.Vector2( 1, 1 );

		this.frame = new Frame( this.getBackgroundMaterial() );

		// This is for hiddenOverflow to work
		this.frame.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this.frame );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

	}

	///////////
	// UPDATES
	///////////

	parseParams() {

		// Get image dimensions

		if ( !this.width ) console.warn( 'inlineBlock has no width. Set to 0.3 by default' );
		if ( !this.height ) console.warn( 'inlineBlock has no height. Set to 0.3 by default' );

		this.inlines = [ {
			height: this.height || 0.3,
			width: this.width || 0.3,
			anchor: 0,
			lineBreak: 'possible'
		} ];

	}

	//


	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 *
	 */
	updateLayout() {

		const WIDTH = this.getWidth();
		const HEIGHT = this.getHeight();

		if ( this.inlines ) {

			const options = this.inlines[ 0 ];

			// basic translation to put the plane's left bottom corner at the center of its space
			this.position.set( options.width / 2, options.height / 2, 0 );

			// translation required by inlineManager to position this component inline
			this.position.x += options.offsetX;
			this.position.y += options.offsetY;

		}

		this.size.set( WIDTH, HEIGHT );
		this.frame.scale.set( WIDTH, HEIGHT, 1 );

		if ( this.frame ) this.updateBackgroundMaterial();

		this.frame.renderOrder = this.getParentsNumber();

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.childrenInlines.length ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		this.position.z = this.getOffset();

	}

	//

	updateInner() {

		this.position.z = this.getOffset();

		if ( this.frame ) this.updateBackgroundMaterial();

	}

}

;// CONCATENATED MODULE: ./src/utils/Keymaps.js
/**

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

 */
/* harmony default export */ const Keymaps = ({

	fr:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] }
				],

				[
					{ width: 0.2, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	///////////////////////////////////////////////////////////

	eng:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	////////////////////////////////////////////////////////////

	ru:
		[
			[
				[
					{ width: 1 / 12, chars: [ { lowerCase: 'й', upperCase: 'Й' }, { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ц', upperCase: 'Ц' }, { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'у', upperCase: 'У' }, { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'к', upperCase: 'К' }, { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'е', upperCase: 'Е' }, { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'н', upperCase: 'Н' }, { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'г', upperCase: 'Г' }, { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ш', upperCase: 'Ш' }, { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'щ', upperCase: 'Щ' }, { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'з', upperCase: 'З' }, { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'х', upperCase: 'Х' }, { lowerCase: '{', upperCase: '[' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ъ', upperCase: 'Ъ' }, { lowerCase: '}', upperCase: ']' } ] }
				],

				[
					{ width: 1 / 12, chars: [ { lowerCase: 'ф', upperCase: 'Ф' }, { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ы', upperCase: 'Ы' }, { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'в', upperCase: 'В' }, { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'а', upperCase: 'А' }, { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'п', upperCase: 'П' }, { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'р', upperCase: 'Р' }, { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'о', upperCase: 'О' }, { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'л', upperCase: 'Л' }, { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'д', upperCase: 'Д' }, { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ж', upperCase: 'Ж' }, { lowerCase: ':', upperCase: ';' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'э', upperCase: 'Э' }, { lowerCase: '"', upperCase: '\'' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ё', upperCase: 'Ё' }, { lowerCase: '|', upperCase: '\\' } ] }
				],

				[
					{ width: 1.5 / 12, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'я', upperCase: 'Я' }, { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ч', upperCase: 'Ч' }, { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'с', upperCase: 'С' }, { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'м', upperCase: 'М' }, { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'и', upperCase: 'И' }, { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'т', upperCase: 'Т' }, { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ь', upperCase: 'Ь' }, { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'б', upperCase: 'Б' }, { lowerCase: ',', upperCase: '' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ю', upperCase: 'Ю' }, { lowerCase: '.', upperCase: '' } ] },
					{ width: 1.5 / 12, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.15, command: 'switch-set', chars: [ { lowerCase: 'eng' } ] },
					{ width: 0.15, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.3, command: 'switch', chars: [ { lowerCase: 'АБВ' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	/////////////////////////////////////////////////////////

	de:
		[
			[
				[
					{ width: 1 / 11, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ü', upperCase: 'Ü' } ] }
				],

				[
					{ width: 1 / 11, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ö', upperCase: 'Ö' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ä', upperCase: 'Ä' } ] }
				],

				[
					{ width: 2 / 11, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 2 / 11, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	///////////////////////////////////////////////////////////

	es:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ñ', upperCase: 'Ñ' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	//////////////////////////////////////////////////////////////////////

	el:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: ';', upperCase: ':' }, { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ς', upperCase: 'ς' }, { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ε', upperCase: 'Ε' }, { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ρ', upperCase: 'Ρ' }, { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'τ', upperCase: 'Τ' }, { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'υ', upperCase: 'Υ' }, { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'θ', upperCase: 'Θ' }, { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ι', upperCase: 'Ι' }, { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ο', upperCase: 'Ο' }, { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'π', upperCase: 'Π' }, { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'α', upperCase: 'Α' }, { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'σ', upperCase: 'Σ' }, { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'δ', upperCase: 'Δ' }, { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'φ', upperCase: 'Φ' }, { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'γ', upperCase: 'Γ' }, { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'η', upperCase: 'Η' }, { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ξ', upperCase: 'Ξ' }, { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'κ', upperCase: 'Κ' }, { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'λ', upperCase: 'Λ' }, { lowerCase: 'l', upperCase: 'L' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ζ', upperCase: 'Ζ' }, { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'χ', upperCase: 'Χ' }, { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ψ', upperCase: 'Ψ' }, { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ω', upperCase: 'Ω' }, { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'β', upperCase: 'Β' }, { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ν', upperCase: 'Ν' }, { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'μ', upperCase: 'Μ' }, { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.15, command: 'switch-set', chars: [ { lowerCase: 'eng' } ] },
					{ width: 0.15, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	////////////////////////////////////////////////////////////////////////////////

	nord:
		[
			[
				[
					{ width: 1 / 11, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'å', upperCase: 'Å' } ] }
				],

				[
					{ width: 1 / 11, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'æ', upperCase: 'Æ' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ø', upperCase: 'Ø' } ] }
				],

				[
					{ width: 2 / 11, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 2 / 11, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		]

});

;// CONCATENATED MODULE: ./src/components/Keyboard.js













//

const Keyboard_textureLoader = new external_THREE_namespaceObject.TextureLoader();

//

/**
 * Job: high-level component that returns a keyboard
 */
class Keyboard extends mix.withBase( external_THREE_namespaceObject.Object3D )( BoxComponent, MeshUIComponent ) {

	constructor( options ) {

		// DEFAULTS

		if ( !options ) options = {};
		if ( !options.width ) options.width = 1;
		if ( !options.height ) options.height = 0.4;
		if ( !options.margin ) options.margin = 0.003;
		if ( !options.padding ) options.padding = 0.01;

		//

		super( options );

		this.currentPanel = 0;

		this.isLowerCase = true;

		this.charsetCount = 1;

		//////////
		// KEYMAP
		//////////

		// ../utils/Keymaps contains information about various keyboard layouts
		// We select one depending on the user's browser language if
		// there is no options.language

		let keymap;

		if ( options.language || navigator.language ) {

			switch ( options.language || navigator.language ) {

				case 'fr' :
				case 'fr-CH' :
				case 'fr-CA' :
					keymap = Keymaps.fr;
					break;

				case 'ru' :
					this.charsetCount = 2;
					keymap = Keymaps.ru;
					break;

				case 'de' :
				case 'de-DE' :
				case 'de-AT' :
				case 'de-LI' :
				case 'de-CH' :
					keymap = Keymaps.de;
					break;

				case 'es' :
				case 'es-419' :
				case 'es-AR' :
				case 'es-CL' :
				case 'es-CO' :
				case 'es-ES' :
				case 'es-CR' :
				case 'es-US' :
				case 'es-HN' :
				case 'es-MX' :
				case 'es-PE' :
				case 'es-UY' :
				case 'es-VE' :
					keymap = Keymaps.es;
					break;

				case 'el' :
					this.charsetCount = 2;
					keymap = Keymaps.el;
					break;

				case 'nord' :
					keymap = Keymaps.nord;
					break;

				default :
					keymap = Keymaps.eng;
					break;

			}

		} else {

			keymap = Keymaps.eng;

		}

		////////////////////
		// BLOCKS CREATION
		////////////////////

		// PANELS

		this.keys = [];

		this.panels = keymap.map( ( panel ) => {

			const lineHeight = ( options.height / panel.length ) - ( options.margin * 2 );

			const panelBlock = new Block( {
				width: options.width + ( options.padding * 2 ),
				height: options.height + ( options.padding * 2 ),
				offset: 0,
				padding: options.padding,
				fontFamily: options.fontFamily,
				fontTexture: options.fontTexture,
				backgroundColor: options.backgroundColor,
				backgroundOpacity: options.backgroundOpacity
			} );

			panelBlock.charset = 0;

			panelBlock.add( ...panel.map( ( line ) => {

				const lineBlock = new Block( {
					width: options.width,
					height: lineHeight,
					margin: options.margin,
					contentDirection: 'row',
					justifyContent: 'center'
				} );

				lineBlock.frame.visible = false;

				const keys = [];

				line.forEach( ( keyItem ) => {

					const key = new Block( {
						width: ( options.width * keyItem.width ) - ( options.margin * 2 ),
						height: lineHeight,
						margin: options.margin,
						justifyContent: 'center',
						offset: 0
					} );

					const char = keyItem.chars[ panelBlock.charset ].lowerCase || keyItem.chars[ panelBlock.charset ].icon || 'undif';

					if (
						( char === 'enter' && options.enterTexture ) ||
						( char === 'shift' && options.shiftTexture ) ||
						( char === 'backspace' && options.backspaceTexture )
					) {

						const url = ( () => {

							switch ( char ) {

								case 'backspace':
									return options.backspaceTexture;
								case 'enter':
									return options.enterTexture;
								case 'shift':
									return options.shiftTexture;
								default:
									console.warn( 'There is no icon image for this key' );

							}

						} )();

						Keyboard_textureLoader.load( url, ( texture ) => {

							key.add(
								new InlineBlock( {
									width: key.width * 0.65,
									height: key.height * 0.65,
									backgroundSize: 'contain',
									backgroundTexture: texture
								} )
							);

						} );

					} else {

						key.add(
							new Text( {
								content: char,
								offset: 0
							} )
						);

					}

					key.type = 'Key';

					key.info = keyItem;
					key.info.input = char;
					key.panel = panelBlock;

					// line's keys
					keys.push( key );

					// keyboard's keys
					this.keys.push( key );

				} );

				lineBlock.add( ...keys );

				return lineBlock;

			} ) );

			return panelBlock;

		} );

		this.add( this.panels[ 0 ] );

		// Lastly set the options parameters to this object, which will trigger an update
		this.set( options );

	}

	/**
	 * Used to switch to an entirely different panel of this keyboard,
	 * with potentially a completely different layout
	 */
	setNextPanel() {

		this.panels.forEach( ( panel ) => {

			this.remove( panel );

		} );

		this.currentPanel = ( this.currentPanel + 1 ) % ( this.panels.length );

		this.add( this.panels[ this.currentPanel ] );

		this.update( true, true, true );

	}

	/*
	 * Used to change the keys charset. Some layout support this,
	 * like the Russian or Greek keyboard, to be able to switch to
	 * English layout when necessary
	 */
	setNextCharset() {

		this.panels[ this.currentPanel ].charset = ( this.panels[ this.currentPanel ].charset + 1 ) % this.charsetCount;

		this.keys.forEach( ( key ) => {

			// Here we sort the keys, we only keep the ones that are part of the current panel.

			const isInCurrentPanel = this.panels[ this.currentPanel ].getObjectById( key.id );

			if ( !isInCurrentPanel ) return;

			//

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	/** Toggle case for characters that support it. */
	toggleCase() {

		this.isLowerCase = !this.isLowerCase;

		this.keys.forEach( ( key ) => {

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {
	}

	updateLayout() {
	}

	updateInner() {
	}

}

;// CONCATENATED MODULE: ./src/three-mesh-ui.js
/* global global */













const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block: Block,
	Text: Text,
	InlineBlock: InlineBlock,
	Keyboard: Keyboard,
	FontLibrary: core_FontLibrary,
	update,
	TextAlign: TextAlign_namespaceObject,
	Whitespace: Whitespace_namespaceObject,
	JustifyContent: JustifyContent_namespaceObject,
	AlignItems: AlignItems_namespaceObject,
	ContentDirection: ContentDirection_namespaceObject
};

if ( typeof __webpack_require__.g !== 'undefined' ) __webpack_require__.g.ThreeMeshUI = ThreeMeshUI;













/* harmony default export */ const three_mesh_ui = ((/* unused pure expression or super */ null && (ThreeMeshUI)));

/******/ })()
;