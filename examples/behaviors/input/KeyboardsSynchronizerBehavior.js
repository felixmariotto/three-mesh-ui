import { Behavior } from 'three-mesh-ui';

/**
 * Job : Reports the PhysicalKeyboard touches on the virtualKeyboard
 */
export default class KeyboardsSynchronizerBehavior extends Behavior {

	constructor( subject ) {

		super( subject );

	}

	act() {}

	attach() {
		window.document.addEventListener( 'keydown', this._onKeyDown );
		window.document.addEventListener( 'keyup', this._onKeyUp );
	}

	detach() {
		window.document.removeEventListener( 'keydown', this._onKeyDown );
		window.document.removeEventListener( 'keyup', this._onKeyUp );
	}

	_onKeyDown = ( event ) => {

		let lowerKey = event.key.toLowerCase();

		if ( lowerKey === ' ' ) lowerKey = 'space';
		if ( lowerKey === 'delete' ) lowerKey = 'backspace';
		switch ( lowerKey ) {

			case 'space':
			case 'backspace':
			case 'capslock':
			case 'enter':
				const iconKey = this._subject.getObjectByName( lowerKey );
				if ( iconKey && iconKey.isUI ) iconKey.activatePseudoState( 'active' );

				break;
			default:
				const object = this._subject.getObjectByName( event.key );
				if ( object && object.isUI ) object.activatePseudoState( 'active' );
		}

	};

	_onKeyUp = ( event ) => {

		let lowerKey = event.key.toLowerCase();

		if ( lowerKey === ' ' ) lowerKey = 'space';
		if ( lowerKey === 'delete' ) lowerKey = 'backspace';

		switch ( lowerKey ) {
			case 'capslock':
				const capsLock = this._subject.getObjectByName( lowerKey );
				if ( capsLock && capsLock.isUI ) {
					capsLock.togglePseudoState( 'checked' );
					capsLock.deactivatePseudoState( 'active' );
				}
				break;
			case 'backspace':
			case 'space':
			case 'enter':
				const iconKey = this._subject.getObjectByName( lowerKey );
				if ( iconKey && iconKey.isUI ) iconKey.deactivatePseudoState( 'active' );
				break;
			default:
				const object = this._subject.getObjectByName( event.key );
				if ( object && object.isUI ) object.deactivatePseudoState( 'active' );
		}

	}

}
