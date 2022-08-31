import EmptyProperty from './EmptyProperty';

export default class TextContentEmpty extends EmptyProperty{

	constructor() {

		super( "textContent" );

		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ set value( v ) { 	/* eslint-enable no-unused-vars */ }


	/* eslint-disable no-unused-vars */ process( element ) { /* eslint-enable no-unused-vars */

		let content = "";
		for ( let i = 0; i < element.children.length; i++ ) {
			const child = element.children[i];

			if( child.isUI ) {

				content += child.textContent;

			}

		}

		this._value = content;

	}


}
