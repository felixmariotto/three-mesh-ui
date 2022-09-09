import HTMTextElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMTextElement';

export default class HTMButton extends HTMTextElement{

	constructor( values = {} ) {

		const value = values.value ? values.value : '';


		super( values );

		this.setAttribute('value', value);

	}

	/*********************************************************************************************************************
	 * PROVIDES AN API OVER `attributes`
	 ********************************************************************************************************************/

	/**
	 *
	 * @param {string|any} v
	 */
	set value( v ) {

		this.setAttribute('value', v );

	}

	/**
	 *
	 * @returns {string}
	 */
	get value() {

		return this.getAttribute( 'value' );

	}

	set disabled( v ) {

		if( v ) {

			this.setAttribute( 'disabled', null );
			this.activatePseudoState( 'disabled' );

		} else {

			this.removeAttribute('disabled' );
			this.deactivatePseudoState( 'disabled' )

		}

	}

	get disabled() {

		return this.hasAttribute('disabled')

	}

}
