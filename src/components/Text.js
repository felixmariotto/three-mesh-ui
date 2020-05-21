/*

Job:
	- computing its own size according to user measurements or content measurement
	- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
	- Its text content (string)
	- Font attributes ('font', 'fontType', 'fontSize')
	- Parent block

To learn more about the differences between Text types :
https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type

*/

import { Object3D } from 'three';

import InlineComponent from './core/InlineComponent';
import TextManager from '../content/TextManager';
import DeepDelete from '../utils/DeepDelete';

function Text( options ) {

	const textComponent = Object.create( InlineComponent() );

	textComponent.type = "Text";

	textComponent.textManager = TextManager();

	textComponent.parseParams = function parseParams( resolve, reject ) {

		////////////////////////
		// GET CHARS GEOMETRIES
		////////////////////////

		const content = this.content ;
		const font = this.getFontFamily();
		const fontSize = this.getFontSize();
		const breakChars = this.getBreakOn(); // characters to prioritize breaking line (eg: white space)
		const textType = this.getTextType();

		// Abort condition
		
		if ( !font ) return

		if ( !this.content || this.content.length === 0 ) {
			reject( 'Text component has no text content' );
			return
		};

		if ( textType === 'geometry' && font.fontType !== 'Typeface' ) {
			reject( `${ textType } text is not compatible with this type of font.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
			return
		};

		if ( textType === 'MSDF' && font.fontType !== 'MSDF' ) {
			reject( `${ textType } text is not compatible with this type of font.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
			return
		};

		// Compute glyphs sizes

		let chars = Array.from ? Array.from( content ) : String( content ).split( '' );

		const glyphInfos = chars.map( (glyph)=> {

			// Get height, width, and anchor point of this glyph
			const dimensions = textComponent.textManager.getGlyphDimensions({
				textType,
				glyph,
				font,
				fontSize
			});

			//

			let lineBreak = null ;

			if ( breakChars.includes( glyph ) || glyph.match(/\s/g) ) lineBreak = "possible" ;

			if ( glyph.match(/\n/g) ) lineBreak = "mandatory" ;

			//

			return {
				height: dimensions.height,
				width: dimensions.width,
				anchor: dimensions.anchor,
				lineBreak,
				glyph,
				fontSize
			};

		});

		// Update 'inlines' property, so that the parent can compute each glyph position

		textComponent.inlines = glyphInfos;

		//

		resolve();

	};

	textComponent.updateLayout = function updateLayout() {

		/*
		Create text content

		At this point, text.inlines should have been modified by the parent
		component, to add xOffset and yOffset properties to each inlines.
		This way, TextContent knows were to position each character.

		*/

		if ( !textComponent.inlines ) return

		DeepDelete( textComponent );

		const textContent = textComponent.textManager.create({
			inlines: textComponent.inlines,
			fontFamily: this.getFontFamily(),
			fontMaterial: this.getFontMaterial(),
			textType: this.getTextType(),
			fontTexture: this.getFontTexture(),
			fontColor: this.getFontColor(),
			fontOpacity: this.getFontOpacity()
		});

		textComponent.add( textContent );

	};

	textComponent.updateInner = function updateInner() {

		textComponent.position.z = textComponent.getOffset();

	};

	textComponent.set( options );

	return textComponent

};

export default Text
