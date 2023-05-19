export default class BaseProperty {
    /**
     *
     * @param {string} propertyId
     * @param {any} [value=null]
     * @param primitive
     */
    constructor(propertyId: string, value?: any, primitive?: boolean);
    /**
     *
     * @type {string}
     * @internal
     */

    /**
     *
     * @type {any}
     * @internal
     */

    /**
     *
     * @type {boolean}
     * @internal
     */

    /**
     *
     * @type {boolean}
     * @internal
     */

    /**
     *
     * @type {boolean}
     * @internal
     */

    /**
     *
     * @type {boolean}
     * @protected
     */

    /**
     *
     * @return {string}
     */
    get id(): string;
    /**
     *
     * @param {any} value
     */
    set value(arg: any);
    /**
     *
     * @return {any}
     */
    get value(): any;
    /**
     *
     * @param element
     * @param {Object.<string,any>} out
     */
    update(element: any, out: {
        [x: string]: any;
    }): void;
    /**
     * Output this property in a dictionnary
     * @param {Object.<string,any>} out
     */
    output(out: {
        [x: string]: any;
    }): void;
    /**
     *
     * @param {Out} out
     */

    /**
     * Execute additional process after all properties have been updated
     * @param {MeshUIBaseElement} element
     */
    process(element: MeshUIBaseElement): void;
    /**
     * Execute additional process after all properties have been updated
     * @param {MeshUIBaseElement} element
     */
    render(element: MeshUIBaseElement): void;
    /**
     *
     * @param {MeshUIBaseElement} element
     */
    getInheritedInput(element: MeshUIBaseElement): any;
    /**
     *
     * @return {any}
     */
    getDefaultValue(): any;
    /**
     *
     * @param {any} value
     * @return {boolean}
     */
    isValid(value: any): boolean;
    /**
     *
     */
    emptyStrategyLogic(): void;
    requestUpdate(): void;
    requestProcess(): void;
    requestRender(): void;
}
export type Out = any & {
    [x: string]: any;
};
import MeshUIBaseElement from "./../../core/elements/MeshUIBaseElement";
