import { ExtrudeBufferGeometry } from 'three';

// This implementation arbitrary choose to use ExtrudedGeometry, but it will also work with ShapeGeometry
export default class SVGGeometricGlyph extends ExtrudeBufferGeometry {

	/**
	 *
	 * @param {SVGInlineGlyph} inline
	 */
	constructor( inline ) {

		// @TODO: Retrieve segments properties
		const segments = 1;

		// default w & h segments
		let wS = 1, hS=1;

		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;
		const divisor = inline.typographic.font.divisor;

		wS = Math.ceil((inline.typographic.width / typographicFontSize) * segments);
		hS = Math.ceil((inline.typographic.height / typographicFontSize) * segments);

		super( inline.shape, {depth:.01} );

		this.name = "SVGGeometryGlyph("+inline.typographic.char+")";

			this._transformGeometry( inline );
			this.scale( 1/divisor * inline.fontFactor , 1/divisor * inline.fontFactor, 0.025 );

			this.translate( 0, inline.fontSize / 2, 0 );

	}


	/**
	 *
	 * @TODO: Apply pivot properties when splitText isset
	 * Gives the previously computed scale and offset to the geometry
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_transformGeometry( inline ) {

		//

		// @TODO : Evaluate this as being a property. It can wait until splitGeometry
		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}
