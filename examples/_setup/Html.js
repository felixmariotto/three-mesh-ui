/**
 *
 * @param cssContent
 * @internal
 */
export function _injectCSS( cssContent ){

	const style = document.createElement('style');
	style.setAttribute('media','vr');
	style.innerHTML = cssContent;

	document.head.appendChild( style );

}

/**
 *
 * @param htmlText
 * @internal
 */
export function _injectCaption( htmlText ) {

	const container = document.querySelector('.example-container');
	if( container ) {

		container.innerHTML = htmlText;

	}

}

/**
 *
 * @param htmlText
 * @internal
 */
export function _injectCredits( htmlText ) {

	const container = document.querySelector('.example-container');
	if( container ) {

		container.innerHTML = htmlText;

	}

}
