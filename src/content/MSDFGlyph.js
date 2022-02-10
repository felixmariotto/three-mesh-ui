import { PlaneBufferGeometry } from 'three';

/**
 * Job: create a plane geometry with the right UVs to map the MSDF texture on the wanted glyph.
 *
 * Knows: dimension of the plane to create, specs of the font used, glyph requireed
 */
export default class MSDFGlyph extends PlaneBufferGeometry {

	constructor( inline, font ) {

		const char = inline.glyph;
		const fontSize = inline.fontSize;

		super( fontSize, fontSize );

		// Misc glyphs
		if ( char.match( /\s/g ) === null ) {

			if ( font.info.charset.indexOf( char ) === -1 ) console.error( `The character '${char}' is not included in the font characters set.` );

			this.mapUVs( font, char );

			this.transformGeometry( font, fontSize, char, inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this.nullifyUVs();

			this.scale( 0, 0, 1 );
			this.translate( 0, fontSize / 2, 0 );

		}

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @private
	 */
	mapUVs( font, char ) {

		const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

		const common = font.common;

		const xMin = charOBJ.x / common.scaleW;

		const xMax = ( charOBJ.x + charOBJ.width ) / common.scaleW;

		const yMin = 1 - ( ( charOBJ.y + charOBJ.height ) / common.scaleH );

		const yMax = 1 - ( charOBJ.y / common.scaleH );

		//

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			let u = uvAttribute.getX( i );
			let v = uvAttribute.getY( i );

			[ u, v ] = ( () => {

				switch ( i ) {

					case 0 :
						return [ xMin, yMax ];
					case 1 :
						return [ xMax, yMax ];
					case 2 :
						return [ xMin, yMin ];
					case 3 :
						return [ xMax, yMin ];

				}

			} )();

			uvAttribute.setXY( i, u, v );

		}

	}

	/** Set all UVs to 0, so that none of the glyphs on the texture will appear */
	nullifyUVs() {

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			uvAttribute.setXY( i, 0, 0 );

		}

	}

	/** Gives the previously computed scale and offset to the geometry */
	transformGeometry( font, fontSize, char, inline ) {

		const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

		const common = font.common;

		const newHeight = charOBJ.height / common.lineHeight;
		const newWidth = ( charOBJ.width * newHeight ) / charOBJ.height;

		this.scale(
			newWidth,
			newHeight,
			1
		);

		//

		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}
