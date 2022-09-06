import { ExtrudeGeometry } from 'three';

// This implementation arbitrary choose to use ExtrudedGeometry, but it will also work with ShapeGeometry
export default class SVGGeometricGlyph extends ExtrudeGeometry {

	/**
	 *
	 * @param {SVGInlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 */
	constructor( inline, element ) {





		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;
		const divisor = inline.typographic.font.divisor;

		/* eslint-disable no-unused-vars */
		// default w & h segments
		// @TODO: Retrieve segments properties
		const segments = element.segments;
		let wS = 1, hS = 1;
		wS = Math.ceil( ( inline.typographic.width / typographicFontSize ) * segments );
		hS = Math.ceil( ( inline.typographic.height / typographicFontSize ) * segments );  /* eslint-enable no-unused-vars */

		super( inline.shape, {depth:element._fontDepth.value} );

		this.name = "SVGGeometryGlyph("+inline.typographic.char+")";

			this._transformGeometry( inline );

			this.scale( 1/divisor * inline.fontFactor , 1/divisor * inline.fontFactor, 0.025 );

			// this.translate( 0, 0, 0 );

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
