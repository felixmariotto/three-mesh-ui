export default class BoxComponent extends InlineManager {
    isBoxComponent: boolean;
    childrenPos: {};
    /** Get width of this component minus its padding */
    getInnerWidth(): any;
    /** Get height of this component minus its padding */
    getInnerHeight(): any;
    /** Return the sum of all this component's children sides + their margin */
    getChildrenSideSum(dimension: any): any;
    /** Look in parent record what is the instructed position for this component, then set its position */
    setPosFromParentRecords(): void;
    /** Position inner elements according to dimensions and layout parameters. */
    computeChildrenPosition(): void;
    /**
     * Returns the highest linear dimension among all the children of the passed component
     * MARGIN INCLUDED
     */
    getHighestChildSizeOn(direction: any): number;
    /**
     * Get width of this element
     * With padding, without margin
     */
    getWidth(): any;
    /**
     * Get height of this element
     * With padding, without margin
     */
    getHeight(): any;
}
import InlineManager from "./InlineManager";
