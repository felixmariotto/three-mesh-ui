import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import Inline from '../../components/core/Inline';
import * as Whitespace from '../../utils/inline-layout/Whitespace';
import { PRE, PRE_LINE, PRE_WRAP } from '../../utils/inline-layout/Whitespace';
/* eslint-enable no-unused-vars */

export default class LineBreakProperty extends BaseProperty{

	constructor( defaultValue = "- ,.:?!\n" ) {

		super( "lineBreak", defaultValue, true );

		/**
		 *
		 * @type {"mandatory"|"possible"|null}
		 * @private
		 */
		this._newLineBreakability = null;


	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			this.computeInheritedValue( element );

		}

		this._newLineBreakability = _computeNewLineBreakability( element );

		// ? update strategies from whitespace ?
		this._needsProcess = true;

	}

	process( element ) {

		const whiteSpace = element._whiteSpace._value;

		// @TODO: Should be splitted
		if( !element._textContent._value ) return;
		if( !element._inlines._value ) return;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < element._textContent._value.length; i++ ) {

			const char = element._textContent._value[ i ];
			const inline = element._inlines._value[ i ];

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

	}

	/**
	 * @override
	 * @return {string}
	 */
	get value() { return this._value; }

}

/**
 *
 * @param {MeshUIBaseElement} element
 * @return {"mandatory"|null}
 * @private
 */
function _computeNewLineBreakability( element ) {

	switch ( element._whiteSpace._value ) {

		case "pre":
		case "pre-wrap":
		case "pre-line":
			return 'mandatory';
	}

	return null;

}
