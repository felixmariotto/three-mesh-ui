export function _injectCSS( cssContent ){

	const style = document.createElement('style');
	style.setAttribute('media','vr');
	style.innerHTML = cssContent;

	document.head.appendChild( style );

}


export function _injectCaption( htmlText ) {

	document.querySelector('.example-container');

}

export function _injectPoweredBy( htmlText ) {

}
