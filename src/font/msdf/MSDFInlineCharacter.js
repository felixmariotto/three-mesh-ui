import InlineCharacter from '../InlineCharacter';
//JSDoc Related Imports
/* eslint-disable no-unused-vars */
import MSDFTypographyCharacter from './MSDFTypographyCharacter';
/* eslint-enable no-unused-vars */

export default class MSDFInlineCharacter extends InlineCharacter{

	/**
	 *
	 * @param {MSDFTypographyCharacter} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	get uv() { return this.typographic.uv; }

}
