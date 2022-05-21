export default class InlineManager extends MeshUIComponent {
    constructor(options: any);
    /** Compute children .inlines objects position, according to their pre-computed dimensions */
    computeInlinesPosition(): void;
    /**
     * computes lines based on children's inlines array.
     * @private
     */
    private computeLines;
}
import MeshUIComponent from "./MeshUIComponent";
