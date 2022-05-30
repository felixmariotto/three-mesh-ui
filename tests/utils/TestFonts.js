/* global ThreeMeshUI */


export const preloadFonts = function( done ) {

	// load fonts
	ThreeMeshUI.FontLibrary.prepare(
		ThreeMeshUI.FontLibrary
			.addFontFamily("Roboto")
			.addVariant('400','normal', "/base/examples/assets/fonts/msdf/roboto/regular.json", "/base/examples/assets/fonts/msdf/roboto/regular.png")
	).then( done );

	return ThreeMeshUI.FontLibrary.getFontFamily( "Roboto" );

}
