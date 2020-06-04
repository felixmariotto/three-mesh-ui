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

import { Object3D } from 'three/src/core/Object3D.js';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import FontLibrary from './core/FontLibrary.js';
import TextManager from './core/TextManager.js';
import MaterialManager from './core/MaterialManager.js';

import DeepDelete from '../utils/DeepDelete.js';

function Text( options ) {

	const textComponent = Object.assign(
		Object.create( new Object3D ),
		InlineComponent(),
		TextManager(),
		MaterialManager(),
		MeshUIComponent()
	);

	textComponent.isText = true;

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
		
		if ( !font || typeof font === 'string' ) {
			if ( !FontLibrary.getFontOf( this ) ) console.warn('no font was found');
			return
		};

		if ( !this.content ) {
			textComponent.inlines = null
			return
		};

		if ( textType === 'geometry' && font.fontType !== 'Typeface' ) {
			console.error( `${ textType } text is not compatible with the type of font '${ font.fontType }'.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
			return
		};

		if ( textType === 'MSDF' && font.fontType !== 'MSDF' ) {
			console.error( `${ textType } text is not compatible with the type of font '${ font.fontType }'.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
			return
		};

		// Compute glyphs sizes

		let chars = Array.from ? Array.from( content ) : String( content ).split( '' );

		const glyphInfos = chars.map( (glyph)=> {

			// Get height, width, and anchor point of this glyph
			const dimensions = textComponent.getGlyphDimensions({
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

		resolve();

	};

	textComponent.updateLayout = function updateLayout() {

		/*
		Create text content

		At this point, text.inlines should have been modified by the parent
		component, to add xOffset and yOffset properties to each inlines.
		This way, TextContent knows were to position each character.

		*/

		// security in case the layout wasn't done yet by the parent
		if ( !textComponent.hasLayoutBeenDone() ) {

			textComponent.parent.update( null, true );

			return

		};

		DeepDelete( textComponent );

		if ( textComponent.inlines ) {

			// happening in TextManager
			textComponent.textContent = textComponent.createText();

			textComponent.add( textComponent.textContent );

		};

		textComponent.position.z = textComponent.getOffset();

	};

	textComponent.updateInner = function updateInner() {

		textComponent.position.z = textComponent.getOffset();

		if ( textComponent.textContent ) textComponent.updateTextMaterial();

	};

	textComponent.set( options );

	return textComponent

};

export default Text
