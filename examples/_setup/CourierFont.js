import { FontLibrary } from 'three-mesh-ui';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

export const COURIER_FAMILY = "Courier Prime";

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
		.addFontFamily(COURIER_FAMILY)
		.addVariant(
			weight,
			style,
			`./assets/fonts/msdf/courier_prime/${filename}.json`,
			`./assets/fonts/msdf/courier_prime/${filename}.png` )

}

export const exampleFontPreloadCourier = function ( callback ) {

	FontLibrary.prepare(

		registerCourierAndVariants(),

	).then( () => {

		// Adjusting font variants to correct some glitchs
		// adjustCourierAndVariants();

		callback();

	});

	return FontLibrary.getFontFamily( COURIER_FAMILY );

}

export const registerCourierAndVariants = function() {

	return FontLibrary
		.addFontFamily(COURIER_FAMILY)
		.addVariant("400", "normal", "./assets/fonts/msdf/courier_prime/regular.json", "./assets/fonts/msdf/courier_prime/regular.png" )
		.addVariant("700", "italic", "./assets/fonts/msdf/courier_prime/bold-italic.json", "./assets/fonts/msdf/courier_prime/bold-italic.png" )
		.addVariant("700", "normal", "./assets/fonts/msdf/courier_prime/bold.json", "./assets/fonts/msdf/courier_prime/bold.png" )
		.addVariant("400", "italic", "./assets/fonts/msdf/courier_prime/italic.json", "./assets/fonts/msdf/courier_prime/italic.png" )

}

export const adjustCourierAndVariants = function () {

	// const FF = FontLibrary.getFontFamily(COURIER_FAMILY);
	// FF.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	// FF.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	// FF.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
	// FF.getVariant('400','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

}
