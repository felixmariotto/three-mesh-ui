export default class CSSCondition {
    /**
     *
     * @param {string} type
     * @param {string|null} [value=null]
     */
    constructor(type: string, value?: string | null);
    /**
     *
     * @type {string}
     * @private
     */
    private _type;
    /**
     *
     * @type {string|null}
     * @private
     */
    private _value;
    /**
     *
     * @returns {string}
     */
    get type(): string;
    /**
     *
     * @returns {string}
     */
    get value(): string;
}
