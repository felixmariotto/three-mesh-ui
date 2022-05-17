/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block
 */
export default class Text extends MeshUIComponent {
    isInline: boolean;
    isText: boolean;
    /**
     *
     * @type {string[]}
     * @private
     */
    private _textContent;
    /**
     *
     * @type {MSDFTypographicGlyph[]}
     * @private
     */
    private _textContentGlyphs;
    /**
     *
     * @type {MSDFInlineGlyph[]}
     * @private
     */
    private _textContentInlines;
    /**
     * Trigger some update when the font is ready
     * @private
     */
    private _handleFontVariantReady;
    /**
     * When adding a text to a parent ui element,
     * acquire parent font, if needed
     * @private
     */
    private _acquireFont;
    _onBeforeRender: () => void;
    inlines: MSDFInlineGlyph[];
    _buildContentKernings(): void;
    /**
     * Here we compute each glyph dimension, and we store it in this
     * component's inlines parameter. This way the parent Block will
     * compute each glyph position on updateLayout.
     */
    parseParams(): void;
    /**
     * Create text content
     *
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     */
    updateLayout(): void;
    updateInner(): void;
    calculateInlines(fontSize: any): void;
}
import MeshUIComponent from "./core/MeshUIComponent";
import MSDFInlineGlyph from "../font/msdf/MSDFInlineGlyph";
