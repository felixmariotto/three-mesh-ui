import InheritableProperty from './InheritableProperty';

export default class FontSmoothProperty extends InheritableProperty{

	constructor() {

		super( 'fontSmooth', 'inherit', true);

		// configure
		this._needsUpdate = false;
		this.isValid = _isValid;
		this.output = this._outputValue;
	}

}

const AVAILABLE_VALUES = ['inherit','none','antialiased'];

/**
 *
 * @param {string} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if(  AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn(`.fontSmoothing value '${value}' is not valid. Aborted`);
		return false;

	}

	return true;

}
