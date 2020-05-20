/*
Job: Creating a "unique" ID
*/

const CHARS = 'AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn7894561230';

export default function UniqueID( accu, i ) {

	if ( !accu ) {

		accu = '';

		i = 12

	};

	if ( !i ) {

		return accu

	} else {

		return UniqueID( accu + CHARS[ Math.floor(Math.random() * CHARS.length ) ], i - 1 );

	};

};