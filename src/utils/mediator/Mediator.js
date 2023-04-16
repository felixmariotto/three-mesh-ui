import { directTransfer } from './transformers/CommonTransformers';

//JSDoc related imports
/* eslint-disable no-unused-vars */
import MeshUIBaseElement from '../../core/elements/MeshUIBaseElement';
/* eslint-enable no-unused-vars */
/**
 * An option function to transform value from subject to target
 * @typedef {(target:any, targetProperty:string, value:any) => void} MediationTransformer
 *
 */

/**
 * @typedef {Object.<{subjectProperty:string, trans?:MediationTransformer}>} MediationDefinition
 *
 */

export default class Mediator{

	/**
	 * @constructor
	 * @param {MediationDefinition} definition
	 */
	constructor( definition ) {

		/**
		 *
		 * @type {MediationDefinition}
		 * @private
		 */
		this._definition = definition;

	}

	/**
	 *
	 * @param {MediationDefinition} value
	 */
	set definition( value ) {

		this._definition = value;

	}


	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 * @param {any} target
	 * @param {Object.<(string|number), any>} options
	 * @param {any} [secondTarget=null]
	 */
	mediate( subject, target, options, secondTarget = null ) {

		// Mediate each subject properties to material
		for ( const subjectProperty in this._definition ) {
			const mediationDefinition = this._definition[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = mediationDefinition.t ? mediationDefinition.t : directTransfer;
				mediationTransformer( target, mediationDefinition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, mediationDefinition.m, options[subjectProperty] );

				}

			}

		}

	}


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
	static mediate( subject, target, options, mediationDefinitions, secondTarget = null ) {

		// Cannot mediate if target not defined
		if( !target ) return;

		// Mediate each subject properties to material
		for ( const subjectProperty in mediationDefinitions ) {
			const definition = mediationDefinitions[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = definition.t ? definition.t : directTransfer;
				mediationTransformer( target, definition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, definition.m, options[subjectProperty] );

				}

			}

		}

	}


}
