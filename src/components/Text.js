import { Mesh, Object3D } from 'three';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import FontLibrary from '../font/FontLibrary.js';

import deepDelete from '../utils/deepDelete.js';
import { mix } from '../utils/mix.js';
import * as Whitespace from '../utils/inline-layout/Whitespace';
import FontFamily from '../font/FontFamily';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';


//JSDoc related imports
/* eslint-disable no-unused-vars */
import MSDFTypographicGlyph from '../font/msdf/MSDFTypographicGlyph';
import MSDFInlineGlyph from '../font/msdf/MSDFInlineGlyph';
import FontVariant from '../font/FontVariant';
import { Material } from 'three';
/* eslint-enable no-unused-vars */

/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block
 */

/**
 *
 * @type {Object.<{m:string, t?:(value:any) => any}>}
 * @private
 */
const _fontMaterialProperties = {
	// fontColor : { m: 'color', t: null }, // the property fontColor goes to material.color
	// fontOpacity: { m: 'opacity' },
	// alphaTest: {},
}

export default class Text extends mix.withBase( Object3D )(
	InlineComponent,
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
		 * @type {MSDFTypographicGlyph[]}
		 * @private
		 */
		this._textContentGlyphs = null;

		/**
		 *
		 * @type {MSDFInlineGlyph[]}
		 * @private
		 */
		this._textContentInlines = null;

		/**
		 *
		 * @type {FontVariant}
		 * @private
		 */
		this._font = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._fontMaterialProperties = {..._fontMaterialProperties};

		this.set( options );

		this.addEventListener( 'added', this._acquireFont );

	}

	/**
	 * Trigger some update when the font is ready
	 * @private
	 */
	_handleFontVariantReady = () => {

		// request parse update and parent layout
		this.update( true, true, false );
		this.getHighestParent().update( false, true, false );

		// remove the listener
		this._font.removeEventListener( 'ready', this._handleFontVariantReady );

	};

	/**
	 * When adding a text to a parent ui element,
	 * acquire parent font, if needed
	 * @private
	 */
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

	/*******************************************************************************************************************
	 * GETTERS - SETTERS
	 ******************************************************************************************************************/

	/**
	 * @param {FontVariant} value
	 */
	set font( value ) {

		// if a previous font isset, be sure no event remains
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

		// update font material according to font variant
		if( !this._fontMaterial ) {

			this.fontMaterial = new this._font.fontMaterial();

		} else {



			// @TODO :	Only recreate a material instance if needed,
			//  				prevent user that its custom material may no longer be compatible with update fontVariant implementation
			const isDefaultMaterial = this._fontMaterial.isDefault && this._fontMaterial.isDefault();
			if( isDefaultMaterial && !(this._fontMaterial instanceof this._font.fontMaterial) ) {

				this.fontMaterial = new this._font.fontMaterial();

			} else {

				this._transferToFontMaterial();

			}

		}

	}

	/**
	 *
	 * @returns {FontVariant}
	 */
	get font() {
		return this._font;
	}

	get fontMaterial() {
		return this._fontMaterial;
	}

	/**
	 *
	 * @param {MSDFFontMaterial|Material} fontMaterial
	 */
	set fontMaterial( fontMaterial ) {

		this._fontMaterial = fontMaterial;

		// Update the fontMaterialProperties that need to be transferred to
		this._fontMaterialProperties = {..._fontMaterialProperties,...fontMaterial.constructor.fontMaterialProperties }

		if( this._font ) {
			// transfer all the properties to material
			this._transferToFontMaterial();
		}
	}

	/**
	 *
	 * @param {Material} fontMaterial
	 */
	set customDepthMaterial( fontMaterial ) {

		this._customDepthMaterial = fontMaterial;

		if( this._font ) {

			this._transferToFontMaterial();

			if ( this.textContent ) {

				this.textContent.customDepthMaterial = this._customDepthMaterial;

			}

		}

	}

	get customDepthMaterial() {

		return this._customDepthMaterial;

	}


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

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @private
	 */
	_transferToFontMaterial( options = null ) {

		if( !this._fontMaterial ) return;

		if( !options ){

			options = {};
			for ( const fontMaterialProperty in this._fontMaterialProperties ) {

				let value = this[fontMaterialProperty];
				if( value === undefined ){

					const upperCaseProperty = fontMaterialProperty[0].toUpperCase() + fontMaterialProperty.substring(1)
					if( this["get"+upperCaseProperty] ) {

						value = this["get"+upperCaseProperty]();

					}

				}

				if( value !== undefined ) {

					options[fontMaterialProperty] = value;

				}

			}

		}

		// Transfer properties to material
		for ( const fontMaterialProperty in this._fontMaterialProperties ) {
			const transferDefinition = this._fontMaterialProperties[fontMaterialProperty];

			if ( options[fontMaterialProperty] !== undefined ) {

				/**
				 * The transformer method to pass a TextProperty to a MaterialProperty
				 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
				 */
				const transferTransformer = transferDefinition.t ? transferDefinition.t : _directTransfertPropertyToMaterial;
				transferTransformer( this._fontMaterial, transferDefinition.m, options[fontMaterialProperty] );

				// Also transfert to customDepthMat
				if( this._customDepthMaterial ) {

					transferTransformer( this._customDepthMaterial, transferDefinition.m, options[fontMaterialProperty] );

				}

			}

		}
	}


	/**
	 * @TODO : This is already present in MaterialManager
	 * Update a component's materials clipping planes.
	 * Called every frame.
	 */
	updateClippingPlanes( value ) {

		const newClippingPlanes = value !== undefined ? value : this.getClippingPlanes();

		if ( JSON.stringify( newClippingPlanes ) !== JSON.stringify( this.clippingPlanes ) ) {

			this.clippingPlanes = newClippingPlanes;

			if ( this.fontMaterial ) this.fontMaterial.clippingPlanes = this.clippingPlanes;

			// if ( this.backgroundMaterial ) this.backgroundMaterial.clippingPlanes = this.clippingPlanes;

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

		if( !this.content || this.content.length === 0 ) return;

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
		this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographicGlyph( char ) );

		// And from the descriptions ( which are static/freezed per character per font )
		// Build the inline
		this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );
		this._buildContentKernings();

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
					this._font.getGeometricGlyph( inline, this.getSegments() )
						.translate( inline.offsetX, inline.offsetY, 0 )

			);

			const mergedGeom = mergeBufferGeometries( charactersAsGeometries );

			// console.log(this.uuid);

			this.textContent = new Mesh( mergedGeom, this._fontMaterial );
			if( this._customDepthMaterial ){

				this.textContent.customDepthMaterial = this._customDepthMaterial;

			}
			// this.textContent = new Mesh( mergedGeom, new MeshBasicMaterial({color:0x99ff00}) );

			this.textContent.renderOrder = Infinity;

			// This is for hiddenOverflow to work
			this.textContent.onBeforeRender = this._onBeforeRender

			this.add( this.textContent );

		}

		this.position.z = this.getOffset();

	}

	updateInner() {

		this.position.z = this.getOffset();

		// if ( this.textContent ) this.updateTextMaterial();

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
			 * @type {MSDFInlineGlyph}
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

/**
 *
 * @param {Material|ShaderMaterial} fontMaterial
 * @param {string} propertyName The property to be set on that fontMaterial
 * @param {any} value The value to transfert to fontMaterial
 *
 * @private
 */
const _directTransfertPropertyToMaterial = function( fontMaterial, propertyName, value) {

	fontMaterial[propertyName] = value;

}
