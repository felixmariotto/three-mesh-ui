/*

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

*/

import { Object3D } from 'three/src/core/Object3D.js';

import InlineComponent from './core/InlineComponent.js';
import MeshUIComponent from './core/MeshUIComponent.js';
import FontLibrary from './core/FontLibrary.js';
import TextManager from './core/TextManager.js';
import MaterialManager from './core/MaterialManager.js';

import DeepDelete from '../utils/DeepDelete.js';

export default function Text( options ) {

	const textComponent = Object.assign(
		Object.create( new Object3D ),
		InlineComponent(),
		TextManager(),
		MaterialManager(),
		MeshUIComponent()
	);

	textComponent.isText = true;

	textComponent.parseParams = parseParams;
	textComponent.updateLayout = updateLayout;
	textComponent.updateInner = updateInner;

	textComponent.set( options );

	return textComponent

}

///////////
// UPDATES
///////////

function parseParams( resolve ) {

	/*
	Here we compute each glyph dimension, and we store it in this
	component's inlines parameter. This way the parent Block will
	compute each glyph position on updateLayout.
	*/

	const content = this.content ;
	const font = this.getFontFamily();
	const fontSize = this.getFontSize();
	const breakChars = this.getBreakOn();
	const textType = this.getTextType();

	// Abort condition
	
	if ( !font || typeof font === 'string' ) {
		if ( !FontLibrary.getFontOf( this ) ) console.warn('no font was found');
		return
	}

	if ( !this.content ) {
		this.inlines = null
		return
	}

	if ( textType === 'geometry' && font.fontType !== 'Typeface' ) {
		console.error( `${ textType } text is not compatible with the type of font '${ font.fontType }'.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
		return
	}

	if ( textType === 'MSDF' && font.fontType !== 'MSDF' ) {
		console.error( `${ textType } text is not compatible with the type of font '${ font.fontType }'.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Choosing-a-Text-type` )
		return
	}

	// Compute glyphs sizes

	const chars = Array.from ? Array.from( content ) : String( content ).split( '' );

	const glyphInfos = chars.map( (glyph)=> {

		// Get height, width, and anchor point of this glyph
		const dimensions = this.getGlyphDimensions({
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

	this.inlines = glyphInfos;

	resolve();

}

//

function updateLayout() {

	/*
	Create text content

	At this point, text.inlines should have been modified by the parent
	component, to add xOffset and yOffset properties to each inlines.
	This way, TextContent knows were to position each character.

	*/

	DeepDelete( this );

	if ( this.inlines ) {

		// happening in TextManager
		this.textContent = this.createText();

		this.add( this.textContent );

	}

	this.position.z = this.getOffset();

}

//

function updateInner() {

	this.position.z = this.getOffset();

	if ( this.textContent ) this.updateTextMaterial();

}
