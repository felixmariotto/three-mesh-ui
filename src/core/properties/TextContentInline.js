import BaseProperty from './BaseProperty';

export default class TextContentInline extends BaseProperty{

	constructor() {

		super( "textContent", null, false );

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		console.log( this._value );
		console.log( '    ->' , this._value.match(/\n/) );

		element._glyphs._needsUpdate = true;
		element._whiteSpace._needsProcess = true;

	}


}
