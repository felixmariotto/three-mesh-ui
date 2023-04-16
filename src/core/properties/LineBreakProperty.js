import BaseProperty from './BaseProperty';


//JSDoc related imports
/* eslint-disable no-unused-vars */
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

		this._needsProcess = true;

	}

	process( element ) {

		const newLineBreakability = element._whiteSpace._newLineBreakability;

		if( !element._inlines._value ) return;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < element._inlines._value.length; i++ ) {


			const inline = element._inlines._value[ i ];
			const char = inline.char;

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;

			// could be inlineBlock without char
			if( char !== undefined ) {

				// @question : Does it worth to be strategy? I don't really think so
				if ( newLineBreakability !== 'nowrap' ) {

					if ( this._value.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

				}

				if ( char.match( /\n/g ) ) {

					lineBreak = newLineBreakability;

				}

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
