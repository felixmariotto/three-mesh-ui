export default class Behavior {
    _subject: any;
    setSubject(subject: any): Behavior;
    /**
     *
     * @returns {Behavior}
     */
    attach(): Behavior;
    /**
     * @param {any|null} [alterable=null]
     * @abstract
     */
    act(alterable?: any | null): void;
    /**
     *
     * @returns {Behavior}
     */
    detach(): Behavior;
    /**
     *
     */
    dispose(): void;
    /**
     *
     */
    clear(): void;
}
