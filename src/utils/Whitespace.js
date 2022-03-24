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
export const WHITE_CHARS = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

export const NORMAL = 'normal';
export const NOWRAP = 'nowrap';
export const PRE = 'pre';
export const PRE_LINE = 'pre-line';
export const PRE_WRAP = 'pre-wrap';

/**
 * Collapse whitespaces and sequence of whitespaces on string
 *
 * @param textContent
 * @param whiteSpace
 * @returns {*}
 */
export const collapseWhitespaceOnString = function ( textContent, whiteSpace ) {

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
export const newlineBreakability = function ( whiteSpace ) {

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
export const shouldBreak = function( inlines, i, lastInlineOffset, options){
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
export const collapseWhitespaceOnInlines = function ( line, whiteSpace ) {

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
