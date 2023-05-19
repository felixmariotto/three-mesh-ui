/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]> {
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    constructor(element: MeshUIBaseElement);
    slice: any;
    sliceSize: Vector3;
    sliceScale: Vector3;
    updateScale(): void;
    slices: {
        topLeft: PlaneGeometry;
        top: PlaneGeometry;
        topRight: PlaneGeometry;
        left: PlaneGeometry;
        middle: PlaneGeometry;
        right: PlaneGeometry;
        bottomLeft: PlaneGeometry;
        bottom: PlaneGeometry;
        bottomRight: PlaneGeometry;
    };
    updateScaleSlice(): void;
}
import { Mesh } from "three/src/objects/Mesh";
import { Vector3 } from "three/src/math/Vector3";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry";
import MeshUIBaseElement from "../core/elements/MeshUIBaseElement";
