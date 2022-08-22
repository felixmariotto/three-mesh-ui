import BoundsBox from './BoundsBox';

export default class BoundsText extends BoundsBox {

	constructor() {

		super();

		this._innerWidth = Infinity;
		this._innerHeight = 0;

	}

}
