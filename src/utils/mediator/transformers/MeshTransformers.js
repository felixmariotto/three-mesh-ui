export const renderOrderTransformer = function ( target, targetProperty, value ) {

	/**
	 * Propagate the render order to each child
	 */
	target.traverse( ( child ) => {

		child.renderOrder = value;

	} );

}

export const layer = function ( target, targetProperty, value ) {

	/**
	 * Propagate the layer to each child
	 */
	target.parent.traverse( ( child ) => {

		child.layers.set( value );

	} );

}
