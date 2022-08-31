/**
 *
 */
export default class TokenList {

	/**
	 *
	 * @param {function} callback
	 * @param {...string} tokens
	 */
	constructor( callback, ...tokens) {

		this._callback = callback;
		this._tokens = [...tokens];

	}

	clear(){

		this._tokens = [];
		this._callback();

	}

	/**
	 * Check if a token isset on this list
	 * @param {string} token
	 * @returns {boolean}
	 */
	contains = ( token ) => {

		return this._tokens.indexOf( token ) !== -1;

	}

	/**
	 * Check if all provided tokens isset on this list
	 * @param {...string} tokens
	 * @returns {boolean}
	 */
	containsAll = ( ...tokens ) => {

		return tokens.every( this.contains );

	}

	/**
	 *
	 * @param {Array.<string>}tokens
	 * @returns {*}
	 */
	containsEvery = ( tokens ) => {

		return tokens.every( this.contains );

	}

	/**
	 * Adds or remove a token according of its current presence
	 * @param {string} token
	 */
	toggle( token ) {

		if( this.contains( token) ){
			this.remove( token );
		}else{
			this.add( token );
		}

	}

	/**
	 * Add tokens
	 * @param {...string} tokens
	 */
	add( ...tokens ){

		for ( const token of tokens ) {

			if( !this.contains( token) ){

				this._tokens.push( token );
				this._callback();

			}

		}

	}

	/**
	 * remove tokens
	 * @param {...string} tokens
	 */
	remove( ...tokens ){

		for ( const token of tokens ) {

			const tokenIndex = this._tokens.indexOf( token );
			if ( tokenIndex !== -1 ) {

				this._tokens.splice( tokenIndex, 1 );
				this._callback();

			}

		}

	}

	/**
	 * Convert a token list to a string
	 * @param {string} delimiter
	 * @returns {string}
	 */
	toString( delimiter ) {

		if( this._tokens.length ){
			return delimiter + this._tokens.join(delimiter)
		}

		return "";

	}

	/**
	 * Clean any recommended values
	 */
	dispose() {

		this.containsEvery = null;
		this.containsAll = null;

		this._callback = null;
		this._tokens = null;

	}

}
