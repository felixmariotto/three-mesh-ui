import InteractiveListener from 'three-mesh-ui/examples/interactive/InteractiveListener';

export default class KeyboardListener extends InteractiveListener {

	constructor( keyboardElement ) {

		super();

		this._keyboard = keyboardElement;

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @private
		 */
		this._texts = [];

	}

	bindText( text ) {
		this._texts.push( text );
	}

	unbindText( text ) {
		const index = this._texts.indexOf( text );
		if( index !== -1 ){

			this._texts.splice( index, 1 );

		}
	}

	clicked( element ) {

		if( this._keyboard.keys.indexOf( element) !== -1 ) {

			if ( element.info.command ) {

				switch ( element.info.command ) {

					// switch between panels
					case 'switch' :
						this._keyboard.setNextPanel();
						break;

					// switch between panel charsets (eg: russian/english)
					case 'switch-set' :
						this._keyboard.setNextCharset();
						break;

					case 'enter' :
						for ( let i = 0; i < this._texts.length; i++ ) {
							const text = this._texts[ i ];
							text.set( { textContent: text.textContent + '\n' } );
						}
						break;

					case 'space' :
						for ( let i = 0; i < this._texts.length; i++ ) {
							const text = this._texts[ i ];
							text.set( { textContent: text.textContent + ' ' } );
						}
						break;

					case 'backspace' :
						for ( let i = 0; i < this._texts.length; i++ ) {
							const text = this._texts[ i ];
							if ( !text.textContent.length ) continue;
							text.set( { textContent: text.textContent.substring( 0, text.textContent.length - 1 ) || '' } );
						}

						break;

					case 'capslock' :
						element.togglePseudoState('checked');
						this._keyboard.toggleCase();
						break;

				}

				// print a glyph, if any
			} else if ( element.info.input ) {

				for ( let i = 0; i < this._texts.length; i++ ) {
					const text = this._texts[ i ];
					text.set( { textContent: text.textContent + element.info.input } );
				}

			}

		}

	}

	/* eslint-disable no-unused-vars */
	hoveredElementHasChanged( element ) {   /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	selectedElementHasChanged( element ) {   /* eslint-enable no-unused-vars */ }
}
