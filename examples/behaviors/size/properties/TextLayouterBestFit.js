import TextLayouter from '../../../../src/core/properties/TextLayouter';

/**
 * Inheritance is TextLayouterBestFit < TextLayouter < BaseProperty
 * You should have minimal knowledge of BaseProperty
 */
export default class TextLayouterBestFit extends TextLayouter {

	constructor() {

		super();

		this._fontMultiplier = 1;

		this._mode = 'auto';

		this._algo = null;

		this._superLayouter = super.process;
	}

	/* eslint-disable no-unused-vars */
	update( element, out ) {  /* eslint-enable no-unused-vars */

		switch ( this._mode ) {

			case 'auto':
			case 'both':
				this._algo = _calculateAutoFit.bind(this);
				break;

			case 'shrink' :
				this._algo = _calculateShrinkFit.bind(this);
				break;

			case 'grow' :
				this._algo = _calculateGrowFit.bind(this);
				break;

			case 'none' :
					this._algo = this._superLayouter;
				break;

			default:
				throw new Error( "ThreeMeshUI::BestFitBehavior has no valid mode");
		}

		this._needsProcess = true;

	}

	process( element ) {

		this._algo( element );

	}

	/**
	 * Override the resetInline protected method.
	 * Instead of always resetting with defined fontSize.value
	 * We will alter it with our custom _fontMultiplier value
	 *
	 * @override
	 * @protected
	 * @param inlineElement
	 *
	 */
	_resetInlines( inlineElement ) {

		// apply fontScale
		inlineElement._fontSize._value = inlineElement._fontSize._inheritedInput * this._fontMultiplier;

		super._resetInlines( inlineElement );
	}

}

function _calculateGrowFit( textElement ) {

	const INNER_HEIGHT = textElement._bounds._innerHeight;

	//Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;

	let minFontMultiplier = 1;
	let maxFontMultiplier = 2;

	let fontMultiplier = 1;

	let textHeight;

	do {

		this._fontMultiplier = fontMultiplier;

		// this is the default TextLayouter.process() being called, we didn't had to rewrite all of this
		this._superLayouter( textElement );

		textHeight = this._value.height;

		if ( textHeight > INNER_HEIGHT ) {

			if ( fontMultiplier <= minFontMultiplier ) { // can't shrink text

				// this.childrenInlines.forEach( inlineComponent => {
				//
				// 	if ( inlineComponent.isInlineBlock ) return;
				//
				// 	// ensure fontSize does not shrink
				// 	inlineComponent._fitFontSize = inlineComponent.getFontSize();
				//
				// } );

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

/**
 * Same for shrink
 * @param textElement
 * @private
 */
function _calculateShrinkFit( textElement ) {

	const INNER_HEIGHT = textElement._bounds._innerHeight;

	// Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;

	let minFontMultiplier = 0;
	let maxFontMultiplier = 1;
	let fontMultiplier = 1;
	let textHeight;

	do {

		this._fontMultiplier = fontMultiplier;
		this._superLayouter( textElement );

		textHeight = this._value.height;

		if ( textHeight > INNER_HEIGHT ) {

			maxFontMultiplier = fontMultiplier;
			fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

		} else {

			if ( fontMultiplier >= maxFontMultiplier ) { // can't grow text

				// this.childrenInlines.forEach( inlineComponent => {
				//
				// 	if ( inlineComponent.isInlineBlock ) return;
				//
				// 	// ensure fontSize does not grow
				// 	inlineComponent._fitFontSize = inlineComponent.getFontSize();
				//
				// } );

				break;

			}

			if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

			minFontMultiplier = fontMultiplier;
			fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

		}

	} while ( ++iterations <= 10 );
}

/**
 * Same for shrink & grow
 * @param textElement
 * @private
 */
function _calculateAutoFit( textElement )  {

	const INNER_HEIGHT = textElement._bounds._innerHeight;

	//Iterative method to find a fontSize of text children that text will fit into container
	let iterations = 1;
	const heightTolerance = 0.075;

	let minFontMultiplier = 0;
	let maxFontMultiplier = 2;
	let fontMultiplier = 1;
	let textHeight;

	do {

		this._fontMultiplier = fontMultiplier;
		this._superLayouter( textElement );

		textHeight = this._value.height;

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

