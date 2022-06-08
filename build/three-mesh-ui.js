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

// UNUSED EXPORTS: AlignItems, Block, ContentDirection, FontLibrary, FontStyle, FontWeight, InlineBlock, JustifyContent, Keyboard, MSDFFontMaterialUtils, ShaderChunkUI, Text, TextAlign, Whitespace, default, update

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
  "isValid": () => (isValid),
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

// NAMESPACE OBJECT: ./src/utils/font/FontWeight.js
var FontWeight_namespaceObject = {};
__webpack_require__.r(FontWeight_namespaceObject);
__webpack_require__.d(FontWeight_namespaceObject, {
  "BOLD": () => (BOLD),
  "BOLDER": () => (BOLDER),
  "LIGHTER": () => (LIGHTER),
  "NORMAL": () => (FontWeight_NORMAL),
  "_100": () => (_100),
  "_200": () => (_200),
  "_300": () => (_300),
  "_400": () => (_400),
  "_500": () => (_500),
  "_600": () => (_600),
  "_700": () => (_700),
  "_800": () => (_800),
  "_900": () => (_900)
});

// NAMESPACE OBJECT: ./src/utils/font/FontStyle.js
var FontStyle_namespaceObject = {};
__webpack_require__.r(FontStyle_namespaceObject);
__webpack_require__.d(FontStyle_namespaceObject, {
  "ITALIC": () => (ITALIC),
  "NORMAL": () => (FontStyle_NORMAL),
  "OBLIQUE": () => (OBLIQUE),
  "obliqueCustomAngle": () => (obliqueCustomAngle)
});

;// CONCATENATED MODULE: external "THREE"
const external_THREE_namespaceObject = THREE;
;// CONCATENATED MODULE: ./src/utils/block-layout/ContentDirection.js
const ROW = "row";
const ROW_REVERSE = "row-reverse";
const COLUMN = "column";
const COLUMN_REVERSE = "column-reverse";


/**
 * @tests '/test/specs/utils/box-layout/content-direction.js'
 * @param {BoxComponent} container
 * @param {string} DIRECTION
 * @param {number} startPos
 * @param {number} REVERSE
 */
function contentDirection( container, DIRECTION, startPos, REVERSE ){

	// end to end children
	let accu = startPos;


	let childGetSize = "getOffsetWidth";
	let axisPrimary = "x";
	let axisSecondary = "y";

	// left right
	let margins = ['w','y'];

	if( DIRECTION.indexOf( COLUMN ) === 0 ){

		childGetSize = "getOffsetHeight";

		axisPrimary = "y";
		axisSecondary = "x";

		// top bttom
		margins = ['x', 'z'];

	}

	if ( DIRECTION.indexOf('-reverse') !== -1 ) {

		margins.reverse();

	}

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < container.childrenBoxes.length; i++ ) {

		const child = container.childrenBoxes[ i ];

		const CHILD_ID = child.id;
		const CHILD_SIZE = child[childGetSize]();

		accu += child._margin[margins[0]] * REVERSE;

		container.childrenPos[ CHILD_ID ] = {
			[axisPrimary]: accu + ( ( CHILD_SIZE / 2 ) * REVERSE ),
			[axisSecondary]: 0
		};

		// update accu for next children
		accu += ( REVERSE * ( CHILD_SIZE + child._margin[margins[1]] ) );

	}

}



;// CONCATENATED MODULE: ./src/utils/block-layout/AlignItems.js



const START = "start";
const CENTER = "center";
const END = "end";
const STRETCH = "stretch"; // Still bit experimental

/**
 * @tests '/test/specs/utils/box-layout/align-items.js'
 * @param {BoxComponent} boxComponent
 * @param {string} DIRECTION
 */
function alignItems( boxComponent, DIRECTION){

	const ALIGNMENT = boxComponent.getAlignItems();
	if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){

		console.warn( `alignItems === '${ALIGNMENT}' is not supported` );

	}

	let getSizeMethod = "getInnerWidth";
	let axis = "x";
	if( DIRECTION.indexOf( ROW ) === 0 ){

		getSizeMethod = "getInnerHeight";
		axis = "y";

	}
	const AXIS_TARGET = ( boxComponent[getSizeMethod]() / 2 );

	boxComponent.childrenBoxes.forEach( ( child ) => {

		let offset = 0;

		switch ( ALIGNMENT ){

			case END:
			case 'right': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'bottom': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 );

				}else{

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 );

				}

				break;

			case START:
			case 'left': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'top': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 );

				}else{

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 );

				}

				break;
		}

		boxComponent.childrenPos[ child.id ][axis] = offset;

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

/**
 * @tests '/test/specs/utils/box-layout/justify-content.js'
 * @param {BoxComponent} boxComponent
 * @param {string} direction
 * @param {number} startPos
 * @param {number} REVERSE
 */
function justifyContent( boxComponent, direction, startPos, REVERSE){

	const JUSTIFICATION = boxComponent.getJustifyContent();
	if ( AVAILABLE_JUSTIFICATIONS.indexOf( JUSTIFICATION ) === -1 ) {

		console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

	}

	const side = direction.indexOf('row') === 0 ? 'width' : 'height'
	const usedDirectionSpace = boxComponent.getChildrenSideSum( side );

	const INNER_SIZE = side === 'width' ? boxComponent.innerWidth : boxComponent.innerHeight;
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

const AVAILABLE_VALUES = [ NORMAL, NOWRAP, PRE, PRE_LINE, PRE_WRAP ];

/**
 * Check the validity of a whitespace
 * @param value
 * @returns {string}
 */
function isValid ( value ){

	if( AVAILABLE_VALUES.indexOf(value) === -1 ){

		console.warn(`Whitespace::isValid() The provided white-space value ('${value}') is not valid !`);
		console.warn(`    - Automatic fallback to ('${PRE_LINE}')`);

		value = PRE_LINE;

	}

	return value;

}

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
 * @returns {string|null}
 */
const newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case PRE:
		case PRE_WRAP:
		case PRE_LINE:
			return 'mandatory';
	}

	// case NOWRAP:
	// case NORMAL:
	// default:

	return null;

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

			// Part of inline now
			// const kerning = inline.kerning ? inline.kerning : 0;
			// const xoffset = inline.xoffset ? inline.xoffset : 0;
			// const xadvance = inline.xadvance ? inline.xadvance : inline.width;


			// ?? Missing letterSpacing ?
			// prevent additional computation if this character already exceed the available size
			if( lastInlineOffset + inline.xadvance + inline.xoffset + inline.kerning > options.INNER_WIDTH ) return true;


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

	if( !line[0] ) return 0;

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
			if ( firstInline.char && firstInline.char === '\n' && line.length > 1 ) {

				_collapseLeftInlines( [ firstInline ], line[ 1 ] );

			}

			// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
			if ( lastInline.char && lastInline.char === '\n' && line.length > 1 ) {

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

				if ( inline.char && WHITE_CHARS[ inline.char ] && line.length > i ) {

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
				if ( inline.char && WHITE_CHARS[ inline.char ] && i > 0 ) {

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

		// inline.width = 0;
		// inline.height = 0;
		inline.fontFactor = 0;
		// inline.offsetX = targetInline.offsetX + targetInline.width;
		inline.offsetX = targetInline.offsetX + targetInline.cumulativeWidth;
		// inline.offsetX -= inline.cumulativeWidth;

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

		// inline.width = 0;
		// inline.height = 0;
		inline.fontFactor = 0;
		// inline.offsetX = targetInline.offsetX;
		inline.offsetX += inline.cumulativeWidth;

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

	// const kerning = inline.kerning ? inline.kerning : 0;
	// const xoffset = inline.xoffset ? inline.xoffset : 0;
	// const xadvance = inline.xadvance ? inline.xadvance : inline.width;

	// if inline.lineBreak is set, it is 'mandatory' or 'possible'
	if ( inline.lineBreak ) return accu + inline.xadvance;

	// no line break is possible on this character
	return _distanceToNextBreak(
		inlines,
		currentIdx + 1,
		options,
		accu + inline.xadvance + inline.xoffset + inline.kerning + options.LETTERSPACING
	);

}

/**
 * Test if we should line break here even if the current glyph is not out of boundary.
 * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
 * and the distance to the next friendly glyph is out of boundary.
 */
function _shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, options ) {

	// We can't check if last glyph is break-line-friendly it does not exist
	if ( !prevChar || !prevChar.char ) return false;

	// Next break-line-friendly glyph is inside boundary
	if ( lastInlineOffset + nextBreak < options.INNER_WIDTH ) return false;

	// Previous glyph was break-line-friendly
	return options.BREAKON.indexOf( prevChar.char ) > -1;

}

;// CONCATENATED MODULE: ./src/utils/inline-layout/TextAlign.js
//JSDoc related import
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

const LEFT = 'left';
const RIGHT = 'right';
const TextAlign_CENTER = 'center';
const JUSTIFY = 'justify';
const JUSTIFY_LEFT = 'justify-left';
const JUSTIFY_RIGHT = 'justify-right';
const JUSTIFY_CENTER = 'justify-center';

/**
 *
 * @param boxComponent
 * @param {Array.<Array.<InlineGlyph>>} lines
 * @param ALIGNMENT
 * @param INNER_WIDTH
 */
function textAlign( boxComponent, lines, ALIGNMENT, INNER_WIDTH ) {

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( line, ALIGNMENT, INNER_WIDTH, i === lines.length - 1 );

		const padding = boxComponent._padding;
		const border = boxComponent._borderWidth;

		// const paddingAmount = - ( padding.w + padding.y ) / 2 - ( border.w + border.y ) / 2;
		// const paddingAmount = - ( padding.w + padding.y ) / 2;
		const paddingAmount = ( - padding.w + padding.y ) / 2 + ( - border.w + border.y ) / 2;

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX - paddingAmount;
			// line[ j ].offsetX += offsetX;

		}

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

				validSpaces += line[ j ].char === ' ' ? 1 : 0;

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
				const inlineCharacter = line[ j ];
				inlineCharacter.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += inlineCharacter.char === ' ' ? additionalSpace : 0;

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

;// CONCATENATED MODULE: ./src/utils/inline-layout/InlineJustification.js

function justifyInlines( boxComponent, lines, JUSTIFICATION, INNER_HEIGHT ){

	const textHeight = Math.abs( lines.height );


	// Line vertical positioning

	let justificationOffset = ( () => {
		switch ( JUSTIFICATION ) {

			case 'start':
				// return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight - boxComponent._padding.x ;
				// return boxComponent._padding.x - lines[0].lineHeight ;
				// return (INNER_HEIGHT * .5) + boxComponent._padding.x - (lines[0].lineHeight * .5);
				return (INNER_HEIGHT * .5) - lines[0].lineHeight;

			case 'end':
				return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 );

			case 'space-around':
			case 'space-between':
			case 'space-evenly':
			case 'center':
				return ( textHeight / 2 ) - lines[ 0 ].lineHeight ;

			default:
				console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

		}
	} )();

	// Apply padding
	const padding = boxComponent._padding;
	const border = boxComponent._borderWidth;

	justificationOffset += ( - padding.x + padding.z ) / 2 + ( - border.x + border.z ) / 2;

	//

	lines.forEach( ( line ) => {

		line.y += justificationOffset;
		line.forEach( ( inline ) => {

			inline.offsetY += justificationOffset;

		} );

	} );

}

;// CONCATENATED MODULE: ./src/components/core/Line.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


/**
 * Line represents an horizontal combination of positioned inlines with additional properties
 */
class Line extends Array {

	/**
	 *
	 * @param {Inline[]} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The width of this line
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The maximum lineBase of this line of inlines
		 * @type {number}
		 */
		this.lineBase = 0;

		/**
		 * The maximum lineHeight of this line of inlines
		 * @type {number}
		 */
		this.lineHeight = 0;

		/**
		 * The vertical position of this line
		 * @type {number}
		 */
		this.y = 0;

	}

}

;// CONCATENATED MODULE: ./src/components/core/Lines.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Lines represents a vertical succession of Line
 */
class Lines extends Array {

	/**
	 *
	 * @param {Line} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The maximum width of Line items
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The addition of height of any Line
		 * @type {number}
		 */
		this.height = 0;

	}

}

;// CONCATENATED MODULE: ./src/font/FontVariant.js



// JSDoc related imports
/* eslint-disable no-unused-vars */




/* eslint-enable no-unused-vars */


/**
 * @abstract
 */
class FontVariant extends external_THREE_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 */
	constructor( weight, style ) {

		super();

		/** @private */ this._isReady = false;

		/** @protected */ this._weight = weight;
		/** @protected */ this._style = style;

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 42;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = null;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get typographic() { return this._font; }

	/**
	 *
	 * @returns {boolean}
	 */
	get isReady() {

		return this._isReady;

	}

	/**
	 *
	 * @returns {string}
	 */
	get weight() {

		return this._weight;

	}

	/**
	 *
	 * @returns {string}
	 */
	get style() {

		return this._style;

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get texture() {

		return this._texture;

	}

	/**
	 * @param {Function.<ShaderMaterial|Material>} v
	 * @abstract
	 */
	set fontMaterial( v ) {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 * @return {Function.<ShaderMaterial|Material>}
	 * @abstract
	 */
	get fontMaterial() {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 *
	 * @returns {string}
	 */
	get id(){
		return `${this._name}(w:${this.weight},s:${this.style})`;
	}

	/**
	 *
	 * @param {string} character
	 * @returns {MSDFTypographicGlyph}
	 */
	getTypographicGlyph( character ) {

		let typographicGlyph = this._chars[ character ];
		if ( typographicGlyph ) return typographicGlyph;

		if ( character.match( /\s/ ) ) return this._chars[ " " ];

		const fallbackCharacter = font_FontLibrary.missingCharacter( this, character );
		if( fallbackCharacter ) {

			typographicGlyph = this._chars[ fallbackCharacter ];
			if ( typographicGlyph ) return typographicGlyph;

		}

		throw Error( `FontVariant('${this.id}')::getTypographicGlyph() - character('${character}') and/or fallback character were not found in provided msdf charset.` );
	}

	/* eslint-disable no-unused-vars */


	/**
	 * Convert an InlineCharacter to a geometry
	 *
	 * @abstract
	 * @param {InlineGlyph} inline
	 * @returns {BufferGeometry|Array.<BufferGeometry>}
	 */
	getGeometricGlyph( inline, segments = 1 ) {

		throw new Error(`FontVariant(${typeof this})::getGeometryCharacter() is abstract and should therefore be overridden.`);

	}

	/* eslint-enable no-unused-vars */


	/**
	 * Obtain the kerning amount of a glyphPair
	 * @param {string} glyphPair
	 * @returns {number}
	 */
	getKerningAmount( glyphPair ){

		//or zero offset if kerning glyphPais is not defined
		return this._kernings[ glyphPair ] ? this._kernings[ glyphPair ] : 0;

	}


	/**
	 * Perform some changes on the character description of this font
	 * @param {Object.<string,Object.<string,number|string>>} adjustmentObject
	 */
	adjustTypographicGlyphs( adjustmentObject ){

		for ( const char in adjustmentObject ) {

			const typographicGlyph = this.getTypographicGlyph( char );
			const glyphAdjustment = adjustmentObject[ char ];
			for ( const propertyToAdjust in glyphAdjustment ) {

				typographicGlyph["_"+propertyToAdjust] = adjustmentObject[char][propertyToAdjust];

			}

		}

	}

	/**
	 *
	 * @private
	 */
	_checkReadiness() {

		if ( this._readyCondition() ) {

			_setReady( this );

		}

	}

	/**
	 *
	 * @abstract
	 * @returns {boolean}
	 * @protected
	 */
	_readyCondition () {

		// ie: MSDFFontVariant
		// Must have chars and a texture
		// return this._chars && this._texture

		throw new Error(`FontVariant(${typeof this})::_readyCondition() is abstract and should therefore be overridden.`);
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


const _readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontVariant} fontVariant
 * @private
 */
function _setReady( fontVariant ) {

	fontVariant._isReady = true;
	fontVariant.dispatchEvent( _readyEvent );

}


;// CONCATENATED MODULE: ./src/font/TypographicFont.js
class TypographicFont {

	constructor() {

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 38;
		/** @protected */ this._name = "-";
		/** @protected */ this._charset = "";

	}

	/**
	 *
	 * @returns {number}
	 */
	get size() { return this._size; }

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return this._lineHeight; }

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return this._lineBase; }

	/**
	 *
	 * @returns {string}
	 */
	get name() { return this._name; }

	/**
	 *
	 * @returns {string}
	 */
	get charset() { return this._charset; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicFont.js


class MSDFTypographicFont extends TypographicFont{

	/**
	 *
	 * @param {import('./MSDFFontVariant').MSDFJson} json
	 */
	constructor( json ) {

		super();

		// base description
		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._name = json.info.face;

		// MSDF
		this._textureWidth = json.common.scaleW;
		this._textureHeight = json.common.scaleH;

		this._charset = json.chars.map( char => char.char ).join("");

	}

	/**
	 *
	 * @returns {number}
	 */
	get textureWidth() { return this._textureWidth; }

	/**
	 *
	 * @returns {number}
	 */
	get textureHeight() { return this._textureHeight; }

}

;// CONCATENATED MODULE: ./src/font/TypographicGlyph.js
//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * @class
 * @abstract
 */
class TypographicGlyph {

	/**
	 *
	 * @param {TypographicFont} typographicFont
	 */
	constructor( typographicFont ) {

		/** @protected */ this._char = "";
		/** @protected */ this._width = 1;
		/** @protected */ this._heigth = 1;
		/** @protected */ this._xadvance = 1;
		/** @protected */ this._xoffset = 0;
		/** @protected */ this._yoffset = 0;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = typographicFont;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get font() {

		return this._font;

	}

	/**
	 *
	 * @return {string}
	 */
	get char() {

		return this._char;

	}

	/**
	 *
	 * @returns {number}
	 */
	get width() {

		return this._width;

	}

	/**
	 *
	 * @returns {number}
	 */
	get height() {

		return this._heigth;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() {

		return this._xadvance;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xoffset() {

		return this._xoffset;

	}

	/**
	 *
	 * @returns {number}
	 */
	get yoffset() {

		return this._yoffset;

	}

	/**
	 *
	 * @param value
	 */
	set yoffset( value ) {

		this._yoffset = value;

	}

	/**
	 *
	 * @abstract
	 * @returns {InlineGlyph}
	 */
	asInlineGlyph() {

		throw new Error("Abstract... Need to be implemented")

	}

}

;// CONCATENATED MODULE: ./src/components/core/Inline.js
/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
class Inline {

	constructor() {

		/** @protected */ this._offsetX = 0;
		/** @protected */ this._offsetY = 0;

		/** @protected */ this._lineBreak = null;

		/** @protected */ this._kerning = 0;

		/** @protected */ this._fontFactor = 1;
		/** @protected */ this._fontSize = 0;

		/** @protected */ this._cumulativeWidth = 0;

		/** @protected */ this._paddingLeft = 0;
		/** @protected */ this._paddingRight = 0;

		/** @protected */ this._marginLeft = 0;
		/** @protected */ this._marginRight = 0;

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;
		this._cumulativeWidth = 0;

	}

	/**
	 * The horizontal distance this inline fills
	 * @returns {number}
	 */
	get xadvance() { return 0 }

	/**
	 * The offset x of this inline in a line
	 * @returns {number}
	 */
	get xoffset() { return 0 }

	/**
	 * The offset y of this inline in a line
	 * @returns {number}
	 */
	get yoffset() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get width() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get height() { return 0 }

	/**
	 *
	 * @param {string|null} value
	 */
	set lineBreak( value ){

		this._lineBreak = value;

	}

	/**
	 *
	 * @returns {string|null}
	 */
	get lineBreak() { return this._lineBreak; }

	/**
	 *
	 * @returns {number}
	 */
	get anchor() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get kerning() { return this._kerning * this._fontFactor; }

	/**
	 *
	 * @param {number} value
	 */
	set kerning( value ) {

		this._kerning = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontSize() { return this._fontSize }

	/**
	 *
	 * @param {number} value
	 */
	set fontSize( value ) {

		this._fontSize = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get offsetX() { return this._offsetX; }

	/**
	 *
	 * @param value
	 */
	set offsetX( value ){

		this._offsetX = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get offsetY() { return this._offsetY; }

	/**
	 *
	 * @param {number} value
	 */
	set offsetY( value ){

		this._offsetY = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get cumulativeWidth() { return this._cumulativeWidth; }

	/**
	 *
	 * @param {number} value
	 */
	set cumulativeWidth( value ) {

		this._cumulativeWidth = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginLeft() { return this._marginLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set marginLeft( value ) {

		this._marginLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight() { return this._marginRight; }

	/**
	 *
	 * @param {number} value
	 */
	set marginRight( value ) {

		this._marginRight = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft() { return this._paddingLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingLeft( value ) {

		this._paddingLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight() { return this._paddingRight; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingRight( value ) {

		this._paddingRight = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return 0 }

	/**
	 *
	 * @param {number} value
	 */
	set fontFactor( value ){

		this._fontFactor = value;

	}
}

;// CONCATENATED MODULE: ./src/font/InlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlineGlyph extends Inline {

	/**
	 *
	 * @param {TypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super();

		/** @protected */ this._typographic = characterDesc;

	}

	/**
	 *
	 * @returns {TypographicGlyph}
	 */
	get typographic(){

		return this._typographic;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	/**
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get width() { return this._typographic.width * this._fontFactor ; }

	/**
	 * @override
	 * @returns {number}
	 */
	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	/**
	 * @override
	 * @returns {number}
	 */
	get anchor() {

		const lineHeight = this._typographic.font.lineHeight;
		const lineBase = this._typographic.font.lineBase;

		return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }


}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFInlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends InlineGlyph
 */
class MSDFInlineGlyph extends InlineGlyph{

	/**
	 *
	 * @param {MSDFTypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	/**
	 *
	 * @returns {{left:number, right:number, top:number, bottom:number}|null}
	 */
	get uv() { return this.typographic.uv; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicGlyph.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


class MSDFTypographicGlyph extends TypographicGlyph {

	/**
	 * @param {MSDFTypographicFont} fontDescription
	 * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
	 */
	constructor( fontDescription, characterData ) {

		super(fontDescription);

		this._char = characterData.char;
		this._width = characterData.width;
		this._heigth = characterData.height;

		this._xadvance = characterData.xadvance ? characterData.xadvance : this._width;
		this._xoffset = characterData.xoffset ? characterData.xoffset : 0;
		this._yoffset = characterData.yoffset ? characterData.yoffset : 0;

		// Msdf requires uvs
		this._uv = null;

		if( !isNaN( characterData.x ) ) {
			// transform absolute pixel values into uv values [0,1]
			this._uv = {
				left: characterData.x / fontDescription.textureWidth,
				right: ( characterData.x + characterData.width ) / fontDescription.textureWidth,
				top: 1 - ( ( characterData.y + characterData.height ) / fontDescription.textureHeight ),
				bottom: 1 - ( characterData.y / fontDescription.textureHeight )
			};
		}
	}


	/**
	 *
	 * @returns {{left: number, right: number, top: number, bottom: number}|null}
	 */
	get uv() {

		return this._uv;

	}

	/**
	 * @override
	 * @returns {MSDFInlineGlyph}
	 */
	asInlineGlyph() {

		return new MSDFInlineGlyph( this );

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFGeometricGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class MSDFGeometricGlyph extends external_THREE_namespaceObject.PlaneBufferGeometry {

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 */
	constructor( inline, segments = 1 ) {


		// default w & h segments
		let wS = 1, hS=1;

		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;

		wS = Math.ceil((inline.typographic.width / typographicFontSize) * segments);
		hS = Math.ceil((inline.typographic.height / typographicFontSize) * segments);

		super( inline.width, inline.height, wS, hS );

		// If inline has UVs
		if ( inline.uv ) {

			this._mapUVs( inline );

			this._transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this._nullifyUVs();

			this.scale( 0, 0, 1 );

			this.translate( 0, inline.fontSize / 2, 0 );

		}

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_mapUVs( inline ) {


		const width = inline.uv.right - inline.uv.left;
		const height = inline.uv.bottom - inline.uv.top;

		const originalUvArray = this.getAttribute('uv').array.slice()

		const uvGlyph = [];
		for (let i = 0; i < originalUvArray.length; i += 2) {
			const u = originalUvArray[i];
			const v = originalUvArray[i + 1];

			uvGlyph.push(inline.uv.left + width * u);
			uvGlyph.push(inline.uv.top + height * v);
		}
		this.setAttribute('uvG', new external_THREE_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 * Set all UVs to 0, so that none of the glyphs on the texture will appear
	 * @private
	 * */
	_nullifyUVs() {

		// const uvAttribute = this.attributes.uv;
		//
		// for ( let i = 0; i < uvAttribute.count; i++ ) {
		//
		// 	uvAttribute.setXY( i, 0, 0 );
		//
		// }

		const uvGlyph = [];
		const length = this.getAttribute('uv').array.length;
		for ( let i = 0; i < length; i++ ) {
			uvGlyph.push(0);
		}
		this.setAttribute('uvG', new external_THREE_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 *
	 * @TODO: Apply pivot properties when splitText isset
	 * Gives the previously computed scale and offset to the geometry
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_transformGeometry( inline ) {

		//

		// @TODO : Evaluate this as being a property. It can wait until splitGeometry
		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl.js
/* harmony default export */ const msdf_alphaglyph_pars_vertex_glsl = (/* glsl */`
attribute vec2 uvG;
varying vec2 vUvG;
`);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl.js
/* harmony default export */ const msdf_alphaglyph_vertex_glsl = (/* glsl */`
vUvG = uvG;
`);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl.js
/* harmony default export */ const msdf_offsetglyph_vertex_glsl = (/* glsl */`
gl_Position.z -= 0.00001;
`);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl.js
/* harmony default export */ const msdf_alphaglyph_pars_fragment_glsl = (/* glsl */`
varying vec2 vUvG;
uniform sampler2D glyphMap;
uniform vec2 unitRange;
// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field
float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}
float screenPxRange() {

	// precomputed unitRange as recommended by Chlumsky
	// vec2 unitRange = vec2(pxRange)/vec2(textureSize(glyphMap, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUvG);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}
float tap(vec2 offsetUV) {
	vec3 msd = texture( glyphMap, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}
`);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl.js
/* harmony default export */ const msdf_alphaglyph_fragment_glsl = (/* glsl */`
	float alpha;
#ifdef NO_RGSS

	alpha = tap( vUvG );

#else

	// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
	// per pixel partial derivatives
	vec2 dx = dFdx(vUvG);
	vec2 dy = dFdy(vUvG);
	// rotated grid uv offsets
	vec2 uvOffsets = vec2(0.125, 0.375);
	vec2 offsetUV = vec2(0.0, 0.0);
	// supersampled using 2x2 rotated grid
	alpha = 0.0;
	offsetUV.xy = vUvG + uvOffsets.x * dx + uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.x * dx - uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG + uvOffsets.y * dx - uvOffsets.x * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.y * dx + uvOffsets.x * dy;
	alpha += tap(offsetUV);
	alpha *= 0.25;

#endif

	alpha = clamp( alpha, 0.0, 1.0 );

#ifdef INVERT_ALPHA

	alpha = 1.0 - alpha;

#endif

	diffuseColor.a *= alpha;
`);

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/MaterialTransformers.js

/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const alphaTestTransformer = function ( target, targetProperty, value) {

	// set the value in the material
	target.alphaTest = value;

	toPreprocessorTriggerTransformer(target, 'USE_ALPHATEST', value === 0 ? '' : null );

}

/**
 * Transform a value as a preprocessor trigger
 * @type {import('../Mediator').MediationTransformer}
 */
const toPreprocessorTriggerTransformer = function ( target, targetProperty, value) {

	if ( value ) {

		if( target.defines[targetProperty] === undefined ) {

			target.defines[targetProperty] = '';
			target.needsUpdate = true;

		}

	} else if( target.defines[targetProperty] !== undefined ) {

		delete target.defines[targetProperty];
		target.needsUpdate = true;

	}

}

/**
 * Transform a value as a preprocessor value
 * @type {import('../Mediator').MediationTransformer}
 */
const asPreprocessorValueTransformer = function ( target, targetProperty, value) {

	// abort if nothing to update, same value
	if( target.defines[targetProperty] && target.defines[targetProperty] === value ) return;

	// or change the preprocessor and update
	target.defines[targetProperty] = value;
	target.needsUpdate = true;

}

/**
 * Transform a value as a uniform or userData value
 * @type {import('../Mediator').MediationTransformer}
 */
const uniformOrUserDataTransformer = function( material, property, value ) {

	if( material.userData[property] ) {

		material.userData[property].value = value;

	}else{

		material.uniforms[property].value = value;

	}

}

const toUserDataTransformer = function( material, property, value ) {

	material.userData[property].value = value;

}

;// CONCATENATED MODULE: ./src/font/msdf/utils/MSDFFontMaterialUtils.js







/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * MSDFFontMaterialUtils provides utilities
 * for customizing other threejs or custom materials
 * into a three-mesh-ui MSDFFontMaterial
 */
class MSDFFontMaterialUtils {

	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.glyphMap = { value: materialOptions.glyphMap };
		threeMaterial.userData.unitRange = { value: new external_THREE_namespaceObject.Vector2() };
	}

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.glyphMap = threeMaterial.userData.glyphMap;
		shader.uniforms.unitRange = threeMaterial.userData.unitRange;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		MSDFFontMaterialUtils.injectVertexShaderChunks( shader );
		MSDFFontMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + msdf_alphaglyph_pars_vertex_glsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + msdf_alphaglyph_vertex_glsl
		)

		shader.vertexShader = shader.vertexShader.replace(
			'#include <project_vertex>',
			'#include <project_vertex>\n' + msdf_offsetglyph_vertex_glsl
		)
	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <uv_pars_fragment>',
			'#include <uv_pars_fragment>\n' + msdf_alphaglyph_pars_fragment_glsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			'#include <alphamap_fragment>\n' + msdf_alphaglyph_fragment_glsl
		)
	}



	/**
	 * Mix a threejs Material into a three-mesh-ui FontMaterial
	 * @param {typeof Material|ShaderMaterial} materialClass
	 * @returns {typeof Material|ShaderMaterial}
	 */
	static from( materialClass ) {

		return class extends materialClass {

			/**
			 *
			 * @abstract
			 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
			 */
			static get fontMaterialProperties() {
				return MSDFFontMaterialUtils.mediation;
			}

			constructor( options = {} ) {

				// same as FontMaterial extension
				MSDFFontMaterialUtils.ensureMaterialOptions( options );
				super( options );
				MSDFFontMaterialUtils.ensureDefines( this );
				MSDFFontMaterialUtils.ensureUserData( this, options );

				// defines two internal properties in order to kept
				// user allowed to use onBeforeCompile for its own stuff
				// 1- store an callback for user
				/* eslint-disable no-unused-vars */
				this._userDefinedOnBeforeCompile = (shader) => {};
				/* eslint-enable no-unused-vars */
				// 2- store the cumulative callback
				this._onBeforeCompile = this._cumulativeOnBeforeCompile;
			}

			////////////////////////////
			// OnBeforeCompile Override
			///////////////////////////

			/**
			 * Override the setter of onBeforeCompile in order to never overwrite
			 * the three-mesh-ui fontMaterial onBeforeCompile
			 * @param { (shader:any) => void }fct
			 */
			set onBeforeCompile( fct ) {
				// only store it as userDefinedCallback
				this._userDefinedOnBeforeCompile = fct;
			}

			/**
			 * Override the getter of onBeforeCompile in order to
			 * always deliver the cumulativeCallbacks to threejs
			 * @returns { (shader:any) => void }
			 */
			get onBeforeCompile() {
				return this._onBeforeCompile;
			}

			/**
			 *
			 * On before compile that first run three-mesh-ui fontMaterial
			 * then user defined onBeforeCompile
			 * @param shader
			 * @private
			 */
			_cumulativeOnBeforeCompile = ( shader ) => {
				// bind uniforms
				MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

				// inject both vertex and fragment shaders
				MSDFFontMaterialUtils.injectShaderChunks( shader );

				// user defined additional onBeforeCompile
				this._userDefinedOnBeforeCompile( shader );
			}
		}
	}

	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return mediationDefinitions;

	}

}

/**
 * Convert a fontVariant to a material glyphMap texture
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _fontToGlyphMapTransformer = function( fontMaterial, materialProperty, value) {

	const texture = value ? value.texture : null;
	const unitRange = value ? value.unitRange : new external_THREE_namespaceObject.Vector2();

	if( fontMaterial[materialProperty] !== undefined ) {

		fontMaterial.glyphMap = texture;
		fontMaterial.unitRange = unitRange;
		return;
	}

	if( fontMaterial.userData && fontMaterial.userData.glyphMap ) {

		fontMaterial.userData.glyphMap.value = texture;
		fontMaterial.userData.unitRange.value = unitRange;

	}

}

/**
 *
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _RGSSTransformer = function( fontMaterial, materialProperty, value){

	if ( !value ) {

		fontMaterial.defines['NO_RGSS'] = '';

	} else {

		delete fontMaterial.defines['NO_RGSS'];

	}

	fontMaterial.needsUpdate = true;

}


/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const mediationDefinitions = {
	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	_side: { m: 'side' },
	// side: { m: 'side' },
	_font: { m: "glyphMap", t: _fontToGlyphMapTransformer },
	fontColor: { m: 'color' },
	fontOpacity: { m: 'opacity' },
	fontSupersampling: { m: 'NO_RGSS', t: _RGSSTransformer },
	invertAlpha: { m: 'INVERT_ALPHA', t: toPreprocessorTriggerTransformer },
}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderLib/msdf-fontmaterial.glsl.js






/**
 *
 * @type {string}
 */
const vertexShader = /* glsl */`
${msdf_alphaglyph_pars_vertex_glsl}
#include <clipping_planes_pars_vertex>
void main() {
	${msdf_alphaglyph_vertex_glsl}
	#include <begin_vertex>
	#include <project_vertex>
	${msdf_offsetglyph_vertex_glsl}
	#include <clipping_planes_vertex>
}
`

/**
 *
 * @type {string}
 */
const fragmentShader = /* glsl */`
uniform vec3 diffuse;
uniform float opacity;
${msdf_alphaglyph_pars_fragment_glsl}
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	// instead of <color_fragment> : vec4 diffuseColor
	vec4 diffuseColor = vec4( diffuse, opacity );
	${msdf_alphaglyph_fragment_glsl}
	#include <alphatest_fragment>
	// instead of <output_fragment>
	gl_FragColor = diffuseColor;
	#include <clipping_planes_fragment>
}
`

;// CONCATENATED MODULE: ./src/font/msdf/materials/MSDFFontMaterial.js




// JSDoc related import
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

const ALPHA_TEST = 0.02;


/**
 * This material implements the msdf rendering shader
 */
class MSDFFontMaterial extends external_THREE_namespaceObject.ShaderMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}

	constructor( materialOptions = {} ) {

		super( {

			uniforms: {
				'glyphMap': { value: null }, // texture
				'diffuse': { value: null }, // vec3
				'opacity': { value: 1 },
				'unitRange': { value: new external_THREE_namespaceObject.Vector2(0,0) }, // vec2
				'alphaTest': { value: ALPHA_TEST },
			},
			transparent: true,
			clipping: true,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			extensions: {
				derivatives: true
			},
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = materialOptions.noRGSS || false;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}




	/**
	 * The color will be the diffuse uniform
	 * @returns {Vector2}
	 */
	get unitRange() {

		return this.uniforms.unitRange.value;

	}

	/**
	 *
	 * @param {Vector2} v
	 */
	set unitRange( v ) {

		this.uniforms.unitRange.value.copy( v );

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get glyphMap() {

		return this.uniforms.glyphMap.value;

	}

	/**
	 *
	 * @param {Texture} v
	 */
	set glyphMap( v ) {

		this.uniforms.glyphMap.value = v;

	}

	/**
	 * Is this a default fontMaterial instance
	 * @returns {boolean}
	 */
	get isDefault() {

		return this.constructor === MSDFFontMaterial;

	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {
		return this.uniforms.alphaTest.value;
	}

	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFFontVariant.js







//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends {FontVariant}
 */
class MSDFFontVariant extends FontVariant {

	constructor( weight, style, json, texture ) {

		super(weight, style);

		// provide default values
		this._unitRange = new external_THREE_namespaceObject.Vector2( 1, 1 );

		if ( json.pages ) {

			this._buildData( json );

		} else {

			_loadJson( this, json );

		}

		if ( texture instanceof external_THREE_namespaceObject.Texture ) {

			this._buildTexture( texture );

		} else {

			_loadTexture( this, texture );

		}

		this._defaultMaterialClass = MSDFFontMaterial;


		this._checkReadiness();

	}


	get texture() {

		return this._texture;

	}

	get unitRange() {

		return this._unitRange;

	}

	/**
	 * @param {Function.<Material|ShaderMaterial>} v
	 * @override
	 */
	set fontMaterial( v ) {

		this._defaultMaterialClass = v;

	}

	/**
	 *
	 * @override
	 * @returns {Function.<Material|ShaderMaterial>}
	 */
	get fontMaterial() {

		return this._defaultMaterialClass;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildData( json ) {

		this._font = new MSDFTypographicFont( json );

		this._kernings = this._buildKerningPairs( json );
		this._chars = this._buildCharacters( json );
		this._chars[ " " ] = this._buildCharacterWhite( json );

		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._distanceRange = json.distanceField.distanceRange;

		// precompute the unit range as recommended by chlumsky
		// @see https://github.com/Chlumsky/msdfgen
		// "I would suggest precomputing unitRange as a uniform variable instead of pxRange for better performance."
		this._unitRange = new external_THREE_namespaceObject.Vector2(this._distanceRange, this._distanceRange)
			.divide( new external_THREE_namespaceObject.Vector2( json.common.scaleW, json.common.scaleH ) );
	}

	/**
	 *
	 * @param texture
	 * @private
	 */
	_buildTexture( texture ) {

		texture.generateMipmaps = false;
		texture.minFilter = external_THREE_namespaceObject.LinearFilter;
		texture.magFilter = external_THREE_namespaceObject.LinearFilter;

		texture.needsUpdate = true;

	}

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 * @returns {MSDFGeometricGlyph}
	 */
	getGeometricGlyph( inline, segments = 1 ) {

		return new MSDFGeometricGlyph( inline, segments );

	}

	/**
	 * Abstraction implementation
	 *
	 * @returns {boolean}
	 * @private
	 */
	_readyCondition() {

		return this._chars && this._texture;

	}

	/**
	 * Ensure that each font variant has its kerning dictionary
	 * @see src/font/msdf/FontVariantMSDF.js for an implementation
	 *
	 * @param {MSDFJson} json
	 *
	 * @returns {Object.<string, number>}
	 * @private
	 */
	_buildKerningPairs( json ) {

		const friendlyKernings = {};

		// Loop through each kernings pairs defined in msdf json
		for ( let i = 0; i < json.kernings.length; i++ ) {

			const kerning = json.kernings[ i ];

			// ignore zero kerned glyph pair
			if ( kerning.amount === 0 ) continue;

			// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
			const glyphPair = String.fromCharCode( kerning.first, kerning.second );

			// This would then be available for fast access
			friendlyKernings[ glyphPair ] = kerning.amount;

		}

		// update the font to keep it
		return friendlyKernings;

	}


	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildCharacters( json ) {

		const friendlyChars = {};

		for ( let i = 0; i < json.chars.length; i++ ) {
			const charOBJ = json.chars[ i ];

			friendlyChars[ charOBJ.char ] = new MSDFTypographicGlyph( this._font, charOBJ );

		}

		return friendlyChars;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildCharacterWhite( json ) {
		return new MSDFTypographicGlyph( this._font,
			{
				char: ' ',
				width: json.info.size / 3,
				height: json.info.size * 0.7,
			});
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


/**
 * Load a msdf json then build fontVariant data
 *
 * @param {FontVariant} fontVariant
 * @param {string} jsonUrl
 * @private
 */
function _loadJson( fontVariant, jsonUrl ) {

	new external_THREE_namespaceObject.FileLoader().setResponseType( 'json' ) .load( jsonUrl, ( response ) => {

		fontVariant._buildData( response );
		fontVariant._checkReadiness();

	} );

}

/**
 * Load a msdf texture then build texture
 *
 * @param {FontVariant} fontVariant
 * @param {string} textureUrl
 * @private
 */
function _loadTexture( fontVariant, textureUrl ) {

	fontVariant._texture = new external_THREE_namespaceObject.TextureLoader().load( textureUrl, ( texture ) => {

		fontVariant._buildTexture( texture );
		fontVariant._checkReadiness();

	} );

}

/***********************************************************************************************************************
 * MSDF FILE FORMAT DESCRIPTION
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 **********************************************************************************************************************/


/**
 * @typedef {Object} MSDFJson
 *
 * @property {MSDFJsonInfo} info
 * @property {MSDFJsonCommon} common
 * @property {Array.<MSDFJsonPage>} pages
 * @property {Array.<MSDFJsonChar>} chars
 * @property {{fieldType:string, distanceRange:number}} distanceField
 * @property {Array.<MSDFJsonKerning>} kernings
 */

/**
 *
 * @typedef {Object} MSDFJsonInfo
 *
 * @property {string} face This is the name of the true type font.
 * @property {number} size The size of the true type font.
 * @property {boolean} bold The font is bold.
 * @property {boolean} italic The font is italic.
 * @property {string[]} charset The name of the OEM charset used (when not unicode).
 * @property {boolean} unicode 	Set to 1 if it is the unicode charset.
 * @property {number} stretchH The font height stretch in percentage. 100% means no stretch.
 * @property {number} smooth Set to 1 if smoothing was turned on.
 * @property {number} aa The supersampling level used. 1 means no supersampling was used.
 * @property {Array.<number>} padding TThe padding for each character (up, right, down, left).
 * @property {Array.<number>} spacing The spacing for each character (horizontal, vertical).
 * @property {number} outline (not found) The outline thickness for the characters.
 */

/**
 *
 * @typedef {Object} MSDFJsonCommon
 *
 * @property {number} lineHeight This is the distance in pixels between each line of text.
 * @property {number} base The number of pixels from the absolute top of the line to the base of the characters.
 * @property {number} scaleW The width of the texture, normally used to scale the x pos of the character image.
 * @property {number} scaleH The height of the texture, normally used to scale the y pos of the character image.
 * @property {number} pages The number of texture pages included in the font.
 * @property {boolean} packed
 * @property {number} alphaChnl
 * @property {number} redChnl
 * @property {number} greenChnl
 * @property {number[]} blueChnl
 */

/**
 * @typedef {Object} MSDFJsonPage
 *
 * @property {string} id The page id.
 * @property {string} file The texture file name.
 */

/**
 *
 * @typedef {Object} MSDFJsonChar
 *
 * @property {number} id The character id.
 * @property {number} index The character index.
 * @property {string} char The character.
 * @property {number} x The left position of the character image in the texture.
 * @property {number} y The top position of the character image in the texture.
 * @property {number} width The width of the character image in the texture.
 * @property {number} height The height of the character image in the texture.
 * @property {number} xoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} yoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} xadvance How much the current position should be advanced after drawing the character.
 * @property {string} page The texture page where the character image is found.
 * @property {number} chnl The texture channel where the character image is found (1 = blue, 2 = green, 4 = red, 8 = alpha, 15 = all channels).
 */



/**
 *
 * @typedef {Object} MSDFJsonKerning
 *
 * @property {number} first The first character id.
 * @property {number} second The second character id.
 * @property {number} amount How much the x position should be adjusted when drawing the second character immediately following the first.
 *
 */

;// CONCATENATED MODULE: ./src/font/FontFamily.js


//JSDoc related imports

/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class FontFamily extends external_THREE_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {string} name
	 */
	constructor( name ) {

		super();

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._name = name;

		/**
		 *
		 * @type {Array.<FontVariant>}
		 * @private
		 */
		this._variants = [];

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._isReady = false;

	}

	get isReady() { return this._isReady; }

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 * @param {string|Object} json
	 * @param {string|Texture} texture
	 * @param {boolean} [override=false]
	 */
	addVariant( weight, style, json, texture, override = false){

		if( override || !this.getVariant( weight, style) ){

			this._isReady = false;

			const newVariant = new MSDFFontVariant( weight, style, json, texture);

			this._variants.push( newVariant );

			if( !newVariant.isReady ){

				newVariant.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addVariant() - Variant(${weight}, ${style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {FontVariant} variantImplementation
	 * @param {boolean} [override=false]
	 */
	addCustomImplementationVariant( variantImplementation, override = false){

		if( override || !this.getVariant( variantImplementation.weight, variantImplementation.style) ){

			this._isReady = false;

			this._variants.push( variantImplementation );

			if( !variantImplementation.isReady ){

				variantImplementation.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addCustomImplementationVariant() - Variant(${variantImplementation.weight}, ${variantImplementation.style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 * @returns {FontVariant|null}
	 */
	getVariant( weight, style ){

		return this._variants.find( fontVariant => fontVariant.weight === weight && fontVariant.style === style );

	}

	/**
	 *
	 * @return {string}
	 */
	get name(){ return this._name; }

	_checkReadiness = () => {

		if( this._variants.every( v => v.isReady ) ) {

			FontFamily_setReady( this );

		}

	}

}

const FontFamily_readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontFamily} fontFamily
 * @private
 */
function FontFamily_setReady( fontFamily ) {

	fontFamily._isReady = true;
	fontFamily.dispatchEvent( FontFamily_readyEvent );

}

;// CONCATENATED MODULE: ./src/font/FontLibrary.js


// JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


const _fontFamilies = {};

/* eslint-disable no-unused-vars */

/**
 *
 * @param {FontFamily} fontFamily
 * @returns {Promise<unknown>}
 */
function prepare( fontFamily ) {

	/**
	 *
	 * @type {FontFamily[]}
	 */
	const families = [ ...arguments ];

	// Check all family are right instance
	families.forEach( f => {

		if( !(f instanceof FontFamily) ) {

			throw new Error(`FontLibrary::prepare() - One of the provided parameter is not a FontFamily. Instead ${typeof f} given.`);

		}

	})

	/**
	 * Check that all provided families are loaded
	 * @returns {boolean}
	 */
	const areAllLoaded = function() {

		return families.every( f => f.isReady );

	}

	// @TODO: Should handle possible rejection
	return new Promise((resolve,reject)=>{

		// Direct resolve if all loaded
		if ( areAllLoaded() ){

			resolve();

		} else {

			// Add listener on each family not ready
			for ( let i = 0; i < families.length; i++ ) {

				const family = families[ i ];
				if( !family.isReady ){

					family.addEventListener( "ready" , ()=> {

						// Resolve if all other families are loaded
						if( areAllLoaded() ) {

							resolve();

						}

					});

				}

			}

		}

	});

}

/* eslint-enable no-unused-vars */


/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
function addFontFamily( name ) {

	if ( _fontFamilies[ name ] ) {
		console.error( `FontLibrary::addFontFamily - Font('${name}') is already registered` );
	}

	_fontFamilies[ name ] = new FontFamily( name );

	return _fontFamilies[ name ];

}

/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
function getFontFamily( name ) {

	return _fontFamilies[ name ];

}


/**
 *
 * @param { (fontVariant:FontVariant, character:string ) => string|null } handler
 */
function setMissingCharacterHandler( handler ) {

	_missingCharacterHandler = handler;

}

//

const FontLibrary = {
	addFontFamily,
	getFontFamily,
	prepare,
	setMissingCharacterHandler,
	missingCharacter
};

/* harmony default export */ const font_FontLibrary = (FontLibrary);

/**
 *
 * @type { (fontVariant:FontVariant, character:string ) => string|null }
 * @private
 */
let _missingCharacterHandler = function ( fontVariant, character ) {

	console.error( `The character '${character}' is not included in the font characters set.` );

	// return a glyph has fallback
	return " ";

};

/**
 *
 * @param {FontVariant} fontVariant
 * @param {string} character
 *
 * @returns {string}
 */
function missingCharacter( fontVariant, character ) {

	// Execute the user defined handled
	return _missingCharacterHandler( fontVariant, character );

}



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

			component.performAfterUpdate();

		}

	}

}

// TODO move these into the class (Webpack unfortunately doesn't understand
// `static` property syntax, despite browsers already supporting this)
UpdateManager.components = [];
UpdateManager.requestedUpdates = {};

;// CONCATENATED MODULE: ./src/utils/font/FontWeight.js
const LIGHTER = '100';
const _100 = '100';
const _200 = '200';
const _300 = '300';
const FontWeight_NORMAL = '400';
const _400 = '400';
const _500 = '500';
const _600 = '600';
const BOLD = '700';
const _700 = '700';
const _800 = '800';
const BOLDER = '900';
const _900 = '900';



;// CONCATENATED MODULE: ./src/utils/font/FontStyle.js
const FontStyle_NORMAL = "normal";
const ITALIC = "italic";
const OBLIQUE = "oblique";

const MAX_OBLIQUE_ANGLE = 90;

/**
 * Get the oblique style with custom angle
 * @param angleInDegree
 */
function obliqueCustomAngle( angleInDegree ){

	// Clamp the angle
	angleInDegree = angleInDegree < - MAX_OBLIQUE_ANGLE ? - MAX_OBLIQUE_ANGLE : angleInDegree > MAX_OBLIQUE_ANGLE ? MAX_OBLIQUE_ANGLE : angleInDegree;

	return `${OBLIQUE} ${angleInDegree}deg`;

}


;// CONCATENATED MODULE: ./src/utils/Defaults.js










/** List the default values of the lib components */
/* harmony default export */ const Defaults = ({
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal', // FontKerning would act like css : "none"|"normal"|"auto"("auto" not yet implemented)
	fontStyle: FontStyle_NORMAL,
	fontWeight: FontWeight_NORMAL,
	bestFit: 'none',
	offset: 0.01,
	interLine: 0.01,
	breakOn: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: PRE_LINE,
	contentDirection: COLUMN,
	alignItems: CENTER,
	justifyContent: JustifyContent_START,
	fontTexture: null,
	textAlign: TextAlign_CENTER,
	fontColor: new external_THREE_namespaceObject.Color( 0xffffff ),
	fontOpacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	borderRadius: new external_THREE_namespaceObject.Vector4( 0.01,0.01,0.01, 0.01 ),
	borderWidth: new external_THREE_namespaceObject.Vector4( 0, 0, 0, 0 ),
	borderColor: new external_THREE_namespaceObject.Color( 'black' ),
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: new external_THREE_namespaceObject.Color( 0x222222 ),
	backgroundWhiteColor: new external_THREE_namespaceObject.Color( 0xffffff ),
	backgroundOpacity: 0.8,
	backgroundOpaqueOpacity: 1.0,
	// this default value is a function to avoid initialization issues (see issue #126)
	// backgroundTexture: makeBackgroundTexture,
	backgroundTexture: null,
	hiddenOverflow: false,
	letterSpacing: 0
});

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/CommonTransformers.js
/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const directTransfer = function ( target, targetProperty, value ) {

	target[targetProperty] = value;

}

;// CONCATENATED MODULE: ./src/utils/mediator/Mediator.js


/**
 * An option function to transform value from subject to target
 * @typedef {(target:any, targetProperty:string, value:any) => void} MediationTransformer
 *
 */

/**
 * @typedef {Object.<{subjectProperty:string, trans?:MediationTransformer}>} MediationDefinition
 *
 */

class Mediator{

	/**
	 * @constructor
	 * @param {MediationDefinition} definition
	 */
	constructor( definition ) {

		/**
		 *
		 * @type {MediationDefinition}
		 * @private
		 */
		this._definition = definition;

	}

	/**
	 *
	 * @param {MediationDefinition} value
	 */
	set definition( value ) {

		this._definition = value;

	}


	/**
	 *
	 * @param {MeshUIComponent} subject
	 * @param {any} target
	 * @param {Object.<(string|number), any>} options
	 * @param {any} [secondTarget=null]
	 */
	mediate( subject, target, options, secondTarget = null ) {

		// Mediate each subject properties to material
		for ( const subjectProperty in this._definition ) {
			const mediationDefinition = this._definition[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = mediationDefinition.t ? mediationDefinition.t : directTransfer;
				mediationTransformer( target, mediationDefinition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, mediationDefinition.m, options[subjectProperty] );

				}

			}

		}

	}


	/***********************************************************************************************************************
	 * STATIC
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {MeshUIComponent} subject
	 * @param {any} target
	 * @param {Object.<(string|number), any>} options
	 * @param {Object.<{subjectProperty:string, trans?:(target:any, targetProperty:string, value:any) => void}>} mediationDefinitions
	 * @param {any} [secondTarget=null]
	 */
	static mediate( subject, target, options, mediationDefinitions, secondTarget = null ) {

		// Cannot mediate if target not defined
		if( !target ) return;

		// if no options found, retrieve all need options
		if( !options ){

			options = {};
			for ( const materialProperty in mediationDefinitions ) {

				let value = subject[materialProperty];
				if( value === undefined ){

					const upperCaseProperty = materialProperty[0].toUpperCase() + materialProperty.substring(1)
					if( subject["get"+upperCaseProperty] ) {

						value = subject["get"+upperCaseProperty]();

					}

				}

				if( value !== undefined ) {

					options[materialProperty] = value;

				}

			}

		}


		// Mediate each subject properties to material
		for ( const subjectProperty in mediationDefinitions ) {
			const definition = mediationDefinitions[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = definition.t ? definition.t : directTransfer;
				mediationTransformer( target, definition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, definition.m, options[subjectProperty] );

				}

			}

		}

	}


}

;// CONCATENATED MODULE: ./src/components/core/MeshUIComponent.js













//JSDoc related imports
/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */

/**


Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

 */

class MeshUIComponent extends external_THREE_namespaceObject.Object3D {

	/**
	 *
	 * @param {Object.<(string), any>} options
	 */
		constructor( options ) {

			super( options );

			this.states = {};
			this.currentState = undefined;
			this.isUI = true;
			this.autoLayout = true;

			// children

			/**
			 *
			 * @type {MeshUIComponent[]}
			 */
			this.childrenUIs = [];

			/**
			 *
			 * @type {MeshUIComponent[]}
			 */
			this.childrenBoxes = [];

			/**
			 *
			 * @type {MeshUIComponent[]}
			 */
			this.childrenTexts = [];

			/**
			 *
			 * @type {MeshUIComponent[]}
			 */
			this.childrenInlines = [];


			/**
			 * parents
			 * @type {MeshUIComponent|null}
			 */
			this.parentUI = null;

			// update parentUI when this component will be added or removed
			this.addEventListener( 'added', this._rebuildParentUI );
			this.addEventListener( 'removed', this._rebuildParentUI );

			/**
			 *
			 * @type {Mesh|null}
			 * @protected
			 */
			this._main = null;

			// hooks
			this._hooks = {};
			this._onAfterUpdates = [];

			this.position.z = this.getOffset();

			/**
			 *
			 * @type {Object.<{m:string, t?:(value:any) => any}>}
			 * @protected
			 */
			this._materialMediation = {};

			this._meshMediation = {
				_castShadow:{m:'castShadow'},
				_receiveShadow:{m:'receiveShadow'},
				// _renderOrder:{m:'renderOrder'}
			}


			/**
			 *
			 * @type {Vector4}
			 * @private
			 */
			this._borderRadius = new external_THREE_namespaceObject.Vector4().copy( Defaults.borderRadius );

			/**
			 *
			 * @type {Vector4}
			 * @private
			 */
			this._borderWidth = new external_THREE_namespaceObject.Vector4().copy( Defaults.borderWidth );

			/**
			 *
			 * @type {Vector4}
			 * @private
			 */
			this._padding = new external_THREE_namespaceObject.Vector4( 0, 0, 0, 0 );

			/**
			 *
			 * @type {Vector4}
			 * @private
			 */
			this._margin = new external_THREE_namespaceObject.Vector4( 0, 0, 0, 0 );

			/**
			 * @Todo: Probably only for boxComponents
			 * @type {Lines}
			 */
			this.lines = new Lines();

			/**
			 *
			 * @type {FontVariant}
			 * @protected
			 */
			this._font = null;

		}

		/////////////
		/// GETTERS
		/////////////

		getClippingPlanes() {

			const planes = [];

			if ( this.parentUI ) {

				if ( this.isBlock && this.parentUI.getHiddenOverflow() ) {

					// const yLimit = ( this.getInsetHeight() / 2 );
					const yLimit = this.parentUI.getOffsetHeight();
					const xLimit = this.parentUI.getOffsetWidth();
					const padding = this.parentUI._padding;
					const border = this.parentUI._borderWidth;

					const newPlanes = [
						// top
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 0, -1, 0 ), yLimit / 2 - ( padding.x + border.x ) ),
						// right
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( -1, 0, 0 ), xLimit / 2  - ( padding.y + border.y ) ),
						// bottom
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 0, 1, 0 ), yLimit / 2 - ( padding.z + border.z ) ),
						// left
						new external_THREE_namespaceObject.Plane( new external_THREE_namespaceObject.Vector3( 1, 0, 0 ), xLimit / 2 - ( padding.w + border.w ) ),
					];

					newPlanes.forEach( plane => {

						plane.applyMatrix4( this.parentUI.matrixWorld );

					} );

					planes.push( ...newPlanes );

				}

				if ( this.parentUI.parentUI ) {

					planes.push( ...this.parentUI.getClippingPlanes() );

				}

			}

			return planes;

		}

		/**
		 * @TODO : This is already present in MaterialManager
		 * Update a component's materials clipping planes.
		 * Called every frame.
		 */
		updateClippingPlanes( value ) {

			const newClippingPlanes = value !== undefined ? value : this.getClippingPlanes();

			if ( JSON.stringify( newClippingPlanes ) !== JSON.stringify( this.clippingPlanes ) ) {

				this.clippingPlanes = newClippingPlanes;

				if ( this.material ) this.material.clippingPlanes = this.clippingPlanes;

			}

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

		getSegments() {

			return this.segments || 1;

		}

		getAlphaTest() {

			return this.alphaTest || 0.02;

		}

		getFontKerning() {

			return this._getProperty( 'fontKerning' );

		}

		getFontStyle() {

			return this._getProperty( 'fontStyle' );

		}

		getFontWeight() {

			return this._getProperty( 'fontWeight' );

		}

		getLetterSpacing() {

			return this._getProperty( 'letterSpacing' );

		}

		getFontTexture() {

			if( this._font && this._font.isReady ){

				return this._font.texture;

			}

			return this._getProperty( 'fontTexture' );

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

			// return this.backgroundTexture || DEFAULTS.backgroundTexture();
			return this.backgroundTexture || Defaults.backgroundTexture;

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
			this.childrenUIs = this.children.filter( child => child.isUI && child.visible );

			// Stores all children that are box
			this.childrenBoxes = this.childrenUIs.filter( child => child.isBoxComponent );

			// Stores all children that are inline
			this.childrenInlines = this.childrenUIs.filter( child => child.isInline );

			// Stores all children that are text
			this.childrenTexts = this.childrenUIs.filter( child => child.isText );
		}

		/**
		 * Try to retrieve parentUI after each structural change
		 * @private
		 */
		_rebuildParentUI = () => {

			if ( this.parent && this.parent.isUI ) {

				this.parentUI = this.parent;
				this.position.z = this.getOffset();

			} else {

				this.parentUI = null;

			}

		};

		/**
		 * When the user calls component.add, it registers for updates,
		 * then call THREE.Object3D.add.
		 */

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object) {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isUI ) this.update( null, true );
				// if ( arguments[ id ].isInline ) this.update( null, true );

			}

			super.add( ...arguments );

			this._rebuildChildrenLists();

			return this;

		}


	/**
	 * When the user calls component.remove, it registers for updates,
	 * then call THREE.Object3D.remove.
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
		remove(object) {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isInline ) this.update( null, true );

			}

			super.remove( ...arguments );

			this._rebuildChildrenLists();

			return this;

		}

	/* eslint-enable no-unused-vars */

		//

		update( updateParsing, updateLayout, updateInner ) {

			UpdateManager.requestUpdate( this, updateParsing, updateLayout, updateInner );

		}

		/**
		 *
		 * @param {Function} func
		 */
		set onAfterUpdate( func ) {

			console.warn( '`onAfterUpdate` property has been deprecated, please rely on `addAfterUpdate` instead.' );
			this.addAfterUpdate( func );

		}

	/**
	 *
	 * @param {Function} func
	 */
		addAfterUpdate( func ) {

			this._onAfterUpdates.push( func );

		}

		/**
		 *
		 * @param {Function} func
		 */
		removeAfterUpdate( func ) {

			const index = this._onAfterUpdates.indexOf( func );
			if( index !== -1 ) {

				this._onAfterUpdates.splice( index, 1 );

			}

		}

		performAfterUpdate() {

			for ( let i = 0; i < this._onAfterUpdates.length; i++ ) {

				this._onAfterUpdates[ i ]();

			}

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

			// Set this component parameters according to options, and trigger updates accordingly
			// The benefit of having two types of updates, is to put everthing that takes time
			// in one batch, and the rest in the other. This way, efficient animation is possible with
			// attribute from the light batch.

			for ( const prop of Object.keys( options ) ) {

				if ( this[ prop ] != options[ prop ] ) {

					const value = options[ prop ];

					switch ( prop ) {

						case 'content' :
						case 'fontWeight' :
						case 'fontStyle' :
						case 'whiteSpace': // @TODO : Whitespace could also just be layouting
							if ( this.isText ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = value;
							break;

						// Only layout now - Not anymore parsing
						case 'fontSize' :
						case 'fontKerning' :
						case 'breakOn':
						case 'segments':
							layoutNeedsUpdate = true;
							this[ prop ] = value;
							break;

						case 'bestFit' :
							if ( this.isBlock ) {
								parsingNeedsUpdate = true;
								layoutNeedsUpdate = true;
							}
							this[ prop ] = value;
							break;

						case 'width' :
						case 'height' :
						// case 'padding' :
							// @TODO: I don't think this is true anymore
							if ( this.isInlineBlock || ( this.isBlock ) ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = value;
							break;

						case 'padding':
							this._fourDimensionsValueSetter(this._padding, value );
							layoutNeedsUpdate = true;
							break;
						case 'paddingTop':
							this._padding.x = value;
							layoutNeedsUpdate = true;
							break;
						case 'paddingRight':
							this._padding.y = value;
							layoutNeedsUpdate = true;
							break;
						case 'paddingBottom':
							this._padding.z = value;
							layoutNeedsUpdate = true;
							break;
						case 'paddingLeft':
							this._padding.w = value;
							layoutNeedsUpdate = true;
							break;

						case 'letterSpacing' :
						case 'interLine' :
							// @TODO: I don't think this is true anymore
							if ( this.isBlock ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = value;
							break;

						case 'margin' :
							this._fourDimensionsValueSetter(this._margin, value );
							layoutNeedsUpdate = true;
							break;
						case 'marginTop':
							this._margin.x = value;
							layoutNeedsUpdate = true;
							break;
						case 'marginRight':
							this._margin.y = value;
							layoutNeedsUpdate = true;
							break;
						case 'marginBottom':
							this._margin.z = value;
							layoutNeedsUpdate = true;
							break;
						case 'marginLeft':
							this._margin.w = value;
							layoutNeedsUpdate = true;
							break;
						// case 'margin':
						case 'contentDirection' :
						case 'justifyContent' :
						case 'alignContent' :
						case 'alignItems' :
						case 'textAlign' :
						case 'textType' :
							layoutNeedsUpdate = true;
							this[ prop ] = value;
							break;

						case 'fontColor' :
						case 'fontOpacity' :
						case 'fontSupersampling' :
						case 'backgroundColor' :
						case 'backgroundOpacity' :
						case 'backgroundTexture' :
						case 'backgroundSize' :
						case 'borderColor' :
						case 'borderOpacity' :
							// innerNeedsUpdate = true;
							this[ prop ] = value;
							break;

						case 'hiddenOverflow' :
							this[ prop ] = value;
							break;

						case 'offset':
							// if( !this.isBlock || this.parentUI ){

								this[ prop ] = value;
								this.position.z = value;

							// }
							break;

						// abstracted properties, those properties don't need to be store as this[prop] = value
						case 'borderRadius' :
							this._fourDimensionsValueSetter( this._borderRadius, value);
							break;
						case 'borderTopLeftRadius':
							this._borderRadius.x = value;
							break;
						case 'borderTopRightRadius':
							this._borderRadius.y = value;
							break;
						case 'borderBottomRightRadius':
							this._borderRadius.z = value;
							break;
						case 'borderBottomLeftRadius':
							this._borderRadius.w = value;
							break;
						case 'borderTopRadius':
							this._borderRadius.x = value;
							this._borderRadius.y = value;
							break;
						case 'borderRightRadius':
							this._borderRadius.y = value;
							this._borderRadius.z = value;
							break;
						case 'borderLeftRadius':
							this._borderRadius.x = value;
							this._borderRadius.w = value;
							break
						case 'borderBottomRadius':
							this._borderRadius.z = value;
							this._borderRadius.w = value;
							break;


						case 'borderWidth' :
							this._fourDimensionsValueSetter( this._borderWidth, value);
							layoutNeedsUpdate = true;
							break;
						case 'borderTopWidth' :
							this._borderWidth.x = value;
							layoutNeedsUpdate = true;
							break;
						case 'borderRightWidth':
							this._borderWidth.y = value;
							layoutNeedsUpdate = true;
							break;
						case 'borderBottomWidth':
							this._borderWidth.z = value;
							layoutNeedsUpdate = true;
							break;
						case 'borderLeftWidth':
							this._borderWidth.w = value;
							layoutNeedsUpdate = true;
							break;

						default:
							this[ prop ] = value;
					}

				}

			}

			// special cases, this.update() must be called only when some files finished loading

			// Selection of fontFamily and font property
			// 1. Preferred way, give a {FontFamily} property
			if ( options.fontFamily instanceof FontFamily ) {

				this.fontFamily = options.fontFamily;
				this.font = options.fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

			}

			// 1.1 Preferred way, a bit annoying to check options.fontTexture ( retro-compatibility )
			else if( typeof options.fontFamily === 'string' && !options.fontTexture ) {

				const fontFamily = font_FontLibrary.getFontFamily( options.fontFamily );

				if( fontFamily ){

					this.fontFamily = fontFamily;
					this.font = fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

				}

			}
			// 2. < v7.x.x way
			else if ( options.fontFamily && options.fontTexture ) {

				// Set from old way, check if that family is already registered
				const fontName = options.fontFamily.pages ? options.fontFamily.info.face : options.fontFamily;

				let fontFamily = font_FontLibrary.getFontFamily( fontName );

				if ( !fontFamily ) {

					fontFamily = font_FontLibrary.addFontFamily( fontName )
						.addVariant( FontWeight_NORMAL, FontStyle_NORMAL, options.fontFamily, options.fontTexture );

				}

				this.fontFamily = fontFamily;

				// @TODO: Add more variant selection
				this.font = fontFamily.getVariant( FontWeight_NORMAL, FontStyle_NORMAL );

			}

			// if font kerning changes for a child of a block with Best Fit enabled, we need to trigger parsing for the parent as well.
			if ( this.parentUI && this.parentUI.getBestFit() != 'none' ) this.parentUI.update( true, true, false );

			// Call component update

			this.update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );


			if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );


			//
			this._transferToMaterial( options );

			//
			// this._transferToMesh( options );



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
				console.warn( `state "${state}" does not exist within this component` );
				return;
			}

			if ( state === this.currentState ) return;

			this.currentState = state;

			if ( savedState.onSet ) savedState.onSet();

			if ( savedState.attributes ) this.set( savedState.attributes );

		}

		/**
		 * Get completely rid of this component and its children, also unregister it for updates
		 * @override
		 * @return {this}
		 */
		clear() {

			this.traverse( ( obj ) => {

				UpdateManager.disposeOf( obj );

				if ( obj.material ) obj.material.dispose();

				if ( obj.geometry ) obj.geometry.dispose();

			} );

			return this;
		}

		/***********************************************************************************************************************
		 * TO MATERIAL HOLDER
		 **********************************************************************************************************************/

		get material() {
			return this._material;
		}

		/**
		 *
		 * @param {Material|ShaderMaterial} material
		 */
		set material( material ) {

			this._material = material;

			// Update the fontMaterialProperties that need to be transferred to
			this._materialMediation = {...material.constructor.mediation }

			// transfer all the properties to material
			this._transferToMaterial();

			if( this._main ) {

				this._main.material = this._material;

			}

		}

		/**
		 *
		 * @param {Material|null} material
		 */
		set customDepthMaterial( material ) {

			this._customDepthMaterial = material;

			this._transferToMaterial();

			if ( this._main ) {
				// transfer to the main if isset
				this._main.customDepthMaterial = this._customDepthMaterial;

			}

		}

		get customDepthMaterial() { return this._customDepthMaterial; }

		/**
		 * According to the list of materialProperties
		 * some properties are sent to material
		 * @private
		 */
		_transferToMaterial( options = null ) {

			Mediator.mediate(this, this._material, options, this._materialMediation, this.customDepthMaterial);

		}

		_transferToMesh( options = null ) {

			Mediator.mediate( this, this._main, options, this._meshMediation );

		}

		/**
		 *
		 * @param {Vector4} vector4
		 * @param {string|number|Array.<string|number>} value
		 * @private
		 */
		_fourDimensionsValueSetter( vector4, value ) {

			if( value instanceof external_THREE_namespaceObject.Vector4 ) {

				vector4.copy( value );
				return ;

			}

			if (typeof value === 'string' || value instanceof String) {

				value = value.split(" ");

			}

			if( Array.isArray( value ) ) {

				value = value.map( v => parseFloat(v) );

				switch ( value.length ) {

					case 1:
						vector4.setScalar( value[0] );
						return;

					case 2:
						vector4.x = vector4.z = value[0];
						vector4.y = vector4.w = value[1];
						return;

					case 3:
						vector4.x = value[0];
						vector4.y = value[1];
						vector4.z = value[2];
						return;

					case 4:
						vector4.x = value[0];
						vector4.y = value[1];
						vector4.z = value[2];
						vector4.w = value[3];
						return;

					default:
						console.error("Four Dimension property has more than four values");
						return;

				}

			}

			if( !isNaN(value) ) {

				vector4.setScalar( value );

			}

		}

	/**
	 * @param {FontVariant} value
	 */
	set font( value ) {

		this._font = value;

	}

	/**
	 *
	 * @returns {FontVariant}
	 */
	get font() {

		return this._font;

	}

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 *
	 * @param {boolean} value
	 */
	set visible( value ) {

		this._visible = value;

		// @TODO: Instead of direct execution of _rebuildChildrenList
		//				It could be better to "dirtying" the children list and compute it only once on next frame
		this.parentUI?._rebuildChildrenLists();

	}

	/**
	 *
	 * @return {boolean}
	 */
	get visible() { return this._visible; }

	/**
	 *
	 * @param {boolean} value
	 */
	set castShadow( value ) {

		this._castShadow = value;

		if ( this._main ) {

			this._main.castShadow = this._castShadow;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get castShadow() { return this._castShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set receiveShadow( value ) {

		this._receiveShadow = value;

		if ( this._main ) {

			this._main.receiveShadow = this._receiveShadow;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get receiveShadow() { return this._receiveShadow; }

	/**
	 *
	 * @param {number} value
	 */
	set renderOrder( value ) {

		this._renderOrder = value;

		if( this._main ) {

			this._main.renderOrder = this._renderOrder;

		}

	}

	/**
	 *
	 * @return {number}
	 */
	get renderOrder( ) { return this._renderOrder; }

	/*********************************************************************************************************************
	 * MATERIAL MEDIATION
	 ********************************************************************************************************************/

	/**
	 *
	 * @param {number} value
	 */
	set side( value ) {

		this._side = value;

		if ( this._material ) this._material.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get side() { return this._side; }

}

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







class InlineManager extends MeshUIComponent{

		constructor(options) {

			super(options);

		}

		/** Compute children .inlines objects position, according to their pre-computed dimensions */
		computeInlinesPosition() {

			// computed by BoxComponent
			const INNER_WIDTH = this.innerWidth;
			// const INNER_WIDTH = this.getInnerWidth();
			const INNER_HEIGHT = this.innerHeight;
			// const INNER_HEIGHT = this.getInnerHeight();

			// got by MeshUIComponent
			const JUSTIFICATION = this.getJustifyContent();
			const ALIGNMENT = this.getTextAlign();

			// Compute lines
			const lines = this.computeLines();

			/////////////////////////////////////////////////////////////////
			// Position lines according to justifyContent and contentAlign
			/////////////////////////////////////////////////////////////////

			// Vertical positioning
			justifyInlines( this, lines, JUSTIFICATION, INNER_HEIGHT);

			// Horizontal positioning
			textAlign( this, lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}

		/**
		 * computes lines based on children's inlines array.
		 * @private
		 */
		computeLines() {

			// computed by BoxComponent
			const INNER_WIDTH = this.innerWidth;
			const INTERLINE = this.getInterLine();

			// Will stock the characters of each line, so that we can
			// correct lines position before to merge
			const lines = new Lines( new Line() );

			let lastInlineOffset = 0;
			this.childrenInlines.forEach( ( inlineComponent ) => {

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

					lastInlineOffset += inlineComponent._margin.w + inlineComponent._padding.w;

					inlineComponent.inlines.forEach( ( inline, i, inlines ) => {

						const line = lines[lines.length - 1];
						// Line break
						const shouldBreak = Whitespace_shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

						if ( shouldBreak ) {

							lines.push( new Line( inline ) );

							inline.offsetX = inline.xoffset;

							// restart the lastInlineOffset as zero.
							if ( inline.width === 0 ) {
								lastInlineOffset = 0;
								return;
							}

							// compute lastInlineOffset normally
							// except for kerning which won't apply
							// as there is visually no lefthanded glyph to kern with
							inline.cumulativeWidth = inline.xadvance + LETTERSPACING;
							lastInlineOffset = inline.cumulativeWidth;
							return;

						}

						lines[ lines.length - 1 ].push( inline );
						inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

						inline.cumulativeWidth = inline.xadvance + inline.kerning + LETTERSPACING;
						lastInlineOffset += inline.cumulativeWidth;

						// in case of lineBreak mandatory
						if( line.length-1 === 1) {

							if ( line[ line.length - 2 ].width === 0 ) {

								// remove the offset of the character following the newline
								inline.offsetX -= inline.xoffset;
								lastInlineOffset -= inline.xoffset;

							}

						}

					} );

					lastInlineOffset += inlineComponent._margin.y + inlineComponent._padding.y;

			} );

			// Compute single line and combined lines dimensions
			const WHITESPACE = this.getWhiteSpace();

			let width = 0;
			let lineOffsetY = 0;
			lines[0].y = 0;

			lines.forEach( ( line, i ) => {

				// starts by processing whitespace, it will return a collapsed left offset
				const whiteSpaceOffset = collapseWhitespaceOnInlines( line, WHITESPACE );

				//
				let lineHeight = 0;
				let lineBase = 0;

				line.forEach( ( inline ) => {

					lineHeight = Math.max( lineHeight, inline.lineHeight );
					lineBase = Math.max( lineBase, inline.lineBase );

					inline.offsetX -= whiteSpaceOffset;

				});

				line.lineHeight = lineHeight;
				line.lineBase = lineBase;

				const baseLineDelta = lineHeight - lineBase;

				// process yoffset
				line.forEach( ( inline ) => {

					inline.offsetY = lineOffsetY - line.lineHeight + baseLineDelta + lines[ 0 ].lineHeight;

				});

				if( i !== 0 ){

					// get the previousLine y and increase
					line.y =  lines[i-1].y - line.lineHeight - INTERLINE;

				}

				lineOffsetY = lineOffsetY - line.lineHeight - INTERLINE

				//

				line.width = 0;
				// if this line have inlines
				if ( line[ 0 ] ) {

					// compute its width: length from firstInline:LEFT to lastInline:RIGHT
					// only by the length of its extremities
					const lastInline = line[ line.length - 1 ];

					// Right + Left ( left is negative )
					line.width = ( lastInline.offsetX + lastInline.cumulativeWidth + lastInline.paddingRight + lastInline.marginRight ) + line[ 0 ].offsetX;

					width = Math.max( width, line.width);
				}

			} );

			lines.height = Math.abs(lineOffsetY + INTERLINE );
			lines.width = width;

			return lines;

		}


}

;// CONCATENATED MODULE: ./src/utils/block-layout/Padding.js
/**
 * @TODO: This could be integrated in AlignItems
 * @param {BoxComponent} boxComponent
 * @param {string} DIRECTION
 * @param {string} ALIGNMENT
 */
const padItems = function( boxComponent, DIRECTION, ALIGNMENT ){

	let snap = 'center';
	let snapXon = 'center';
	let snapYon = 'center';

	const padding = boxComponent._padding;
	const border = boxComponent._borderWidth;

	if( DIRECTION.indexOf('column') !== -1 ) {

		if( ALIGNMENT === 'start' ) {
			snap = snapXon = 'left';
		}else if( ALIGNMENT === 'end' ){
			snap = snapXon ='right';
		}else {
			snap = 'centerX';
		}

	} else {

		/* eslint-disable no-lonely-if */
		if( ALIGNMENT === 'start' ) {
			snap = snapYon = 'top';
		}else if( ALIGNMENT === 'end' ){
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


	boxComponent.childrenBoxes.forEach( ( child ) => {

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

		boxComponent.childrenPos[ child.id ]['x'] += x + marginX;
		boxComponent.childrenPos[ child.id ]['y'] += y + marginY;



	} );


}

;// CONCATENATED MODULE: ./src/components/core/BoxComponent.js
/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */







class BoxComponent extends InlineManager {


		constructor( options ) {

			super( options );

			this.isBoxComponent = true;
			this.childrenPos = {};

			// Box properties only update once per update layout
			this.offsetWidth = 0;
			this.offsetHeight = 0;
			this.innerWidth = 0;
			this.innerHeight = 0;

			this.centerX = 0;
			this.centerY = 0;

		}

	/**
	 *
	 */
	computeBoxProperties() {

			this.offsetWidth = this.getOffsetWidth();
			this.offsetHeight = this.getOffsetHeight();

			this.innerWidth = this.getInnerWidth();
			this.innerHeight = this.getInnerHeight();

			this.centerX = this.getCenterX();
			this.centerY = this.getCenterY();

		}


	/**
	 * Return the sum of all this component's children sides + their margin
	 * @param {string} side
	 * @return {number}
	 */
		getChildrenSideSum( side ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const CHILD_SIZE = ( side === 'width' ) ?
					( child.getOffsetWidth() + child._margin.y + child._margin.w  ) :
					( child.getOffsetHeight() + child._margin.x + child._margin.z );

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
						directionalOffset = -this.innerWidth / 2;
						break;

					case ROW_REVERSE :
						directionalOffset = this.innerWidth / 2;
						break;

					case COLUMN :
						directionalOffset = this.innerHeight / 2;
						break;

					case COLUMN_REVERSE :
						directionalOffset = -this.innerHeight / 2;
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

				const maxSize = direction === 'width' ?
					child.getOffsetWidth() + child._margin.y + child._margin.w :
					child.getOffsetHeight() + child._margin.x + child._margin.z;

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
	getInnerWidth() {

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
	getInnerHeight() {

		const base = this.height || this.getAutoHeight();

		if ( this.getBoxSizing() === 'border-box' ) {

			return base - (this._padding.x + this._padding.z + this._borderWidth.x + this._borderWidth.z );

		}

		return base;

	}


		getBoxSizing() { return this.boxSizing || 'border-box'; }

	/**
	 * Retrieve the center X according to box sized dimensions
	 * @return {number}
	 */
	getCenterX() {
		const leftSide = this._padding.w + this._borderWidth.w;
		const rightSide = this._padding.y + this._borderWidth.y;

		return (leftSide - rightSide ) / 2;
	}

	/**
	 * Retrieve the center Y according to box sized dimensions
	 * @return {number}
	 */
	getCenterY() {
		const topSide = this._padding.x + this._borderWidth.x;
		const bottomSide = this._padding.z + this._borderWidth.z;

		return ( bottomSide - topSide ) / 2;
	}


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

			return this.parentUI.getInnerHeight();

		}

		return 0;
	}

	/**
	 *
	 * @return {number}
	 */
	getStretchedWidth(){

		if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' && this.parentUI.getContentDirection().indexOf('column') !== -1 ) {

			return this.parentUI.getInnerWidth();

		}

		return 0;
	}

}


;// CONCATENATED MODULE: ./src/frame/Frame.js



/**
 * Returns a basic plane mesh.
 */
class Frame extends external_THREE_namespaceObject.Mesh {

	constructor( material ) {

		const geometry = new external_THREE_namespaceObject.PlaneBufferGeometry();

		// Add uv for borders computations by copying uv
		geometry.setAttribute('uvB', new external_THREE_namespaceObject.BufferAttribute(
			new Float32Array(
				geometry.getAttribute('uv').array
			), 2)).name = 'uvB';

		super( geometry, material );

		this.name = 'MeshUI-Frame';

	}

}

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.vertex.glsl.js
/* harmony default export */ const frame_border_pars_vertex_glsl = (/* glsl */`

// FrameBorder vertex pars
attribute vec2 uvB;
varying vec2 vUvB;

`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.vertex.glsl.js
/* harmony default export */ const frame_border_vertex_glsl = (/* glsl */`

	// FrameBorder vertex shader
	vUvB = uvB;

`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.fragment.glsl.js
/* harmony default export */ const frame_border_pars_fragment_glsl = (/* glsl */`

// borders sequences are : x:TOP, y:RIGHT, z:BOTTOM, w:LEFT
uniform vec4 borderWidth;
uniform vec3 borderColor;
uniform float borderOpacity;
uniform vec4 borderRadius;

varying vec2 vUvB;

// Borders
float getEdgeDist() {

	// This allows to go the uv position in a [-1, 1] referencial system
	vec2 ndc = vec2( vUvB.x * 2.0 - 1.0, vUvB.y * 2.0 - 1.0 );

	//
	vec2 planeSpaceCoord = vec2( frameSize.x * 0.5 * ndc.x, frameSize.y * 0.5 * ndc.y );
	vec2 corner = frameSize * 0.5;
	vec2 offsetCorner = corner - abs( planeSpaceCoord );

	float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;

	if (vUvB.x < 0.5 && vUvB.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.x, 0.0 ) ) - borderRadius.x;
		float s = step( innerRadDist * -1.0, borderRadius.x );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x >= 0.5 && vUvB.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.y, 0.0 ) ) - borderRadius.y;
		float s = step( innerRadDist * -1.0, borderRadius.y );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x >= 0.5 && vUvB.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.z, 0.0 ) ) - borderRadius.z;
		float s = step( innerRadDist * -1.0, borderRadius.z );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x < 0.5 && vUvB.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.w, 0.0 ) ) - borderRadius.w;
		float s = step( innerRadDist * -1.0, borderRadius.w );
		return mix( innerRadDist, roundedDist, s );
	}
}

`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.fragment.glsl.js
/* harmony default export */ const frame_border_fragment_glsl = (/* glsl */`

float edgeDist = getEdgeDist();
float change = fwidth( edgeDist );

float alpha = smoothstep( change, 0.0, edgeDist );
diffuseColor.a *= alpha;

// if the length square is not zerp
if( borderWidth.x * borderWidth.x + borderWidth.y * borderWidth.y + borderWidth.z * borderWidth.z + borderWidth.w * borderWidth.w  > 0.0 )
{

	vec4 borderColor = vec4( borderColor, borderOpacity * alpha );
	float stp = smoothstep( edgeDist + change, edgeDist, borderWidth.x * -1.0 );

	// @TODO: Implement border width sequence : top,right,bottom,left
	// if( vUvB.x <= borderWidth.w || vUvB.x >= 1.0 - borderWidth.y || vUvB.y >= 1.0 - borderWidth.x || vUvB.y <= borderWidth.z )
	// {

	//	// would be nicer with smoothstep
	//	diffuseColor.rgb = borderColor.rgb;

	//}

	diffuseColor = mix( diffuseColor, borderColor, stp );

}
`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-common.pars.fragment.glsl.js
/* harmony default export */ const frame_common_pars_fragment_glsl = (/* glsl */`

// To be removed - required for both border and background
uniform vec2 frameSize;
uniform vec2 textureSize;

`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.pars.fragment.glsl.js
/* harmony default export */ const frame_background_pars_fragment_glsl = (/* glsl */`

#ifdef USE_MAP

vec4 sampleTexture() {

	vec2 uv = vUv;

	// default stretch
	#if BACKGROUND_MAPPING != 0

	float textureRatio = textureSize.x / textureSize.y;
	float panelRatio = frameSize.x / frameSize.y;
	float ratio = panelRatio / textureRatio;
	float ratio2 = textureRatio / panelRatio;

		// contain
		#if BACKGROUND_MAPPING == 1
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		}
		#else
		// cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		}

		#endif

	#endif

	return texture2D( map, uv );

}
#endif
`);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.fragment.glsl.js
/* harmony default export */ const frame_background_fragment_glsl = (/* glsl */`
#ifdef USE_MAP

	vec4 textureSample = sampleTexture();
	diffuseColor *= textureSample;

#endif
`);

;// CONCATENATED MODULE: ./src/renderers/shaders/ShaderChunkUI.js














/* eslint-disable camelcase */
const ShaderChunkUI = {
	msdf_alphaglyph_pars_vertex: msdf_alphaglyph_pars_vertex_glsl,
	msdf_alphaglyph_vertex: msdf_alphaglyph_vertex_glsl,
	msdf_offset_vertex: msdf_offsetglyph_vertex_glsl,
	msdf_alphaglyph_pars_fragment: msdf_alphaglyph_pars_fragment_glsl,
	msdf_alphaglyph_fragment: msdf_alphaglyph_fragment_glsl,
	frame_border_pars_vertex: frame_border_pars_vertex_glsl,
	frame_border_vertex: frame_border_vertex_glsl,
	frame_common_pars: frame_common_pars_fragment_glsl,
	frame_border_pars_fragment: frame_border_pars_fragment_glsl,
	frame_border_fragment: frame_border_fragment_glsl,
	frame_background_pars_fragment: frame_background_pars_fragment_glsl,
	frame_background_fragment: frame_background_fragment_glsl,
};
/* eslint-enable camelcase */

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderLib/framematerial.glsl.js
// import { ShaderChunkUI } from 'three-mesh-ui';


const framematerial_glsl_vertexShader = /* glsl */`
// Would be automatic on three materials and from USE_UV
#ifdef USE_MAP
varying vec2 vUv;
#endif

${ShaderChunkUI.frame_border_pars_vertex}

#include <clipping_planes_pars_vertex>

void main() {

	#ifdef USE_MAP
	vUv = uv;
	#endif

	${ShaderChunkUI.frame_border_vertex}

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>

}
`

const framematerial_glsl_fragmentShader = /* glsl */`

// Basic
uniform vec3 diffuse;
uniform float opacity;

${ShaderChunkUI.frame_common_pars}

${ShaderChunkUI.frame_border_pars_fragment}


#ifdef USE_MAP
varying vec2 vUv;
uniform sampler2D map;
#endif

${ShaderChunkUI.frame_background_pars_fragment}

#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

	// map
	${ShaderChunkUI.frame_background_fragment}

	${ShaderChunkUI.frame_border_fragment}

	if( diffuseColor.a < 0.02 ) discard;

	// output
	gl_FragColor = diffuseColor;


	#include <clipping_planes_fragment>
}
`

;// CONCATENATED MODULE: ./src/frame/utils/FrameMaterialUtils.js


//JSDoc related import
/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */


class FrameMaterialUtils {



	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return _mediationDefinitions;

	}


	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.borderColor = { value: null };
		threeMaterial.userData.borderRadius = { value: new external_THREE_namespaceObject.Vector4(0,0,0,0) };
		threeMaterial.userData.borderWidth = { value: new external_THREE_namespaceObject.Vector4(0,0,0,0) };
		threeMaterial.userData.borderOpacity = { value: null };
		threeMaterial.userData.frameSize = { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) };
		threeMaterial.userData.textureSize = { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) };

	}
	/* eslint-enable no-unused-vars */

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.borderColor = threeMaterial.userData.borderColor;
		shader.uniforms.borderRadius = threeMaterial.userData.borderRadius;
		shader.uniforms.borderWidth = threeMaterial.userData.borderWidth;
		shader.uniforms.borderOpacity = threeMaterial.userData.borderOpacity;
		shader.uniforms.frameSize = threeMaterial.userData.frameSize;
		shader.uniforms.textureSize = threeMaterial.userData.textureSize;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		FrameMaterialUtils.injectVertexShaderChunks( shader );
		FrameMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + ShaderChunkUI.frame_border_pars_vertex
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + ShaderChunkUI.frame_border_vertex
		)

	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_background_pars_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_border_pars_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + ShaderChunkUI.frame_common_pars
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_fragment>',
			ShaderChunkUI.frame_background_fragment
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			ShaderChunkUI.frame_border_fragment+'\n#include <alphamap_fragment>'
		)


	}

}

const _backgroundSizeTransformer = function( target, property, value ) {

	value = ['stretch','contain','cover'].indexOf(value);
	asPreprocessorValueTransformer(target, 'BACKGROUND_MAPPING', value);

}

/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _mediationDefinitions = {
	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	backgroundTexture: { m: 'map' },
	backgroundColor: { m: 'color' },
	backgroundOpacity: { m:'opacity' },
	backgroundSize: { m: 'u_backgroundMapping', t: _backgroundSizeTransformer },
	_borderWidth: { m: 'borderWidth', t: uniformOrUserDataTransformer },
	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
	_borderRadius: { m: 'borderRadius', t: uniformOrUserDataTransformer },
	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
}


;// CONCATENATED MODULE: ./src/frame/materials/FrameMaterial.js




class FrameMaterial extends external_THREE_namespaceObject.ShaderMaterial {


	/**
	 * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {FrameMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return FrameMaterialUtils.mediation;

	}

	constructor() {
		super ( {
			uniforms: {
				alphaTest: { value: 0.02 },
				map: { value: null },
				diffuse: { value: new external_THREE_namespaceObject.Color(0xffffff) },
				opacity: { value: 1.0 },
				borderColor: { value: null },
				borderRadius: { value: new external_THREE_namespaceObject.Vector4(0,0,0,0) },
				borderWidth: { value: new external_THREE_namespaceObject.Vector4(0,0,0,0) },
				borderOpacity: { value: null },
				frameSize: { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) },
				textureSize: { value: new external_THREE_namespaceObject.Vector2( 1, 1 ) }
			},
			side: external_THREE_namespaceObject.FrontSide,
			transparent: true,
			clipping: true,
			vertexShader: framematerial_glsl_vertexShader,
			fragmentShader: framematerial_glsl_fragmentShader,
			extensions: {
				derivatives: true
			}
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;
	}

	set map( value ) {

		this.uniforms.map.value = value;
		if( !value ) {

			if( this.defines['USE_UV'] !== undefined ) {

				delete this.defines['USE_UV'];
				this.needsUpdate = true;

			}

		} else if( this.defines['USE_UV'] === undefined ) {

			this.defines['USE_UV'] = '';
			this.needsUpdate = true;

		}

		this.needsUpdate = true;

	}

	get map(){
		return this.uniforms.map.value;
	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {

		return this.uniforms.alphaTest.value;

	}



	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

}

;// CONCATENATED MODULE: ./src/components/Block.js








/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes
 */



class Block extends BoxComponent {

	constructor( options ) {

		super( options );

		this.isBlock = true;

		//

		this.size = new external_THREE_namespaceObject.Vector2( 1, 1 );

		// this._main = new Frame( this.getBackgroundMaterial() );
		this._material = new FrameMaterial();

		/**
		 *
		 * @type {Frame}
		 * @protected
		 */
		this._main = new Frame( this._material );

		this._materialMediation = { ...FrameMaterialUtils.mediation };

		// This is for hiddenOverflow to work
		this._main.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this._main );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

		this._transferToMaterial();

	}

	get frame() { return this._main; }
	////////////
	//  UPDATE
	////////////

	parseParams() {}

	updateLayout() {

		// Get temporary dimension
		this.computeBoxProperties();

		const WIDTH = this.offsetWidth;
		const HEIGHT = this.offsetHeight;

		if ( !WIDTH || !HEIGHT ) {

			console.warn( 'Block got no dimension from its parameters or from children parameters' );
			return;

		}

		this.size.set( WIDTH, HEIGHT );
		this._main.scale.set( WIDTH, HEIGHT, 1 );

		// if ( this._main ) this.updateBackgroundMaterial();

		this._main.renderOrder = this.getParentsNumber();

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

		// if ( this._main ) this.updateBackgroundMaterial();

	}

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

;// CONCATENATED MODULE: ./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js



function computeTangents( geometry ) {

	geometry.computeTangents();
	console.warn( 'THREE.BufferGeometryUtils: .computeTangents() has been removed. Use BufferGeometry.computeTangents() instead.' );

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
		material,
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

		if ( material.morphTargets && morphAttribute && morphInfluences ) {

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
	let group, groupMaterial;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];
				groupMaterial = material[ group.materialIndex ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						groupMaterial,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						groupMaterial,
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
					material,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					material,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else if ( positionAttribute !== undefined ) {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];
				groupMaterial = material[ group.materialIndex ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						groupMaterial,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						groupMaterial,
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
					material,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					material,
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





;// CONCATENATED MODULE: ./src/components/Text.js










//JSDoc related imports
/* eslint-disable no-unused-vars */





/* eslint-enable no-unused-vars */

/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block
 */


class Text extends MeshUIComponent {

	constructor( options ) {

		super( options );

		this.isInline = true;
		this.isText = true;

		// adds internal properties
		/**
		 *
		 * @type {string[]}
		 * @private
		 */
		this._textContent = null;

		/**
		 *
		 * @type {MSDFTypographicGlyph[]}
		 * @private
		 */
		this._textContentGlyphs = null;

		/**
		 *
		 * @type {MSDFInlineGlyph[]}
		 * @private
		 */
		this._textContentInlines = null;

		this.set( options );

		this.addEventListener( 'added', this._acquireFont );

	}

	/**
	 * Trigger some update when the font is ready
	 * @private
	 */
	_handleFontVariantReady = () => {

		this._transferToMaterial();

		// request parse update and parent layout
		this.update( true, true, false );
		this.getHighestParent().update( false, true, false );

		// remove the listener
		this._font.removeEventListener( 'ready', this._handleFontVariantReady );

	};

	/**
	 * When adding a text to a parent ui element,
	 * acquire parent font, if needed
	 * @private
	 */
	_acquireFont = () => {

		if( !this._font ) {

			let fontFamily = this.getFontFamily();
			if ( fontFamily ) {

				if ( fontFamily instanceof FontFamily ) {

					this.font = fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

				} else {

					// Set from old way, check if that family is already registered
					const fontName = fontFamily.pages ? fontFamily.info.face : fontFamily;
					fontFamily = font_FontLibrary.getFontFamily( fontName );
					if ( fontFamily ) {

						this.font = fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

					}

				}

			}

		}

	}

	_onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

	}

	/*******************************************************************************************************************
	 * GETTERS - SETTERS
	 ******************************************************************************************************************/

	/**
	 * @override
	 * @param {FontVariant} value
	 */
	set font( value ) {

		// if a previous font isset, be sure no event remains
		if ( this._font && !this._font.isReady ) {

			this._font.removeEventListener( 'ready', this._handleFontVariantReady );

		}

		this._font = value;

		// new font, means rebuild inlines, now or soon
		if ( !this._font.isReady ) {

			this.inlines = null;
			this._font.addEventListener( 'ready', this._handleFontVariantReady );

		} else {

			this._handleFontVariantReady();

		}

		// update font material according to font variant
		if( !this._material ) {

			this.material = new this._font.fontMaterial();

		} else {



			// @TODO :	Only recreate a material instance if needed,
			//  				prevent user that its custom material may no longer be compatible with update fontVariant implementation
			const isDefaultMaterial = this._material.isDefault && this._material.isDefault();
			if( isDefaultMaterial && !(this._material instanceof this._font.fontMaterial) ) {

				this.material = new this._font.fontMaterial();

			} else {

				this._transferToMaterial();

			}

		}

	}


	_buildContentKernings(){

		// apply kerning
		if ( this.getFontKerning() !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			for ( let i = 1; i < this._textContent.length; i++ ) {

				const glyphPair = this._textContent[ i - 1 ] + this._textContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				this._textContentInlines[ i ].kerning = this._font.getKerningAmount( glyphPair );

			}
		}

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

		this._acquireFont();

		if( !this.content || this.content.length === 0 ) return;

		// won't parse without font or unready font
		if( !this._font || !this._font.isReady ) return;

		// Apply whitespace on string characters themselves.
		// Will possibly :
		//  - l/r trim whitespace
		//  - collapse whitespace sequences
		//  - remove newlines / tabulations
		this._textContent = collapseWhitespaceOnString( this.content, this.getWhiteSpace() );

		// Now that we know exactly which characters will be printed
		// Store the character description ( typographic properties )
		this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographicGlyph( char ) );

		// And from the descriptions ( which are static/freezed per character per font )
		// Build the inline
		this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );
		this._buildContentKernings();

		// Apply margin and padding on first and last inlines
		if( this._textContentInlines.length ) {

			// First gets left side
			this._textContentInlines[0].paddingLeft = this._padding.w;
			this._textContentInlines[0].marginLeft = this._margin.w;

			// Last gets right side
			const lastIndex = this._textContentInlines.length - 1;
			this._textContentInlines[lastIndex].paddingRight = this._padding.y;
			this._textContentInlines[lastIndex].marginRight = this._margin.y;

		}


		this.inlines = this._textContentInlines;


		// this.calculateInlines( this._fitFontSize || this.getFontSize() );
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

			const charactersAsGeometries = this.inlines.map(
				inline =>
					this._font.getGeometricGlyph( inline, this.getSegments() )
						.translate( inline.offsetX, inline.offsetY, 0 )

			);

			const mergedGeom = mergeBufferGeometries( charactersAsGeometries );

			// console.log(this.uuid);

			this._main = new external_THREE_namespaceObject.Mesh( mergedGeom, this._material );
			if( this.customDepthMaterial ){

				this._main.customDepthMaterial = this.customDepthMaterial;

			}

			this._transferToMesh();

			this._main.renderOrder = Infinity;

			// This is for hiddenOverflow to work
			this._main.onBeforeRender = this._onBeforeRender

			this.add( this._main );

		}

	}

	updateInner() {

	}

	calculateInlines( fontSize ) {

		// Abort conditions
		if ( !this._font || !this._font.isReady ) return;
		if ( !this._textContent) return;

		const whiteSpace = this.getWhiteSpace();
		const newLineBreakability = newlineBreakability( whiteSpace )

		const breakChars = this.getBreakOn();

		const SCALE_MULT = fontSize / this._font.typographic.size;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < this._textContent.length; i++ ) {

			const char = this._textContent[ i ];

			/**
			 *
			 * @type {MSDFInlineGlyph}
			 */
			const inline = this._textContentInlines[ i ];

			inline.resetOffsets();

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;
			if ( whiteSpace !== NOWRAP ) {

				if ( breakChars.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

			}

			if ( char.match( /\n/g ) ) {

				lineBreak = newLineBreakability;

			}

			inline.lineBreak = lineBreak;

			// --------------------------------------------------------------------------------------  Whitespace Breakability

			inline.fontSize = fontSize;

			inline.fontFactor = SCALE_MULT;


		}

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
class InlineBlock extends MeshUIComponent {

	constructor( options ) {

		super( options );

		this.isInline = true;
		this.isInlineBlock = true;

		//

		this.size = new external_THREE_namespaceObject.Vector2( 1, 1 );

		this._material = new FrameMaterial();
		this._main = new Frame( this._material );

		this._materialMediation = { ...FrameMaterialUtils.mediation };

		// This is for hiddenOverflow to work
		this._main.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this._main );

		// Lastly set the options parameters to this object, which will trigger an update

		if( options.backgroundOpacity === undefined ){

			options.backgroundOpacity = 1.0

		}

		if( options.backgroundColor === undefined && options.backgroundTexture ) {

			options.backgroundColor = new external_THREE_namespaceObject.Color(0xffffff);

		}

		// Add an object that can be seen and CharacterInline
		this.inline = new InlineBlockInline(this);
		this.inlines = [ this.inline ];

		this.set( options );

		this._transferToMaterial();

	}

	///////////
	// UPDATES
	///////////

	parseParams(){

	}

	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 *
	 */
	updateLayout() {

		const PADDING = this._padding.w + this._padding.y;
		const WIDTH = this.inlineWidth;
		const HEIGHT = this.inlineHeight;


		// basic translation to put the plane's left bottom corner at the center of its space
		// this.position.set( WIDTH / 2 , HEIGHT / 2, 0 );
		this.position.set( (WIDTH + PADDING)/2, HEIGHT / 2, 0 );

		// translation required by inlineManager to position this component inline
		this.position.x += this.inline.offsetX;
		this.position.y += this.inline.offsetY;

		this.position.y += this.inline.anchor;

		this.size.set( WIDTH, HEIGHT );
		this._main.scale.set( WIDTH, HEIGHT, 1 );

		this._main.renderOrder = this.getParentsNumber();

		this.position.z = this.getOffset();

	}

	//

	updateInner() {

	}

	/*********************************************************************************************************************
	 * POVIDES INLINE SIZING
	 ********************************************************************************************************************/

	/**
	 *
	 * @return {number}
	 */
	get inlineXAdvance(){

		const pad = this._padding.w + this._padding.y;
		return (this.width || 0.3) + pad;

	}

	/**
	 *
	 * @return {number}
	 */
	get inlineWidth() {

		return this.width || 0.3;

	}

	/**
	 *
	 * @return {number}
	 */
	get inlineHeight() {

		return this.height || 0.3;

	}

}

/**
 * InlineBlock has its own Inline implementation
 */
class InlineBlockInline extends Inline {

	/**
	 *
	 * @param {InlineBlock} parent
	 */
	constructor( parent ) {

		super();

		/**
		 * @TODO: This currently make a circular reference that should ideally be removed
		 * @type {InlineBlock}
		 * @private
		 */
		this._parent = parent;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._parent.inlineXAdvance; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get width() { return this._parent.inlineWidth; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get height() { return this._parent.inlineHeight; }


	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._parent.inlineHeight; }

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._parent.inlineHeight; }

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

const textureLoader = new external_THREE_namespaceObject.TextureLoader();

//

/**
 * Job: high-level component that returns a keyboard
 */
class Keyboard extends BoxComponent {

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

						textureLoader.load( url, ( texture ) => {

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
	FontLibrary: font_FontLibrary,
	FontStyle: FontStyle_namespaceObject,
	FontWeight: FontWeight_namespaceObject,
	update,
	TextAlign: TextAlign_namespaceObject,
	Whitespace: Whitespace_namespaceObject,
	JustifyContent: JustifyContent_namespaceObject,
	AlignItems: AlignItems_namespaceObject,
	ContentDirection: ContentDirection_namespaceObject,
	MSDFFontMaterialUtils: MSDFFontMaterialUtils,
	ShaderChunkUI: ShaderChunkUI,
};


if ( typeof __webpack_require__.g !== 'undefined' ) __webpack_require__.g.ThreeMeshUI = ThreeMeshUI;

















/* harmony default export */ const three_mesh_ui = ((/* unused pure expression or super */ null && (ThreeMeshUI)));




/******/ })()
;