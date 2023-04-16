import { TextureLoader } from 'three';
import { Block, Text, InlineBlock, Inline } from 'three-mesh-ui';
import KeyboardListener from 'three-mesh-ui/examples/elements/keyboard/KeyboardListener';

//

const textureLoader = new TextureLoader();

//

/**
 * Job: high-level component that returns a keyboard
 * @property {InteractiveListener} interactiveListener
 * @property {Array.<MeshUIBaseElement>} interactiveObjects
 * @method {()=>{void}} setNextCharset
 */
export default class KeyboardElement extends Block {

	constructor( options = {} ) {

		// DEFAULTS
		KeyboardElement.ensureOptions( options );

		super();

		KeyboardElement.make( this, options );

	}

	/**
	 *
	 * @returns {BlockElement}
	 * @private
	 */
	_buildPanel( ) {

		const panelBlock = new Block( {} );
		panelBlock.charset = 0;

		return panelBlock;

	}


	/* eslint-disable no-unused-vars */

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {MeshUIBaseElement}
	 * @private
	 */
	_buildKey( char, keyDefinition ) {

		return new Text( { name: char } );

	}

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {MeshUIBaseElement}
	 * @private
	 */
	_buildBlock( ) {

		return new Block( {} );

	}

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {InlineElement}
	 * @private
	 */
	_buildKeyInline( char, keyDefinition ) {

		return new Inline( { name: char } );

	}

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {InlineBlockElement}
	 * @private
	 */
	_buildKeyInlineBlock( char, keyDefinition ) {

		return new InlineBlock( { name: char } );

	} /* eslint-enable no-unused-vars */


	static ensureOptions ( options ) {

		if ( !options.width ) options.width = 1;
		if ( !options.height ) options.height = 0.4;
		if ( !options.margin ) options.margin = 0.003;
		if ( !options.padding ) options.padding = 0.01;

	}


	static make( element, options ) {


		element.currentPanel = 0;
		element.isLowerCase = true;

		/**
		 *
		 * @type {{locales:Array.<string>,charsetCount:{number},keys:Array}|null}
		 * @private
		 */
		element._layout = null;

		//////////
		// KEYMAP
		//////////


		// if more than on layouts are available
		if( options.autoDetectLayout && options.availableLayouts && options.availableLayouts.length > 0 ) {

			const userLocale = navigator.language;
			let selectedLayout = null;
			if( userLocale ) {

				selectedLayout = options.availableLayouts.find( layout => layout.locales.indexOf(userLocale) !== -1 );

			}

			element._layout = selectedLayout;

		}

		if( !element._layout ) element._layout = options.layout;

		element.charsetCount = element._layout.charsetCount;

		////////////////////
		// BLOCKS CREATION
		////////////////////

		// PANELS

		element.keys = [];

		({ panels:element.panels, keys:element.keys } = KeyboardElement.build( element, element._layout, options ) );

		element.add( element.panels[ 0 ] );

		element._interactiveListener = new KeyboardListener( element );


		Object.defineProperty( element, 'interactiveListener', {
			get() {
				return element._interactiveListener;
			},
		});


		// be sure only listener trigger actions on keys
		for ( const key of element.keys ) {
			key._clicked = _emptyClicked;
		}

		Object.defineProperty( element, 'interactiveObjects', {
			get() {
				return element.keys;
			},
		});

		element.setNextPanel = KeyboardElement._setNextPanel.bind( element );
		element.setNextCharset = KeyboardElement._setNextCharset.bind( element );
		element.toggleCase = KeyboardElement._toggleCase.bind( element );


	}

	/**
	 *
	 * @param element
	 * @param layout
	 * @param options
	 * @returns {{panels: *[], keys: *[]}}
	 */
	static build( element, layout, options ) {

		const builtPanels = [];
		const builtKeys = [];


		for ( let i = 0; i < layout.keys.length; i++ ) {
			const panelLines = layout.keys[ i ];

			const lineHeight = ( options.height / panelLines.length ) - ( options.margin * 2 );

			// build panels
			const panel = element._buildPanel();

			panel.set( {
				boxSizing: 'border-box',
				width: options.width + ( options.padding * 2 ),
				height: options.height + ( options.padding * 2 ),
				offset: 0.001,
				padding: options.padding,
				fontFamily: options.fontFamily,
				fontTexture: options.fontTexture,
				backgroundColor: options.backgroundColor,
				backgroundOpacity: options.backgroundOpacity,
				borderRadius: options.borderRadius ? options.borderRadius : 0,
			} );

			panel.charset = 0;
			builtPanels.push( panel );

			// build lines
			for ( let j = 0; j < panelLines.length; j++ ) {
				const keys = panelLines[j];

				const lineBlock = element._buildBlock();
				lineBlock.set( {
					width: options.width,
					height: lineHeight,
					margin: options.margin,
					flexDirection: 'row',
					justifyContent: 'center',
				} );

				panel.add( lineBlock );

				for ( let k = 0; k < keys.length; k++ ) {

					const keyDefinition = keys[k];
					const char = keyDefinition.chars[ panel.charset ].lowerCase || keyDefinition.chars[ panel.charset ].icon || 'und';

					const key = element._buildKey( char, keyDefinition );

					let keyOps = {};
					if( options.keyOptions ){
						if( options.keyOptions instanceof Function){
							keyOps = options.keyOptions( key );
						}else{
							keyOps = options.keyOptions;
						}
					}

					key.set({
						boxSizing : 'border-box',
						width: ( options.width * keyDefinition.width ) - ( options.margin * 2 ),
						height: lineHeight,
						margin: options.margin,
						alignItems: 'center',
						textAlign: 'center',
						backgroundColor : 0x000000,
						backgroundOpacity: 0.8,
						// offset: 0,
						...keyOps
					});

					builtKeys.push( key );
					lineBlock.add( key );

					key.type = 'Key';
					key.info = keyDefinition;
					key.info.input = char;
					key.panel = panel;

					let inlineKey = null;
					if (
						( char === 'enter' && options.enterTexture ) ||
						( char === 'capslock' && options.shiftTexture ) ||
						( char === 'backspace' && options.backspaceTexture ) ) {

						const url = ( () => {

							switch ( char ) {

								case 'backspace':
									return options.backspaceTexture;
								case 'enter':
									return options.enterTexture;
								case 'capslock':
									return options.shiftTexture;
								default:
									console.warn( 'There is no icon image for this key' );

							}

						} )();

						textureLoader.load( url, ( texture ) => {

							inlineKey = element._buildKeyInlineBlock( char, keyDefinition );
							inlineKey.raycast = _emptyRaycast;
							inlineKey.set( {
								width: lineHeight * 0.65,
								height: lineHeight * 0.65,
								backgroundSize: 'contain',
								backgroundImage: texture,
								backgroundColor : 0xffffff,
							} );
							key.add( inlineKey );

						} );

					} else {

						inlineKey = element._buildKeyInline( char, keyDefinition );
						inlineKey.raycast = _emptyRaycast;
						inlineKey.set({textContent:char});
						key.add( inlineKey );

					}

				}

			}

		}

		return {panels:builtPanels,keys:builtKeys};

	}

	/**
	 * Used to switch to an entirely different panel of this keyboard,
	 * with potentially a completely different layout
	 * @internal
	 */
	static _setNextPanel() {

		this.panels.forEach( ( panel ) => {

			this.remove( panel );

		} );

		this.currentPanel = ( this.currentPanel + 1 ) % ( this.panels.length );

		this.add( this.panels[ this.currentPanel ] );

	}

	/**
	 * Used to change the keys charset. Some layout support this,
	 * like the Russian or Greek keyboard, to be able to switch to
	 * English layout when necessary
	 * @internal
	 */
	static _setNextCharset() {

		this.panels[ this.currentPanel ].charset = ( this.panels[ this.currentPanel ].charset + 1 ) % this.charsetCount;

		this.keys.forEach( ( key ) => {

			// Here we sort the keys, we only keep the ones that are part of the current panel.

			const isInCurrentPanel = this.panels[ this.currentPanel ].getObjectById( key.id );

			if ( !isInCurrentPanel ) return;

			//

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			let newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;
			if( !newContent ) {
				newContent = char.icon;
			}

			if ( !key._children._inlines.length ) return;

			const textComponent = key._children._inlines[0];

			if( textComponent.isInlineBlock ) return;

			key.info.input = newContent;

			textComponent.set( { textContent: newContent } );

		} );

	}

	/**
	 * Toggle case for characters that support it.
	 * @internal
	 * */
	static _toggleCase() {

		this.isLowerCase = !this.isLowerCase;

		this.keys.forEach( ( key ) => {

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			let newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;
			if( !newContent ) {
				newContent = char.icon;
			}

			if ( !key._children._inlines.length ) return;

			const inlineElement = key._children._inlines[0];

			if( inlineElement.isInlineBlock ) return;

			key.info.input = newContent;

			inlineElement.set( {
				textContent: newContent
			} );

		} );

	}

}

function _emptyRaycast() {}
function _emptyClicked() {}

