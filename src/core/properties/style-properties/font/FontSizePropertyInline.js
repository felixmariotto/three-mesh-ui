import SubStyleProperty from '../SubStyleProperty';

export default class FontSizePropertyInline extends SubStyleProperty {

	constructor( ) {

		super( 'fontSize', 'inherit', true );

		// Configure
		this._allowsInherit = false;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		if( element._font._fontVariant ) {
			element._bounds._needsProcess = true;
			element._layouter._needsProcess = true;
		}

	}

	process( element ) {

		if( !element._font._fontVariant || !element._font._fontVariant.isReady ) return;

		const SCALE_MULT = this._value / element._font._fontVariant.typographic.size;

		// First character won't be kerned with its void lefthanded peer
		const inlines = element._inlines._value;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < inlines.length; i++ ) {

			const inline = inlines[ i ];

			inline.resetOffsets();

			inline.fontSize = this._value;
			inline.fontFactor = SCALE_MULT;

		}

		// element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}


