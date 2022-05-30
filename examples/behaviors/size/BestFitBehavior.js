import Behavior from '../../../src/utils/Behavior';

export default class BestFitBehavior extends Behavior {

	constructor( subject, mode = 'auto') {

		super( subject );
		this.mode = mode;

		this._subject.calculateHeight = _calculateHeight.bind( this._subject);

	}

	set mode( value ) {

		let algo = _calculateAutoFit;
		switch ( value ) {
			case 'grow':
				algo = _calculateGrowFit;
				break;
			case 'shrink':
				algo = _calculateShrinkFit;
				break;
		}

		this._mode = value;

		this._algo = algo.bind( this._subject );

	}

	get mode() {

		return this._mode;

	}

	attach() {

		this._subject.parseParams = () => {
			if ( this._subject.childrenInlines.length === 0 ) return;

			this._algo();
		}

		this._subject.update( true, true, false );

	}

	detach() {

		this._subject.childrenTexts.forEach( child => {

			child._fitFontSize = undefined;

		} );

		this._subject.update( true, true, false );

	}

	act() {
		// acts doesn't need anything here
	}

	clear() {

		delete this._subject.calculateHeight;

	}

}

function _calculateHeight( fontMultiplier ) {

	this.childrenInlines.forEach( inlineComponent => {

		if ( inlineComponent.isInlineBlock ) return;

		// Set font size and recalculate dimensions
		inlineComponent._fitFontSize = inlineComponent.getFontSize() * fontMultiplier;
		inlineComponent.calculateInlines( inlineComponent._fitFontSize );

	} );

	const lines = this.computeLines();

	return lines.height;
}

function _calculateGrowFit() {

	const INNER_HEIGHT = this.getInsetHeight();

	//Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;
	const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

	let minFontMultiplier = 1;
	let maxFontMultiplier = 2;
	let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
	let textHeight;

	do {

		textHeight = this.calculateHeight( fontMultiplier );

		if ( textHeight > INNER_HEIGHT ) {

			if ( fontMultiplier <= minFontMultiplier ) { // can't shrink text

				this.childrenInlines.forEach( inlineComponent => {

					if ( inlineComponent.isInlineBlock ) return;

					// ensure fontSize does not shrink
					inlineComponent._fitFontSize = inlineComponent.getFontSize();

				} );

				break;

			}

			maxFontMultiplier = fontMultiplier;
			fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

		} else {

			if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

			if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

			minFontMultiplier = fontMultiplier;
			fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

		}

	} while ( ++iterations <= 10 );

}

function _calculateShrinkFit() {

	const INNER_HEIGHT = this.getInsetHeight();

	// Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;
	const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

	let minFontMultiplier = 0;
	let maxFontMultiplier = 1;
	let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
	let textHeight;

	do {

		textHeight = this.calculateHeight( fontMultiplier );

		if ( textHeight > INNER_HEIGHT ) {

			maxFontMultiplier = fontMultiplier;
			fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

		} else {

			if ( fontMultiplier >= maxFontMultiplier ) { // can't grow text

				this.childrenInlines.forEach( inlineComponent => {

					if ( inlineComponent.isInlineBlock ) return;

					// ensure fontSize does not grow
					inlineComponent._fitFontSize = inlineComponent.getFontSize();

				} );

				break;

			}

			if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

			minFontMultiplier = fontMultiplier;
			fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

		}

	} while ( ++iterations <= 10 );
}

function _calculateAutoFit()  {

	const INNER_HEIGHT = this.getInsetHeight();

	//Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;
	const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

	let minFontMultiplier = 0;
	let maxFontMultiplier = 2;
	let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
	let textHeight;

	do {

		textHeight = this.calculateHeight( fontMultiplier );

		if ( textHeight > INNER_HEIGHT ) {

			maxFontMultiplier = fontMultiplier;
			fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

		} else {

			if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

			if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

			minFontMultiplier = fontMultiplier;
			fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

		}

	} while ( ++iterations <= 10 );
}
