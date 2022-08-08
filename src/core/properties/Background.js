import BaseProperty from './BaseProperty';

export default class Background extends BaseProperty {

	constructor() {

		super( 'background' );

	}


	update( vrElement, out ) {



	}

	/**
	 *
	 * @param {ElementVR} vrElement
	 * @return {Lines}
	 */
	process( vrElement ) {

		// this.size.set( WIDTH, HEIGHT ); ??

		vrElement._main.scale.set( vrElement.offsetWidth, vrElement.offsetHeight, 1 );

	}

}
