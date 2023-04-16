import ListStyleProperty from 'three-mesh-ui/examples/hyperthreemesh/core/properties/ListStyleProperty';

export default class ListStylePropertyInlineBlock extends ListStyleProperty {

	constructor() {

		super();

		this._input = 'inherit';
		this._allowsInherit = false;

		this.computeOutputValue = this._computeFromInherited;

	}

	_computeFromInherited( element ) {

		super._computeFromInherited( element );

		switch ( this._value ){

			case 'square':
				element.visible = true;
				element._textCounterPart.visible = false;
				element._borderRadius.inline = 0;
				break;


			case 'circle':
				element._borderWidth.inline = 0.004;
				element._backgroundOpacity.inline = 0;
			// falls through
			case 'disc':
				element.visible = true;
				element._textCounterPart.visible = false;
				element._borderRadius.inline = 100;
				break;

			case 'decimal':
				element.visible = false;
				element._textCounterPart.visible = true;
				break;

			case 'lower-roman':
				element.visible = false;
				element._textCounterPart.visible = true;
				element._textCounterPart.textContent = _romanNumber(element._listIndex).toLowerCase()+".";
				break;

			case 'upper-roman':
				element.visible = false;
				element._textCounterPart.visible = true;
				element._textCounterPart.textContent = _romanNumber(element._listIndex)+".";
				break;

		}

		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}

function _romanNumber(num) {
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};
	var str = '';

	for (var i of Object.keys(roman)) {
		var q = Math.floor(num / roman[i]);
		num -= q * roman[i];
		str += i.repeat(q);
	}

	return str;
}

