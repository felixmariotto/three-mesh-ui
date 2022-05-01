export default class BestFitBehavior {

	constructor( parent, mode = 'auto') {

		if( mode === 'none' ) return;

		let algo = this.calculateAutoFit;
		switch ( mode ) {
			case 'grow':
				algo = this.calculateGrowFit;
				break;
			case 'shrink':
				algo = this.calculateShrinkFit;
				break;
		}

		algo = algo.bind(parent);

		parent.parseParams = function()
		{
			if ( parent.childrenInlines.length === 0 ) return;

			algo();
		}

	// when detaching this behaviour
	// else {
	//
	// 		this.childrenTexts.forEach( child => {
	//
	// 			child._fitFontSize = undefined;
	//
	// 		} );
	// 	}
	}

	calculateGrowFit() {

		const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

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

	calculateShrinkFit() {

		const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

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

	calculateAutoFit()  {

		const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

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

}
