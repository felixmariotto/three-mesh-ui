import InlineElement from '../../elements/basic/InlineElement';
import TextContentDefault from './TextContentDefault';

export default class TextContentProperty extends TextContentDefault{

	constructor() {

		super( "textContent", null, false );

		this._needsUpdate = false;

	}

	set value( value ) {

		// If content hasn't change, dont update it
		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		// prevent multiple update
		this._needsUpdate = false;

		// Remove all its children (Inlines)
		for ( let i = element.children.length - 1 ; i >= 0; i-- ) {
			const child = element.children[ i ];
			if( child.isUI ) {

				element.remove( child );
				child.clear();

			}

		}

		// Rebuild its child list
		element._children._uis = [];

		// If a value, add a child
		if( this._value ) {

			const childrenInlines = this.buildInlines( this._value );
			if( childrenInlines.length ){

				element.add( ...childrenInlines );

			}

		}

		if( element.isInline ) {

			element._glyphs._needsUpdate = true;
			element._whiteSpace._needsProcess = true;

		}

	}

	/**
	 *
	 * @param {string} textContent
	 * @return {InlineElement[]}
	 */
	buildInlines( textContent ) {

		return [ new InlineElement({name:'anonymousInline',textContent}) ];

	}

}
