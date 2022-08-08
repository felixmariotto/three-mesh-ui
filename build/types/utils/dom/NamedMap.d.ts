export default class NamedMap {
    /**
     *
     * @param callback
     * @param entries
     */
    constructor(callback: any, entries?: {});
    _callback: any;
    _map: Map<any, any>;
    clear(): void;
    /**
     *
     * @param {string} name
     * @param {string|null} [value=null]
     */
    set(name: string, value?: string | null): void;
    /**
     *
     * @param name
     * @returns {string}
     */
    get(name: any): string;
    /**
     *
     * @param name
     * @return {boolean}
     */
    remove(name: any): boolean;
    /**
     *
     * @param name
     * @returns {boolean}
     */
    has(name: any): boolean;
    /**
     *
     * @returns {string}
     */
    toString(): string;
    match: (attributeCondition: any) => any;
    matchEvery: (attributeConditions: any) => any;
    /**
     *
     */
    dispose(): void;
}
