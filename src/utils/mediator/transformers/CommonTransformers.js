/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
export const directTransfer = function ( target, targetProperty, value ) {

	target[targetProperty] = value;

}

export const directTransferNotNull = function( target, targetProperty, value ) {

	if( value === null ) return;

	target[targetProperty] = value;

}
