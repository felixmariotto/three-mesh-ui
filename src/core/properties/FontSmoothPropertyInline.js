import FontSmoothProperty from './FontSmoothProperty';

export default class FontSmoothPropertyInline extends FontSmoothProperty{

	constructor() {

		super();

		// configure
		this.output = this._outputValue;
		this._needsUpdate = true;

	}

}
