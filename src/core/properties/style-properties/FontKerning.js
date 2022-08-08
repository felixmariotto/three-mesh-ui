import SubStyleProperty from './SubStyleProperty';


export default class FontKerning extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'boxSizing', defaultValue );

		this.isValidValue = _isValid;

	}


	process( vrElement ) {

		// apply kerning on inlines
		if ( this._output !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			const whiteSpacedContent = vrElement._style._whiteSpace._whiteSpacedContent;
			const inlines = vrElement._inlines._value;
			for ( let i = 1; i < inlines.length; i++ ) {

				const glyphPair = whiteSpacedContent[ i - 1 ] + whiteSpacedContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				inlines[ i ].kerning = vrElement._font.getKerningAmount( glyphPair );

			}

		}

	}

}


const AVAILABLE_VALUES = ['normal', 'none'];

function _isValid( value ) {

	if( AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontKerning value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}
