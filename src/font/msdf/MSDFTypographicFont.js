import TypographicFont from '../TypographicFont';

export default class MSDFTypographicFont extends TypographicFont{

	/**
	 *
	 * @param {import('./MSDFFontVariant').MSDFJson} json
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

	/**
	 *
	 * @returns {number}
	 */
	get textureWidth() { return this._textureWidth; }

	/**
	 *
	 * @returns {number}
	 */
	get textureHeight() { return this._textureHeight; }

}
