/**

Job: Positioning inline elements according to their dimensions inside this component

Knows: This component dimensions, and its children dimensions

This module is used for Block composition (Object.assign). A Block is responsible
for the positioning of its inline elements. In order for it to know what is the
size of these inline components, parseParams must be called on its children first.

It's worth noting that a Text is not positioned as a whole, but letter per letter,
in order to create a line break when necessary. It's Text that merge the various letters
in its own updateLayout function.

*/
export default function InlineManager( Base = class {} ) {

	return class InlineManager extends Base {

        /** Compute children .inlines objects position, according to their pre-computed dimensions */
        computeInlinesPosition() {

            // computed by BoxComponent
            const INNER_WIDTH = this.getWidth() - (this.padding * 2 || 0);

            // Will stock the characters of each line, so that we can
            // correct lines position before to merge
            const lines = [[]];

            this.children.filter( (child)=> {

                return child.isInline ? true : false

            })
                .reduce( (lastInlineOffset, inlineComponent)=> {

                    // Abort condition

                    if ( !inlineComponent.inlines ) return

                    //////////////////////////////////////////////////////////////
                    // Compute offset of each children according to its dimensions
                    //////////////////////////////////////////////////////////////

                    const letterSpacing = inlineComponent.isText ? inlineComponent.getLetterSpacing() * inlineComponent.getFontSize() : 0;

                    const currentInlineInfo = inlineComponent.inlines.reduce( (lastInlineOffset, inline, i, inlines)=> {

                        const kerning = inline.kerning ? inline.kerning : 0;
                        const xoffset = inline.xoffset ? inline.xoffset : 0;
                        const xadvance = inline.xadvance ? inline.xadvance : inline.width;

                        // Line break
                        // const xoffset = inline.xadvance - inline.width;
                        // const xoffset = 0;

                        const nextBreak = this.distanceToNextBreak( inlines, i , letterSpacing );

                        if (
                            lastInlineOffset + xadvance + xoffset + kerning > INNER_WIDTH ||
                            inline.lineBreak === "mandatory" ||
                            this.shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, INNER_WIDTH )
                        ) {

                            lines.push([ inline ]);

                            inline.offsetX = xoffset;


                            if( inline.width === 0 ){
                                // restart the lastInlineOffset as zero.
                                return 0;
                            }else{

                                // compute lastInlineOffset normally
                                // except for kerning which won't apply
                                // as there is visually no lefthanded glyph to kern with
                                return xadvance + letterSpacing;
                            }

                        }

                        lines[ lines.length - 1 ].push( inline );

                        inline.offsetX = lastInlineOffset + xoffset + kerning;

                        return lastInlineOffset + xadvance + kerning + letterSpacing;

                    }, lastInlineOffset );

                    //

                    return currentInlineInfo

                }, 0 );

            /////////////////////////////////////////////////////////////////
            // Position lines according to justifyContent and contentAlign
            /////////////////////////////////////////////////////////////////

            // got by BoxComponent
            const INNER_HEIGHT = this.getHeight() - (this.padding * 2 || 0);

            // got by MeshUIComponent
            const JUSTIFICATION = this.getJustifyContent();
            const ALIGNMENT = this.getAlignContent();
            const INTERLINE = this.getInterLine();

            // Compute lines dimensions

            lines.forEach( (line)=> {

                //

                line.lineHeight = line.reduce( (height, inline) => {

                    const charHeight = inline.lineHeight !== undefined ? inline.lineHeight : inline.height;

                    return Math.max( height, charHeight )

                }, 0 );

                //

                line.lineBase = line.reduce( (lineBase, inline) => {

                    const newLineBase = inline.lineBase !== undefined ? inline.lineBase : inline.height;

                    return Math.max( lineBase, newLineBase );

                }, 0 );


                line.width = 0;
                const lineHasInlines = line[0];
                if( lineHasInlines ) {
                    // starts by processing whitespace, it will return a collapsed left offset
                    const WHITE_SPACE = this.getWhiteSpace();
                    const whiteSpaceOffset = this.processWhiteSpace(line, WHITE_SPACE);

                    // apply the collapsed left offset to ensure the starting offset is 0
                    line.forEach((inline) => {
                        inline.offsetX -= whiteSpaceOffset
                    });

                    // compute its width: length from firstInline:LEFT to lastInline:RIGHT
                    line.width = this.computeLineWidth(line);
                }

            });

            // individual vertical offset

            let textHeight = lines.reduce( (offsetY, line, i, arr)=> {

                const charAlignement = line.lineHeight - line.lineBase;

                line.forEach( (inline)=> {

                    inline.offsetY = offsetY - line.lineHeight + charAlignement + arr[0].lineHeight;

                });

                return offsetY - line.lineHeight - INTERLINE;

            }, 0 ) + INTERLINE;

            //

            textHeight = Math.abs( textHeight );

            // Line vertical positioning

            const justificationOffset = (()=> {
                switch ( JUSTIFICATION ) {
                case 'start': return (INNER_HEIGHT / 2) - lines[0].lineHeight
                case 'end': return textHeight - lines[0].lineHeight - ( INNER_HEIGHT / 2 ) + (lines[ lines.length -1 ].lineHeight - lines[ lines.length -1 ].lineHeight) ;
                case 'center': return (textHeight / 2) - lines[0].lineHeight
                default: console.warn(`justifyContent: '${ JUSTIFICATION }' is not valid`)
                }
            })();

            // const justificationOffset = 0;

            //

            lines.forEach( (line)=> {

                line.forEach( (inline)=> {

                    inline.offsetY += justificationOffset

                });

            });

            // Horizontal positioning

            lines.forEach( (line)=> {

                const alignmentOffset = (()=> {
                    switch ( ALIGNMENT ) {
                    case 'left': return -INNER_WIDTH / 2
                    case 'right': return -line.width + (INNER_WIDTH / 2)
                    case 'center': return -line.width / 2
                    default: console.warn(`alignContent: '${ ALIGNMENT }' is not valid`)
                    }
                })();

                line.forEach( (char)=> {

                    char.offsetX += alignmentOffset

                });

            });


            // debugging purpose but could be useful for text-selection feature
            this.lines = lines;

        }


        /**
         * Alter a line of inlines according to white-space property
         * @param line
         * @param {('normal'|'pre-wrap'|'pre-line')} whiteSpace
         */
        processWhiteSpace(line, whiteSpace){
            let firstInline = line[0];

            let lastInline = line[line.length-1];

            /**
             * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
             *
             * Throughout, whitespace is defined as one of the characters
             *  "\t" TAB \u0009
             *  "\n" LF  \u000A
             *  "\r" CR  \u000D
             *  " "  SPC \u0020
             *
             * This does not use Javascript's "\s" because that includes non-breaking
             * spaces (and also some other characters).
             **/
            // @TODO: shouldn't be initiated upon each function execution
            const whiteChars = {"\t":"\u0009","\n":"\u000A","\r":"\u000D", " ":"\u0020"};


            // @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
            //
            // current implementation is 'pre-wrap'
            // if the breaking character is a space, get the previous one
            switch (whiteSpace){

                // trim/collapse first and last whitespace characters of a line
                case "pre-wrap":

                    // only process whiteChars glyphs inlines
                    // if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
                    if( firstInline.glyph && firstInline.glyph === "\n" && line.length > 1 ){
                        this._collapseInlineLeft(firstInline,line[1])
                    }

                    // if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
                    if( lastInline.glyph && lastInline.glyph === "\n" && line.length > 1 ){
                        this._collapseInlineRight(lastInline, line[line.length-2])
                    }
                    break;


                case "pre-line":
                case "normal":
                    // only process whiteChars glyphs inlines
                    let inlinesToCollapse = [];
                    let collapsingTarget;
                    for (let i = 0; i < line.length; i++) {
                        const inline = line[i];
                        if( inline.glyph && whiteChars[inline.glyph] && line.length > i){
                            inlinesToCollapse.push(inline);
                            collapsingTarget = line[i+1];
                            continue;
                        }
                        break;
                    }

                    for (let i = 0; i < inlinesToCollapse.length; i++) {
                        const inline = inlinesToCollapse[i];
                        this._collapseInlineLeft(inline,collapsingTarget);
                    }



                    inlinesToCollapse = [];
                    collapsingTarget = null;
                    for (let i = line.length-1; i > 0; i--) {
                        const inline = line[i];
                        if( inline.glyph && whiteChars[inline.glyph] && i>0){
                            inlinesToCollapse.push(inline);
                            collapsingTarget = line[i-1];
                            continue;
                        }
                        break;
                    }
                    for (let i = 0; i < inlinesToCollapse.length; i++) {
                        const inline = inlinesToCollapse[i];
                        this._collapseInlineRight(inline,collapsingTarget);
                    }

                    break;

                default:
                    console.warn(`whiteSpace: '${ whiteSpace }' is not valid`);
                    return 0;
            }

            return firstInline.offsetX;

        }

        /**
         * Visually collapse inlines from right to left ( endtrim )
         * @param inline
         * @param targetInline
         * @private
         */
        _collapseInlineRight(inline, targetInline ){

            if( !targetInline ) return;

            inline.width = 0;
            inline.height = 0;
            inline.offsetX = targetInline.offsetX + targetInline.width;
        }

        /**
         * Visually collapse inlines from left to right (starttrim)
         * @param inline
         * @param targetInline
         * @private
         */
        _collapseInlineLeft(inline, targetInline ){

            if( !targetInline ) return;

            inline.width = 0;
            inline.height = 0;
            inline.offsetX = targetInline.offsetX;
        }

        /**
         * Compute the width of a line
         * @param line
         * @returns {number}
         */
        computeLineWidth( line ){

            // only by the length of its extremities
            const firstInline = line[0];

            let lastInline = line[line.length-1];

            return Math.abs(firstInline.offsetX - (lastInline.offsetX+lastInline.width));

        }


        /**
         * get the distance in world coord to the next glyph defined
         * as break-line-safe ( like whitespace for instance )
         * @private
         */
        distanceToNextBreak( inlines, currentIdx, letterSpacing , accu ) {

            accu = accu || 0 ;

            // end of the text
            if ( !inlines[ currentIdx ] ) return accu

            const inline = inlines[ currentIdx ];
            const kerning = inline.kerning ? inline.kerning : 0;
            const xoffset = inline.xoffset ? inline.xoffset : 0;
            const xadvance = inline.xadvance ? inline.xadvance : inline.width ;

            // if inline.lineBreak is set, it is 'mandatory' or 'possible'
            if ( inline.lineBreak ) {

                return accu + xadvance

            // no line break is possible on this character
            }

            return this.distanceToNextBreak(
                inlines,
                currentIdx + 1,
                letterSpacing,
                accu + xadvance + letterSpacing + xoffset + kerning
            );



        }

        /**
         * Test if we should line break here even if the current glyph is not out of boundary.
         * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
         * and the distance to the next friendly glyph is out of boundary.
         */
        shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, INNER_WIDTH ) {

            // We can't check if last glyph is break-line-friendly it does not exist
            if ( !prevChar || !prevChar.glyph ) return false

            // Next break-line-friendly glyph is inside boundary
            if ( lastInlineOffset + nextBreak < INNER_WIDTH ) return false

            // Characters to prioritize breaking line (eg: white space)
            const BREAK_ON = this.getBreakOn();

            // Previous glyph was break-line-friendly
            return BREAK_ON.indexOf( prevChar.glyph ) > -1

        }

	}

}
