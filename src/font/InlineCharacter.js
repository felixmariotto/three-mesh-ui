export default class InlineCharacter {

	/**
	 *
	 * @param {TypographyCharacter} characterDesc
	 */
	constructor( characterDesc ) {

		this._typographic = characterDesc;

		this._fontFactor = 1;
		this._lineBreak = null;

		this._fontSize = 0;
		this._kerning = 0;

		this._offsetX = 0;
		this._offsetY = 0;

	}

	get typographic(){

		return this._typographic;

	}

	resetOffsets() {

		this._offsetX = this._offsetY = 0;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	get width() { return this._typographic.width * this._fontFactor ; }

	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	set lineBreak( value ){

		this._lineBreak = value;

	}

	get lineBreak() { return this._lineBreak; }

	get anchor() {

		const lineHeight = this._typographic.font.lineHeight;
		const lineBase = this._typographic.font.lineBase;

		return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

	}

	get kerning() { return this._kerning * this._fontFactor; }

	set kerning( value ) {

		this._kerning = value;

	}

	get fontSize() { return this._fontSize }

	set fontSize( value ) {

		this._fontSize = value;

	}



	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	get offsetX() { return this._offsetX; }

	set offsetX( value ){

		this._offsetX = value;

	}

	get offsetY() { return this._offsetY; }

	set offsetY( value ){

		this._offsetY = value;

	}


	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }

	set fontFactor( value ){

		this._fontFactor = value;

	}

}
