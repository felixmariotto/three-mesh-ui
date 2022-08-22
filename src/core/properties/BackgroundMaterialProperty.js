import BaseProperty from './BaseProperty';

export default class BackgroundMaterialProperty extends BaseProperty{

	constructor() {

		super('backgroundMaterial', 'initial', true);

		this.output = this._outputValue;

	}

}

/**
 *
 * @param {Material|"initial"|"inherit"} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {
	// @TODO :
	return true;
}
