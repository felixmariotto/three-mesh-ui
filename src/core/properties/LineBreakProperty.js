import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from '../../components/core/Inline';
import * as Whitespace from '../../utils/inline-layout/Whitespace';
import { PRE, PRE_LINE, PRE_WRAP } from '../../utils/inline-layout/Whitespace';
/* eslint-enable no-unused-vars */

export default class LineBreakProperty extends BaseProperty{

	constructor( defaultValue = "- ,.:?!\n" ) {

		super( "lineBreak", defaultValue );

		/**
		 *
		 * @type {"mandatory"|"possible"|null}
		 * @private
		 */
		this._newLineBreakability = null;


	}

	update( vrElement, out ) {

		this._newLineBreakability = _computeNewLineBreakability( vrElement );

		// ? update strategies from whitespace ?
		this._needsProcess = true;

	}

	process( vrElement ) {

		const whiteSpace = vrElement.style._whiteSpace.output;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < vrElement._textContent.length; i++ ) {

			const char = vrElement._textContent.value[ i ];
			const inline = vrElement._inlines[ i ];

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;

			// @question : Does it worth to be strategy? I don't really think so
			if ( whiteSpace !== Whitespace.NOWRAP ) {

				if ( this._value.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

			}

			if ( char.match( /\n/g ) ) {

				lineBreak = this._newLineBreakability;

			}

			inline.lineBreak = lineBreak;

		}

		this._needsProcess = false;

	}

	/**
	 * @override
	 * @return {string}
	 */
	get value() { return this._value; }

}

/**
 *
 * @param {ElementVR} vrElement
 * @return {"mandatory"|null}
 * @private
 */
function _computeNewLineBreakability( vrElement ) {

	switch ( vrElement.style._whiteSpace.output ) {

		case "pre":
		case "pre-wrap":
		case "pre-line":
			return 'mandatory';
	}

	return null;

}
