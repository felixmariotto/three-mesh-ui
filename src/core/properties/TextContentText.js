import InlineElement from '../../elements/basic/InlineElement';
import TextContentEmpty from './TextContentEmpty';

export default class TextContentText extends TextContentEmpty{

	constructor() {

		super( "textContent", null, false );

		this._needsUpdate = false;

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		for ( let i = element.children.length - 1 ; i >= 0; i-- ) {
			const child = element.children[ i ];
			if( child.isUI ) {

				element.remove( child );
				child.clear();

			}

		}

		if( this._value ) element.add( new InlineElement({name:'anonymousInline',textContent:this._value}));

	}

}
