import InheritableProperty from './InheritableProperty';
import { alphaTestTransformer } from '../../utils/mediator/transformers/MaterialTransformers';

/**
 * @property {Material|null|"inherit"} value
 */
export default class InheritableMaterialProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId ) {

		super( propertyId, 'inherit', false );

		/**
		 *
		 * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
		 * @internal
		 */
		this._mediation = {};

		/**
		 *
		 * @type {null}
		 * @internal
		 */
		this._defaultMaterial = null;

	}

	update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if ( this._notInheritedValue === 'inherit' ) {
			this._notInheritedValue = this.getInheritedInput( element );
		} else {
			this.propagate( element );
		}

		// no material
		if ( !this._notInheritedValue ) {

			// reset mediation
			this._mediation = {};

		} else if ( this._notInheritedValue.constructor.mediation ) {

			this._mediation = { ...this._notInheritedValue.constructor.mediation };

		} else {

			this._mediation = {
				clippingPlanes: { m: 'clippingPlanes' },
				fontAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
				fontSide: { m: 'side' },
				color: { m: 'color' },
				fontOpacity: { m: 'opacity' }
			};

		}

		element._transferToFontMaterial();

		// dispatch to children


		this._outputValue( out );

	}

	/**
	 * @override
	 */
	getInheritedInput( element ) {

		if ( this._value !== 'inherit' ) return this._value;

		let recursiveParent = element;
		let inheritedValue = null;
		while ( recursiveParent._parent._value ) {

			recursiveParent = recursiveParent._parent._value;
			if ( recursiveParent[ `_${this._id}` ]._value !== 'inherit' ) {

				inheritedValue = recursiveParent[ `_${this._id}` ]._value;
				break;
			}

		}

		if ( inheritedValue !== null ) {
			return inheritedValue;
		}

		return this.getDefaultValue();

	}

	getDefaultValue() {
		return this._defaultMaterial;
	}


}
