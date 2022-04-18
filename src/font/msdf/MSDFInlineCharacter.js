import InlineCharacter from '../InlineCharacter';

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
