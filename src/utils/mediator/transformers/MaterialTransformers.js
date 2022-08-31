
/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
export const alphaTestTransformer = function ( target, targetProperty, value) {

	// set the value in the material
	target.alphaTest = value;

	toPreprocessorTriggerTransformer(target, 'USE_ALPHATEST', value > 0 );

}

/**
 * Transform a value as a preprocessor trigger
 * @type {import('../Mediator').MediationTransformer}
 */
export const toPreprocessorTriggerTransformer = function ( target, targetProperty, value) {

	if( !target.defines ) return;

	if ( value ) {

		if( target.defines[targetProperty] === undefined ) {

			target.defines[targetProperty] = '';
			target.needsUpdate = true;

		}

	} else if( target.defines[targetProperty] !== undefined ) {

		delete target.defines[targetProperty];
		target.needsUpdate = true;

	}

}

/**
 * Transform a value as a preprocessor value
 * @type {import('../Mediator').MediationTransformer}
 */
export const asPreprocessorValueTransformer = function ( target, targetProperty, value) {

	// abort if nothing to update, same value
	if( target.defines[targetProperty] && target.defines[targetProperty] === value ) return;

	// or change the preprocessor and update
	target.defines[targetProperty] = value;
	target.needsUpdate = true;

}

/**
 * Transform a value as a uniform or userData value
 * Non primitive values are bounds
 * @type {import('../Mediator').MediationTransformer}
 */
export const uniformOrUserDataTransformer = function( material, property, value ) {

	if( material.userData[property] ) {

		material.userData[property].value = value;

	}else{

		material.uniforms[property].value = value;

	}

}

export const toUserDataTransformer = function( material, property, value ) {

	material.userData[property].value = value;

}
