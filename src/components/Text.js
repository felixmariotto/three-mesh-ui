
import { Object3D } from 'three';

import InlineComponent from './core/InlineComponent.js';
import FontLibrary from './core/FontLibrary.js';
import TextManager from './core/TextManager.js';

import deepDelete from '../utils/deepDelete.js';

/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

*/
export default class Text extends InlineComponent( TextManager( Object3D ) ) {

    isText = true;

    constructor( options ) {

        super( options );

        this.set( options );

    }

    ///////////
    // UPDATES
    ///////////


    /**
     * Here we compute each glyph dimension, and we store it in this
     * component's inlines parameter. This way the parent Block will
     * compute each glyph position on updateLayout.
     */
    parseParams() {

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

        if ( !textType ) {
            console.error( `You must provide a 'textType' attribute so three-mesh-ui knows how to render your text.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` )
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

    }


    /**
     * Create text content
     * 
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     */
    updateLayout() {

        deepDelete( this );

        if ( this.inlines ) {

            // happening in TextManager
            this.textContent = this.createText();

            this.add( this.textContent );

        }

        this.position.z = this.getOffset();

    }

    updateInner() {

        this.position.z = this.getOffset();

        if ( this.textContent ) this.updateTextMaterial();

    }

}
