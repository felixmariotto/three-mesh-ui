import { TypographicFont } from 'three-mesh-ui';

export default class SVGTypographicFont extends TypographicFont{


	constructor( svgElement ) {

		super();

		const fontFace = svgElement.querySelector('defs font font-face');
		if( !fontFace ) throw new Error( "SVGTypographicFont::The provided svgElement doesn't have font-face markup");


		// base description
		// svg font might have units-per-em = 1000. Usually msdf fonts are exported with ~42

		const ascent = parseFloat(fontFace.getAttribute('ascent'));
		const descent = parseFloat(fontFace.getAttribute('descent'));
		const totalHeight = ascent - descent;
		const divisor = totalHeight * 42; // 42.... what a number! The only allowed magic number

		this._divisor = divisor;

		// Store the em as this could be missing in the glyph definition of "M"
		this._em = parseFloat( fontFace.getAttribute('units-per-em') );


		this._xadvance = this._em;

		if( fontFace.parentElement.hasAttribute('horiz-adv-x') ) {

			this._xadvance = parseFloat( fontFace.parentElement.getAttribute('horiz-adv-x') );

		}

		this._size = totalHeight / divisor;
		// this._lineHeight = this._size  * 1.05;
		this._lineHeight = (ascent/divisor)  * 1.05;
		this._lineBase = parseFloat( fontFace.getAttribute('cap-height')) / divisor;

		this._name = fontFace.getAttribute( 'font-family' );

		const glyphs = svgElement.querySelectorAll('glyph[unicode]');
		let charset = "";
		for ( const glyph of glyphs ) {
			charset+= glyph.unicode;
		}

		this._charset = charset;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() { return this._xadvance; }

	/**
	 *
	 * @returns {number}
	 */
	get em() { return this._em; }

	/**
	 *
	 * @return {number}
	 */
	get divisor() { return this._divisor; }

}
