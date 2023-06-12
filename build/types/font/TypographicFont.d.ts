export default class TypographicFont {
    /** @protected */ protected _size: number;
    /** @protected */ protected _lineHeight: number;
    /** @protected */ protected _lineBase: number;
    /** @protected */ protected _name: string;
    /** @protected */ protected _charset: string;
    /**
     *
     * @returns {number}
     */
    get size(): number;
    /**
     *
     * @returns {number}
     */
    get lineHeight(): number;
    /**
     *
     * @returns {number}
     */
    get lineBase(): number;
    /**
     *
     * @returns {string}
     */
    get name(): string;
    /**
     *
     * @returns {string}
     */
    get charset(): string;
}
