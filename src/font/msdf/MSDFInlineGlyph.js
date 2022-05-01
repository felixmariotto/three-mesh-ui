import InlineGlyph from '../InlineGlyph';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MSDFTypographicGlyph from './MSDFTypographicGlyph';
/* eslint-enable no-unused-vars */

/**
 * @extends InlineGlyph
 */
export default class MSDFInlineGlyph extends InlineGlyph{

	/**
	 *
	 * @param {MSDFTypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	/**
	 *
	 * @returns {{left:number, right:number, top:number, bottom:number}|null}
	 */
	get uv() { return this.typographic.uv; }

}
