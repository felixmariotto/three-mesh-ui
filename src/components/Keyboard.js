/*

Job: high-level component that returns a keyboard

*/

import BoxComponent from './core/BoxComponent';
import Block from './Block';
import Text from './Text';

export default function Keyboard( options ) {

	// DEFAULTS

	if ( !options ) options = {};
	if ( !options.width ) options.width = 1.5;
	if ( !options.height ) options.height = 0.4;

	//

	const keyboard = Object.create( BoxComponent() );

	keyboard.type = 'Keyboard';

	////////////
	// CONTENT
	////////////

	keyboard.background = Block({
		width: options.width,
		height: options.height
	});

	keyboard.add( keyboard.background );

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