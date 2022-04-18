import { PlaneBufferGeometry } from 'three';

export default class MSDFGeometryCharacter extends PlaneBufferGeometry {

	/**
	 *
	 * @param {MSDFInlineCharacter} inline
	 */
	constructor( inline ) {

		super( inline.width, inline.height );

		// If inline has UVs
		if ( inline.uv ) {

			this.mapUVs( inline );

			this.transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this.nullifyUVs();

			this.scale( 0, 0, 1 );

			this.translate( 0, inline.fontSize / 2, 0 );

		}

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @private
	 */
	mapUVs( inline ) {

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			let u = uvAttribute.getX( i );
			let v = uvAttribute.getY( i );

			[ u, v ] = ( () => {

				switch ( i ) {

					case 0 :
						// return [ xMin, yMax ];
						return [ inline.uv.left, inline.uv.bottom ];
					case 1 :
						// return [ xMax, yMax ];
						return [ inline.uv.right, inline.uv.bottom ];
					case 2 :
						// return [ xMin, yMin ];
						return [ inline.uv.left, inline.uv.top ];
					case 3 :
						// return [ xMax, yMin ];
						return [ inline.uv.right, inline.uv.top ];

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

	/**
	 *
	 * @TODO: Apply pivot properties when splitText isset
	 * Gives the previously computed scale and offset to the geometry
	 * @param {MSDFInlineCharacter} inline
	 */
	transformGeometry( inline ) {

		//

		// @TODO : Evaluate this as being a property. It can wait until splitGeometry
		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}
