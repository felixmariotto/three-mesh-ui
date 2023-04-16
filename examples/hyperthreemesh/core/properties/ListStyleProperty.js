import SubStyleProperty from 'three-mesh-ui/src/core/properties/style-properties/SubStyleProperty';

export default class ListStyleProperty extends SubStyleProperty {

	constructor() {

		super( 'listStyle', 'inherit', true );

	}

	isValidValue( value ) {

		return _validValues.indexOf( value ) !== -1;

	}

	getDefaultValue() {

		return 'square';

	}

}

const _validValues = ['square','disc','circle', 'decimal', 'lower-roman'];


