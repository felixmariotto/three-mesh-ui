import TypographyFont from '../TypographyFont';
//JSDoc Related Imports
/* eslint-disable no-unused-vars */
import { MSDFJson } from '../FontVariant';
/* eslint-enable no-unused-vars */

export default class MSDFTypographyFont extends TypographyFont{

	/**
	 *
	 * @param {MSDFJson} json
	 */
	constructor( json ) {

		super();

		// base description
		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._name = json.info.face;

		// MSDF
		this._textureWidth = json.common.scaleW;
		this._textureHeight = json.common.scaleH;

		this._charset = json.chars.map( char => char.char ).join("");

	}

	get textureWidth() { return this._textureWidth; }

	get textureHeight() { return this._textureHeight; }

}
