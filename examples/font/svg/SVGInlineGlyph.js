/**
 * @extends InlineGlyph
 */
import { InlineGlyph } from 'three-mesh-ui';

export default class SVGInlineGlyph extends InlineGlyph{

	/**
	 *
	 * @param {SVGTypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	/**
	 *
	 * @returns {Shape|Shape[]}
	 */
	get shape() { return this.typographic.shape; }

	get anchor() {

		return this.yoffset + this.height/2;

	}

}
