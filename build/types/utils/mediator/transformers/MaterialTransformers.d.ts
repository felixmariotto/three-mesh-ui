/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
export const alphaTestTransformer: import('../Mediator').MediationTransformer;
/**
 * Transform a value as a preprocessor trigger
 * @type {import('../Mediator').MediationTransformer}
 */
export const toPreprocessorTriggerTransformer: import('../Mediator').MediationTransformer;
/**
 * Transform a value as a preprocessor value
 * @type {import('../Mediator').MediationTransformer}
 */
export const asPreprocessorValueTransformer: import('../Mediator').MediationTransformer;
/**
 * Transform a value as a uniform or userData value
 * Non primitive values are bounds
 * @type {import('../Mediator').MediationTransformer}
 */
export const uniformOrUserDataTransformer: import('../Mediator').MediationTransformer;
export function toUserDataTransformer(material: any, property: any, value: any): void;
