export default class InlineManager extends MeshUIComponent {
    /** Compute children .inlines objects position, according to their pre-computed dimensions */
    computeInlinesPosition(): void;
    /**
     * computes lines based on children's inlines array.
     * @private
     */
    private computeLines;
    calculateHeight(fontMultiplier: any): number;
}
import MeshUIComponent from "./MeshUIComponent";
