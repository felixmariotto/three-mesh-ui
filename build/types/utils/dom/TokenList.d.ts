/**
 *
 */
export default class TokenList {
    /**
     *
     * @param {function} callback
     * @param {...string} tokens
     */
    constructor(callback: Function, ...tokens: string[]);
    _callback: Function;
    _tokens: string[];
    clear(): void;
    /**
     * Check if a token isset on this list
     * @param {string} token
     * @returns {boolean}
     */
    contains: (token: string) => boolean;
    /**
     * Check if all provided tokens isset on this list
     * @param {...string} tokens
     * @returns {boolean}
     */
    containsAll: (...tokens: string[]) => boolean;
    /**
     *
     * @param {Array.<string>}tokens
     * @returns {*}
     */
    containsEvery: (tokens: Array<string>) => any;
    /**
     * Adds or remove a token according of its current presence
     * @param {string} token
     */
    toggle(token: string): void;
    /**
     * Add tokens
     * @param {...string} tokens
     */
    add(...tokens: string[]): void;
    /**
     * remove tokens
     * @param {...string} tokens
     */
    remove(...tokens: string[]): void;
    /**
     * Convert a token list to a string
     * @param {string} delimiter
     * @returns {string}
     */
    toString(delimiter: string): string;
    /**
     * Clean any recommended values
     */
    dispose(): void;
}
