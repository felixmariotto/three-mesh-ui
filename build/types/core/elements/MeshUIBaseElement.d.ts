export default class MeshUIBaseElement extends Object3D<import("three").Event> {
    /**
     *
     * @param {Properties} properties
     * @param {Options} values
     */
    constructor(properties: Properties, values: Options);
    /**
     *
     * @type {Mesh|null}
     * @internal
     */

    /**
     *
     * @type {Material}
     * @internal
     */

    /**
     *
     * @type {Material}
     * @protected
     */

    /**
     *
     * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
     * @protected
     */

    /**
     *
     * @type {Object.<{m:string, t?:(value:any) => any}>}
     * @private
     */

    /**
     *
     * @type {Mesh|null}
     * @internal
     */

    /**
     *
     * @type {InheritableMaterialProperty}
     * @internal
     */

    /**
     *
     * @type {InheritableMaterialProperty}
     * @private
     */

    /**
     *
     * @type {Object.<{m:string, t?:(value:any) => any}>}
     * @private
     */

    /**
     *
     * @type {EmptyProperty|ChildrenBox|ChildrenText}
     * @internal
     */













    /**
     *
     * @type {BoundsBox|BoundsText|EmptyProperty}
     * @ignore
     * @internal
     */





    /**
     *
     * @type {FlexDirectionProperty}
     * @internal
     */




























    /**
     *
     * @type {TextContentEmpty|TextContentText|TextContentInline}
     * @internal
     */

    /**
     *
     * @type {GlyphsProperty}
     * @internal
     */


    /**
     *
     * @type {BoxLayouter|TextLayouter|EmptyProperty}
     * @internal
     */








    /**
     *
     * @type {Array.<BaseProperty>}
     * @internal
     */

    /**
     *
     * @type {*[]}
     * @private
     */

    update(): void;
    process(): void;
    render(): void;
    /**
     *
     * @param {Options} options
     */
    set(options: Options): void;
    get(property: any): any;
    /**
     * Filters children in order to compute only one times children lists
     * @private
     */

    /**
     * Try to retrieve parentUI after each structural change
     * @protected
     */

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
    /**
     *
     * @return {string}
     */
    get textContent(): string;
    /**
     *
     * @param {Material|ShaderMaterial} material
     */
    set backgroundMaterial(arg: Material | ShaderMaterial);
    /***********************************************************************************************************************
     * TO MATERIAL HOLDER
     **********************************************************************************************************************/
    /**
     *
     * @returns {Material|ShaderMaterial}
     */
    get backgroundMaterial(): Material | ShaderMaterial;
    /**
     *
     * @param {Material|null} material
     */
    set backgroundCustomDepthMaterial(arg: Material);
    /**
     *
     * @returns {Material|null}
     */
    get backgroundCustomDepthMaterial(): Material;
    /**
     * According to the list of materialProperties
     * some properties are sent to material
     * @param {Object} [options=null]
     * @private
     */

    /**
     *
     * @param {number} value
     */
    set backgroundSide(arg: number);
    /**
     *
     * @return {number}
     */
    get backgroundSide(): number;
    /**
     *
     * @param {number} value
     */
    set backgroundAlphaTest(arg: number);
    /**
     *
     * @return {number}
     */
    get backgroundAlphaTest(): number;
    /**
     *
     * @param {Material|ShaderMaterial} material
     */
    set fontMaterial(arg: Material | ShaderMaterial);
    /** Font Material ----------------------------------------------------------*/
    /**
     *
     * @returns {Material|ShaderMaterial}
     */
    get fontMaterial(): Material | ShaderMaterial;
    /**
     *
     * @param {Material|null} material
     */
    set fontCustomDepthMaterial(arg: Material);
    /**
     *
     * @returns {Material|null}
     */
    get fontCustomDepthMaterial(): Material;
    /**
     * According to the list of materialProperties
     * some properties are sent to material
     * @param {Object} [options=null]
     * @private
     */

    /**
     *
     * @param {number} value
     */
    set fontSide(arg: number);
    /**
     *
     * @return {number}
     */
    get fontSide(): number;
    /**
     *
     * @param {number} value
     */
    set fontAlphaTest(arg: number);
    /**
     *
     * @return {number}
     */
    get fontAlphaTest(): number;
    /*********************************************************************************************************************
     * MESH MEDIATION
     ********************************************************************************************************************/
    /**
     * According to the list of meshProperties
     * some properties are sent to mesh
     * @param {Object} [options=null]
     * @private
     */

    /**
     * @internal
     * @param {Mesh|Array.<Mesh>|null} mesh
     */
    setBackgroundMesh(mesh: Mesh | Array<Mesh> | null): void;
    /**
     *
     */
    bindBackgroundMeshProperties(): void;
    /**
     *
     */
    unbindBackgroundMeshProperties(): void;
    activatePseudoState(state: any): void;
    deactivatePseudoState(state: any): void;
    togglePseudoState(state: any): void;
    hasPseudoState(state: any): boolean;
    set borderRadiusMediation(arg: any);
    /**
     *
     * @param {boolean} value
     */
    set backgroundCastShadow(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get backgroundCastShadow(): boolean;
    /**
     *
     * @param {boolean} value
     */
    set backgroundReceiveShadow(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get backgroundReceiveShadow(): boolean;
    /** Font Mesh --------------------------------------------------------------*/
    /**
     * According to the list of meshProperties
     * some properties are sent to mesh
     * @param {Object} [options=null]
     * @private
     */

    /**
     * @internal
     * @param {Mesh|Array.<Mesh>|null} mesh
     */
    setFontMesh(mesh: Mesh | Array<Mesh> | null): void;
    /**
     *
     */
    bindFontMeshProperties(): void;
    /**
     *
     */
    unbindFontMeshProperties(): void;
    /**
     *
     * @param {boolean} value
     */
    set fontCastShadow(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get fontCastShadow(): boolean;
    /**
     *
     * @param {boolean} value
     */
    set fontReceiveShadow(arg: boolean);
    /**
     *
     * @return {boolean}
     */
    get fontReceiveShadow(): boolean;
    /***********************************************************************************************************************
     * GEOMETRY
     **********************************************************************************************************************/
    /**
     *
     * @param {Number} v
     */
    set segments(arg: number);
    /**
     *
     * @return {number}
     */
    get segments(): number;
    /***********************************************************************************************************************
     * HOOKS & ALTERS
     **********************************************************************************************************************/
    /**
     *
     * @param {Function} func
     */
    set onAfterUpdate(arg: Function);
    /**
     *
     * @param {Function} func
     */
    addAfterUpdate(func: Function): void;
    /**
     *
     * @param {Function} func
     */
    removeAfterUpdate(func: Function): void;
    /**
     * @todo: afterUpdate not called anymore
     */
    performAfterUpdate(): void;
    /**
     * Retrieve a property
     * @param propertyName
     * @return {BaseProperty|null}
     */
    getProperty(propertyName: any): BaseProperty | null;
    /**
     *
     * @param {string} name
     * @param {BaseProperty} instance
     * @returns {void}
     */
    appendProperty(name: string, instance: BaseProperty): void;
    /**
     *
     * @param {string} name
     * @param {BaseProperty} instance
     * @returns {BaseProperty}
     */
    replaceProperty(name: string, instance: BaseProperty): BaseProperty;
}
export type Properties = {
    [x: string]: Function;
};
export type Options = DocumentedOptions & {
    [x: string]: any;
};
export type DocumentedOptions = {
    name?: string;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    justifyContent?: "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly";
    alignItems?: "start" | "center" | "end" | "stretch";
    overflow?: "visible" | "hidden";
    fontKerning?: "normal" | "none";
    segments?: number;
    fontFamily?: FontFamily | string;
    fontStyle?: "normal" | "italic";
    fontWeight?: "light" | "normal" | "bold" | "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    /**
     * The font color
     */
    color?: Color | number | string;
    /**
     * The background color
     */
    backgroundColor?: Color | number | string;
    backgroundOpacity?: number;
    backgroundSize?: "cover" | "contain" | "stretch";
    backgroundImage?: Texture | string;
    borderColor?: Color | number | string;
    borderOpacity?: number;
    borderRadius?: Vector4 | Array<number> | number | string;
    borderWidth?: Vector4 | Array<number> | number | string;
    boxSizing?: "content-box" | "border-box";
    width?: number | string | "100%" | "auto";
    height?: number | string | "100%" | "auto";
    padding?: Vector4 | Array<number> | number | string;
    margin?: Vector4 | Array<number> | number | string;
    textAlign?: "left" | "right" | "center" | "justify" | "justify-left" | "justify-right";
    visible?: boolean;
    letterSpacing?: number;
    whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
    fontTexture?: Texture | string;
};
export type FontWeightFormat = "light" | "normal" | "bold" | "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
import { Object3D } from "three/src/core/Object3D";
import { Mesh } from "three/src/objects/Mesh";
import { Material } from "three/src/materials/Material";
import InheritableMaterialProperty from "../properties/InheritableMaterialProperty";
import EmptyProperty from "../properties/EmptyProperty";
import ParentProperty from "../properties/hierarchy/ParentProperty";
import SideProperty from "../properties/SideProperty";
import NumberProperty from "../properties/NumberProperty";
import VisibleProperty from "../properties/VisibleProperty";
import InheritableBooleanProperty from "../properties/InheritableBooleanProperty";
import RenderOrderProperty from "../properties/RenderOrderProperty";
import OrderProperty from "../properties/style-properties/flex/OrderProperty";
import PaddingProperty from "../properties/style-properties/bounds/PaddingProperty";
import MarginProperty from "../properties/style-properties/bounds/MarginProperty";
import PositionProperty from "../properties/style-properties/PositionProperty";
import FlexDirectionProperty from "../properties/style-properties/flex/FlexDirectionProperty";
import Display from "../properties/style-properties/visibility/Display";
import BoxSizing from "../properties/style-properties/bounds/BoxSizing";
import WidthProperty from "../properties/style-properties/bounds/WidthProperty";
import HeightProperty from "../properties/style-properties/bounds/HeightProperty";
import StyleFactorProperty from "../properties/style-properties/StyleFactorProperty";
import BackgroundImage from "../properties/style-properties/background/BackgroundImage";
import BackgroundSize from "../properties/style-properties/background/BackgroundSize";
import Overflow from "../properties/style-properties/visibility/Overflow";
import BorderRadius from "../properties/style-properties/border/BorderRadius";
import BorderWidth from "../properties/style-properties/border/BorderWidth";
import StyleColorProperty from "../properties/style-properties/StyleColorProperty";
import FontProperty from "../properties/FontProperty";
import TextContentEmpty from "../properties/TextContentEmpty";
import InlineJustificator from "../properties/InlineJustificator";
import OffsetProperty from "../properties/OffsetProperty";
import InvertAlphaProperty from "../properties/InvertAlphaProperty";
import BaseProperty from "./../properties/BaseProperty";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import FontFamily from "../../font/FontFamily";
import { Color } from "three/src/math/Color";
import { Texture } from "three/src/textures/Texture";
import { Vector4 } from "three/src/math/Vector4";
