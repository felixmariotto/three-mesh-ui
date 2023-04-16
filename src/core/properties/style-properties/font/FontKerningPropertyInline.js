import FontKerningProperty from './FontKerningProperty';


export default class FontKerningPropertyInline extends FontKerningProperty {

	constructor() {

		super();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);

		// this._needsProcess = true;
		element._parent._value._layouter._needsProcess = false;
	}

	process( element ) {

		// apply kerning on inlines
		if ( this._value !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			const whiteSpacedContent = element._whiteSpace._whiteSpacedContent;
			const inlines = element._inlines._value;
			for ( let i = 1; i < inlines.length; i++ ) {

				const glyphPair = whiteSpacedContent[ i - 1 ] + whiteSpacedContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				inlines[ i ].kerning = element._font._fontVariant.getKerningAmount( glyphPair );

			}

		}

	}

}
