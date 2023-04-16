/**
 * An option function to transform value from subject to target
 * @typedef {(target:any, targetProperty:string, value:any) => void} MediationTransformer
 *
 */
/**
 * @typedef {Object.<{subjectProperty:string, trans?:MediationTransformer}>} MediationDefinition
 *
 */
export default class Mediator {
    /***********************************************************************************************************************
     * STATIC
     **********************************************************************************************************************/
    /**
     *
     * @param {MeshUIComponent} subject
     * @param {any} target
     * @param {Object.<(string|number), any>} options
     * @param {Object.<{subjectProperty:string, t?:(target:any, targetProperty:string, value:any) => void}>} mediationDefinitions
     * @param {any} [secondTarget=null]
     */
    static mediate(subject: MeshUIComponent, target: any, options: any, mediationDefinitions: any, secondTarget?: any): void;
    /**
     * @constructor
     * @param {MediationDefinition} definition
     */
    constructor(definition: MediationDefinition);
    /**
     *
     * @type {MediationDefinition}
     * @private
     */

    /**
     *
     * @param {MediationDefinition} value
     */
    set definition(arg: any);
    /**
     *
     * @param {MeshUIBaseElement} subject
     * @param {any} target
     * @param {Object.<(string|number), any>} options
     * @param {any} [secondTarget=null]
     */
    mediate(subject: MeshUIBaseElement, target: any, options: any, secondTarget?: any): void;
}
/**
 * An option function to transform value from subject to target
 */
export type MediationTransformer = (target: any, targetProperty: string, value: any) => void;
export type MediationDefinition = any;
import MeshUIBaseElement from "../../core/elements/MeshUIBaseElement";
