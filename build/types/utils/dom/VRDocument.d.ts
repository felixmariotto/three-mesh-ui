/**
 * When an element has changed its identity
 * 		- ID
 * 		- ClassList
 * 		- Attributes & values
 *
 * Try to apply any css rules to it and its children
 * @param {MeshUIComponent} element
 */
export function elementChangeIdentity(element: MeshUIComponent): void;
export function computeStyle(element: any): void;
export function _applyRules(): void;
/**
 * WIP
 * @deprecated until achieved
 * @param {boolean} [listenForChanges=false]
 */
export function loadSheets(listenForChanges?: boolean): void;
/**
 * Add a MeshUIComponent has being a root, not having MeshUIComponent parent
 * @param {MeshUIComponent} block
 */
export function addRoot(block: MeshUIComponent): void;
/**
 * Remove a MeshUIComponent has being a root
 * @param block
 */
export function removeRoot(block: any): void;
/**
 * querySelectorAll is an entrypoint, logic are deviate to internal _querySelectorAll
 * @param {string|CSSQuery} query
 * @param {MeshUIComponent|Array.<MeshUIComponent>} [context]
 * @return {Array.<MeshUIComponent>}
 */
export function querySelectorAll(query: string | CSSQuery, context?: MeshUIComponent | Array<MeshUIComponent>): Array<MeshUIComponent>;
import CSSQuery from "./css/CSSQuery";
