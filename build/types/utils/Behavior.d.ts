export default class Behavior {
    /**
     *
     * @param {MeshUIBaseElement} subject
     */
    constructor(subject: MeshUIBaseElement);
    /**
     *
     * @type {MeshUIBaseElement}
     * @protected
     */

    /**
     * @abstract
     */
    attach(): void;
    /**
     * @abstract
     * @returns {void}
     */
    act(): void;
    /**
     * @abstract
     */
    detach(): void;
    /**
     *
     */
    clear(): void;
}
import MeshUIBaseElement from "../core/elements/MeshUIBaseElement";
