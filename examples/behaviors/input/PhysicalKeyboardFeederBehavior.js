import { Behavior } from 'three-mesh-ui';

export default class PhysicalKeyboardFeederBehavior extends Behavior {

	constructor( subject ) {

		super( subject );

	}

	act() { }

	attach() {
		window.document.addEventListener( 'keyup', this._onKeyboardEvent );
	}

	detach() {
		window.document.removeEventListener( 'keyup', this._onKeyboardEvent );
	}

	_onKeyboardEvent = ( event ) => {

		switch ( event.key.toLowerCase() ) {

			case 'enter' :
				this._subject.set( { textContent: this._subject.textContent + '\n' } );
				break;

			case 'space' :
				this._subject.set( { textContent: this._subject.textContent + ' ' } );
				break;

			case 'delete':
			case 'backspace' :
				const text = this._subject;
				if ( !text.textContent.length ) break;
				text.set( { textContent: text.textContent.substring( 0, text.textContent.length - 1 ) || '' } );
				break;

			default:

				let key = event.key;
				key = key.replace( 'numpad', '' );
				if ( key.length === 1 ) {

					this._subject.set( { textContent: this._subject.textContent + key } );

				}
		}

	}
}
