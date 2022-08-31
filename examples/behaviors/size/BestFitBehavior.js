import TextLayouterBestFit from './properties/TextLayouterBestFit';
import { Behavior } from 'three-mesh-ui';

export default class BestFitBehavior extends Behavior {

	constructor( subject, mode = 'auto') {

		super( subject );


		this._overriddenTextLayouter = new TextLayouterBestFit(  );
		this._overriddenTextLayouter._mode = this.mode;
		this._previousLayouter = null;

		this.mode = mode;

	}

	set mode( value ) {

		this._mode = value;

		this._overriddenTextLayouter._mode = this._mode;
		this._overriddenTextLayouter._needsUpdate = true;

	}

	get mode() {

		return this._mode;

	}

	attach() {

		if( !this._previousLayouter ) {

			this._previousLayouter = this._subject.replaceProperty( 'layouter', this._overriddenTextLayouter );

		}

	}

	detach() {

		if( this._previousLayouter ) {

			this._subject.replaceProperty( 'layouter', this._previousLayouter );
			this._previousLayouter = null;

		}

	}

	act() {
		// acts doesn't need anything here
	}

	clear() {

	}

}
