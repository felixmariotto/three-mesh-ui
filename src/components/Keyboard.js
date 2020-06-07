/*

Job: high-level component that returns a keyboard

*/

import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { Object3D } from 'three/src/core/Object3D.js';

import BoxComponent from './core/BoxComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';

import Block from './Block.js';
import Text from './Text.js';
import InlineBlock from './InlineBlock.js';

import keymaps from '../utils/Keymaps.js';

//

const textureLoader = new TextureLoader();

//

export default function KeyboardModule( options ) {

	// DEFAULTS

	if ( !options ) options = {};
	if ( !options.width ) options.width = 1;
	if ( !options.height ) options.height = 0.4;
	if ( !options.margin ) options.margin = 0.003;
	if ( !options.padding ) options.padding = 0.01;

	//

	const keyboard = Object.assign(
		Object.create( new Object3D ),
		BoxComponent(),
		MeshUIComponent()
	);

	keyboard.currentPanel = 0;

	keyboard.isLowerCase = true;

	keyboard.charsetCount = 1;

	//////////
	// KEYMAP
	//////////

	// ../utils/Keymaps contains information about various keyboard layouts
	// We select one depending on the user's browser language if
	// there is no options.language

	let keymap;

	if ( options.language || navigator.language ) {

		switch ( options.language || navigator.language  ) {

		case 'fr' :
		case "fr-CH" :
		case "fr-CA" :
			keymap = keymaps.fr;
			break

		case 'ru' :
			keyboard.charsetCount = 2;
			keymap = keymaps.ru;
			break

		case "de" :
		case "de-DE" :
		case "de-AT" :
		case "de-LI" :
		case "de-CH" :
			keymap = keymaps.de;
			break

		case "es" :
		case "es-419" :
		case "es-AR" :
		case "es-CL" :
		case "es-CO" :
		case "es-ES" :
		case "es-CR" :
		case "es-US" :
		case "es-HN" :
		case "es-MX" :
		case "es-PE" :
		case "es-UY" :
		case "es-VE" :
			keymap = keymaps.es;
			break

		case "el" :
			keyboard.charsetCount = 2;
			keymap = keymaps.el;
			break

		case "nord" :
			keymap = keymaps.nord;
			break

		default :
			keymap = keymaps.eng;
			break

		}

	} else {

		keymap = keymaps.eng

	}

	////////////////////
	// BLOCKS CREATION
	////////////////////

	// PANELS

	keyboard.keys = [];

	keyboard.panels = keymap.map( (panel)=> {

		const lineHeight = (options.height / panel.length) - (options.margin * 2);

		const panelBlock = Block({
			width: options.width + (options.padding * 2),
			height: options.height + (options.padding * 2),
			offset: 0,
			padding: options.padding,
			fontFamily: options.fontFamily,
			fontTexture: options.fontTexture,
			backgroundColor: options.backgroundColor,
			backgroundOpacity: options.backgroundOpacity
		});

		panelBlock.charset = 0;

		panelBlock.add( ...panel.map( (line)=> {

			const lineBlock = Block({
				width: options.width,
				height: lineHeight,
				margin: options.margin,
				contentDirection: 'row',
				justifyContent: 'center'
			});

			lineBlock.frameContainer.visible = false;

			const keys = [];

			line.forEach( (keyItem)=> {

				const key = Block({
					width: (options.width * keyItem.width) - (options.margin * 2),
					height: lineHeight,
					margin: options.margin,
					justifyContent: 'center',
					fontSize: 0.035,
					offset: 0
				});

				const char = keyItem.chars[ panelBlock.charset ].lowerCase || keyItem.chars[ panelBlock.charset ].icon || "undif";

				if (
					char !== "enter" &&
					char !== "shift" &&
					char !== "backspace"
				) {

					key.add(
						Text({
							content: char,
							offset: 0
						})
					);

				} else {

					textureLoader.load(`./assets/${ char }.png`, (texture)=> {

						key.add(
							InlineBlock({
								width: key.width * 0.65,
								height: key.height * 0.65,
								backgroundSize: 'contain',
								backgroundTexture: texture,
								backgroundOpacity: 0
							})
						);

					});

				}

				key.type = "Key"

				key.info = keyItem;
				key.info.input = char;
				key.panel = panelBlock;

				// line's keys
				keys.push( key );

				// keyboard's keys
				keyboard.keys.push( key );

			});

			lineBlock.add( ...keys )

			return lineBlock

		}))

		return panelBlock

	});

	keyboard.add( keyboard.panels[ 0 ] );

	// Used to switch to an entirely different panel of this keyboard,
	// with potentially a completely different layout

	keyboard.setNextPanel = function setNextPanel() {

		keyboard.panels.forEach( (panel)=> {

			keyboard.remove( panel );

		});

		keyboard.currentPanel = (keyboard.currentPanel + 1) % (keyboard.panels.length);

		keyboard.add( keyboard.panels[ keyboard.currentPanel ] );

		keyboard.update( true, true, true );

	};

	// Used to change the keys charset. Some layout support this,
	// like the Russian or Greek keyboard, to be able to switch to
	// English layout when necessary

	keyboard.setNextCharset = function setNextCharset() {

		keyboard.panels[ keyboard.currentPanel ].charset = ( keyboard.panels[ keyboard.currentPanel ].charset + 1) % keyboard.charsetCount;

		keyboard.keys.forEach( (key)=> {

			// Here we sort the keys, we only keep the ones that are part of the current panel.

			const isInCurrentPanel = keyboard.panels[ keyboard.currentPanel ].getObjectById( key.id );

			if ( !isInCurrentPanel ) return

			//

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = keyboard.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			const textComponent = key.children.find( child => child.isText );

			if ( !textComponent ) return

			key.info.input = newContent;

			textComponent.set({
				content: newContent
			});

			textComponent.update( true, true, true );

		});

	};

	// Toggle case for characters that support it.

	keyboard.toggleCase = function toggleCase() {

		keyboard.isLowerCase = !keyboard.isLowerCase;

		keyboard.keys.forEach( (key)=> {

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = keyboard.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			const textComponent = key.children.find( child => child.isText );

			if ( !textComponent ) return

			key.info.input = newContent;

			textComponent.set({
				content: newContent
			});

			textComponent.update( true, true, true );

		});

	};

	////////////
	//  UPDATE
	////////////

	keyboard.parseParams = function ParseParams( resolve ) { resolve() };
	keyboard.updateLayout = function UpdateLayout() {};
	keyboard.updateInner = function UpdateInner() {};

	// Lastly set the options parameters to this object, which will trigger an update
	keyboard.set( options );

	return keyboard;

}
