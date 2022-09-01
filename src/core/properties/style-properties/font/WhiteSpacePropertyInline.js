import WhiteSpaceProperty from './WhiteSpaceProperty';

/**
 * @typedef  StringCollapserStrategy
 * @type {(textContent:{string}) => string}
 */


/**
 * @typedef  InlineCollapserStrategy
 * @type {(line:{Line}) => number }
 */


/**
 * @typedef InlineWrapperStrategy
 * @type {(inlines:{Array}, i:{number}, lastInlineOffset:{number}, options:Object<string,any>) => boolean}
 */

export default class WhiteSpacePropertyInline extends WhiteSpaceProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

		this._whiteSpacedContent = '';

		// strategies

		/**
		 *
		 * @type {StringCollapserStrategy}
		 * @internal
		 */
		this._stringCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineCollapserStrategy}
		 * @internal
		 */
		this._inlineCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineWrapperStrategy}
		 * @internal
		 */
		this._inlineWrapper = this.emptyStrategyLogic;
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_computeFromInherited( element ) { /* eslint-enable no-unused-vars */
		super._computeFromInherited( element );

		// set strategies
		this._newLineBreakability = _newlineBreakability( this._value );

		// REDO Whitespace Matrix
		// https://developer.mozilla.org/en-US/docs/Web/CSS/white-space

		switch ( this._value ) {

			case 'nowrap':
			case 'normal':
				this._stringCollapser = _stringCollapseNewLine;
				break;

			case 'pre-line':
				this._stringCollapser = _stringCollapseMultipleSpace;
				break;

			default:
				this._stringCollapser = _stringCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'nowrap':
			case 'normal':
				this._inlineCollapser = _inlineCollapseMultiple;
				break;

			case 'pre-wrap':
				this._inlineCollapser = _inlineCollapseSingle;
				break;

			default:
				this._inlineCollapser = _inlineCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'pre-wrap':
			case 'normal':
				this._inlineWrapper = _lineBreakerWrapText;
				break;

			case 'pre':
				this._inlineWrapper = _lineBreakerLineBreakOnly;
				break;

			default:
				this._inlineWrapper = _lineBreakerNoWrap;

		}


		this._needsProcess = true;

	}


	process( element ) {

		// @TODO: Make a property for Text -> inlineCollapser
		if( element.isInline && !element.isInlineBlock ) {

			this._whiteSpacedContent = this._stringCollapser( element._textContent._value );

			element._glyphs._needsProcess = true;

		}
	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

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

/**
 * Get the breakability of a newline character according to white-space property
 *
 * @param whiteSpace
 * @returns {string|null}
 */
const _newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case 'pre':
		case 'pre-wrap':
		case 'pre-line':
			return 'mandatory';
	}

	// case NOWRAP:
	// case NORMAL:
	// default:

	return null;

};


// STRING COLLAPSER -----------------------------------------------------

/**
 * Treat newlines as spaces
 * @param textContentValue
 * @return {*}
 * @private
 *
 */
function _stringCollapseNewLine( textContentValue ) {

	return _stringCollapseMultipleSpace( textContentValue.replace( /\n/g, ' ' ) );

}

/**
 * Treat sequences of spaces as only one space
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseMultipleSpace( textContentValue ) {

	return textContentValue.replace( /[ ]{2,}/g, ' ' );

}

/**
 *
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseNothing ( textContentValue ) {
	return textContentValue;
}

// LineBreakers -----------------------------------------------------

/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerWrapText( inlines, i, lastInlineOffset, options ) {
	const inline = inlines[ i ];

	// prevent additional computation if line break is mandatory
	if ( inline.lineBreak === 'mandatory' ) return true;

	// ?? Missing letterSpacing ?
	// prevent additional computation if this character already exceed the available size
	if ( lastInlineOffset + inline.xadvance + inline.xoffset + inline.kerning > options.INNER_WIDTH ) return true;


	const nextBreak = _distanceToNextBreak( inlines, i, options );
	return _shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, options );
}

/* eslint-disable no-unused-vars */
/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerLineBreakOnly( inlines, i, lastInlineOffset, options ) { /* eslint-enable no-unused-vars */

	return inlines[ i ].lineBreak === 'mandatory';

}

/**
 *
 * @return {boolean}
 * @private
 */
function _lineBreakerNoWrap() {
	return false;
}

// Inlines collapser -----------------------------------------------------

/**
 *
 * @param line
 * @return {number}
 * @private
 */
function _inlineCollapseSingle( line ) {
	if ( !line[ 0 ] ) return 0;

	const firstInline = line[ 0 ];
	const lastInline = line[ line.length - 1 ];

	// only process whiteChars glyphs inlines
	// if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
	if ( firstInline.char && firstInline.char === '\n' && line.length > 1 ) {
	// if ( firstInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseLeftInlines( [ firstInline ], line[ 1 ] );

	}

	// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
	if ( lastInline.char && lastInline.char === '\n' && line.length > 1 ) {
	// if ( lastInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseRightInlines( [ lastInline ], line[ line.length - 2 ] );

	}

	return firstInline.offsetX;

}

function _inlineCollapseMultiple( line ) {

	if ( !line[ 0 ] ) return 0;

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

	return line[ 0 ].offsetX;

}

/**
 *
 * @param line
 * @return {number|*}
 * @private
 */
function _inlineCollapseNothing( line ) {

	if ( !line[ 0 ] ) return 0;
	return line[ 0 ].offsetX;

}

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

		inline.fontFactor = 0;
		inline.offsetX = targetInline.offsetX + targetInline.cumulativeWidth;
		inline.cumulativeWidth = 0;

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

		inline.fontFactor = 0;
		// inline.offsetX += inline.cumulativeWidth;
		inline.offsetX = targetInline.offsetX;
		inline.cumulativeWidth = 0;

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
