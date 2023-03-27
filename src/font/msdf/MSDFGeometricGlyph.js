import { BufferAttribute, PlaneGeometry } from 'three';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from './../../core/elements/MeshUIBaseElement';
import MSDFInlineGlyph from './MSDFInlineGlyph';
/* eslint-enable no-unused-vars */

export default class MSDFGeometricGlyph extends PlaneGeometry {

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 */
	constructor( inline, element ) {


		// default w & h segments
		let wS = 1, hS=1;

		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;

		const segments = element._segments.value;

		wS = Math.ceil((inline.typographic.width / typographicFontSize) * segments );
		hS = Math.ceil((inline.typographic.height / typographicFontSize) * segments );

		super( inline.width, inline.height, wS, hS );

		// If inline has UVs
		if ( inline.uv ) {

			this._mapUVs( inline );

			this._transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this._nullifyUVs();

			this.scale( 0, 0, 1 );

			this.translate( 0, inline.fontSize / 2, 0 );

		}

		this.name = "GlyphGeometry";
		// Demo alter geometry
		// const maxOffset = inline.fontSize / 10;
		// this.translate(0 , -maxOffset + Math.random() * maxOffset*2, 0 )
		// this.rotateZ(-0.1 + 0.2 * Math.random() )

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_mapUVs( inline ) {


		const width = inline.uv.right - inline.uv.left;
		const height = inline.uv.bottom - inline.uv.top;

		const originalUvArray = this.getAttribute('uv').array.slice()

		const uvGlyph = [];
		for (let i = 0; i < originalUvArray.length; i += 2) {
			const u = originalUvArray[i];
			const v = originalUvArray[i + 1];

			uvGlyph.push(inline.uv.left + width * u);
			uvGlyph.push(inline.uv.top + height * v);
		}
		this.setAttribute('uvG', new BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 * Set all UVs to 0, so that none of the glyphs on the texture will appear
	 * @private
	 * */
	_nullifyUVs() {

		// const uvAttribute = this.attributes.uv;
		//
		// for ( let i = 0; i < uvAttribute.count; i++ ) {
		//
		// 	uvAttribute.setXY( i, 0, 0 );
		//
		// }

		const uvGlyph = [];
		const length = this.getAttribute('uv').array.length;
		for ( let i = 0; i < length; i++ ) {
			uvGlyph.push(0);
		}
		this.setAttribute('uvG', new BufferAttribute(new Float32Array(uvGlyph), 2));

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
			-inline.height/2,
			0
		);

	}

}
