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
const whiteChars = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

export default class Whitespace {


	/**
	 * Alter a raw text content according to white-space property
	 * @param {string} textContent
	 * @param {('normal'|'pre-wrap'|'pre-line')} whiteSpace
	 * @returns {string}
	 */
	static collapseContent( textContent, whiteSpace ) {

		switch ( whiteSpace ) {

			case 'normal':
				// newlines are treated as other whitespace characters
				textContent = textContent.replace( /\n/g, ' ' );
				//falls through

			case 'pre-line':
				// collapsed white spaces sequences
				textContent = textContent.replace( /[ ]{2,}/g, ' ' );
				break;

			default:

		}

		return textContent;

	}

	/**
	 * Get the breakability of a newline character according to white-space property
	 * @param whiteSpace
	 * @returns {string}
	 */
	static newlineBreakability( whiteSpace ) {

		switch ( whiteSpace ) {

			case 'pre-wrap':
			case 'pre-line':
				return 'mandatory';

			case 'normal':
			default:
			// do not automatically break on newline

		}

	}

	/**
	 * Alter a line of inlines according to white-space property
	 * @param line
	 * @param {('normal'|'pre-wrap'|'pre-line')} whiteSpace
	 */
	static collapseInlines( line, whiteSpace ) {

		const firstInline = line[ 0 ];
		const lastInline = line[ line.length - 1 ];

		// @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
		//
		// current implementation is 'pre-line'
		// if the breaking character is a space, get the previous one
		switch ( whiteSpace ) {

			// trim/collapse first and last whitespace characters of a line
			case 'pre-wrap':
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


			case 'pre-line':
			case 'normal': {
				let inlinesToCollapse = [];
				let collapsingTarget;
				// collect starting whitespaces to collapse
				for ( let i = 0; i < line.length; i++ ) {

					const inline = line[ i ];

					if ( inline.glyph && whiteChars[ inline.glyph ] && line.length > i ) {

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
					if ( inline.glyph && whiteChars[ inline.glyph ] && i > 0 ) {

						inlinesToCollapse.push( inline );
						collapsingTarget = line[ i - 1 ];
						continue;

					}

					break;

				}

				_collapseRightInlines( inlinesToCollapse, collapsingTarget );
				break;

			}

			default:
				console.warn( `whiteSpace: '${whiteSpace}' is not valid` );
				return 0;

		}

		return firstInline.offsetX;

	}

}

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
