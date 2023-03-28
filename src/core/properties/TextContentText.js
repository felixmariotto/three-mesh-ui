import InlineElement from '../../elements/basic/InlineElement';
import TextContentEmpty from './TextContentEmpty';

export default class TextContentText extends TextContentEmpty{

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
		if( this._value ) element.add( new InlineElement({name:'anonymousInline',textContent:this._value}));


	}

}
