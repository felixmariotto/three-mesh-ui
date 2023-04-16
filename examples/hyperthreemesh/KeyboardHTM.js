import KeyboardElement from 'three-mesh-ui/examples/elements/keyboard/KeyboardElement';
import * as HyperThreeMesh from 'three-mesh-ui/examples/hyperthreemesh/HyperThreeMesh';
import HTMBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBlockElement';

export default class KeyboardHTM extends HTMBlockElement {

	constructor( options ) {

		KeyboardElement.ensureOptions( options );

		super({tagName:'keyboard'});

		KeyboardElement.make( this, options );

		// parse all keys
		const iconsInputs = ['enter','shift','backspace'];
		for ( let i = 0; i < this.keys.length; i++ ) {
			const key = this.keys[ i ];

			if( iconsInputs.indexOf( key.info.input ) !== -1 ){
				key.setAttribute( 'type', 'icon');
			}else{
				key.setAttribute( 'type', 'char');
			}

		}

	}


	/**
	 *
	 * @returns {HTMBlockElement}
	 * @private
	 */
	_buildPanel( ) {

		const panelBlock = new HyperThreeMesh.createElement('div',{tagName:'panel'});
		panelBlock.charset = 0;

		return panelBlock;

	}

	/**
	 *
	 * @returns {HTMBlockElement}
	 * @private
	 */
	_buildBlock( ) {

		return HyperThreeMesh.createElement( 'div');

	}

	/* eslint-disable no-unused-vars */

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {HTMBaseElement}
	 * @private
	 */
	_buildKey( char, keyDefinition ) {

		const key = HyperThreeMesh.createElement( 'button', { tagName:"key", name: char } );
		key.setAttribute('input', char)
		return key;

	}

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {HTMBaseElement}
	 * @private
	 */
	_buildKeyInline( char, keyDefinition ) {

		return HyperThreeMesh.createElement( 'span', { tagName:"anonymous-span", name: char } );

	}

	/**
	 *
	 * @param char
	 * @param keyDefinition
	 * @returns {HTMBaseElement}
	 * @private
	 */
	_buildKeyInlineBlock( char, keyDefinition ) {

		return HyperThreeMesh.createElement( 'icon', { name: char } );

	} /* eslint-enable no-unused-vars */

}
