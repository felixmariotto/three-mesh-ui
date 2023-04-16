import { FontLibrary } from 'three-mesh-ui';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

export const ROBOTO_FAMILY = "Roboto";

export const exampleFontRegister = function ( weight = '400', style = 'normal' ) {

	let filename = 'regular';
	if( weight !== '400' || style !== 'normal' ){

		switch ( weight+style ){
			case "400italic":
				filename = 'italic';
				break;

			case "700italic":
				filename = 'bold-italic';
				break;

			case "700normal":
				filename = 'bold';
				break;
		}

	}

	return FontLibrary
		.addFontFamily(ROBOTO_FAMILY)
		.addVariant(
			weight,
			style,
			`./assets/fonts/msdf/roboto/${filename}.json`,
			`./assets/fonts/msdf/roboto/${filename}.png` )

}

export const exampleFontPreloadRoboto = function ( callback ) {

	FontLibrary.prepare(

		registerRobotoAndVariants(),

	).then( () => {

		// Adjusting font variants to correct some glitchs
		adjustRobotoAndVariants();

		callback();

	});

	return FontLibrary.getFontFamily( ROBOTO_FAMILY );

}

export const registerRobotoAndVariants = function() {

	return FontLibrary
		.addFontFamily(ROBOTO_FAMILY)
		.addVariant("normal", "normal", "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )
		.addVariant("bold", "italic", "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
		.addVariant("bold", "normal", "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
		.addVariant("normal", "italic", "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

}

export const adjustRobotoAndVariants = function () {

	const FF = FontLibrary.getFontFamily(ROBOTO_FAMILY);
	FF.getVariant('bold','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('bold','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('normal','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	FF.getVariant('normal','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

}
