import SubStyleProperty from '../SubStyleProperty';

export default class FontSize extends SubStyleProperty {

	constructor( ) {

		super( 'fontSize', 'inherit', true );

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		console.warn( "FontSize input", this._input );
		if( this._input === 'inherit' ) {

			this._value = this.getInheritedInput( element );
			console.warn( 'fontSize from inherit', this._value );

		} else {

			this._value = this._input;

		}

		if( element._font._fontVariant ) this._needsProcess = true;

	}

	process( element ) {

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

		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}


