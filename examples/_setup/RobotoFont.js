import { FontLibrary } from 'three-mesh-ui';
import * as FontWeight from '../../src/utils/font/FontWeight';
import * as FontStyle from '../../src/utils/font/FontStyle';
import MSDFDepthMaterial from '../../src/font/msdf/materials/MSDFDepthMaterial';
import ROBOTO_ADJUSTMENT from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/adjustment';

export const ROBOTO_FAMILY = "Roboto";

export const exampleFontRegister = function ( weight = FontWeight.NORMAL, style = FontStyle.NORMAL ) {

	let filename = 'regular';
	if( weight !== FontWeight.NORMAL || style !== FontStyle.NORMAL ){

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

export const exampleFontPreloadAll = function ( callback ) {

	FontLibrary.prepare(

		FontLibrary
			.addFontFamily(ROBOTO_FAMILY)
			.addVariant(FontWeight.NORMAL, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/regular.json", "./assets/fonts/msdf/roboto/regular.png" )
			.addVariant(FontWeight.BOLD, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/bold-italic.json", "./assets/fonts/msdf/roboto/bold-italic.png" )
			.addVariant(FontWeight.BOLD, FontStyle.NORMAL, "./assets/fonts/msdf/roboto/bold.json", "./assets/fonts/msdf/roboto/bold.png" )
			.addVariant(FontWeight.NORMAL, FontStyle.ITALIC, "./assets/fonts/msdf/roboto/italic.json", "./assets/fonts/msdf/roboto/italic.png" )

	).then( () => {

		// Adjusting font variants to correct some glitchs
		const FF = FontLibrary.getFontFamily(ROBOTO_FAMILY);
		FF.getVariant('700','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
		FF.getVariant('700','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
		FF.getVariant('400','italic').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );
		FF.getVariant('400','normal').adjustTypographicGlyphs( ROBOTO_ADJUSTMENT );

		callback();

	});

	return FontLibrary.getFontFamily( ROBOTO_FAMILY );

}
