/**
 * Wrapper of properties to fit html naming and multiple inputs : inline & computed(css)
 */
export default class StylePropertyWrapper {
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    constructor(element: MeshUIBaseElement);
    /**
     *
     * @type {MeshUIBaseElement}
     * @private
     */

    /***********************************************************************************************************************
     * INLINE GETTERS - SETTERS
     **********************************************************************************************************************/
    /** Box Properties ---------------------------------------------------------*/
    /**
     *
     * @param {"border-box"|"content-box"} value
     */
    set boxSizing(arg: "border-box" | "content-box");
    /**
     *
     * @return {"border-box"|"content-box"}
     */
    get boxSizing(): "border-box" | "content-box";
    /**
     *
     * @param {number} v
     */
    set width(arg: any);
    /**
     *
     * @return {*}
     */
    get width(): any;
    /**
     *
     * @param {number} v
     */
    set height(arg: any);
    /**
     *
     * @return {*}
     */
    get height(): any;
    /**
     *
     * @param {Vector4|Array.<number>|number|string} v
     */
    set padding(arg: Vector4);
    /**
     *
     * @return {Vector4}
     */
    get padding(): Vector4;
    /**
     *
     * @param {number} v
     */
    set paddingTop(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingTop(): number;
    /**
     *
     * @param {number} v
     */
    set paddingRight(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingRight(): number;
    /**
     *
     * @param {number} v
     */
    set paddingBottom(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingBottom(): number;
    /**
     *
     * @param {number} v
     */
    set paddingLeft(arg: number);
    /**
     *
     * @return {number}
     */
    get paddingLeft(): number;
    /**
     *
     * @param {Vector4|Array.<number>|number|string} v
     */
    set margin(arg: Vector4);
    /**
     *
     * @return {Vector4}
     */
    get margin(): Vector4;
    /**
     *
     * @param {number} v
     */
    set marginTop(arg: number);
    /**
     *
     * @return {number}
     */
    get marginTop(): number;
    /**
     *
     * @param {number} v
     */
    set marginRight(arg: number);
    /**
     *
     * @return {number}
     */
    get marginRight(): number;
    /**
     *
     * @param {number} v
     */
    set marginBottom(arg: number);
    /**
     *
     * @return {number}
     */
    get marginBottom(): number;
    /**
     *
     * @param {number} v
     */
    set marginLeft(arg: number);
    /** Display Properties -----------------------------------------------------*/
    /**
     *
     * @param {"flex"|"none"} value
     */
    set display(arg: "none" | "flex");
    /**
     *
     * @return {"flex"|"none"}
     */
    get display(): "none" | "flex";
    /**
     *
     * @param {"visible"|"hidden"} v
     */
    set overflow(arg: "hidden" | "visible");
    /**
     *
     * @return {"visible"|"hidden"}
     */
    get overflow(): "hidden" | "visible";
    /** Position Properties ----------------------------------------------------*/
    /**
     *
     * @param {"static"|"absolute"} v
     */
    set position(arg: "absolute" | "static");
    /**
     *
     * @return {"static"|"absolute"}
     */
    get position(): "absolute" | "static";
    /** Flex Properties --------------------------------------------------------*/
    /**
     *
     * @param {"column"|"column-reverse"|"row"|"row-reverse"} value
     */
    set flexDirection(arg: "column" | "row" | "row-reverse" | "column-reverse");
    /**
     *
     * @return {"column"|"column-reverse"|"row"|"row-reverse"}
     */
    get flexDirection(): "column" | "row" | "row-reverse" | "column-reverse";
    /**
     *
     * @param {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"} value
     */
    set justifyContent(arg: "center" | "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end");
    /**
     *
     * @return {"flex-start"|"center"|"flex-end"|"space-around"|"space-between"|"space-evenly"}
     */
    get justifyContent(): "center" | "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end";
    /**
     *
     * @param {"start"|"center"|"end"|"stretch"} value
     */
    set alignItems(arg: "center" | "end" | "start" | "stretch");
    /**
     *
     * @return {"start"|"center"|"end"|"stretch"}
     */
    get alignItems(): "center" | "end" | "start" | "stretch";
    /**
     *
     * @param {number} v
     */
    set order(arg: number);
    /**
     *
     * @return {number}
     */
    get order(): number;
    /** Background Properties --------------------------------------------------*/
    /**
     *
     * @param {Color|number|string} v
     */
    set backgroundColor(arg: string | number | Color);
    /**
     *
     * @return {Color|number|string}
     */
    get backgroundColor(): string | number | Color;
    set backgroundOpacity(arg: any);
    get backgroundOpacity(): any;
    /**
     *
     * @param {Texture|string} v
     */
    set backgroundImage(arg: any);
    /**
     *
     * @return {Texture|string}
     */
    get backgroundImage(): any;
    /**
     *
     * @param {"cover"|"contain"|"stretch"} v
     */
    set backgroundSize(arg: "contain" | "cover" | "stretch");
    /**
     *
     * @return {"cover"|"contain"|"stretch"}
     */
    get backgroundSize(): "contain" | "cover" | "stretch";
    /** Text Properties --------------------------------------------------------*/
    /**
     *
     * @param {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"} v
     */
    set whiteSpace(arg: "normal" | "pre" | "pre-line" | "nowrap" | "pre-wrap");
    /**
     *
     * @return {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
     */
    get whiteSpace(): "normal" | "pre" | "pre-line" | "nowrap" | "pre-wrap";
    /**
     *
     * @param {Color|number|string} v
     */
    set color(arg: string | number | Color);
    /**
     *
     * @return {Color|number|string}
     */
    get color(): string | number | Color;
    /**
     *
     * @param {number} v
     */
    set opacity(arg: number);
    /**
     *
     * @return {number}
     */
    get opacity(): number;
    /**
     *
     * @param {"normal"|"italic"} v
     */
    set fontStyle(arg: "normal" | "italic");
    /**
     *
     * @return {"normal"|"italic"}
     */
    get fontStyle(): "normal" | "italic";
    /**
     *
     * @param {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}  v
     */
    set fontWeight(arg: "bold" | "normal" | "light" | "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900);
    /**
     *
     * @return {100|200|300|400|500|600|700|800|900|"light"|"normal"|"bold"|"bolder"}
     */
    get fontWeight(): "bold" | "normal" | "light" | "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    /**
     *
     * @param {"normal"|"none"} v
     */
    set fontKerning(arg: "normal" | "none");
    /**
     *
     * @return {"normal"|"none"}
     */
    get fontKerning(): "normal" | "none";
    /**
     *
     * @param {number} v
     */
    set letterSpacing(arg: number);
    /**
     *
     * @return {number}
     */
    get letterSpacing(): number;
    /**
     *
     * @param {number} v
     */
    set lineHeight(arg: number);
    /**
     *
     * @return {number}
     */
    get lineHeight(): number;
    /**
     *
     * @param {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"} v
     */
    set textAlign(arg: "center" | "left" | "right" | "justify" | "justify-left" | "justify-right" | "justify-center");
    /**
     *
     * @return {"left"| "right"|"center"|"justify"|"justify-left"|"justify-right"|"justify-center"}
     */
    get textAlign(): "center" | "left" | "right" | "justify" | "justify-left" | "justify-right" | "justify-center";
    /** Border Properties ----------------------------------------------------------------------------------------------*/
    /**
     * Set the units of borderRadius
     * @param {string|"rem"} v
     */
    set borderRadiusUnits(arg: string);
    /**
     * Get the units of borderRadius
     * @returns {string}
     */
    get borderRadiusUnits(): string;
    /**
     *
     * @param {Vector4|Array.<Number>|Number|string} v
     */
    set borderRadius(arg: Vector4);
    /**
     *
     * @returns {Vector4}
     */
    get borderRadius(): Vector4;
    /**
     * Set the top left radius only
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderTopLeftRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderTopLeftRadius(): number;
    /**
     * Set the top right radius only
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderTopRightRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderTopRightRadius(): number;
    /**
     * Set the bottom right radius only
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderBottomRightRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderBottomRightRadius(): number;
    /**
     * Set the bottom left radius only
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderBottomLeftRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderBottomLeftRadius(): number;
    /**
     * Set the top left and top right radiuses
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderTopRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderTopRadius(): number;
    /**
     * Set the top right and bottom right radiuses
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderRightRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderRightRadius(): number;
    /**
     * Set the top left and bottom left radiuses
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderLeftRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderLeftRadius(): number;
    /**
     * Set the bottom left and bottom right radiuses
     * @param {Number} v in units of `borderRadiusUnits`
     */
    set borderBottomRadius(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderBottomRadius(): number;
    /**
     * Set the units of borderWidth
     * @param {string|"rem"} v
     */
    set borderWidthUnits(arg: string);
    /**
     * Get the units of borderWidth
     * @returns {string}
     */
    get borderWidthUnits(): string;
    /**
     *
     * @param {Vector4|Array.<Number>|Number|string} v
     */
    set borderWidth(arg: Vector4);
    /**
     *
     * @returns {Vector4}
     */
    get borderWidth(): Vector4;
    /**
     * Set the width of the top side border only
     * @param {Number} v in units of `borderWidthUnits`
     */
    set borderTopWidth(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderTopWidth(): number;
    /**
     * Set the width of the right side border only
     * @param {Number} v in units of `borderWidthUnits`
     */
    set borderRightWidth(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderRightWidth(): number;
    /**
     * Set the width of the bottom side border only
     * @param {Number} v in units of `borderWidthUnits`
     */
    set borderBottomWidth(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderBottomWidth(): number;
    /**
     * Set the width of the left side border only
     * @param {Number} v in units of `borderWidthUnits`
     */
    set borderLeftWidth(arg: number);
    /**
     *
     * @returns {number}
     */
    get borderLeftWidth(): number;
    /**
     *
     * @param {Color|Number|string} v
     */
    set borderColor(arg: Color);
    /**
     *
     * @returns {Color}
     */
    get borderColor(): Color;
    /**
     *
     * @param v
     */
    set borderOpacity(arg: any);
    /**
     *
     * @return {*}
     */
    get borderOpacity(): any;
    /**
     *
     * @param value
     */
    set computed(arg: {
        [x: string]: any;
    });
    /**
     *
     * @return {Object.<string,any>}
     */
    get computed(): {
        [x: string]: any;
    };
    dispose(): void;
}
import { Vector4 } from "three/src/math/Vector4";
import { Color } from "three/src/math/Color";
import MeshUIBaseElement from "../../../core/elements/MeshUIBaseElement";
