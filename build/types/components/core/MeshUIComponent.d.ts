/**

Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

 */
export default class MeshUIComponent extends Object3D<import("three").Event> {
    constructor(options: any);
    states: {};
    currentState: any;
    isUI: boolean;
    autoLayout: boolean;
    /**
     *
     * @type {MeshUIComponent[]}
     */
    childrenUIs: MeshUIComponent[];
    /**
     *
     * @type {MeshUIComponent[]}
     */
    childrenBoxes: MeshUIComponent[];
    /**
     *
     * @type {MeshUIComponent[]}
     */
    childrenTexts: MeshUIComponent[];
    /**
     *
     * @type {MeshUIComponent[]}
     */
    childrenInlines: MeshUIComponent[];
    /**
     * parents
     * @type {MeshUIComponent|null}
     */
    parentUI: MeshUIComponent | null;
    /**
     *
     * @type {Mesh|null}
     * @protected
     */
    protected _main: Mesh | null;
    _hooks: {};
    _onAfterUpdates: any[];
    /**
     *
     * @type {Object.<{m:string, t?:(value:any) => any}>}
     * @protected
     */
    protected _materialProperties: any;
    /**
     *
     * @type {Vector4}
     * @private
     */
    private _borderRadius;
    /**
     *
     * @type {Vector4}
     * @private
     */
    private _borderWidth;
    /**
     * @Todo: Probably only for boxComponents
     * @type {Lines}
     */
    lines: Lines;
    /**
     *
     * @type {FontVariant}
     * @protected
     */
    protected _font: FontVariant;
    getClippingPlanes(): any;
    /**
     * @TODO : This is already present in MaterialManager
     * Update a component's materials clipping planes.
     * Called every frame.
     */
    updateClippingPlanes(value: any): void;
    clippingPlanes: any;
    /** Get the highest parent of this component (the parent that has no parent on top of it) */
    getHighestParent(): any;
    /**
     * look for a property in this object, and if does not find it, find in parents or return default value
     * @private
     */
    private _getProperty;
    getFontSize(): any;
    getSegments(): any;
    getAlphaTest(): any;
    getFontKerning(): any;
    getFontStyle(): any;
    getFontWeight(): any;
    getLetterSpacing(): any;
    getFontTexture(): any;
    getFontFamily(): any;
    getBreakOn(): any;
    getWhiteSpace(): any;
    getTextAlign(): any;
    getFontColor(): any;
    getFontSupersampling(): any;
    getFontOpacity(): any;
    getFontPXRange(): any;
    getBorderRadius(): any;
    getBorderWidth(): any;
    getBorderColor(): any;
    getBorderOpacity(): any;
    /** return the first parent with a 'threeOBJ' property */
    getContainer(): any;
    /** Get the number of UI parents above this elements (0 if no parent) */
    getParentsNumber(i: any): any;
    getBackgroundOpacity(): any;
    getBackgroundColor(): any;
    getBackgroundTexture(): any;
    /**
     * @deprecated
     * @returns {string}
     */
    getAlignContent(): string;
    getAlignItems(): any;
    getContentDirection(): any;
    getJustifyContent(): any;
    getInterLine(): any;
    getOffset(): any;
    getBackgroundSize(): any;
    getHiddenOverflow(): any;
    getBestFit(): any;
    /**
     * Filters children in order to compute only one times children lists
     * @private
     */
    private _rebuildChildrenLists;
    /**
     * Try to retrieve parentUI after each structural change
     * @private
     */
    private _rebuildParentUI;
    /**
     * When the user calls component.add, it registers for updates,
     * then call THREE.Object3D.add.
     */
    /**
     *
     * @override
     * @param {...Object3D} object
     * @return {this}
     */
    override add(...args: Object3D<import("three").Event>[]): this;
    /**
     * When the user calls component.remove, it registers for updates,
     * then call THREE.Object3D.remove.
     * @override
     * @param {...Object3D} object
     * @return {this}
     */
    override remove(...args: Object3D<import("three").Event>[]): this;
    update(updateParsing: any, updateLayout: any, updateInner: any): void;
    performAfterUpdate(): void;
    /**
     *
     * @param func
     */
    set onAfterUpdate(arg: any);
    addAfterUpdate(func: any): void;
    /**
     *
     * @TODO: Adding a new hook should no be direct, but delayed before or after performing the hookLoop
     * @param {string} type
     * @param {function|Behavior} newHook
     * @param {number} priority
     */
    hook(type: string, newHook: Function | Behavior, priority?: number): void;
    /**
     *
     * @param {string} type
     * @param {function|Behavior} hookToRemove
     */
    unhook(type: string, hookToRemove: Function | Behavior): void;
    performHooks(hooks: any, alterable?: any): void;
    /**
     * Set this component's passed parameters.
     * If necessary, take special actions.
     * Update this component unless otherwise specified.
     */
    set(options: any): void;
    fontFamily: any;
    /**
     * @param {FontVariant} value
     */
    set font(arg: FontVariant);
    /**
     *
     * @returns {FontVariant}
     */
    get font(): FontVariant;
    /** Store a new state in this component, with linked attributes */
    setupState(options: any): void;
    /** Set the attributes of a stored state of this component */
    setState(state: any): void;
    /**
     * Get completely rid of this component and its children, also unregister it for updates
     * @override
     * @return {this}
     */
    override clear(): this;
    /**
     *
     * @param {Material|ShaderMaterial} material
     */
    set material(arg: any);
    /***********************************************************************************************************************
     * TO MATERIAL HOLDER
     **********************************************************************************************************************/
    get material(): any;
    _material: any;
    /**
     *
     * @param {Material|null} material
     */
    setCustomDepthMaterial(material: Material | null): void;
    /**
     * According to the list of materialProperties
     * some properties are sent to material
     * @private
     */
    private _transferToMaterial;
    /**
     *
     * @param {Vector4} vector4
     * @param {string|number|Array.<string|number>} value
     * @private
     */
    private _fourDimensionsValueSetter;
    bestFit: any;
    hiddenOverflow: any;
    offset: any;
}
import { Object3D } from "three/src/core/Object3D";
import { Mesh } from "three/src/objects/Mesh";
import Lines from "./Lines";
import FontVariant from "../../font/FontVariant";
import Behavior from "../../behaviors/Behavior";
import { Material } from "three/src/materials/Material";
