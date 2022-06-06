/* global ThreeMeshUI */


export const preloadFonts = function( done ) {

	let fontFamily = ThreeMeshUI.FontLibrary.getFontFamily("Roboto");

	if( !fontFamily ){
		fontFamily = ThreeMeshUI.FontLibrary.addFontFamily("Roboto")
	}
	// load fonts
	ThreeMeshUI.FontLibrary.prepare(
		fontFamily
			.addVariant(
				'400',
				'normal',
				"/base/examples/assets/fonts/msdf/roboto/regular.json",
				"/base/examples/assets/fonts/msdf/roboto/regular.png",
				true)
	).then( done );

	return fontFamily;

}
