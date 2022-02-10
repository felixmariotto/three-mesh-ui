let _Base = null;

/**
 * A function for applying multiple mixins more tersely (less verbose)
 * @param {Function[]} mixins - All args to this function should be mixins that take a class and return a class.
 */
export function mix( ...mixins ) {

	// console.log('initial Base: ', _Base);

	if( !_Base ){
		throw new Error("Cannot use mixins with Base null");
	}

	let Base = _Base;

	_Base = null;

	let i = mixins.length;
	let mixin;

	while ( --i >= 0 ) {

		mixin = mixins[ i ];
		Base = mixin( Base );

	}

	return Base;

}

mix.withBase = ( Base ) => {

	_Base = Base;

	return mix;

};
