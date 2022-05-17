/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes
 */
export default class Block extends BoxComponent {
    isBlock: boolean;
    size: Vector2;
    _material: FrameMaterial;
    get frame(): Frame;
    parseParams(): void;
    updateLayout(): void;
    updateInner(): void;
}
import BoxComponent from "./core/BoxComponent.js";
import { Vector2 } from "three/src/math/Vector2";
import FrameMaterial from "../frame/materials/FrameMaterial";
import Frame from "../frame/Frame.js";
