export default class Behavior {
    /**
     *
     * @param {MeshUIComponent} subject
     */
    constructor(subject: MeshUIComponent);
    /**
     *
     * @type {MeshUIComponent}
     * @protected
     */
    protected _subject: MeshUIComponent;
    /**
     * @abstract
     */
    attach(): void;
    /**
     * @abstract
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
