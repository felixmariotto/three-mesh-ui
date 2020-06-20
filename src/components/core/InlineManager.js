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

                    const currentInlineInfo = inlineComponent.inlines.reduce( (lastInlineOffset, inline, i, inlines)=> {

                        // Line break

                        const nextBreak = this.distanceToNextBreak( inlines, i );

                        if (
                            lastInlineOffset + inline.width > INNER_WIDTH ||
                        inline.lineBreak === "mandatory" ||
                        this.shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, INNER_WIDTH )
                        ) {

                            lines.push([ inline ]);

                            inline.offsetX = 0;

                            return inline.width;

                        } 

                        lines[ lines.length - 1 ].push( inline );

                    

                        //

                        inline.offsetX = lastInlineOffset;

                        //

                        return lastInlineOffset + inline.width;

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

                line.lowestPoint = line.reduce( (lowest, inline)=> {

                    return lowest < inline.anchor ? inline.anchor : lowest

                }, 0 );

                //

                line.heighestPoint = line.reduce( (highest, inline)=> {

                    const topPart = inline.height - inline.anchor;

                    return highest < topPart ? topPart : highest 

                }, 0 );

                //

                line.totalHeight = line.lowestPoint + line.heighestPoint;

                //

                line.width = line.reduce( (width, inline)=> {

                    return width + inline.width

                }, 0 );

            });

            // individual vertical offset

            let textHeight = lines.reduce( (offsetY, line, i, arr)=> {

                line.forEach( (char)=> {

                    char.offsetY = offsetY - line.totalHeight + line.lowestPoint + arr[0].totalHeight;

                });

                return offsetY - line.totalHeight - INTERLINE;

            }, 0 ) + INTERLINE;

            //

            textHeight = Math.abs( textHeight );

            // Line vertical positioning

            const justificationOffset = (()=> {
                switch ( JUSTIFICATION ) {
                case 'start': return (INNER_HEIGHT / 2) - lines[0].totalHeight
                case 'end': return textHeight - lines[0].totalHeight - ( INNER_HEIGHT / 2 ) + (lines[ lines.length -1 ].totalHeight - lines[ lines.length -1 ].totalHeight) ;
                case 'center': return (textHeight / 2) - lines[0].totalHeight
                default: console.warn(`justifyContent: '${ JUSTIFICATION }' is not valid`)
                }
            })();

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

        }

        /**
         * get the distance in world coord to the next glyph defined
         * as break-line-safe ( like whitespace for instance )
         * @private
         */
        distanceToNextBreak( inlines, currentIdx, accu ) {

            accu = accu || 0 ;

            // end of the text
            if ( !inlines[ currentIdx ] ) return accu

            // if inline.lineBreak is set, it is 'mandatory' or 'possible'
            if ( inlines[ currentIdx ].lineBreak ) {

                return accu + inlines[ currentIdx ].width

            // no line break is possible on this character
            } 

            return this.distanceToNextBreak(
                inlines,
                currentIdx + 1,
                accu + inlines[ currentIdx ].width
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
