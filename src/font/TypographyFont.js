export default class TypographyFont {

	constructor() {

		this._size = 42;
		this._lineHeight = 42;
		this._lineBase = 38;

		this._name = "-";

		this._charset = "";
	}

	get size() { return this._size; }

	get lineHeight() { return this._lineHeight; }

	get lineBase() { return this._lineBase; }

	get name() { return this._name; }

	get charset() { return this._charset; }

}
