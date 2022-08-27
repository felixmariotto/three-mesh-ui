import { TypographicFont } from 'three-mesh-ui';

export default class SVGTypographicFont extends TypographicFont{


	constructor( svgElement ) {

		super();

		const fontFace = svgElement.querySelector('defs font font-face');
		if( !fontFace ) throw new Error( "SVGTypographicFont::The provided svgElement doesn't have font-face markup");


		// base description
		// svg font might have units-per-em = 1000. Usually msdf fonts are exported with ~42

		const totalHeight = fontFace.ascent - fontFace.descent;
		const divisor = totalHeight * 42; // 42.... what a number! The only allowed magic number

		this._divisor = divisor;

		this._size = totalHeight / divisor;
		this._lineHeight = this._size  * 1.05;
		this._lineBase = fontFace['cap-height'] / divisor;

		this._name = fontFace['font-family'];

		const glyphs = svgElement.querySelectorAll('glyph[unicode]');
		let charset = "";
		for ( const glyph of glyphs ) {
			charset+= glyph.unicode;
		}

		this._charset = charset;

	}

	/**
	 *
	 * @return {number}
	 */
	get divisor() { return this._divisor; }

}
