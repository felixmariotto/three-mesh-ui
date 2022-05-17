/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
export default class InlineBlock extends MeshUIComponent {
    isInline: boolean;
    isInlineBlock: boolean;
    size: Vector2;
    _material: FrameMaterial;
    inline: InlineBlockInline;
    inlines: InlineBlockInline[];
    parseParams(): void;
    /**
     * Create text content
     *
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     *
     */
    updateLayout(): void;
    updateInner(): void;
    /*********************************************************************************************************************
     * POVIDES INLINE SIZING
     ********************************************************************************************************************/
    /**
     *
     * @return {number}
     */
    get inlineXAdvance(): number;
    /**
     *
     * @return {number}
     */
    get inlineWidth(): number;
    /**
     *
     * @return {number}
     */
    get inlineHeight(): number;
}
import MeshUIComponent from "./core/MeshUIComponent";
import { Vector2 } from "three/src/math/Vector2";
import FrameMaterial from "../frame/materials/FrameMaterial";
/**
 * InlineBlock has its own Inline implementation
 */
declare class InlineBlockInline extends Inline {
    /**
     *
     * @param {InlineBlock} parent
     */
    constructor(parent: InlineBlock);
    /**
     * @TODO: This currently make a circular reference that should ideally be removed
     * @type {InlineBlock}
     * @private
     */
    private _parent;
}
import Inline from "./core/Inline";
export {};
