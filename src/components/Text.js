import { Mesh, Object3D } from 'three';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import FontLibrary from '../font/FontLibrary.js';
import MaterialManager from './core/MaterialManager.js';

import deepDelete from '../utils/deepDelete.js';
import { mix } from '../utils/mix.js';
import * as Whitespace from '../utils/inline-layout/Whitespace';
import FontFamily from '../font/FontFamily';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

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
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super();

		this.isText = true;

		// adds internal properties
		/**
		 *
		 * @type {string[]}
		 * @private
		 */
		this._textContent = null;

		/**
		 *
		 * @type {MSDFTypographyCharacter[]}
		 * @private
		 */
		this._textContentGlyphs = null;

		/**
		 *
		 * @type {MSDFInlineCharacter[]}
		 * @private
		 */
		this._textContentInlines = null;

		this.set( options );

		this.addEventListener( 'added', this._acquireFont );

	}

	/**
	 * Temporary code
	 * @param {FontVariant} value
	 */
	set font( value ) {

		// if a previous font isset, be sure not event remains
		if ( this._font && !this._font.isReady ) {

			this._font.removeEventListener( 'ready', this._handleFontVariantReady );

		}

		this._font = value;

		// new font, means rebuild inlines, now or soon
		if ( !this._font.isReady ) {

			this.inlines = null;
			this._font.addEventListener( 'ready', this._handleFontVariantReady );

		} else {

			this._handleFontVariantReady();

		}

	}

	/**
	 *
	 * @private
	 */
	_handleFontVariantReady = () => {

		// request parse update and parent layout
		this.update( true, true, false );
		this.getHighestParent().update( false, true, false );

		// remove the listener
		this._font.removeEventListener( 'ready', this._handleFontVariantReady );

	};

	_acquireFont = () => {

		if( !this._font ) {

			let fontFamily = this.getFontFamily();
			if ( fontFamily ) {

				if ( fontFamily instanceof FontFamily ) {

					this.font = fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

				} else {

					// Set from old way, check if that family is already registered
					const fontName = fontFamily.pages ? fontFamily.info.face : fontFamily;
					fontFamily = FontLibrary.getFontFamily( fontName );
					if ( fontFamily ) {

						this.font = fontFamily.getVariant( this.getFontWeight(), this.getFontStyle() );

					}

				}

			}

		}

	}

	_onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

	}

	/**
	 *
	 * @returns {FontVariant}
	 */
	get font() {
		return this._font;
	}

	/*******************************************************************************************************************
	 * GETTERS - SETTERS
	 ******************************************************************************************************************/

	// get whiteSpace(){
	//
	// 	// initialisation can look on parents
	// 	if( !this._whiteSpace ) this._whiteSpace = this.getWhiteSpace();
	//
	// 	return this._whiteSpace;
	//
	// }
	//
	// set whiteSpace( value ) {
	//
	// 	if( this._whiteSpace === value ) return;
	//
	// 	value = Whitespace.isValid( value );
	//
	// 	this._whiteSpace = value;
	//
	// 	// request parse and layout
	// 	this.update( true, true, false );
	//
	// }


	_buildContentKernings(){

		// apply kerning
		if ( this.getFontKerning() !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			for ( let i = 1; i < this._textContent.length; i++ ) {

				const glyphPair = this._textContent[ i - 1 ] + this._textContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				this._textContentInlines[ i ].kerning = this._font.getKerningAmount( glyphPair );

			}
		}

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

		this._acquireFont();

		// won't parse without font or unready font
		if( !this._font || !this._font.isReady ) return;

		// Apply whitespace on string characters themselves.
		// Will possibly :
		//  - l/r trim whitespace
		//  - collapse whitespace sequences
		//  - remove newlines / tabulations
		this._textContent = Whitespace.collapseWhitespaceOnString( this.content, this.getWhiteSpace() );

		// Now that we know exactly which characters will be printed
		// Store the character description ( typographic properties )
		this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographyCharacter( char ) );

		// And from the descriptions ( which are static/freezed per character per font )
		// Build the inline
		this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineCharacter() );
		this.inlines = this._textContentInlines;


		// this.calculateInlines( this._fitFontSize || this.getFontSize() );
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

			const charactersAsGeometries = this.inlines.map(
				inline =>
					this._font.getGeometryCharacter( inline )
						.translate( inline.offsetX, inline.offsetY, 0 )

			);

			const mergedGeom = mergeBufferGeometries( charactersAsGeometries );

			this.textContent = new Mesh( mergedGeom, this.getFontMaterial() );

			this.textContent.renderOrder = Infinity;

			// This is for hiddenOverflow to work
			this.textContent.onBeforeRender = this._onBeforeRender

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

		// Abort conditions
		if ( !this._font || !this._font.isReady ) return;
		if ( !this._textContent) return;

		const whiteSpace = this.getWhiteSpace();
		const newLineBreakability = Whitespace.newlineBreakability( whiteSpace )

		const breakChars = this.getBreakOn();

		const SCALE_MULT = fontSize / this._font.typographic.size;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < this._textContent.length; i++ ) {

			const char = this._textContent[ i ];

			/**
			 *
			 * @type {MSDFInlineCharacter}
			 */
			const inline = this._textContentInlines[ i ];

			inline.resetOffsets();

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;
			if ( whiteSpace !== Whitespace.NOWRAP ) {

				if ( breakChars.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

			}

			if ( char.match( /\n/g ) ) {

				lineBreak = newLineBreakability;

			}

			inline.lineBreak = lineBreak;

			// --------------------------------------------------------------------------------------  Whitespace Breakability

			inline.fontSize = fontSize;

			inline.fontFactor = SCALE_MULT;


		}

	}

}
