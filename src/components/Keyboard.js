import { TextureLoader } from 'three';
import { Object3D } from 'three';

import BoxComponent from './core/BoxComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';

import Block from './Block.js';
import Text from './Text.js';
import InlineBlock from './InlineBlock.js';

import keymaps from '../utils/Keymaps.js';
import { mix } from '../utils/mix.js';

//

const textureLoader = new TextureLoader();

//

/**
 * Job: high-level component that returns a keyboard
 */
export default class Keyboard extends mix.withBase( Object3D )( BoxComponent, MeshUIComponent ) {

	constructor( options ) {

		// DEFAULTS

		if ( !options ) options = {};
		if ( !options.width ) options.width = 1;
		if ( !options.height ) options.height = 0.4;
		if ( !options.margin ) options.margin = 0.003;
		if ( !options.padding ) options.padding = 0.01;

		//

		super( options );

		this.currentPanel = 0;

		this.isLowerCase = true;

		this.charsetCount = 1;

		//////////
		// KEYMAP
		//////////

		// ../utils/Keymaps contains information about various keyboard layouts
		// We select one depending on the user's browser language if
		// there is no options.language

		let keymap;

		if ( options.language || navigator.language ) {

			switch ( options.language || navigator.language ) {

				case 'fr' :
				case 'fr-CH' :
				case 'fr-CA' :
					keymap = keymaps.fr;
					break;

				case 'ru' :
					this.charsetCount = 2;
					keymap = keymaps.ru;
					break;

				case 'de' :
				case 'de-DE' :
				case 'de-AT' :
				case 'de-LI' :
				case 'de-CH' :
					keymap = keymaps.de;
					break;

				case 'es' :
				case 'es-419' :
				case 'es-AR' :
				case 'es-CL' :
				case 'es-CO' :
				case 'es-ES' :
				case 'es-CR' :
				case 'es-US' :
				case 'es-HN' :
				case 'es-MX' :
				case 'es-PE' :
				case 'es-UY' :
				case 'es-VE' :
					keymap = keymaps.es;
					break;

				case 'el' :
					this.charsetCount = 2;
					keymap = keymaps.el;
					break;

				case 'nord' :
					keymap = keymaps.nord;
					break;

				default :
					keymap = keymaps.eng;
					break;

			}

		} else {

			keymap = keymaps.eng;

		}

		////////////////////
		// BLOCKS CREATION
		////////////////////

		// PANELS

		this.keys = [];

		this.panels = keymap.map( ( panel ) => {

			const lineHeight = ( options.height / panel.length ) - ( options.margin * 2 );

			const panelBlock = new Block( {
				width: options.width + ( options.padding * 2 ),
				height: options.height + ( options.padding * 2 ),
				offset: 0,
				padding: options.padding,
				fontFamily: options.fontFamily,
				fontTexture: options.fontTexture,
				backgroundColor: options.backgroundColor,
				backgroundOpacity: options.backgroundOpacity
			} );

			panelBlock.charset = 0;

			panelBlock.add( ...panel.map( ( line ) => {

				const lineBlock = new Block( {
					width: options.width,
					height: lineHeight,
					margin: options.margin,
					contentDirection: 'row',
					justifyContent: 'center'
				} );

				lineBlock.frame.visible = false;

				const keys = [];

				line.forEach( ( keyItem ) => {

					const key = new Block( {
						width: ( options.width * keyItem.width ) - ( options.margin * 2 ),
						height: lineHeight,
						margin: options.margin,
						justifyContent: 'center',
						offset: 0
					} );

					const char = keyItem.chars[ panelBlock.charset ].lowerCase || keyItem.chars[ panelBlock.charset ].icon || 'undif';

					if (
						( char === 'enter' && options.enterTexture ) ||
						( char === 'shift' && options.shiftTexture ) ||
						( char === 'backspace' && options.backspaceTexture )
					) {

						const url = ( () => {

							switch ( char ) {

								case 'backspace':
									return options.backspaceTexture;
								case 'enter':
									return options.enterTexture;
								case 'shift':
									return options.shiftTexture;
								default:
									console.warn( 'There is no icon image for this key' );

							}

						} )();

						textureLoader.load( url, ( texture ) => {

							key.add(
								new InlineBlock( {
									width: key.width * 0.65,
									height: key.height * 0.65,
									backgroundSize: 'contain',
									backgroundTexture: texture
								} )
							);

						} );

					} else {

						key.add(
							new Text( {
								content: char,
								offset: 0
							} )
						);

					}

					key.type = 'Key';

					key.info = keyItem;
					key.info.input = char;
					key.panel = panelBlock;

					// line's keys
					keys.push( key );

					// keyboard's keys
					this.keys.push( key );

				} );

				lineBlock.add( ...keys );

				return lineBlock;

			} ) );

			return panelBlock;

		} );

		this.add( this.panels[ 0 ] );

		// Lastly set the options parameters to this object, which will trigger an update
		this.set( options );

	}

	/**
	 * Used to switch to an entirely different panel of this keyboard,
	 * with potentially a completely different layout
	 */
	setNextPanel() {

		this.panels.forEach( ( panel ) => {

			this.remove( panel );

		} );

		this.currentPanel = ( this.currentPanel + 1 ) % ( this.panels.length );

		this.add( this.panels[ this.currentPanel ] );

		this.update( true, true, true );

	}

	/*
	 * Used to change the keys charset. Some layout support this,
	 * like the Russian or Greek keyboard, to be able to switch to
	 * English layout when necessary
	 */
	setNextCharset() {

		this.panels[ this.currentPanel ].charset = ( this.panels[ this.currentPanel ].charset + 1 ) % this.charsetCount;

		this.keys.forEach( ( key ) => {

			// Here we sort the keys, we only keep the ones that are part of the current panel.

			const isInCurrentPanel = this.panels[ this.currentPanel ].getObjectById( key.id );

			if ( !isInCurrentPanel ) return;

			//

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	/** Toggle case for characters that support it. */
	toggleCase() {

		this.isLowerCase = !this.isLowerCase;

		this.keys.forEach( ( key ) => {

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {
	}

	updateLayout() {
	}

	updateInner() {
	}

}
