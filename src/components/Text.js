import { Object3D } from 'three';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import FontLibrary from './core/FontLibrary.js';
import TextManager from './core/TextManager.js';
import MaterialManager from './core/MaterialManager.js';

import deepDelete from '../utils/deepDelete.js';
import { mix } from '../utils/mix.js';
import * as Whitespace from '../utils/inline-layout/Whitespace';

/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

 */
export default class Text extends mix.withBase( Object3D )(
	InlineComponent,
	TextManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isText = true;

		this.set( options );

	}

	///////////
	// UPDATES
	///////////


	/**
	 * Here we compute each glyph dimension, and we store it in this
	 * component's inlines parameter. This way the parent Block will
	 * compute each glyph position on updateLayout.
	 */
	parseParams() {

		this.calculateInlines( this._fitFontSize || this.getFontSize() );

	}

	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 */
	updateLayout() {

		deepDelete( this );

		if ( this.inlines ) {

			// happening in TextManager
			this.textContent = this.createText();

			this.updateTextMaterial();

			this.add( this.textContent );

		}

		this.position.z = this.getOffset();

	}

	updateInner() {

		this.position.z = this.getOffset();

		if ( this.textContent ) this.updateTextMaterial();

	}

	calculateInlines( fontSize ) {

		const content = this.content;
		const font = this.getFontFamily();
		const breakChars = this.getBreakOn();
		const textType = this.getTextType();
		const whiteSpace = this.getWhiteSpace();

		// Abort condition

		if ( !font || typeof font === 'string' ) {

			if ( !FontLibrary.getFontOf( this ) ) console.warn( 'no font was found' );
			return;

		}

		if ( !this.content ) {

			this.inlines = null;
			return;

		}

		if ( !textType ) {

			console.error( `You must provide a 'textType' attribute so three-mesh-ui knows how to render your text.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
			return;

		}

		// collapse whitespace for white-space normal
		const whitespaceProcessedContent = Whitespace.collapseWhitespaceOnString( content, whiteSpace );
		const chars = Array.from ? Array.from( whitespaceProcessedContent ) : String( whitespaceProcessedContent ).split( '' );


		// Compute glyphs sizes

		const SCALE_MULT = fontSize / font.info.size;
		const lineHeight = font.common.lineHeight * SCALE_MULT;
		const lineBase = font.common.base * SCALE_MULT;

		const glyphInfos = chars.map( ( glyph ) => {

			// Get height, width, and anchor point of this glyph
			const dimensions = this.getGlyphDimensions( {
				textType,
				glyph,
				font,
				fontSize
			} );

			//

			let lineBreak = null;

			if( whiteSpace !== Whitespace.NOWRAP ) {

				if ( breakChars.includes( glyph ) || glyph.match( /\s/g ) ) lineBreak = 'possible';

			}


			if ( glyph.match( /\n/g ) ) {

				lineBreak = Whitespace.newlineBreakability( whiteSpace );

			}

			//

			return {
				height: dimensions.height,
				width: dimensions.width,
				anchor: dimensions.anchor,
				xadvance: dimensions.xadvance,
				xoffset: dimensions.xoffset,
				lineBreak,
				glyph,
				fontSize,
				lineHeight,
				lineBase
			};

		} );

		// apply kerning
		if ( this.getFontKerning() !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			for ( let i = 1; i < glyphInfos.length; i++ ) {

				const glyphInfo = glyphInfos[ i ];
				const glyphPair = glyphInfos[ i - 1 ].glyph + glyphInfos[ i ].glyph;

				// retrieve the kerning from the font
				const kerning = this.getGlyphPairKerning( textType, font, glyphPair );

				// compute the final kerning value according to requested fontSize
				glyphInfo[ 'kerning' ] = kerning * ( fontSize / font.info.size );

			}
		}


		// Update 'inlines' property, so that the parent can compute each glyph position

		this.inlines = glyphInfos;
	}

}
