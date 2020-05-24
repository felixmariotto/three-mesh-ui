/*

Job: high-level component that returns a keyboard

*/

import BoxComponent from './core/BoxComponent';
import Block from './Block';
import Text from './Text';
import keymaps from '../utils/Keymaps';

export default function KeyboardModule( options ) {

	// DEFAULTS

	if ( !options ) options = {};
	if ( !options.width ) options.width = 1;
	if ( !options.height ) options.height = 0.4;

	//

	const keyboard = Object.create( BoxComponent() );

	keyboard.type = 'Keyboard';

	//////////
	// KEYMAP
	//////////

	// ../utils/Keymaps contains information about various keyboard layouts
	// We select one depending on the user's browser language

	let keymap;

	if ( navigator ) {

		switch ( navigator.language ) {

			case 'fr' :
				keymap = keymaps.fr
				break

			default :
				keymap = keymaps.fr
				break

		};

	} else {

		keymap = keymaps.fr

	};

	////////////////////
	// BLOCKS CREATION
	////////////////////

	// PANELS

	keyboard.panels = keymap.map( (panel)=> {

		// console.log( panel );

		const panelBlock = Block({
			width: options.width,
			height: options.height,
			offset: 0
		});

		panelBlock.add( ...panel.map( (line, i, lines)=> {

			// console.log( line )

			const lineBlock = Block({
				width: options.width,
				height: options.height / lines.length,
				contentDirection: 'row'
			});

			let keys = [];

			for ( let char of Object.keys(line) ) {

				console.log( line[char] );

				const key = Block({
					width: options.width * line[char].width,
					height: options.height / lines.length,
					justifyContent: 'center',
					fontSize: 0.04
				});

				key.add(
					Text({
						content: char
					})
				);

				keys.push( key );

			};

			lineBlock.add( ...keys )

			return lineBlock

		}))

		return panelBlock

	});

	keyboard.add( keyboard.panels[0] )

	////////////
	//  UPDATE
	////////////

	keyboard.parseParams = function ParseParams( resolveParent, rejectParent ) {

		const promises = keyboard.children.map( (child)=> {

			if ( !child.parseParams ) return

			return new Promise((resolve, reject)=> {

				child.parseParams( resolve, reject );

			});

		});

		Promise.all( promises ).then( ()=> {

			resolveParent();

		});

	};

	//

	keyboard.updateLayout = function UpdateLayout() {

		keyboard.children.forEach( (child)=> {

			if ( !child.updateLayout ) return

			child.updateLayout();

		});

	};

	//

	keyboard.updateInner = function UpdateInner() {

		keyboard.children.forEach( (child)=> {

			if ( !child.updateInner ) return

			child.updateInner();

		});
		
	};

	// Lastly set the options parameters to this object, which will trigger an update
	keyboard.set( options, true, true );

	return keyboard;

};
