import type { Color, Object3D, Texture } from "three"

export type BlockOptions = {
    width: number;
    height: number;
		margin?: number;
    padding?: number;
    fontFamily?: string;
		fontSize?: number;
    fontTexture?: string;
    backgroundColor?: Color;
    backgroundOpacity?: number;
		backgroundTexture?: Texture;
		backgroundSize?: 'stretch'|'contain'|'cover';
		borderColor?: Color;
    borderRadius?: number | [topLeft: number, topRight: number, bottomRight: number, bottomLeft: number];
		borderWidth?: number;
		contentDirection?: 'row'|'row-reverse'|'column'|'column-reverse';
		justifyContent?: 'start'|'end'|'center'|'space-between'|'space-around'|'space-evenly';
		alignItems?: 'start'| 'end'| 'center'| 'stretch';
		interLine?: number;
		hiddenOverflow?: boolean;
		offset?: number;
		bestFit?: 'none'|'shrink'| 'grow'| 'auto';
}

export declare class Block extends Object3D {
    constructor(options: BlockOptions);
}

export type TextOptions = {
		content: string
		fontColor?: Color
		fontKerning?: 'none'|'normal'
		fontOpacity?: number
		fontSuperSampling?: boolean
		textAlign?: 'left'|'center'|'right'|'justify'|'justify-left'|'justify-center'|'justify-right'
		offset?: number
		whiteSpace?: 'normal'|'pre-line'|'pre-wrap'|'pre'|'nowrap'
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

export declare namespace FontLibrary {
    export function setFontFamily(): void;

    export function setFontTexture(): void;

    export function getFontOf(): void;

    // @todo fix type
    export function addFont(...args: any[]): any;
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
