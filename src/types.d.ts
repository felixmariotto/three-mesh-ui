import type {Color, Object3D, BufferGeometry, EventDispatcher, Texture} from "three";

export type BlockOptions = {
    width: number;
    height: number;
    padding?: number;
    fontFamily?: string;
    fontTexture?: string;
    backgroundColor?: Color;
    backgroundOpacity?: number;
    borderRadius?: number | [topLeft: number, topRight: number, bottomRight: number, bottomLeft: number];
    // @todo add missing properties
    [property: string]: any;
}

export declare class Block extends Object3D {
    constructor(options: BlockOptions);
}

export type TextOptions = {
    // @todo add missing properties
    [property: string]: any;
}

export declare class Text extends Object3D {
    constructor(options: TextOptions);
}

export type InlineBlockOptions = {
    // @todo add missing properties
    [property: string]: any;
}

export declare class InlineBlock extends Object3D {
    constructor(options: InlineBlockOptions);
}

export type KeyboardOptions = {
    // @todo add missing properties
    [property: string]: any;
}

export declare class Keyboard extends Object3D {
    constructor(options: KeyboardOptions);
}

// @TODO: To be evaluated by typescripters ---------------------------------
// export declare abstract class FontVariant {
// 	private _isReady:boolean;
// 	public isReady:boolean;
// 	private _weight:string;
// 	public weight:string;
// 	private _style:string;
// 	public style:string;
// 	private _size:number;
// 	public size:number;
// 	private _lineHeight:number;
// 	public lineHeight:number;
// 	private _lineBase:number;
// 	public lineBase:number;
// 	private _font:TypographyFont;
// 	public font:TypographyFont;
// 	protected constructor(weight: string, style: string);
// 	getCharacterDescription(character:string):TypographyCharacter
// 	abstract getCharacterGeometry( inline:InlineCharacter): BufferGeometry
// 	getKerningAmount(pairs):number;
// 	private _checkReadiness():boolean;
// 	protected abstract _readyCondition ():boolean
//  adjustCharactersDescription(adjustmentObject:any):void
// }
//
// export declare class TypographyFont {
//
// 	private _size:number;
// 	public size:number;
// 	private _lineHeight:number;
// 	public lineHeight:number;
// 	private _lineBase:number;
// 	public lineBase:number;
// 	private _name:number;
// 	public name:number;
//
// }
//
// export declare abstract class TypographyCharacter {
//
// 	protected constructor( typographicFont:TypographyFont );
// 	protected _char:string;
// 	public char:string;
// 	protected _width:number
// 	public width:number
// 	protected _heigth:number
// 	public heigth:number
// 	protected _xadvance:number;
// 	public xadvance:number;
// 	protected _xoffset:number;
// 	public xoffset:number;
// 	protected _yoffset:number;
// 	public yoffset:number;
// 	protected _font:TypographyFont;
// 	public font:TypographyFont;
// 	public abstract asCharacterInline():InlineCharacter
// }
//
// export declare abstract class InlineCharacter {
//
// 	protected _typographic:TypographyCharacter;
// 	protected _fontFactor:number;
// 	protected _lineBreak:string|null;
// 	public lineBreak:string|null;
// 	protected _fontSize:number;
// 	public fontSize:number;
// 	protected _kerning:number;
// 	public kerning:number;
// 	protected _offsetX:number;
// 	public offsetX:number;
// 	protected _offsetY:number;
// 	public offsetY:number;
//
// 	protected constructor( characterDesc:TypographyCharacter );
//
// 	get typographic():TypographyCharacter
// 	resetOffsets():void
// 	get xadvance():number
// 	get xoffset():number
// 	get yoffset():number
//
// 	get width():number
//
// 	get height():number
//
// 	get char():string
//
// 	get anchor():number;
//
// 	get lineHeight():number
//
// 	get lineBase():number
//
// 	set fontFactor( value:number )
//
// }
//
// export declare class FontFamily extends EventDispatcher {
//
// 	private _name:string;
// 	private _variants:FontVariant[];
// 	private _isReady:boolean;
//
// 	constructor( name:string );
//
// 	get isReady():boolean
//
// 	addVariant( weight:string, style:string, json:Object|string, texture:Texture|string, override:boolean):FontFamily
// 	addCustomImplementationVariant( variantImplementation:FontVariant, override:boolean):FontFamily
// 	getVariant( weight:string, style:string ):FontVariant
// 	get name():string;
// 	private _checkReadiness():boolean;
//
// }
//
//
// export declare namespace FontLibrary {
// 	export function addFontFamily(fontFamilyName:string);
// 	export function getFontFamily(fontFamilyName:string);
// 	export function load(fontFamily:FontFamily, ...args:FontFamily[]):Promise<unknown>;
// 	export function setMissingCharacterHandler(fontVariant:FontVariant, character:string):string|null;
// 	export function missingCharacter(handler:(fontVariant:FontVariant, character:string) => string|null);
// }
// ----------------------------           End of evaluation

export declare namespace FontLibrary {
	export function addFontFamily(fontFamilyName:string);
	export function getFontFamily(fontFamilyName:string);
	export function load(fontFamily:any, ...args:any[]):Promise<unknown>;
	export function setMissingCharacterHandler(fontVariant:any, character:string):string|null;
	export function missingCharacter(handler:(fontVariant:any, character:string) => string|null);
}

export declare function update(): void;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            block: any
            text: any
        }
    }
}
