/**
 *
 * @param {string} cssContent
 * @param {string} [media="three-mesh-ui"]
 * @internal
 */
export function _injectCSS( cssContent, media = 'three-mesh-ui' ){

	const style = document.createElement('style');
	style.setAttribute('media',media);
	style.textContent = cssContent;

	document.head.appendChild( style );

}
