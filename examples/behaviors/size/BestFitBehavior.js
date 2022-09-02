import TextLayouterBestFit from './properties/TextLayouterBestFit';
import { Behavior } from 'three-mesh-ui';

/**
 * Sample of Behavior that relies on AlteredProperties
 */
export default class BestFitBehavior extends Behavior {

	constructor( subject, mode = 'auto') {

		super( subject );

		// Internally, three-mesh-ui Text will have a property called 'layouter' accessible through 'myText._layouter'
		// This behavior will swap the default 'layouter' property of a text, with a custom one TextLayouterBestFit
		this._overriddenTextLayouter = new TextLayouterBestFit(  );
		this._overriddenTextLayouter._mode = this.mode;
		// it will also store what was the property prior alteration,
		// in order to restore it uppon detach().
		this._previousLayouter = null;

		this.mode = mode;

	}

	/**
	 * What should happen when attaching this behavior?
	 */
	attach() {

		if( !this._previousLayouter ) {
			// replace the default layouter property, with our custom one
			// and store the previously working property in order to be able to restore it later
			this._previousLayouter = this._subject.replaceProperty( 'layouter', this._overriddenTextLayouter );

		}

	}

	/**
	 * What should happend when detaching this behavior?
	 */
	detach() {

		// If we alread swap properties
		if( this._previousLayouter ) {

			// we can re-swap it again. Replacing our custom one, with default one.
			this._subject.replaceProperty( 'layouter', this._previousLayouter );
			this._previousLayouter = null;

		}

	}

	/**
	 *
	 */
	act() {
		// acts doesn't need anything here
		// as properties are parts of three-mesh-ui main update loop
		// but we should analyse the TextLayouterBestFit source code to understand what happen.
	}

	clear() {

	}

	/**
	 * Setting the mode on this behavior
	 * @param value
	 */
	set mode( value ) {

		this._mode = value;

		// would also update the mode on the altered property
		this._overriddenTextLayouter._mode = this._mode;

		// force the property to be updated next frame
		this._overriddenTextLayouter._needsUpdate = true;

	}

	/**
	 *
	 * @returns {*}
	 */
	get mode() {

		return this._mode;

	}

}
