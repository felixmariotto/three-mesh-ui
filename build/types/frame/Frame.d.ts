/**
 * Returns a basic plane mesh.
 */
export default class Frame extends Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]> {
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    constructor(element: MeshUIBaseElement);
}
import { Mesh } from "three/src/objects/Mesh";
import MeshUIBaseElement from "../core/elements/MeshUIBaseElement";
