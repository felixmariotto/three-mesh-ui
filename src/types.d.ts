import type {Mesh, Object3D} from "three";

declare class Frame extends Mesh {
    //
}

declare class Block extends Object3D {
    // @todo
    width: number;
    height: number;
    backgroundOpacity?: number;
    justifyContent?: string;
}

declare type Text = {
    // @todo
}
declare type InlineBlock = {
    // @todo
}
declare type Keyboard = {
    // @todo
}
declare type FontLibrary = {
    // @todo
}

declare type update = () => void

declare type ThreeMeshUI = {
    Block: Block,
    Text: Text,
    InlineBlock: InlineBlock,
    Keyboard: Keyboard,
    FontLibrary: FontLibrary,
    update: update,
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            block: any
            text: any
        }
    }
}
