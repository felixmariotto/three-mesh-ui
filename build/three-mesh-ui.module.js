import * as __WEBPACK_EXTERNAL_MODULE_three__ from "three";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "w8": () => (/* reexport */ BaseProperty),
  "cg": () => (/* reexport */ Behavior),
  "gO": () => (/* reexport */ BlockElement),
  "wb": () => (/* reexport */ DefaultValues_namespaceObject),
  "zV": () => (/* reexport */ font_FontLibrary),
  "HS": () => (/* reexport */ font_FontVariant),
  "Ec": () => (/* reexport */ InheritableProperty),
  "gF": () => (/* reexport */ InlineElement),
  "ol": () => (/* reexport */ InlineBlockElement),
  "pz": () => (/* reexport */ InlineGlyph),
  "tx": () => (/* reexport */ MSDFFontMaterialUtils),
  "hj": () => (/* reexport */ MaterialTransformers_namespaceObject),
  "FV": () => (/* reexport */ MeshUIBaseElement),
  "sV": () => (/* reexport */ ShaderChunkUI),
  "xv": () => (/* reexport */ TextElement),
  "mx": () => (/* reexport */ TypographicFont),
  "gE": () => (/* reexport */ TypographicGlyph),
  "ZP": () => (/* binding */ three_mesh_ui),
  "Vx": () => (/* binding */ update)
});

// NAMESPACE OBJECT: ./src/core/DefaultValues.js
var DefaultValues_namespaceObject = {};
__webpack_require__.r(DefaultValues_namespaceObject);
__webpack_require__.d(DefaultValues_namespaceObject, {
  "get": () => (get),
  "set": () => (set)
});

// NAMESPACE OBJECT: ./src/utils/mediator/transformers/MaterialTransformers.js
var MaterialTransformers_namespaceObject = {};
__webpack_require__.r(MaterialTransformers_namespaceObject);
__webpack_require__.d(MaterialTransformers_namespaceObject, {
  "alphaTestTransformer": () => (alphaTestTransformer),
  "asPreprocessorValueTransformer": () => (asPreprocessorValueTransformer),
  "toPreprocessorTriggerTransformer": () => (toPreprocessorTriggerTransformer),
  "toUserDataTransformer": () => (toUserDataTransformer),
  "uniformOrUserDataTransformer": () => (uniformOrUserDataTransformer)
});

;// CONCATENATED MODULE: ./src/core/DefaultValues.js
/** List the default values of the lib components */
const _values = {
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal',
	fontStyle: 'normal',
	fontWeight : '400',
	offset: 0.005,
	lineHeight: 1.2,
	lineBreak: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: 'pre-line',
	flexDirection : 'column',
	justifyContent : 'start',
	alignItems : 'start',
	backgroundImage: null,
	textAlign : 'left',
	boxSizing: 'content-box',
	position: 'static',
	color: 0xff99ff,
	fontColor: 0xffffff,
	fontOpacity: 1,
	opacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	fontSmooth: 'antialiased',
	borderRadius: 0,
	borderWidth: 0,
	borderColor: 'black',
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: 0x222222,
	backgroundOpacity: 0.5,
	overflow: 'visible',
	letterSpacing: 0,
	invertAlpha : false,
	segments: 1
};

/**
 * @param {import('./../core/elements/MeshUIBaseElement').Options} overrideProperties
 */
const set = function ( overrideProperties ) {

	for ( const property in overrideProperties ) {

		_values[property] = overrideProperties[property];

	}

}

/**
 *
 * @param {string} property
 * @return {any}
 */
const get = function ( property ) {

	if( !Object.prototype.hasOwnProperty.call( _values, property) ) {

		console.warn( `ThreeMeshUI::DefaultValues is trying to retrieve non-existing property '${property}'`);

	}

	return _values[property];

}

;// CONCATENATED MODULE: ./src/core/properties/BaseProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		/**
		 *
		 * @type {string}
		 * @internal
		 */
		this._id = propertyId;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._value = value;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsUpdate = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsProcess = false;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsRender = false;

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._isPrimitive = primitive;

	}

	/**
	 *
	 * @return {string}
	 */
	get id() { return this._id; }

	/**
	 *
	 * @return {any}
	 */
	get value() { return this._value; }

	/**
	 *
	 * @param {any} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element , out ) { 	/* eslint-enable no-unused-vars */

		// the value has been updated from setter
		// if there is no additional logic
		// then just output it
		// => out[this._id] = this._value;
		this.output( out );


		// ??
		//this.computeOutputValue( element );
		// if( this._isPrimitive ) this.output( out );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { 	/* eslint-enable no-unused-vars */

		// ie:
		// out['borderRadius'] = this;
		// out[this._id] = this._value;

	}



	/**
	 *
	 * @param {Out} out
	 */
	_outputValue( out ) {

		out[this._id] = this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	process( element ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	render( element ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput ( element ) {

		if( this._value !== 'inherit' ) return this._value;

		const parent = element._parent._value;
		if( parent && parent[`_${this._id}`] ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	/**
	 *
	 * @return {any}
	 */
	getDefaultValue() {

		return get( this._id );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValid( value ) { 	/* eslint-enable no-unused-vars */

		return true;

	}

	/**
	 *
	 */
	emptyStrategyLogic () {

		throw new Error( `ThreeMeshUI::${this.constructor.name} has empty strategy. Update has not been processed.` );

	}

}


/**
 * @typedef Out
 * @type {Object & Object.<string,any>}
 */

;// CONCATENATED MODULE: ./src/core/properties/RenderOrderProperty.js


class RenderOrderProperty extends BaseProperty{

	constructor() {

		super( 'renderOrder', 'auto', true);

		this.output = this._outputValue;

		this._actualValue = 0;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}

	update( element, out ) {

		if( this._value !== 'auto' ) {

			this._actualValue = this._value;

		} else {

			const parent = element._parent._value;
			if( parent !== null ) {

				const parentIndex = parent._renderOrder._actualValue;
				const positionInParent = 1 + parent._children._uis.indexOf( element );

				this._actualValue = parentIndex + positionInParent;

			}

		}

		// update any children
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_renderOrder`];
			if( property._value === 'auto' ) childUIElement[`_renderOrder`]._needsUpdate = true;

		}

		this._outputValue( out );

	}

	_outputValue( out ) {

		out[this._id] = this._actualValue;

	}


	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableProperty.js


class InheritableProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		super( propertyId, value, primitive );

		// @TODO : I would like to remove this rules ( here )
		this.output = this._outputValue;

		this._notInheritedValue = null;
	}

	update( element , out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if( this._notInheritedValue === 'inherit' )
		{
			this._notInheritedValue = this.getInheritedInput( element );
		}
		// else
		// {
		// 	this.propagate( element );
		// }

		// @TODO: Evaluate. This might be too much
		this.propagate( element );

		this._outputValue( out );

	}

	propagate( element ) {

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			if( property !== undefined && property._value === 'inherit' ) {
				childUIElement[`_${this._id}`]._needsUpdate = true;
			}

		}
	}

	/**
	 * Output this property in a dictionnary
	 * @override
	 */
	_outputValue( out ) { 	/* eslint-enable no-unused-vars */

		out[this._id] = this._notInheritedValue;

	}

	set value ( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}
	/**
	 *
	 * @override
	 * @return {any|"inherit"}
	 */
	get value() {

		if( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/OffsetProperty.js


class OffsetProperty extends InheritableProperty {

	constructor( ) {

		super( 'offset', 'inherit', false );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		super.update( element, out);

		// only process if element has ui parent
		if( element._parent._value !== null ) element.position.z = this._notInheritedValue;

	}


}

;// CONCATENATED MODULE: ./src/core/properties/FontSmoothProperty.js


class FontSmoothProperty extends InheritableProperty{

	constructor() {

		super( 'fontSmooth', 'inherit', true);

		// configure
		this._needsUpdate = false;
		this.isValid = _isValid;
		this.output = this._outputValue;
	}

}

const AVAILABLE_VALUES = ['inherit','none','antialiased'];

/**
 *
 * @param {string} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if(  AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn(`.fontSmoothing value '${value}' is not valid. Aborted`);
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: external "three"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const external_three_namespaceObject = x({ ["BackSide"]: () => __WEBPACK_EXTERNAL_MODULE_three__.BackSide, ["BufferAttribute"]: () => __WEBPACK_EXTERNAL_MODULE_three__.BufferAttribute, ["BufferGeometry"]: () => __WEBPACK_EXTERNAL_MODULE_three__.BufferGeometry, ["Color"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Color, ["DoubleSide"]: () => __WEBPACK_EXTERNAL_MODULE_three__.DoubleSide, ["EventDispatcher"]: () => __WEBPACK_EXTERNAL_MODULE_three__.EventDispatcher, ["FileLoader"]: () => __WEBPACK_EXTERNAL_MODULE_three__.FileLoader, ["FrontSide"]: () => __WEBPACK_EXTERNAL_MODULE_three__.FrontSide, ["LinearFilter"]: () => __WEBPACK_EXTERNAL_MODULE_three__.LinearFilter, ["Mesh"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Mesh, ["Object3D"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Object3D, ["Plane"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Plane, ["PlaneBufferGeometry"]: () => __WEBPACK_EXTERNAL_MODULE_three__.PlaneBufferGeometry, ["ShaderMaterial"]: () => __WEBPACK_EXTERNAL_MODULE_three__.ShaderMaterial, ["Texture"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Texture, ["TextureLoader"]: () => __WEBPACK_EXTERNAL_MODULE_three__.TextureLoader, ["Vector2"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Vector2, ["Vector3"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Vector3, ["Vector4"]: () => __WEBPACK_EXTERNAL_MODULE_three__.Vector4 });
;// CONCATENATED MODULE: ./src/core/properties/style-properties/SubStyleProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
class SubStyleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {boolean} [primitive=true]
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue, primitive = true) {

		super( propertyId, 'unset', primitive );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'inherit';

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._allowsInherit = true;

		/**
		 * The input value that won't be 'inherit'
		 * @type {any}
		 * @protected
		 */
		this._inheritedInput = undefined;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = undefined;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 * @param {Object.<string,any> } out
	 */
	update( element, out ) {

		if( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			const target = property._input ? property._input : property._value;

			if( target === 'inherit' ) childUIElement[`_${this._id}`]._needsUpdate = true;

		}

		this.output( out );

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		this._value = this._input;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	_computeFromInherited( element ) {

		this._value = this._inheritedInput;

	}


	/**
	 * @override
	 * @deprecated
	 * @param {any} v
	 */
	set value( v ) {

		console.warn(".(style) sub-property cannot be directly set. It must comes from inline or computed setter.")

	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {any}
	 */
	get inline() { return this._inline; }

	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValidValue( value ) {

		return true;

	}

	/**
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput ( element ) {

		if( this._input !== 'inherit' ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

}
/* eslint-enable no-unused-vars */

;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleVector4Property.js



class StyleVector4Property extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new external_three_namespaceObject.Vector4(0,0,0,0);

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = null;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._value = new external_three_namespaceObject.Vector4(0,0,0,0);

	}

	/**
	 * @override
	 * @return {Vector4}
	 */
	get value(){

		return this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

	}

	set inline( value ) {

		this._vector4ValueSetter( this._input, value );

		if( this._input.equals( this._value) ) return;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}


	/**
	 *
	 * @returns {number}
	 */
	get top() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get right() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottom() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}


	/**
	 *
	 * @returns {number}
	 */
	get left() { return this._input.w; }

	dispose(){

		this._computed = null;
		this._inline = null;
		this._input = null;
		this._output = null;

	}

	/**
	 *
	 * @param {Vector4} vector4
	 * @param {Vector4|Array.<Number>|Number|String} value
	 * @protected
	 */
	_vector4ValueSetter( vector4, value ) {

		if ( value instanceof external_three_namespaceObject.Vector4 ) {

			vector4.copy( value );
			return;

		}

		if ( typeof value === 'string' || value instanceof String ) {

			value = value.split( ' ' );

		}

		if ( Array.isArray( value ) ) {

			value = value.map( v => parseFloat( v ) );

			switch ( value.length ) {

				case 1:
					vector4.setScalar( value[ 0 ] );
					return;

				case 2:
					vector4.x = vector4.z = value[ 0 ];
					vector4.y = vector4.w = value[ 1 ];
					return;

				case 3:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					return;

				case 4:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					vector4.w = value[ 3 ];
					return;

				default:
					console.error( 'StyleVector4Property::set() Four Dimension property had more than four values' );
					return;

			}

		}

		if ( !isNaN( value ) ) {

			vector4.setScalar( value );

		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/PaddingProperty.js



class PaddingProperty extends StyleVector4Property {

	constructor() {

		super('padding', new external_three_namespaceObject.Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		element._bounds._needsUpdate = true;
		element._bounds._needsRender = true;
		element._layouter._needsProcess = true;
		element._renderer._needsRender = true;

		if( element._parent._value ){
			element._parent._value._layouter._needsProcess = true;
		}
	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/MarginProperty.js



class MarginProperty extends StyleVector4Property {

	constructor() {

		super('margin', new external_three_namespaceObject.Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		if( element._parent._value ){
			element._parent._value._layouter._needsProcess = true;
		}
	}

}

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/CommonTransformers.js
/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const directTransfer = function ( target, targetProperty, value ) {

	target[targetProperty] = value;

}

const directTransferNotNull = function( target, targetProperty, value ) {

	if( value === null ) return;

	target[targetProperty] = value;

}

;// CONCATENATED MODULE: ./src/utils/mediator/Mediator.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

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

class Mediator{

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

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ParentProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ParentProperty extends BaseProperty {

	constructor() {

		super('parent', null, false);

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update when :
	 * 		- element has been added
	 * 		- element has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) {
		/* eslint-enable no-unused-vars */

		if ( element.parent && element.parent.isUI ) {

			this._value = element.parent;
			// this.position.z = this.getOffset();

		} else {

			this._value = null;

		}

		// @TODO : parentElement
		// // set elements as root
		// if ( element.isBlock && !this._value ) {
		//
		// 	ThreeMeshUI.addRoot( element );
		// 	element.pseudoClassList.add('root');
		//
		// } else {
		//
		// 	ThreeMeshUI.removeRoot( element );
		// 	element.pseudoClassList.remove('root');
		//
		// }


	}

	set value( value ) {

		console.warn('ParentProperty is readonly');

	}

	/**
	 *
	 * @return {MeshUIBaseElement}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @param {(p:Object3D)=>boolean } conditionCallback
	 */
	find( conditionCallback ) {

		if( this._value ) {

			if( conditionCallback( this._value) ) {

				return this._value;

			}

			return this._value._parent.find( conditionCallback );

		}

		return null;

	}


	/**
	 *
	 */
	dispose() {

		this._value = null;

	}


}

;// CONCATENATED MODULE: ./src/utils/NumberUtils.js
/**
 * Get rid of the precision issue
 * @param numA
 * @param numB
 * @param precision
 * @return {boolean}
 */
const numberEquals = function ( numA, numB, precision = 6 ) {

	return numA.toFixed(precision) === numB.toFixed(precision)

}

/**
 *
 * @param unprecisedNumber
 * @param precision
 * @return {number}
 */
const numberPrecise = function ( unprecisedNumber, precision = 6 ) {

	return parseFloat( unprecisedNumber.toFixed( precision ) );

}

;// CONCATENATED MODULE: ./src/core/properties/NumberProperty.js



class NumberProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} [value]
	 */
	constructor( propertyId, value ) {

		super( propertyId, value, true);

		this.output = this._outputValue;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( numberEquals(this._value, value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}



	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/SideProperty.js



/**
 * @property {number|"inherit"} value
 */
class SideProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId ) {

		super( propertyId, 'inherit', true);

		this.isValid = SideProperty_isValid;

	}

}

const SideProperty_AVAILABLE_VALUES = [ external_three_namespaceObject.FrontSide, external_three_namespaceObject.BackSide, external_three_namespaceObject.DoubleSide ];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function SideProperty_isValid( value ) {

	if( SideProperty_AVAILABLE_VALUES.indexOf( value) === -1 ){

		console.warn(`SideProperty value '${value}' is not valid. Abort`);
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/font/FontVariant.js



// JSDoc related imports
/* eslint-disable no-unused-vars */





/* eslint-enable no-unused-vars */


/**
 * @abstract
 */
class FontVariant extends external_three_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 */
	constructor( weight, style ) {

		super();

		/** @private */ this._isReady = false;

		/** @protected */ this._weight = weight;
		/** @protected */ this._style = style;

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 42;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = null;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get typographic() { return this._font; }

	/**
	 *
	 * @returns {boolean}
	 */
	get isReady() {

		return this._isReady;

	}

	/**
	 *
	 * @returns {string}
	 */
	get weight() {

		return this._weight;

	}

	/**
	 *
	 * @returns {string}
	 */
	get style() {

		return this._style;

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get texture() {

		return this._texture;

	}

	/**
	 * @param {Function.<ShaderMaterial|Material>} v
	 * @abstract
	 */
	set fontMaterial( v ) {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 * @return {Function.<ShaderMaterial|Material>}
	 * @abstract
	 */
	get fontMaterial() {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 *
	 * @returns {string}
	 */
	get id(){
		return `${this._name}(w:${this.weight},s:${this.style})`;
	}

	/**
	 *
	 * @param {string} character
	 * @returns {TypographicGlyph}
	 */
	getTypographicGlyph( character ) {

		let typographicGlyph = this._chars[ character ];
		if ( typographicGlyph ) return typographicGlyph;

		// Auto generate whitespace chars
		if ( character.match( /\s/ ) ) return this._chars[ " " ];

		const fallbackCharacter = this._getFallbackCharacter( character );
		if( fallbackCharacter ) {

			typographicGlyph = this._chars[ fallbackCharacter ];
			if ( typographicGlyph ) return typographicGlyph;

		}

		throw Error( `FontVariant('${this.id}')::getTypographicGlyph() - character('${character}') and/or fallback character were not found in provided msdf charset.` );
	}


	/* eslint-disable no-unused-vars */
	/**
	 * @abstract
	 * @protected
	 * @param {string} missingChar
	 * @returns {string|null}
	 */
	_getFallbackCharacter( missingChar ) {  /* eslint-enable no-unused-vars */
		throw new Error(`FontVariant(${typeof this})::_getFallbackCharacter() is abstract and should therefore be overridden.`);
	}

	/* eslint-disable no-unused-vars */
	/**
	 * Convert an InlineCharacter to a geometry
	 *
	 * @abstract
	 * @param {InlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 * @returns {BufferGeometry|Array.<BufferGeometry>}
	 */
	getGeometricGlyph( inline, element ) {

		throw new Error(`FontVariant(${typeof this})::getGeometryCharacter() is abstract and should therefore be overridden.`);

	}

	/* eslint-enable no-unused-vars */


	/**
	 * Obtain the kerning amount of a glyphPair
	 * @param {string} glyphPair
	 * @returns {number}
	 */
	getKerningAmount( glyphPair ){

		//or zero offset if kerning glyphPais is not defined
		return this._kernings[ glyphPair ] ? this._kernings[ glyphPair ] : 0;

	}


	/**
	 * Perform some changes on the character description of this font
	 * @param {Object.<string,Object.<string,number|string>>} adjustmentObject
	 */
	adjustTypographicGlyphs( adjustmentObject ){

		for ( const char in adjustmentObject ) {

			const typographicGlyph = this.getTypographicGlyph( char );
			const glyphAdjustment = adjustmentObject[ char ];
			for ( const propertyToAdjust in glyphAdjustment ) {

				typographicGlyph["_"+propertyToAdjust] = adjustmentObject[char][propertyToAdjust];

			}

		}

	}

	/**
	 *
	 * @private
	 */
	_checkReadiness() {

		if ( this._readyCondition() ) {

			_setReady( this );

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @abstract
	 * @param element
	 * @internal
	 */
	_alterElementProperties( element ) {  /* eslint-enable no-unused-vars */

		throw new Error(`FontVariant(${typeof this})::_alterElementProperties() is abstract and should therefore be overridden.`);

	}

	/**
	 *
	 * @abstract
	 * @returns {boolean}
	 * @protected
	 */
	_readyCondition () {

		// ie: MSDFFontVariant
		// Must have chars and a texture
		// return this._chars && this._texture

		throw new Error(`FontVariant(${typeof this})::_readyCondition() is abstract and should therefore be overridden.`);
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


const _readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontVariant} fontVariant
 * @private
 */
function _setReady( fontVariant ) {

	fontVariant._isReady = true;
	fontVariant.dispatchEvent( _readyEvent );

}

/**
 * @typedef {Object.<string,number>} KerningPairs
 *
 */

/* harmony default export */ const font_FontVariant = (FontVariant);

;// CONCATENATED MODULE: ./src/core/properties/FontProperty.js



class FontProperty extends BaseProperty{

	/**
	 *
	 * @param {FontVariant} [value=null]
	 */
	constructor( value = null ) {

		super( 'font', value, false);

		this._needsUpdate = false;

		/**
		 *
		 * @type {FontVariant|null}
		 * @internal
		 */
		this._fontVariant = null;


		/**
		 * @typedef ReadyClosure
		 * @type { ()=> void|null }
		 */

		/**
		 *
		 * @type {ReadyClosure}
		 * @private
		 */
		this._handleFontReadyClosure = null;

		/**
		 * @override
		 */
		this.isValid = FontProperty_isValid;

	}

	output( out ) {

		out[this._id] = this._fontVariant;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		// if a previous font isset, be sure no event remains
		if ( this._fontVariant && !this._fontVariant.isReady ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );

		}

		// obtain font from value or from style combinaison
		if( this._value && this._value instanceof font_FontVariant ) {

			this._fontVariant = this._value;

		} else {


			const fontFamily = element._fontFamily._value;
			if( fontFamily ) {

				this._fontVariant = fontFamily.getVariant(
					element._fontWeight._value,
					element._fontStyle._value,
				);

			}

		}

		if( !this._fontVariant ) return;

		this._fontVariant._alterElementProperties( element );

		this._handleFontReadyClosure = _readyClosure( element, this );

		// new font, means rebuild inlines, now or soon
		if ( !this._fontVariant.isReady ) {

			// @TODO : clear inlines components
			// this.inlines = null;

			this._fontVariant.addEventListener( 'ready', this._handleFontReadyClosure );

		} else {

			this._handleFontReadyClosure();

		}

		// Set the default material
		if( !element._fontMaterial._defaultMaterial || !(element._fontMaterial._defaultMaterial instanceof this._fontVariant.fontMaterial) ) {

			element._fontMaterial._defaultMaterial = new this._fontVariant.fontMaterial();
			element._fontMaterial._needsUpdate = true;

		}

	}

	/**
	 * @override
	 * @param {FontVariant} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {FontVariant}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @return {FontVariant|null}
	 */
	get fontVariant() { return this._fontVariant; }

	/**
	 *
	 */
	dispose () {

		if( this._handleFontReadyClosure ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );
			this._handleFontReadyClosure = null;

		}

		this._value = null;
		this._fontVariant = null;

	}

}


/**
 *
 * @param {number} value
 * @return {boolean}
 * @private
 */
function FontProperty_isValid( value ) {

	if( ! ( value instanceof font_FontVariant )  ) {

		console.warn(`.font value '${value}' is not valid. It requires a FontVariant instance. Aborted`);
		return false;

	}

	return true;

}

/**
 *
 * @param {MeshUIBaseElement} element
 * @param {FontProperty} fontProperty
 * @return {() => void}
 * @private
 */
function _readyClosure( element, fontProperty ) {
	return function () {

		fontProperty._needsUpdate = true;
		element._glyphs._needsProcess = true;

		// this._transferToMaterial();

		// request parse update and parent layout
		// this.update( true, true, false );
		// this.getHighestParent().update( false, true, false );

		// remove the listener
		fontProperty._fontVariant.removeEventListener( 'ready', fontProperty._handleFontReadyClosure );
		fontProperty._handleFontReadyClosure = null;

	}
}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/visibility/Display.js



class Display extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'display', defaultValue );

		// configure
		this._value = 'flex';
		this._allowsInherit = false;
		this._needsUpdate = false;


		this.isValidValue = Display_isValid;

	}

	computeOutputValue( element ) {

		element._visible._value = this._output !== 'none';

	}
}

const Display_AVAILABLE_VALUES = ['none','flex'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function Display_isValid( value ) {

	if( Display_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) display value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/BoxSizing.js



class BoxSizing extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'boxSizing', defaultValue );

		// Configure
		this._allowsInherit = false;

		this.isValidValue = BoxSizing_isValid;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		element._bounds._needsUpdate = true;

	}

}


/**
 *
 * @type {Array.<string>}
 */
const BoxSizing_AVAILABLE_VALUES = ['border-box', 'content-box'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BoxSizing_isValid( value ) {

	if( BoxSizing_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) boxSizing value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleColorProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class StyleColorProperty extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 * @type {Color}
		 * @protected
		 */
		this._value = new external_three_namespaceObject.Color();

		this._needsUpdate = false;

		this.output = this._outputValue;
	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input !== 'inherit' ) {

			_setColor( this._input, this._value);

		}

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function _setColor( value, output ) {



	if ( !( value instanceof external_three_namespaceObject.Color ) ) {

		if ( output instanceof external_three_namespaceObject.Color ) {

			output.set( value );

		} else {

			output = new external_three_namespaceObject.Color( value );

		}

	} else {

		output.set(value);

	}
}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleFactorProperty.js


class StyleFactorProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, true );

		this.isValidValue = StyleFactorProperty_isValid;

		this._allowsInherit = false;

		this._input = defaultValue;

		this._value = defaultValue;

		this.output = this._outputValue;

		this.computeOutputValue = this._computeFromInherited;

	}


	_outputValue( out ) {

		out[this._id] = this._inheritedInput;

	}



}

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function StyleFactorProperty_isValid( value ) {

	if ( value < 0 && value > 1.0 ) {

		console.warn( `(.style) styleFactorProperty('${this.id}') value '${value}' is not valid)` );
		return false;

	}

	return true;

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundImage.js

//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


class BackgroundImage extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundImage', defaultValue, true );

		// configure
		this._allowsInherit = false;

		/**
		 *
		 * @type {Vector2}
		 * @internal
		 */
		this._textureSize = new external_three_namespaceObject.Vector2( 1,1 );

		this.isValidValue = BackgroundImage_isValid;

	}

	/**
	 * @override
	 * @return {any|Texture|null}
	 */
	get value() {

		return this._value;

	}

	output( out ) {

		out[this._id] = this._value;

		out['tSize'] = this._textureSize;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : URL
		this._value = this._inheritedInput;

		// ?
		// out[this.id] = this._value;

		if( this._value instanceof external_three_namespaceObject.Texture && !this._value.image ) {
			console.warn( `ThreeMeshUI - .backgroundImage :: Please provided preloaded texture in order to have accurate sizing.`);
			return;
		}

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		if( this._value ) {

			this._textureSize.set( this._value.image.width, this._value.image.height );

		} else {

			this._textureSize.set( 1 , 1 );

		}

	}

}

/* eslint-disable no-unused-vars */
/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BackgroundImage_isValid( value ) { /* eslint-enable no-unused-vars */

	// @TODO : Texture or URL() or String or ID ?
	//console.log( "todo, validate image value", value);

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundSize.js



/**
 * @property {"cover"|"contain"|"stretch"} value
 */
class BackgroundSize extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundSize', defaultValue, true );

		this.isValidValue = BackgroundSize_isValid;

		this.output = this._outputValue;
	}

}

const BackgroundSize_AVAILABLE_VALUES = ['cover','contain','stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BackgroundSize_isValid( value ) {

	if( BackgroundSize_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) backgroundSize value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/visibility/Overflow.js




class Overflow extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'overflow', defaultValue, true );

		this.isValidValue = Overflow_isValid;

		/**
		 *
		 * @type {Array.<Plane>|null}
		 * @internal
		 */
		this._clippingPlanes = null;

		this._renderStrategy = this._emptyRender;
	}

	/**
	 * Update of overflow is a bit different, as parent may trigger changes on it
	 * @override
	 */
	update( element, out ) {

		// in any case, it will compute value. It doesn't have updateRequire evaluation
		// let updateRequired = true;

		// Inline has priority if set
		if ( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if ( this._computed !== undefined ) {

			this._input = this._computed;

		}

		if ( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {
			childUIElement[ `_overflow` ]._needsUpdate = true;
		}

		this.output( out );

	}

	output( out ) {

		out['clippingPlanes'] = this._clippingPlanes;

	}

	computeOutputValue( element ) {

		// update self --------------------
		super.computeOutputValue( element );

		if( this._value === 'hidden' ) {
			this._renderStrategy = this._hiddenRender;

		}else{
			this._renderStrategy = this._emptyRender;
			this._clippingPlanes = null;
		}


		const parent = element._parent._value;
		if( parent !== null ) {

			// Check that parent is hiddenOverflow or has clippingPlanes
			const overflowParent = parent._overflow;
			if ( ( overflowParent._value === 'hidden' || overflowParent._clippingPlanes !== null ) && !this._clippingPlanes ) {

				// add planes and render
				this._clippingPlanes =  [
					// top
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 0, -1, 0 ), 1 ),
					// right
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( -1, 0, 0 ), 1 ),
					// bottom
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 0, 1, 0 ), 1 ),
					// left
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 1, 0, 0 ), 1 ),
				];

				// bind the parent to the clipping plane in a custom property
				for ( let i = 0; i < this._clippingPlanes.length; i++ ) {
					this._clippingPlanes[ i ].parent = parent;
				}

				// Also add parent clipping planes if isset
				if( overflowParent._clippingPlanes !== null ) {
					this._clippingPlanes.push( ...overflowParent._clippingPlanes );
				}

				this._renderStrategy = this._hiddenRender;
				this._needsRender = true;

			} else if ( ( overflowParent._value === 'visible' || overflowParent._clippingPlanes === null ) && this._clippingPlanes !== null ){

				// remove planes and render
				this._clippingPlanes = null;
				this._renderStrategy = this._emptyRender;
				this._needsRender = true;

			}

		}

	}

	render( element) {

		this._renderStrategy( element );

	}

	/* eslint-disable no-unused-vars */	_emptyRender( element ) { /* eslint-enable no-unused-vars */ }

	_hiddenRender( element ) {

		const parentUI = element._parent._value;

		const yLimit = parentUI._bounds._offsetHeight;
		const xLimit = parentUI._bounds._offsetWidth;
		const padding = parentUI._padding._value;
		const border = parentUI._borderWidth._value;

		for ( let i = 0; i < 4; i++ ) {
			const clippingPlane = this._clippingPlanes[ i ];

			switch ( i % 4 ) {
				// top
				case 0:
					clippingPlane.constant = yLimit / 2 - ( padding.x + border.x );
					break;

				// right
				case 1:
					clippingPlane.constant = xLimit / 2 - ( padding.y + border.y );
					break;

				// bottom
				case 2:
					clippingPlane.constant = yLimit / 2 - ( padding.z + border.z );
					break;

				// left
				case 3:
					clippingPlane.constant = xLimit / 2 - ( padding.w + border.w );
					break;
			}

			clippingPlane.applyMatrix4( parentUI.matrixWorld )

		}

	}

}

const Overflow_AVAILABLE_VALUES = ['visible', 'hidden'];
function Overflow_isValid( value ) {

	if( Overflow_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) overflow value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/utils/Units.js
const WORLD_UNITS = 'rem';

//
const CENTIMETERS = 'cm';
const MILLIMETERS = 'mm';
const INCHES = 'in';

const UV = 'em';
const PERCENT = '%';

const availableUnits = [ WORLD_UNITS, UV, PERCENT ];


/**
 * Obtain a valid unit
 * @param {string} requestedUnits
 * @returns {string}
 */
const validateUnits = function( requestedUnits ) {

	// Sent default units if requested units not available
	if( availableUnits.indexOf( requestedUnits) === -1 ) return WORLD_UNITS;

	return requestedUnits;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/border/BorderRadius.js




//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BorderRadius extends StyleVector4Property {

	/**
	 *
	 * @param {Vector4} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'borderRadius', defaultValue );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._valueUV = this._value.clone();

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new external_three_namespaceObject.Vector4(0,0,0,0);
		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._mediation = true;

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTL = new external_three_namespaceObject.Vector2(0, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTR = new external_three_namespaceObject.Vector2(1, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBR = new external_three_namespaceObject.Vector2(1, 0);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBL = new external_three_namespaceObject.Vector2(0, 0);

		const mediationTop = new BorderRadiusMediator( this._valueUV, [ 'x', 'y' ] ); // bottom
		const mediationBottom = new BorderRadiusMediator( this._valueUV, [ 'z', 'w'] ); // top
		const mediationLeft = new BorderRadiusMediator( this._valueUV, [ 'x', 'w'] ); // right
		const mediationRight = new BorderRadiusMediator( this._valueUV, [ 'y', 'z'] ); // left

		mediationTop.complementaryMediation = mediationBottom;
		mediationBottom.complementaryMediation = mediationTop;
		mediationLeft.complementaryMediation = mediationRight;
		mediationRight.complementaryMediation = mediationLeft;

		/**
		 *
		 * @type {Array.<BorderRadiusMediator>}
		 * @private
		 */
		this._sideMediators = [ mediationTop, mediationBottom, mediationLeft, mediationRight ];

		this._units = WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = validateUnits( units );

		this._needsProcess = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/**
	 *
	 * @param {boolean} v
	 */
	set mediation ( v) {

		if( v !== this._mediation ){

			this._mediation = v;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	get mediation () { return this._mediation; }


	/**
	 *
	 * @param {Object.<string,any>} out
	 */

	output( out ) {

		out["cornerTL"] = this._cornerTL;
		out["cornerTR"] = this._cornerTR;
		out["cornerBR"] = this._cornerBR;
		out["cornerBL"] = this._cornerBL;

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ){ /* eslint-enable no-unused-vars */

		this._needsRender = true;

	}

	/**
	 *
	 * @override
	 */
	render( element ){

		this._valueUV.copy( this._value );

		const elementWidth = element._bounds._offsetWidth;
		const elementHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === PERCENT ) {
			this._valueUV.divideScalar(100);
		}

		// @TODO: Units process could be strategies
		if( this._units === WORLD_UNITS ) {
			this._valueUV.divideScalar( Math.min(elementWidth , elementHeight) );
		}



		/**
		 * mediate
		 * Be sure no side is greater than 1 (uv units)
		 */
		if( this._mediation ) {

			do {

				this._sideMediators.forEach( srm => srm.computeValue() );
				this._sideMediators.sort( ( a, b ) => {
					return a.value < b.value ? 1 : -1
				} );

				if ( this._sideMediators[ 0 ].value > 1.0 ) {
					this._sideMediators[ 0 ].mediate();
				}

			} while ( this._sideMediators[ 0 ].value > 1.0 );

		}


		let sX = elementWidth > elementHeight ? elementHeight/elementWidth : 1;
		let sY = elementWidth < elementHeight ? elementWidth/elementHeight : 1;

		// Do not scale pourcentages, allowing ovals
		if( this._units === PERCENT ){
			sX = sY = 1.0;
		}

		this._cornerTL.x = this._valueUV.x * sX;
		this._cornerTL.y = 1 - (this._valueUV.x * sY );

		this._cornerTR.x = 1 - (this._valueUV.y * sX );
		this._cornerTR.y = 1 - (this._valueUV.y * sY );

		this._cornerBR.x = 1 - (this._valueUV.z * sX );
		this._cornerBR.y = this._valueUV.z * sY;

		this._cornerBL.x = this._valueUV.w * sX;
		this._cornerBL.y = this._valueUV.w * sY;

	}

	/**
	 *
	 */
	dispose() {

		for ( const sideMediator of this._sideMediators ) {

			sideMediator.dispose();

		}

		this._sideMediators = null;

		this._cornerTL = null;
		this._cornerTR = null;
		this._cornerBR = null;
		this._cornerBL = null;

		super.dispose();

	}

	/**
	 *
	 * @param {Number} v
	 */
	set topLeft( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {number}
	 */
	get topLeft() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set topRight( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get topRight() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomRight( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomRight() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomLeft( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomLeft() { return this._input.w; }


	/**
	 * @override
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v && this._input.y === v ) return;

		this._input.x = this._input.y = v;
		this._needsUpdate = true;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get top() { return (this._input.x + this._input.y) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v && this._input.z === v ) return;

		this._input.y = this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get right() { return (this._input.y + this._input.z) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v && this._input.w === v ) return;

		this._input.z = this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get bottom() { return (this._input.z + this._input.w) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v && this._input.x === v ) return;

		this._input.w = this._input.x = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get left() { return (this._input.w + this._input.x) / 2; }

}

/**
 * Job: Contains two border radiuses values of the same side
 * 			If their sums is greater than 1 (uv units) mediation could occurs
 */
class BorderRadiusMediator {

	/**
	 *
	 * @param {Vector4} borderRadiuses
	 * @param {Array.<string>} sideProperties
	 */
	constructor( borderRadiuses, sideProperties ) {

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._borderRadiuses = borderRadiuses;

		/**
		 *
		 * @type {Array<string>}
		 * @private
		 */
		this._sideProperties = sideProperties;

		/**
		 *
		 * @type {BorderRadiusMediator|null}
		 * @private
		 */
		this._complementaryMediation = null;

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._value = 0;
	}

	/**
	 * The sum of the border radius of that side
	 * @returns {number}
	 */
	get value(){ return this._value; }

	/**
	 * A complementary side mediation ie: For top, complementary is bottom
	 * @param {BorderRadiusMediator} brm
	 */
	set complementaryMediation( brm ){

		this._complementaryMediation = brm;

	}

	/**
	 * Adds all side property to compute the value of that side
	 */
	computeValue(){

		let totalRadius = 0;

		for ( const radius of this._sideProperties ) {

			totalRadius += this._borderRadiuses[radius];

		}

		this._value = totalRadius;
	}

	/**
	 *
	 * @param {boolean} [mediateOpposite=true]
	 */
	mediate( mediateOpposite = true ){

		// Mediation only occurs when sum of radius are greater than 1 (uv units)
		if( this._value < 1.0 ) return;

		// Simply divide each component by the sum
		for ( const radius of this._sideProperties ) {

			this._borderRadiuses[radius] /= this._value;

		}

		if( mediateOpposite ) {

			// and also mediate the complementary
			this._complementaryMediation.mediate( false );

		}

	}

	/**
	 *
	 */
	dispose() {

		this._complementaryMediation = null;
		this._borderRadiuses = null;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/border/BorderWidth.js



class BorderWidth extends StyleVector4Property{

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		super ( 'borderWidth', defaultValue, false );


		this._valueUV = this._value.clone();

		// configure
		this.output = this._outputValue;

		this._units = WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = validateUnits( units );

		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	computeOutputValue( element) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

		element._bounds._needsUpdate = true;
		element._layouter._needsUpdate = true;

		// for ( let i = 0; i < element._children._uis.length; i++ ) {
		// 	const child = element._children._uis[ i ];
		// 	element._bounds._needsUpdate = true;
		// }

	}

	_outputValue( out ) {
		out[this._id] = this._valueUV;
	}

	/**
	 *
	 * @override
	 */
	process( element ) {
		this._needsRender = true;
		element._borderRadius._needsRender = true;
	}

	/**
	 * @override
	 */
	render( element ) {

		this._valueUV.copy( this._value );

		const offsetWidth = element._bounds._offsetWidth;
		const offsetHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === PERCENT ){

			console.log( "Percent" );
			// this._valueUV.divideScalar( 100 );
			console.log( this._valueUV );

		}

		// @TODO: Units process could be strategies
		if( this._units === WORLD_UNITS ) {

			if( offsetWidth !== 0) {
				this._valueUV.w /= offsetWidth;
				this._valueUV.y /= offsetWidth;
			}


			if( offsetHeight !== 0 ) {
				this._valueUV.x /= offsetHeight;
				this._valueUV.z /= offsetHeight;
			}


		} else if( this._units === UV ) {

			// @TODO: Units process could be strategies

			if( offsetWidth !== 0 ) {
				const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
				this._valueUV.y *= sX;
				this._valueUV.w *= sX;
			}

			if( offsetHeight !== 0 ) {
				const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

				this._valueUV.x *= sY;
				this._valueUV.z *= sY;
			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/VisibleProperty.js


class VisibleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( 'visible', value, true );

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		element.visible = this._value;

		if( element._parent._value ) {

			element._parent._value._children._needsUpdate = true;

		}

	}

	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundColorProperty.js




class BackgroundColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._input = 'transparent';

		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			BackgroundColorProperty_setColor( this.getInheritedInput( element ) , this._value );

		} else {

			BackgroundColorProperty_setColor( this._input, this._value);

		}

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function BackgroundColorProperty_setColor( value, output ) {

	if ( !( value instanceof external_three_namespaceObject.Color ) ) {

		if ( output instanceof external_three_namespaceObject.Color ) {

			output.set( value );

		} else {

			output = new external_three_namespaceObject.Color( value );

		}

	} else {

		output.set(value);

	}
}



;// CONCATENATED MODULE: ./src/core/properties/EmptyProperty.js


class EmptyProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId = 'untitled' ) {

		super( propertyId, undefined, false );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element , out ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { /* eslint-enable no-unused-vars */ }

}

;// CONCATENATED MODULE: ./src/core/properties/InlineJustificator.js


class InlineJustificator extends BaseProperty {

	constructor() {
		super( 'inlineJustificator', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {


		const INNER_HEIGHT = element._bounds._innerHeight;
		const lines = element._layouter._value;

		const textHeight = Math.abs( lines.height );


		// Line vertical positioning
		let justificationOffset = ( () => {

			switch ( element._alignItems._value ) {

				case 'inherit':
				case 'start':
					// return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight - boxComponent._padding.x ;
					// return boxComponent._padding.x - lines[0].lineHeight ;
					// return (INNER_HEIGHT * .5) + boxComponent._padding.x - (lines[0].lineHeight * .5);
					// return (INNER_HEIGHT * .5) - lines[0].lineHeight + lines[0].y;
					// return (INNER_HEIGHT * .5) - lines[0].lineHeight;
					return (INNER_HEIGHT * .5) - lines[0].lineHeight + lines[0].y;

				case 'end':
					// return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 );
					return textHeight - lines[ 0 ].lineHeight + lines[0].y - ( INNER_HEIGHT / 2 );


				case 'stretch': // @TODO : Stretch should trigger an error in own property
				case 'center':
					return ( textHeight / 2 ) - lines[ 0 ].lineHeight + lines[0].y;

			}
		} )();

		//console.log( justificationOffset );

		// Apply padding
		const padding = element._padding._value;
		const border = element._borderWidth._value;

		justificationOffset += ( - padding.x + padding.z ) / 2 + ( - border.x + border.z ) / 2;

		//

		lines.forEach( ( line ) => {

			line.y += justificationOffset;

			line.forEach( ( inline ) => {

				inline.offsetY += justificationOffset;

			} );

		} );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/AlignItemsProperty.js


/**
 *
 * @type {Array.<string>}
 */
const AlignItemsProperty_AVAILABLE_VALUES = ['start', 'center', 'end', 'stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const AlignItemsProperty_isValid = function ( value ) {

	if( AlignItemsProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) alignItems value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

class AlignItemsProperty extends SubStyleProperty {

	constructor() {

		super( 'alignItems', 'inherit', true );

		this.isValidValue = AlignItemsProperty_isValid;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignProperty.js



class TextAlignProperty extends SubStyleProperty {

	constructor() {

		super( 'textAlign', 'inherit', true );

		this.isValidValue = TextAlignProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const TextAlignProperty_AVAILABLE_VALUES = ['left', 'right', 'center', 'justify', 'justify-left', 'justify-right','justify-center'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const TextAlignProperty_isValid = function ( value ) {

	if( TextAlignProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) textAlign value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionProperty extends SubStyleProperty {

	constructor() {

		super( 'flexDirection', 'inherit', true );

		// configure

		this.isValid = FlexDirectionProperty_isValid;

	}

}

const FlexDirectionProperty_AVAILABLE_VALUES = ['row','row-reverse', 'column', 'column-reverse'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function FlexDirectionProperty_isValid( value ) {

	if( FlexDirectionProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) flexDirection value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/JustifyContentProperty.js


class JustifyContentProperty extends SubStyleProperty {

	constructor() {

		super( 'justifyContent', 'inherit', true );

		/**
		 *
		 * @override
		 */
		this.isValidValue = JustifyContentProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const JustifyContentProperty_AVAILABLE_VALUES = [ 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly' ];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function JustifyContentProperty_isValid( value ) {

	if ( JustifyContentProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) justifyContent value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}


;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/OrderProperty.js


class OrderProperty extends SubStyleProperty {

	constructor( ) {

		super( 'order', 0, true );

		this._value = 0;

		this._input = 0;

		// configure
		this._allowsInherit = false;
	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		this._needsProcess = true;

	}

	process( element ) {

		// require parent children (order) update, which will require layout update
		if( element._parent._value ) {

			// reorder children
			element._parent._value._children._needsUpdate = true;
			element._parent._value._children._needsProcess = true;

		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/PositionProperty.js



class PositionProperty extends SubStyleProperty {

	constructor( ) {

		super( 'position', 'static', true );

		// configure
		this._allowsInherit = false;

		this._value = 'static';
		this._needsUpdate = false;

		this.computeOutputValue = this._computeFromInherited;

		this.isValidValue = PositionProperty_isValid;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );

		//console.log( "Position update")
		// require parent to compute children -> bounds -> etc...
		if( element._parent._value ) element._parent._value._children._needsProcess = true;
	}

}

const PositionProperty_AVAILABLE_VALUES = ['static', 'absolute'];

function PositionProperty_isValid( value ) {

	if( PositionProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) position value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/StyleSideProperty.js


class StyleSideProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} defaultValue
	 */
	constructor( propertyId, defaultValue = null ) {

		super( propertyId, defaultValue, true );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'auto';

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._auto = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._relative = false;

		this._updateRequired = true;



	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._inline = value;

		if( this._input === this._inline ) return;

		this._parseInput();

	}

	get inline() { return this._inline; }

	_parseInput() {

		let updateRequired = true;

		// Inline has priority if set
		if( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if( this._computed !== undefined ) {

			// do not require an update if the value remains
			if( this._computed === this._input ) updateRequired = false;
			this._input = this._computed;

		}
		// or fallback on default value
		else {

			updateRequired = this._input === 'inherit';

		}

		if( updateRequired ) {

			this._auto = !this._input || this._input === 'auto';


			if ( !this._auto ) {

				// string can be percentages
				// console.log( this._input, typeof this._input, this._input.endsWith('%'))
				if ( ( typeof this._input === 'string' || this._input instanceof String ) && this._input.endsWith( '%' ) ) {


					this._relative = true;
					this._value = 0;


					const floatValue = parseFloat( this._input.replace( '%', '' ).trim() );
					if ( !isNaN( floatValue ) ) {

						this._value = floatValue / 100;

					}

				} else {

					this._relative = false;
					this._value = this._input;

				}

			} else {


				this._relative = false;

			}

			this._needsUpdate = this._updateRequired = updateRequired;

		}

	}

	update( element, out ) {

		if( this._updateRequired ) {

			this._updateRequired = false;

			if( !this._allowsInherit ) {

				this._inheritedInput = this.getInheritedInput( element );

			}

			this.computeOutputValue( element );

			// rebuild same properties on children 'inheritance'
			for ( const childUIElement of element._children._uis ) {

				childUIElement[`_${this._id}`]._needsUpdate = true;

			}

			this.output( out );

			if( element._parent._value ) element._parent._value._layouter._needsProcess = true;

		}

	}

	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._bounds._needsUpdate = true;
		element._renderer._needsRender = true;
		// element._autoSize._needsProcess = true;

	}

	getInheritedInput ( element ) {

		if( this._input !== 'inherit' && !this._auto ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	getDefaultValue() {

		return 0;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/WidthProperty.js


class WidthProperty extends StyleSideProperty {

	constructor() {

		super( 'width' );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/HeightProperty.js


class HeightProperty extends StyleSideProperty {

	constructor() {

		super( 'height' );

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/TextContentEmpty.js


class TextContentEmpty extends EmptyProperty{

	constructor() {

		super( "textContent" );

		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ set value( v ) { 	/* eslint-enable no-unused-vars */ }


	/* eslint-disable no-unused-vars */ process( element ) { /* eslint-enable no-unused-vars */

		let content = "";
		for ( let i = 0; i < element.children.length; i++ ) {
			const child = element.children[i];

			if( child.isUI ) {

				content += child.textContent;

			}

		}

		this._value = content;

	}


}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontStyleProperty.js



class FontStyleProperty extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'fontStyle', defaultValue, true );

		this.isValidValue = FontStyleProperty_isValid;

	}

}


const FontStyleProperty_AVAILABLE_VALUES = ['normal', 'italic'];
function FontStyleProperty_isValid( value ) {

	if( FontStyleProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontStyle value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontWeightProperty.js



class FontWeightProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontWeight', 'inherit', true );

		this.isValid = FontWeightProperty_isValid;
	}

}

const FontWeightProperty_AVAILABLE_VALUES = ['100','200','300','400','500','600','700','800','900','light','normal','bold','bolder'];
function FontWeightProperty_isValid( value ) {

	if( FontWeightProperty_AVAILABLE_VALUES.indexOf( value.toString() ) === -1 ) {

		console.warn( `(.style) fontWeight value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/font/TypographicFont.js
class TypographicFont {

	constructor() {

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 38;
		/** @protected */ this._name = "-";
		/** @protected */ this._charset = "";

	}

	/**
	 *
	 * @returns {number}
	 */
	get size() { return this._size; }

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return this._lineHeight; }

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return this._lineBase; }

	/**
	 *
	 * @returns {string}
	 */
	get name() { return this._name; }

	/**
	 *
	 * @returns {string}
	 */
	get charset() { return this._charset; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicFont.js


class MSDFTypographicFont extends TypographicFont{

	/**
	 *
	 * @param {import('./MSDFFontVariant').MSDFJson} json
	 */
	constructor( json ) {

		super();

		// base description
		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._name = json.info.face;

		// MSDF
		this._textureWidth = json.common.scaleW;
		this._textureHeight = json.common.scaleH;

		this._charset = json.chars.map( char => char.char ).join("");

	}

	/**
	 *
	 * @returns {number}
	 */
	get textureWidth() { return this._textureWidth; }

	/**
	 *
	 * @returns {number}
	 */
	get textureHeight() { return this._textureHeight; }

}

;// CONCATENATED MODULE: ./src/font/TypographicGlyph.js
//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * @class
 * @abstract
 */
class TypographicGlyph {

	/**
	 *
	 * @param {TypographicFont} typographicFont
	 */
	constructor( typographicFont ) {

		/** @protected */ this._char = "";
		/** @protected */ this._width = 1;
		/** @protected */ this._heigth = 1;
		/** @protected */ this._xadvance = 1;
		/** @protected */ this._xoffset = 0;
		/** @protected */ this._yoffset = 0;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = typographicFont;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get font() {

		return this._font;

	}

	/**
	 *
	 * @return {string}
	 */
	get char() {

		return this._char;

	}

	/**
	 *
	 * @returns {number}
	 */
	get width() {

		return this._width;

	}

	/**
	 *
	 * @returns {number}
	 */
	get height() {

		return this._heigth;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() {

		return this._xadvance;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xoffset() {

		return this._xoffset;

	}

	/**
	 *
	 * @returns {number}
	 */
	get yoffset() {

		return this._yoffset;

	}

	/**
	 *
	 * @param value
	 */
	set yoffset( value ) {

		this._yoffset = value;

	}

	/**
	 *
	 * @abstract
	 * @param {string} otherChar
	 * @returns {TypographicGlyph}
	 */
	/* eslint-disable no-unused-vars */ clone( otherChar ) { /* eslint-enable no-unused-vars */

		throw new Error("Abstract... Need to be implemented");

	}

	/**
	 *
	 * @abstract
	 * @returns {InlineGlyph}
	 */
	asInlineGlyph() {

		throw new Error("Abstract... Need to be implemented")

	}

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Inline.js
/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
class Inline {

	constructor() {

		/** @protected */ this._offsetX = 0;
		/** @protected */ this._offsetY = 0;

		/** @protected */ this._lineBreak = null;

		/** @protected */ this._kerning = 0;

		/** @protected */ this._fontFactor = 1;
		/** @protected */ this._fontSize = 0;

		/** @protected */ this._cumulativeWidth = 0;

		/** @protected */ this._paddingLeft = 0;
		/** @protected */ this._paddingRight = 0;

		/** @protected */ this._marginLeft = 0;
		/** @protected */ this._marginRight = 0;

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;
		this._cumulativeWidth = 0;

	}

	/**
	 * The horizontal distance this inline fills
	 * @returns {number}
	 */
	get xadvance() { return 0 }

	/**
	 * The offset x of this inline in a line
	 * @returns {number}
	 */
	get xoffset() { return 0 }

	/**
	 * The offset y of this inline in a line
	 * @returns {number}
	 */
	get yoffset() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get width() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get height() { return 0 }

	/**
	 *
	 * @param {string|null} value
	 */
	set lineBreak( value ) {

		this._lineBreak = value;

	}

	/**
	 *
	 * @returns {string|null}
	 */
	get lineBreak() { return this._lineBreak; }

	/**
	 *
	 * @returns {number}
	 */
	get anchor() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get kerning() { return this._kerning * this._fontFactor; }

	/**
	 *
	 * @param {number} value
	 */
	set kerning( value ) {

		this._kerning = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontSize() { return this._fontSize }

	/**
	 *
	 * @param {number} value
	 */
	set fontSize( value ) {

		this._fontSize = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get offsetX() { return this._offsetX; }

	/**
	 *
	 * @param value
	 */
	set offsetX( value ){

		this._offsetX = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get offsetY() { return this._offsetY; }

	/**
	 *
	 * @param {number} value
	 */
	set offsetY( value ){

		this._offsetY = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get cumulativeWidth() { return this._cumulativeWidth; }

	/**
	 *
	 * @param {number} value
	 */
	set cumulativeWidth( value ) {

		this._cumulativeWidth = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginLeft() { return this._marginLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set marginLeft( value ) {

		this._marginLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight() { return this._marginRight; }

	/**
	 *
	 * @param {number} value
	 */
	set marginRight( value ) {

		this._marginRight = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft() { return this._paddingLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingLeft( value ) {

		this._paddingLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight() { return this._paddingRight; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingRight( value ) {

		this._paddingRight = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return 0 }

	/**
	 *
	 * @param {number} value
	 */
	set fontFactor( value ){

		this._fontFactor = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontFactor() { return this._fontFactor }
}

;// CONCATENATED MODULE: ./src/font/InlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlineGlyph extends Inline {

	/**
	 *
	 * @param {TypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super();

		/** @protected */ this._typographic = characterDesc;

	}

	/**
	 *
	 * @returns {TypographicGlyph}
	 */
	get typographic(){

		return this._typographic;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	/**
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get width() { return this._typographic.width * this._fontFactor ; }

	/**
	 * @override
	 * @returns {number}
	 */
	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	/**
	 * @override
	 * @returns {number}
	 */
	get anchor() {

		const lineHeight = this._typographic.font.lineHeight;
		const lineBase = this._typographic.font.lineBase;

		return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }


}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFInlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends InlineGlyph
 */
class MSDFInlineGlyph extends InlineGlyph{

	/**
	 *
	 * @param {MSDFTypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	/**
	 *
	 * @returns {{left:number, right:number, top:number, bottom:number}|null}
	 */
	get uv() { return this.typographic.uv; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicGlyph.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


/**
 * @property {MSDFTypographicFont} _font
 */
class MSDFTypographicGlyph extends TypographicGlyph {

	/**
	 * @param {MSDFTypographicFont} fontDescription
	 * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
	 */
	constructor( fontDescription, characterData ) {

		super( fontDescription );

		this._char = characterData.char;
		this._width = characterData.width;
		this._heigth = characterData.height;

		this._xadvance = characterData.xadvance ? characterData.xadvance : this._width;
		this._xoffset = characterData.xoffset ? characterData.xoffset : 0;
		this._yoffset = characterData.yoffset ? characterData.yoffset : 0;

		// Msdf requires uvs
		this._uv = characterData.uv ? characterData.uv : null;

		if ( !isNaN( characterData.x ) ) {
			// transform absolute pixel values into uv values [0,1]
			this._uv = {
				left: characterData.x / fontDescription.textureWidth,
				right: ( characterData.x + characterData.width ) / fontDescription.textureWidth,
				top: 1 - ( ( characterData.y + characterData.height ) / fontDescription.textureHeight ),
				bottom: 1 - ( characterData.y / fontDescription.textureHeight )
			};
		}
	}


	/**
	 *
	 * @returns {{left: number, right: number, top: number, bottom: number}|null}
	 */
	get uv() {

		return this._uv;

	}

	/**
	 * @override
	 * @param {string} otherChar
	 * @returns {MSDFTypographicGlyph}
	 */
	clone( otherChar ) {

		return new MSDFTypographicGlyph( this._font, {
			char: otherChar,
			width: this._width,
			height: this._heigth,
			xadvance: this._xadvance,
			xoffset: this._xoffset,
			yoffset: this._yoffset,

			// Msdf requires uvs
			uv: null
		} );

	}


	/**
	 * @override
	 * @returns {MSDFInlineGlyph}
	 */
	asInlineGlyph() {

		return new MSDFInlineGlyph( this );

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFGeometricGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class MSDFGeometricGlyph extends external_three_namespaceObject.PlaneBufferGeometry {

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 */
	constructor( inline, element ) {


		// default w & h segments
		let wS = 1, hS=1;

		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;

		const segments = element._segments.value;

		wS = Math.ceil((inline.typographic.width / typographicFontSize) * segments );
		hS = Math.ceil((inline.typographic.height / typographicFontSize) * segments );

		super( inline.width, inline.height, wS, hS );

		// If inline has UVs
		if ( inline.uv ) {

			this._mapUVs( inline );

			this._transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this._nullifyUVs();

			this.scale( 0, 0, 1 );

			this.translate( 0, inline.fontSize / 2, 0 );

		}

		this.name = "GlyphGeometry";
		// Demo alter geometry
		// const maxOffset = inline.fontSize / 10;
		// this.translate(0 , -maxOffset + Math.random() * maxOffset*2, 0 )
		// this.rotateZ(-0.1 + 0.2 * Math.random() )

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_mapUVs( inline ) {


		const width = inline.uv.right - inline.uv.left;
		const height = inline.uv.bottom - inline.uv.top;

		const originalUvArray = this.getAttribute('uv').array.slice()

		const uvGlyph = [];
		for (let i = 0; i < originalUvArray.length; i += 2) {
			const u = originalUvArray[i];
			const v = originalUvArray[i + 1];

			uvGlyph.push(inline.uv.left + width * u);
			uvGlyph.push(inline.uv.top + height * v);
		}
		this.setAttribute('uvG', new external_three_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 * Set all UVs to 0, so that none of the glyphs on the texture will appear
	 * @private
	 * */
	_nullifyUVs() {

		// const uvAttribute = this.attributes.uv;
		//
		// for ( let i = 0; i < uvAttribute.count; i++ ) {
		//
		// 	uvAttribute.setXY( i, 0, 0 );
		//
		// }

		const uvGlyph = [];
		const length = this.getAttribute('uv').array.length;
		for ( let i = 0; i < length; i++ ) {
			uvGlyph.push(0);
		}
		this.setAttribute('uvG', new external_three_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 *
	 * @TODO: Apply pivot properties when splitText isset
	 * Gives the previously computed scale and offset to the geometry
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_transformGeometry( inline ) {

		//

		// @TODO : Evaluate this as being a property. It can wait until splitGeometry
		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl.js
/**
 *
 * @type {string}
 */
const program = /* glsl */`
attribute vec2 uvG;
varying vec2 vUvG;
`;

/* harmony default export */ const msdf_alphaglyph_pars_vertex_glsl = (program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_vertex_glsl_program = /* glsl */ `
vUvG = uvG;
`;

/* harmony default export */ const msdf_alphaglyph_vertex_glsl = (msdf_alphaglyph_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl.js
/**
 *
 * @type {string}
 */
const msdf_offsetglyph_vertex_glsl_program = /* glsl */`
gl_Position.z -= 0.00001;
`;

/* harmony default export */ const msdf_offsetglyph_vertex_glsl = (msdf_offsetglyph_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_pars_fragment_glsl_program = /* glsl */`
varying vec2 vUvG;
uniform sampler2D glyphMap;
uniform vec2 unitRange;
// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field
float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}
float screenPxRange() {

	// precomputed unitRange as recommended by Chlumsky
	// vec2 unitRange = vec2(pxRange)/vec2(textureSize(glyphMap, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUvG);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}
float tap(vec2 offsetUV) {
	vec3 msd = texture( glyphMap, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}
`;

/* harmony default export */ const msdf_alphaglyph_pars_fragment_glsl = (msdf_alphaglyph_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_fragment_glsl_program = /* glsl */`
	float alpha;
#ifdef NO_RGSS

	alpha = tap( vUvG );

#else

	// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
	// per pixel partial derivatives
	vec2 dx = dFdx(vUvG);
	vec2 dy = dFdy(vUvG);
	// rotated grid uv offsets
	vec2 uvOffsets = vec2(0.125, 0.375);
	vec2 offsetUV = vec2(0.0, 0.0);
	// supersampled using 2x2 rotated grid
	alpha = 0.0;
	offsetUV.xy = vUvG + uvOffsets.x * dx + uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.x * dx - uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG + uvOffsets.y * dx - uvOffsets.x * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.y * dx + uvOffsets.x * dy;
	alpha += tap(offsetUV);
	alpha *= 0.25;

#endif

	alpha = clamp( alpha, 0.0, 1.0 );

#ifdef INVERT_ALPHA

	alpha = 1.0 - alpha;

#endif

	diffuseColor.a *= alpha;
`;

/* harmony default export */ const msdf_alphaglyph_fragment_glsl = (msdf_alphaglyph_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/MaterialTransformers.js

/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const alphaTestTransformer = function ( target, targetProperty, value) {

	// set the value in the material
	target.alphaTest = value;

	toPreprocessorTriggerTransformer(target, 'USE_ALPHATEST', value > 0 );

}

/**
 * Transform a value as a preprocessor trigger
 * @type {import('../Mediator').MediationTransformer}
 */
const toPreprocessorTriggerTransformer = function ( target, targetProperty, value) {

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
const asPreprocessorValueTransformer = function ( target, targetProperty, value) {

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
const uniformOrUserDataTransformer = function( material, property, value ) {

	if( material.userData[property] ) {

		material.userData[property].value = value;

	}else{

		material.uniforms[property].value = value;

	}

}

const toUserDataTransformer = function( material, property, value ) {

	material.userData[property].value = value;

}

;// CONCATENATED MODULE: ./src/font/msdf/utils/MSDFFontMaterialUtils.js







/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * MSDFFontMaterialUtils provides utilities
 * for customizing other threejs or custom materials
 * into a three-mesh-ui MSDFFontMaterial
 */
class MSDFFontMaterialUtils {

	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.glyphMap = { value: materialOptions.glyphMap };
		threeMaterial.userData.unitRange = { value: new external_three_namespaceObject.Vector2() };
	}

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.glyphMap = threeMaterial.userData.glyphMap;
		shader.uniforms.unitRange = threeMaterial.userData.unitRange;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		MSDFFontMaterialUtils.injectVertexShaderChunks( shader );
		MSDFFontMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + msdf_alphaglyph_pars_vertex_glsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + msdf_alphaglyph_vertex_glsl
		)

		shader.vertexShader = shader.vertexShader.replace(
			'#include <project_vertex>',
			'#include <project_vertex>\n' + msdf_offsetglyph_vertex_glsl
		)
	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <uv_pars_fragment>',
			'#include <uv_pars_fragment>\n' + msdf_alphaglyph_pars_fragment_glsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			'#include <alphamap_fragment>\n' + msdf_alphaglyph_fragment_glsl
		)
	}



	/**
	 * Mix a threejs Material into a three-mesh-ui FontMaterial
	 * @param {typeof Material|ShaderMaterial} materialClass
	 * @returns {typeof Material|ShaderMaterial}
	 */
	static from( materialClass ) {

		return class extends materialClass {

			/**
			 *
			 * @abstract
			 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
			 */
			static get fontMaterialProperties() {
				return MSDFFontMaterialUtils.mediation;
			}

			constructor( options = {} ) {

				// same as FontMaterial extension
				MSDFFontMaterialUtils.ensureMaterialOptions( options );
				super( options );
				MSDFFontMaterialUtils.ensureDefines( this );
				MSDFFontMaterialUtils.ensureUserData( this, options );

				// defines two internal properties in order to kept
				// user allowed to use onBeforeCompile for its own stuff
				// 1- store an callback for user
				/* eslint-disable no-unused-vars */
				this._userDefinedOnBeforeCompile = (shader) => {};
				/* eslint-enable no-unused-vars */
				// 2- store the cumulative callback
				this._onBeforeCompile = this._cumulativeOnBeforeCompile;
			}

			////////////////////////////
			// OnBeforeCompile Override
			///////////////////////////

			/**
			 * Override the setter of onBeforeCompile in order to never overwrite
			 * the three-mesh-ui fontMaterial onBeforeCompile
			 * @param { (shader:any) => void }fct
			 */
			set onBeforeCompile( fct ) {
				// only store it as userDefinedCallback
				this._userDefinedOnBeforeCompile = fct;
			}

			/**
			 * Override the getter of onBeforeCompile in order to
			 * always deliver the cumulativeCallbacks to threejs
			 * @returns { (shader:any) => void }
			 */
			get onBeforeCompile() {
				return this._onBeforeCompile;
			}

			/**
			 *
			 * On before compile that first run three-mesh-ui fontMaterial
			 * then user defined onBeforeCompile
			 * @param shader
			 * @private
			 */
			_cumulativeOnBeforeCompile = ( shader ) => {
				// bind uniforms
				MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

				// inject both vertex and fragment shaders
				MSDFFontMaterialUtils.injectShaderChunks( shader );

				// user defined additional onBeforeCompile
				this._userDefinedOnBeforeCompile( shader );
			}
		}
	}

	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return mediationDefinitions;

	}

}

/**
 * Convert a fontVariant to a material glyphMap texture
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _fontToGlyphMapTransformer = function( fontMaterial, materialProperty, value) {

	const texture = value ? value.texture : null;
	const unitRange = value ? value.unitRange : new external_three_namespaceObject.Vector2();

	if( fontMaterial[materialProperty] !== undefined ) {

		fontMaterial.glyphMap = texture;
		fontMaterial.unitRange = unitRange;
		return;
	}

	if( fontMaterial.userData && fontMaterial.userData.glyphMap ) {

		fontMaterial.userData.glyphMap.value = texture;
		fontMaterial.userData.unitRange.value = unitRange;

	}

}

/**
 *
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _RGSSTransformer = function( fontMaterial, materialProperty, value){

	if ( value && value !== 'antialiased' ) {

		fontMaterial.defines['NO_RGSS'] = '';

	} else {

		delete fontMaterial.defines['NO_RGSS'];

	}

	fontMaterial.needsUpdate = true;

}


/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const mediationDefinitions = {
	clippingPlanes: { m: 'clippingPlanes' },
	fontAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	fontSide: { m: 'side' },
	font: { m: "glyphMap", t: _fontToGlyphMapTransformer },
	color: { m: 'color' },
	fontOpacity: { m: 'opacity' },
	fontSmooth: { m: 'NO_RGSS', t: _RGSSTransformer },
	invertAlpha: { m: 'INVERT_ALPHA', t: toPreprocessorTriggerTransformer },
}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderLib/msdf-fontmaterial.glsl.js






/**
 *
 * @type {string}
 */
const vertexShader = /* glsl */`
${msdf_alphaglyph_pars_vertex_glsl}
#include <clipping_planes_pars_vertex>
void main() {
	${msdf_alphaglyph_vertex_glsl}
	#include <begin_vertex>
	#include <project_vertex>
	${msdf_offsetglyph_vertex_glsl}
	#include <clipping_planes_vertex>
}
`

/**
 *
 * @type {string}
 */
const fragmentShader = /* glsl */`
uniform vec3 diffuse;
uniform float opacity;
${msdf_alphaglyph_pars_fragment_glsl}
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	// instead of <color_fragment> : vec4 diffuseColor
	vec4 diffuseColor = vec4( diffuse, opacity );
	${msdf_alphaglyph_fragment_glsl}
	#include <alphatest_fragment>
	// instead of <output_fragment>
	gl_FragColor = diffuseColor;
	#include <clipping_planes_fragment>
}
`

;// CONCATENATED MODULE: ./src/font/msdf/materials/MSDFFontMaterial.js




// JSDoc related import
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

const ALPHA_TEST = 0.02;


/**
 * This material implements the msdf rendering shader
 */
class MSDFFontMaterial extends external_three_namespaceObject.ShaderMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}

	constructor( materialOptions = {} ) {

		super( {

			uniforms: {
				'glyphMap': { value: null }, // texture
				'diffuse': { value: null }, // vec3
				'opacity': { value: 1 },
				'unitRange': { value: new external_three_namespaceObject.Vector2(0,0) }, // vec2
				'alphaTest': { value: ALPHA_TEST },
			},
			transparent: true,
			clipping: true,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			extensions: {
				derivatives: true
			},
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = materialOptions.noRGSS || false;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}




	/**
	 * The color will be the diffuse uniform
	 * @returns {Vector2}
	 */
	get unitRange() {

		return this.uniforms.unitRange.value;

	}

	/**
	 *
	 * @param {Vector2} v
	 */
	set unitRange( v ) {

		this.uniforms.unitRange.value.copy( v );

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get glyphMap() {

		return this.uniforms.glyphMap.value;

	}

	/**
	 *
	 * @param {Texture} v
	 */
	set glyphMap( v ) {

		this.uniforms.glyphMap.value = v;

	}

	/**
	 * Is this a default fontMaterial instance
	 * @returns {boolean}
	 */
	get isDefault() {

		return this.constructor === MSDFFontMaterial;

	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {
		return this.uniforms.alphaTest.value;
	}

	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFFontVariant.js







//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * @extends {FontVariant}
 */
class MSDFFontVariant extends font_FontVariant {

	constructor( weight, style, json, texture ) {

		super(weight, style);

		// provide default values
		this._unitRange = new external_three_namespaceObject.Vector2( 1, 1 );

		if ( json.pages ) {

			this._buildData( json );

		} else {

			_loadJson( this, json );

		}

		if ( texture instanceof external_three_namespaceObject.Texture ) {

			this._buildTexture( texture );

		} else {

			_loadTexture( this, texture );

		}

		this._defaultMaterialClass = MSDFFontMaterial;


		this._checkReadiness();

	}


	get texture() {

		return this._texture;

	}

	get unitRange() {

		return this._unitRange;

	}

	/**
	 * @param {Function.<Material|ShaderMaterial>} v
	 * @override
	 */
	set fontMaterial( v ) {

		this._defaultMaterialClass = v;

	}

	/**
	 *
	 * @override
	 * @returns {Function.<Material|ShaderMaterial>}
	 */
	get fontMaterial() {

		return this._defaultMaterialClass;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildData( json ) {

		this._font = new MSDFTypographicFont( json );

		/**
		 *
		 * @type {import('../FontVariant').KerningPairs}
		 * @private
		 */
		this._kernings = this._buildKerningPairs( json );
		this._chars = this._buildCharacters( json );

		this._chars[ " " ] = this._buildCharacterWhite( json );
		this._chars[ "\n" ] = this._buildCharacterWhite( json, '\n' , 0.001, 1);
		this._chars[ "\t" ] = this._buildCharacterWhite( json, '\t' , 4, 1);

		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._distanceRange = json.distanceField.distanceRange;

		// precompute the unit range as recommended by chlumsky
		// @see https://github.com/Chlumsky/msdfgen
		// "I would suggest precomputing unitRange as a uniform variable instead of pxRange for better performance."
		this._unitRange = new external_three_namespaceObject.Vector2(this._distanceRange, this._distanceRange)
			.divide( new external_three_namespaceObject.Vector2( json.common.scaleW, json.common.scaleH ) );

	}

	/**
	 *
	 * @param texture
	 * @private
	 */
	_buildTexture( texture ) {

		texture.generateMipmaps = false;
		texture.minFilter = external_three_namespaceObject.LinearFilter;
		texture.magFilter = external_three_namespaceObject.LinearFilter;

		texture.needsUpdate = true;

	}

	/**
	 * @abstract
	 * @protected
	 * @param {string} missingChar
	 * @returns {string|null}
	 */
	_getFallbackCharacter( missingChar ) {
		return font_FontLibrary.missingCharacter( this, missingChar );
	}

	/**
	 *
	 * @override
	 * @param {import('./../InlineGlyph').default|import('./MSDFInlineGlyph').default} inline
	 * @param {import('./../../core/elements/MeshUIBaseElement').default} element
	 * @returns {MSDFGeometricGlyph}
	 */
	getGeometricGlyph( inline, element ) {

		return new MSDFGeometricGlyph( inline, element );

	}

	/**
	 * Abstraction implementation
	 *
	 * @returns {boolean}
	 * @private
	 */
	_readyCondition() {

		return this._chars && this._texture;

	}

	/**
	 * Ensure that each font variant has its kerning dictionary
	 * @see src/font/msdf/FontVariantMSDF.js for an implementation
	 *
	 * @param {MSDFJson} json
	 * @returns {import('../FontVariant').KerningPairs}
	 * @private
	 */
	_buildKerningPairs( json ) {

		const friendlyKernings = {};

		// Loop through each kernings pairs defined in msdf json
		for ( let i = 0; i < json.kernings.length; i++ ) {

			const kerning = json.kernings[ i ];

			// ignore zero kerned glyph pair
			if ( kerning.amount === 0 ) continue;

			// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
			const glyphPair = String.fromCharCode( kerning.first, kerning.second );

			// This would then be available for fast access
			friendlyKernings[ glyphPair ] = kerning.amount;

		}

		// update the font to keep it
		return friendlyKernings;

	}


	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildCharacters( json ) {

		const friendlyChars = {};

		for ( let i = 0; i < json.chars.length; i++ ) {
			const charOBJ = json.chars[ i ];

			friendlyChars[ charOBJ.char ] = new MSDFTypographicGlyph( this._font, charOBJ );

		}

		return friendlyChars;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @param char
	 * @param scaleX
	 * @param scaleY
	 * @private
	 */
	_buildCharacterWhite( json, char = " ", scaleX = 1, scaleY = 1 ) {
		return new MSDFTypographicGlyph( this._font,
			{
				char,
				width: (json.info.size / 3)*scaleX,
				height: (json.info.size * 0.7)*scaleY,
			});
	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_alterElementProperties( element ) { /* eslint-enable no-unused-vars */ }
}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


/**
 * Load a msdf json then build fontVariant data
 *
 * @param {FontVariant} fontVariant
 * @param {string} jsonUrl
 * @private
 */
function _loadJson( fontVariant, jsonUrl ) {

	new external_three_namespaceObject.FileLoader().setResponseType( 'json' ) .load( jsonUrl, ( response ) => {

		fontVariant._buildData( response );
		fontVariant._checkReadiness();

	} );

}

/**
 * Load a msdf texture then build texture
 *
 * @param {FontVariant} fontVariant
 * @param {string} textureUrl
 * @private
 */
function _loadTexture( fontVariant, textureUrl ) {

	fontVariant._texture = new external_three_namespaceObject.TextureLoader().load( textureUrl, ( texture ) => {

		fontVariant._buildTexture( texture );
		fontVariant._checkReadiness();

	} );

}

/***********************************************************************************************************************
 * MSDF FILE FORMAT DESCRIPTION
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 **********************************************************************************************************************/

/**
 * @typedef {Object} MSDFJson
 *
 * @property {MSDFJsonInfo} info
 * @property {MSDFJsonCommon} common
 * @property {Array.<MSDFJsonPage>} pages
 * @property {Array.<MSDFJsonChar>} chars
 * @property {{fieldType:string, distanceRange:number}} distanceField
 * @property {Array.<MSDFJsonKerning>} kernings
 */

/**
 *
 * @typedef {Object} MSDFJsonInfo
 *
 * @property {string} face This is the name of the true type font.
 * @property {number} size The size of the true type font.
 * @property {boolean} bold The font is bold.
 * @property {boolean} italic The font is italic.
 * @property {string[]} charset The name of the OEM charset used (when not unicode).
 * @property {boolean} unicode 	Set to 1 if it is the unicode charset.
 * @property {number} stretchH The font height stretch in percentage. 100% means no stretch.
 * @property {number} smooth Set to 1 if smoothing was turned on.
 * @property {number} aa The supersampling level used. 1 means no supersampling was used.
 * @property {Array.<number>} padding TThe padding for each character (up, right, down, left).
 * @property {Array.<number>} spacing The spacing for each character (horizontal, vertical).
 * @property {number} outline (not found) The outline thickness for the characters.
 */

/**
 *
 * @typedef {Object} MSDFJsonCommon
 *
 * @property {number} lineHeight This is the distance in pixels between each line of text.
 * @property {number} base The number of pixels from the absolute top of the line to the base of the characters.
 * @property {number} scaleW The width of the texture, normally used to scale the x pos of the character image.
 * @property {number} scaleH The height of the texture, normally used to scale the y pos of the character image.
 * @property {number} pages The number of texture pages included in the font.
 * @property {boolean} packed
 * @property {number} alphaChnl
 * @property {number} redChnl
 * @property {number} greenChnl
 * @property {number[]} blueChnl
 */

/**
 * @typedef {Object} MSDFJsonPage
 *
 * @property {string} id The page id.
 * @property {string} file The texture file name.
 */

/**
 *
 * @typedef {Object} MSDFJsonChar
 *
 * @property {number} id The character id.
 * @property {number} index The character index.
 * @property {string} char The character.
 * @property {number} x The left position of the character image in the texture.
 * @property {number} y The top position of the character image in the texture.
 * @property {number} width The width of the character image in the texture.
 * @property {number} height The height of the character image in the texture.
 * @property {number} xoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} yoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} xadvance How much the current position should be advanced after drawing the character.
 * @property {string} page The texture page where the character image is found.
 * @property {number} chnl The texture channel where the character image is found (1 = blue, 2 = green, 4 = red, 8 = alpha, 15 = all channels).
 * @property {Object} [uv]
 * /



/**
 *
 * @typedef {Object} MSDFJsonKerning
 *
 * @property {number} first The first character id.
 * @property {number} second The second character id.
 * @property {number} amount How much the x position should be adjusted when drawing the second character immediately following the first.
 *
 */

;// CONCATENATED MODULE: ./src/font/FontFamily.js


//JSDoc related imports

/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class FontFamily extends external_three_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {string} name
	 */
	constructor( name ) {

		super();

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._name = name;

		/**
		 *
		 * @type {Array.<FontVariant>}
		 * @private
		 */
		this._variants = [];

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._isReady = false;

	}

	get isReady() { return this._isReady; }

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 * @param {string|Object} json
	 * @param {string|Texture} texture
	 * @param {boolean} [override=false]
	 */
	addVariant( weight, style, json, texture, override = false){

		if( override || !this.getVariant( weight, style) ){

			this._isReady = false;

			const newVariant = new MSDFFontVariant( weight, style, json, texture);

			this._variants.push( newVariant );

			if( !newVariant.isReady ){

				newVariant.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addVariant() - Variant(${weight}, ${style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {FontVariant} variantImplementation
	 * @param {boolean} [override=false]
	 */
	addCustomImplementationVariant( variantImplementation, override = false){

		if( override || !this.getVariant( variantImplementation.weight, variantImplementation.style) ){

			this._isReady = false;

			this._variants.push( variantImplementation );

			if( !variantImplementation.isReady ){

				variantImplementation.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addCustomImplementationVariant() - Variant(${variantImplementation.weight}, ${variantImplementation.style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {string} weight
	 * @param {string} style
	 * @returns {FontVariant|null}
	 */
	getVariant( weight, style ){

		return this._variants.find( fontVariant => fontVariant.weight === weight && fontVariant.style === style );

	}

	/**
	 *
	 * @return {string}
	 */
	get name(){ return this._name; }

	_checkReadiness = () => {

		if( this._variants.every( v => v.isReady ) ) {

			FontFamily_setReady( this );

		}

	}

}

const FontFamily_readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontFamily} fontFamily
 * @private
 */
function FontFamily_setReady( fontFamily ) {

	fontFamily._isReady = true;
	fontFamily.dispatchEvent( FontFamily_readyEvent );

}

;// CONCATENATED MODULE: ./src/font/FontLibrary.js


// JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


const _fontFamilies = {};

/* eslint-disable no-unused-vars */

/**
 *
 * @param {FontFamily} fontFamily
 * @returns {Promise<unknown>}
 */
const prepare = function ( fontFamily ) {

	/**
	 *
	 * @type {FontFamily[]}
	 */
	const families = [ ...arguments ];

	// Check all family are right instance
	families.forEach( f => {

		if( !(f instanceof FontFamily) ) {

			throw new Error(`FontLibrary::prepare() - One of the provided parameter is not a FontFamily. Instead ${typeof f} given.`);

		}

	})

	/**
	 * Check that all provided families are loaded
	 * @returns {boolean}
	 */
	const areAllLoaded = function() {

		return families.every( f => f.isReady );

	}

	// @TODO: Should handle possible rejection
	return new Promise((resolve,reject)=>{

		// Direct resolve if all loaded
		if ( areAllLoaded() ){

			resolve();

		} else {

			// Add listener on each family not ready
			for ( let i = 0; i < families.length; i++ ) {

				const family = families[ i ];
				if( !family.isReady ){

					family.addEventListener( "ready" , ()=> {

						// Resolve if all other families are loaded
						if( areAllLoaded() ) {

							resolve();

						}

					});

				}

			}

		}

	});

}

/* eslint-enable no-unused-vars */


/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const addFontFamily = function ( name ) {

	if ( _fontFamilies[ name ] ) {
		console.error( `FontLibrary::addFontFamily - Font('${name}') is already registered` );
	}

	_fontFamilies[ name ] = new FontFamily( name );

	return _fontFamilies[ name ];

}

/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const getFontFamily = function( name ) {

	return _fontFamilies[ name ];

}


/**
 *
 * @param { (fontVariant:FontVariant, character:string ) => string|null } handler
 */
const setMissingCharacterHandler = function ( handler ) {

	_missingCharacterHandler = handler;

}

/**
 *
 * @type { (fontVariant:FontVariant, character:string ) => string|null }
 * @private
 */
let _missingCharacterHandler = function ( fontVariant, character ) {

	console.error( `The character '${character}' is not included in the font characters set.` );

	// return a glyph has fallback
	return " ";

};

/**
 *
 * @param {FontVariant} fontVariant
 * @param {string} character
 *
 * @returns {string}
 */
function missingCharacter( fontVariant, character ) {

	// Execute the user defined handled
	return _missingCharacterHandler( fontVariant, character );

}


//

const FontLibrary = {
	addFontFamily,
	getFontFamily,
	prepare,
	setMissingCharacterHandler,
	missingCharacter
};

/* harmony default export */ const font_FontLibrary = (FontLibrary);

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontFamilyProperty.js





class FontFamilyProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input instanceof FontFamily ) {

			this._value = this._input;

		} else if ( this._input === 'inherit' ) {

			// do nothing

		} else if ( typeof this._input === 'string' ) {

			// string - family
			const fontFamily = font_FontLibrary.getFontFamily( this._input );

			if( fontFamily ) {

				this._value = fontFamily;

			} else {

				console.warn( `(.style) fontFamily, the font '${this._input}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamily|null}
	 */
	get value() { return this._value; }

	getInheritedInput ( element ) {

		if( this._input !== 'inherit' ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LineHeightProperty.js


class LineHeightProperty extends SubStyleProperty {

	/**
	 *
	 */
	constructor() {

		super( 'lineHeight', 'inherit', true );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/WhiteSpaceProperty.js



class WhiteSpaceProperty extends SubStyleProperty {

	constructor() {

		super( 'whiteSpace', 'inherit' );

		this.isValidValue = WhiteSpaceProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const WhiteSpaceProperty_AVAILABLE_VALUES = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function WhiteSpaceProperty_isValid( value ) {

	if( WhiteSpaceProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) whiteSpace value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LetterSpacingProperty.js


class LetterSpacingProperty extends SubStyleProperty {

	constructor() {

		super( 'letterSpacing', 'inherit', true );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontSizeProperty.js


class FontSizeProperty extends SubStyleProperty {

	constructor() {

		super( 'fontSize', 'inherit', true );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsProperty.js


class SegmentsProperty extends BaseProperty {

	constructor() {

		super( 'segments', 1, false );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/InvertAlphaProperty.js


/**
 * Class definition
 * @property {boolean|"inherit"} value - propriety description
 *
 */
class InvertAlphaProperty extends InheritableProperty {

	constructor() {

		super( 'invertAlpha', 'inherit' );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningProperty.js



class FontKerningProperty extends SubStyleProperty {

	constructor() {

		super( 'fontKerning', 'inherit' );

		this.isValidValue = FontKerningProperty_isValid;

	}

}


const FontKerningProperty_AVAILABLE_VALUES = ['normal', 'none', 'inherit'];

function FontKerningProperty_isValid( value ) {

	if( FontKerningProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontKerning value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableBooleanProperty.js


/**
 * @property {boolean|"inherit"} value
 */
class InheritableBooleanProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId) {

		super( propertyId, 'inherit', true );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableMaterialProperty.js



/**
 * @property {Material|null|"inherit"} value
 */
class InheritableMaterialProperty extends InheritableProperty {

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

;// CONCATENATED MODULE: ./src/core/elements/MeshUIBaseElement.js


















































//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class MeshUIBaseElement extends external_three_namespaceObject.Object3D {

	/**
	 *
	 * @param {Properties} properties
	 * @param {Options} values
	 */
	constructor( properties, values) {

		super();

		Object.defineProperties( this, {
				isUI: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		/**
		 *
		 * @type {Mesh|null}
		 * @internal
		 */
		this._backgroundMesh = null;



		/**
		 *
		 * @type {Material}
		 * @internal
		 */
		this._backgroundMaterial = null;

		/**
		 *
		 * @type {Material}
		 * @protected
		 */
		this._backgroundCustomDepthMaterial = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
		 * @protected
		 */
		this._backgroundMaterialMediation = {};

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._backgroundMeshMediation = {
			backgroundCastShadow: { m: 'castShadow' },
			backgroundReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		/**
		 *
		 * @type {Mesh|null}
		 * @internal
		 */
		this._fontMesh = null;

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @internal
		 */
		this._fontMaterial = new InheritableMaterialProperty('fontMaterial');

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @private
		 */
		this._fontCustomDepthMaterial = new InheritableMaterialProperty('fontCustomDepthMaterial');

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._fontMeshMediation = {
			fontMaterial: { m: 'material' },
			fontCustomDepthMaterial: { m : 'customDepthMaterial', t:directTransferNotNull},
			fontCastShadow: { m: 'castShadow' },
			fontReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		// Children lists

		/**
		 *
		 * @type {EmptyProperty|ChildrenBox|ChildrenText}
		 * @internal
		 */
		this._children = properties.children ? new properties.children : new EmptyProperty("children");
		this._parent = new ParentProperty();

		// update parentUI when this component will be added or removed
		this.addEventListener( 'added', this._rebuildParentUI );
		this.addEventListener( 'removed', this._rebuildParentUI );

		//material properties
		this._backgroundSide = new SideProperty( 'backgroundSide' );
		this._fontSide = new SideProperty( 'fontSide' );
		this._backgroundAlphaTest = new NumberProperty( 'backgroundAlphaTest', 0.02 );
		this._fontAlphaTest = new NumberProperty( 'fontAlphaTest', 0.02 );

		// mesh properties
		this._visible = new VisibleProperty( 'visible', true );

		this._backgroundCastShadow = new InheritableBooleanProperty( 'backgroundCastShadow' );
		this._fontCastShadow = new InheritableBooleanProperty( 'fontCastShadow' );
		this._backgroundReceiveShadow = new InheritableBooleanProperty( 'backgroundReceiveShadow' );
		this._fontReceiveShadow = new InheritableBooleanProperty( 'fontReceiveShadow' );

		// @TODO: RenderOrder for background and fonts
		this._renderOrder = new RenderOrderProperty();

		// @TODO : background & Text
		this._segments = properties.segments ? new properties.segments() : new SegmentsProperty();


		/**
		 *
		 * @type {BoundsBox|BoundsText|EmptyProperty}
		 * @ignore
		 * @internal
		 */
		this._bounds = properties.bounds ? new properties.bounds() : new EmptyProperty("bounds");

		// styles ---;

		this._order = new OrderProperty();

		this._padding = new PaddingProperty();
		this._margin = new MarginProperty();


		this._position = new PositionProperty();

		/**
		 *
		 * @type {FlexDirectionProperty}
		 * @internal
		 */
		this._flexDirection = properties.flexDirection ? new properties.flexDirection() : new FlexDirectionProperty();

		this._justifyContent = properties.justifyContent ? new properties.justifyContent() : new JustifyContentProperty();

		this._alignItems = properties.alignItems ? new properties.alignItems() : new AlignItemsProperty();

		this._display = new Display( 'flex' );

		this._boxSizing = new BoxSizing( 'border-box' );
		this._width = new WidthProperty();
		this._height = new HeightProperty();

		this._backgroundColor = properties.backgroundColor ? new properties.backgroundColor() : new BackgroundColorProperty();
		this._backgroundOpacity = new StyleFactorProperty('backgroundOpacity', 0.5);
		this._backgroundImage = new BackgroundImage();
		this._backgroundSize = new BackgroundSize( 'cover' );

		this._color = properties.color ? new properties.color() : new StyleColorProperty('color', 'inherit');
		this._fontOpacity = new StyleFactorProperty( 'fontOpacity', 'inherit');

		this._whiteSpace = properties.whiteSpace ? new properties.whiteSpace() : new WhiteSpaceProperty();

		this._fontFamily = properties.fontFamily ? new properties.fontFamily() : new FontFamilyProperty();
		this._fontStyle = properties.fontStyle ? new properties.fontStyle() : new FontStyleProperty( 'normal' );
		this._fontWeight = properties.fontWeight ? new properties.fontWeight() : new FontWeightProperty();
		this._fontSize = properties.fontSize ? new properties.fontSize() : new FontSizeProperty();

		this._lineHeight = properties.lineHeight ? new properties.lineHeight() : new LineHeightProperty();

		this._fontKerning = properties.fontKerning ? new properties.fontKerning() : new FontKerningProperty();
		this._letterSpacing = properties.letterSpacing ? new properties.letterSpacing() : new LetterSpacingProperty();

		this._overflow = new Overflow( 'visible' );

		this._borderRadius = new BorderRadius( 0 );
		this._borderWidth = new BorderWidth( 0 );
		this._borderColor = new StyleColorProperty( 'borderColor', 0xff00ff );
		this._borderOpacity = new StyleFactorProperty( 'borderOpacity', 1);

		// styles ---;

		this._font = new FontProperty();

		this._lineBreak = properties.lineBreak ? new properties.lineBreak() : new EmptyProperty("lineBreak");

		/**
		 *
		 * @type {TextContentEmpty|TextContentText|TextContentInline}
		 * @internal
		 */
		this._textContent = properties.textContent ? new properties.textContent() : new TextContentEmpty();

		/**
		 *
		 * @type {GlyphsProperty}
		 * @internal
		 */
		this._glyphs = properties.glyphs ? new properties.glyphs() : new EmptyProperty("glyphs");

		this._inlines = properties.inlines ? new properties.inlines() : new EmptyProperty("inlines");


		/**
		 *
		 * @type {BoxLayouter|TextLayouter|EmptyProperty}
		 * @internal
		 */
		this._layouter = properties.layouter ? new properties.layouter() : new EmptyProperty("layouter");

		this._inlineJustificator = new InlineJustificator();

		this._textAlign = properties.textAlign ? new properties.textAlign() : new TextAlignProperty();

		this._autoSize = properties.autoSize ? new properties.autoSize() : new EmptyProperty("autoSize");

		this._renderer = properties.renderer ? new properties.renderer() : new EmptyProperty("renderer");

		this._offset = new OffsetProperty();

		// adds
		this._invertAlpha = new InvertAlphaProperty();
		this._fontSmooth = properties.fontSmooth ? new properties.fontSmooth() : new FontSmoothProperty();

		/**
		 *
		 * @type {Array.<BaseProperty>}
		 * @internal
		 */
		this._components = [

			this._children,
			this._parent,



			this._fontFamily,
			this._fontStyle,
			this._fontWeight,
			this._font,

			this._whiteSpace,

			this._textContent,
			this._glyphs,

			this._inlines,

			this._visible,

			// Meshes interfaces
			this._backgroundSide,
			this._fontSide,
			this._backgroundAlphaTest,
			this._fontAlphaTest,
			this._backgroundCastShadow,
			this._fontCastShadow,
			this._backgroundReceiveShadow,
			this._fontReceiveShadow,
			this._renderOrder,
			this._segments,
			// styles ---;

			this._padding,
			this._margin,
			this._width,
			this._height,
			this._borderWidth,
			this._boxSizing,

			this._bounds,

			this._position,


			this._flexDirection,
			this._justifyContent,
			this._alignItems,
			this._order,


			this._display,
			this._backgroundColor,
			this._backgroundOpacity,
			this._backgroundImage,
			this._backgroundSize,
			this._fontOpacity,
			this._color,


			// font : update order : WhiteSpace > Glyph > Inlines > Kerning > newlineBreakability > LineBreak > FontSize
			// font : process order : ??
			// this._font,

			this._fontSize,
			this._lineHeight,
			this._fontKerning,
			this._letterSpacing,


			this._overflow,

			this._borderRadius,
			this._borderColor,
			this._borderOpacity,

			// this._styles,
			// styles ---;
			this._lineBreak,
			this._offset,
			this._layouter,

			this._inlineJustificator,
			this._textAlign,

			this._autoSize,

			// !! this._renderer renderer MUST NOT BE in components !!

			this._invertAlpha,
			this._fontSmooth,

			this._fontMaterial,
			this._fontCustomDepthMaterial,
			this._renderer
		]


		/**
		 *
		 * @type {*[]}
		 * @private
		 */
		this._onAfterUpdates = [];


		// breaks inheritance chains
		// if( !values ) values = {};
		if( !values.backgroundSide ) values.backgroundSide = 0; // FrontSide


		if( values ) this.set( values );

	}


	///////////////
	///  UPDATE
	///////////////

	update( ) {


		// console.log( "Update Element", this.name , this.constructor.name );

		const out = {};
		for ( const component of this._components ) {

			if( component._needsUpdate ) {

				// console.log( '    ', component.constructor.name)
				component.update( this, out );
				component._needsUpdate = false;

			}

		}

		if( out.size ) {
			console.log( out.size );
		}

		this._transferToBackgroundMesh( out );
		this._transferToFontMesh( out );

		this._transferToBackgroundMaterial( out );
		this._transferToFontMaterial( out );


		// update children
		for ( const child of this._children._uis ) {
			child.update();
		}

	}

	process() {

		// process first time : Natural size
		for ( const child of this._children._uis ) {
			child.process();
		}


		// console.log( this.name );
		for ( const component of this._components ) {

			if( component._needsProcess ) {

				// console.log( '    ', component.id );
				component.process( this );
				component._needsProcess = false;

			}

		}

	}

	render() {

		for ( let i = 0; i < this._components.length; i++ ) {
			const component = this._components[ i ];
			if( component._needsRender ) {
				component.render( this );
				component._needsRender = false;
			}
		}

		// render all children
		for ( const child of this._children._uis ) {
			child.render();
		}

	}


	/**
	 *
	 * @param {Options} options
	 */
	set( options ) {

		// Retro compatibility, when not recommended way
		// 2. < v7.x.x way
		if( options.fontTexture ) {

			console.warn( "ThreeMeshUI::set( {fontTexture} ) is deprecated. Please use fontLibrary to register font families and variants.")

			if( options.fontFamily ) {

				// Set from old way, check if that family is already registered
				const fontName = options.fontFamily.pages ? options.fontFamily.info.face : options.fontFamily;

				let fontFamily = font_FontLibrary.getFontFamily( fontName );

				if ( !fontFamily ) {

					const fontStyle = options.fontStyle ? options.fontStyle : 'normal';
					const fontWeight = options.fontWeight ? options.fontWeight : '400';

					fontFamily = font_FontLibrary.addFontFamily( fontName )
						.addVariant( fontWeight, fontStyle, options.fontFamily, options.fontTexture );

				}

				options['fontFamily'] = fontFamily;

				delete options['fontTexture'];

			}

		}



		for ( let prop of Object.keys( options ) ) {

			const value = options[prop];

			// 1. replace deprecated properties
			switch ( prop ){
				case 'contentDirection':
					console.warn('ThreeMeshUI v7xx: property `contentDirection` is deprecated and has been renamed as `flexDirection`');
					prop = 'flexDirection';
					break;

				case 'interLine':
					console.warn('ThreeMeshUI v7xx: property `interLine` is deprecated and has been renamed as `lineHeight`');
					prop = 'lineHeight';
					break;

				case 'content':
					console.warn( 'ThreeMeshUI v7xx: property `content` is deprecated and has been renamed as `textContent`');
					prop = 'textContent';
					break;

				case 'fontColor':
					console.warn( 'ThreeMeshUI v7xx: property `fontColor` is deprecated and has been renamed as `color`');
					prop = 'color';
					break;

				case 'hiddenOverflow':
					console.warn( 'ThreeMeshUI v7xx: property `hiddenOverflow` is deprecated and has been renamed as `overflow`');
					prop = 'overflow';
					break;

				case 'backgroundTexture':
					console.warn( 'ThreeMeshUI v7xx: property `backgroundTexture` is deprecated and has been renamed as `backgroundImage`');
					prop = 'backgroundImage';
					break;

				case 'alignContent':
					console.warn( 'ThreeMeshUI v7xx: property `alignContent` is deprecated and has been renamed as `alignItems`');
					prop = 'alignItems';
					break;

				case "borderTopColor":
				case "borderBottomColor":
				case "borderLeftColor":
				case "borderRightColor":
					prop = 'borderColor';
					break;
			}

				switch ( prop ) {

				// properties

				// As textContent property might alter the hierarchy, do not wait until update
				// 	case 'textContent' :

					case 'fontSmooth':
					case 'renderOrder':
					case 'segments' :
					case 'visible' :
					case 'offset':
						this[`_${prop}`].value = value;
						break;

					// styles properties
					case 'flexDirection' :
					case 'justifyContent' :
					case 'alignItems' :
					case 'color' :
					case 'fontFamily' :
					case 'fontOpacity' :
					case 'fontKerning' :
					case 'fontSize' :
					case 'fontStyle' :
					case 'fontWeight' :
					case 'textAlign' :
					case 'letterSpacing' :
					case 'lineHeight' :
					case 'whiteSpace':
					case 'breakOn': // Not valid anymore?
					case 'width' :
					case 'height' :
					case 'padding':
					case 'margin' :
					case 'backgroundColor' :
					case 'backgroundOpacity' :
					case 'backgroundImage' :
					case 'backgroundSize' :
					case 'borderColor' :
					case 'borderOpacity' :
					case 'borderRadius' :
					case 'borderWidth':
					case 'overflow' :
					case 'order':
					case 'boxSizing':
						if( this[`_${prop}`] ){
							this[`_${prop}`].inline = value;
						}
						break;

					case 'paddingTop':
						this._padding.top = value;
						break;
					case 'paddingRight':
						this._padding.right = value;
						break;
					case 'paddingBottom':
						this._padding.bottom = value;
						break;
					case 'paddingLeft':
						this._padding.left = value;
						break;

					case 'marginTop':
						this._margin.top = value;
						break;
					case 'marginRight':
						this._margin.right = value;
						break;
					case 'marginBottom':
						this._margin.bottom = value;
						break;
					case 'marginLeft':
						this._margin.left = value;
						break;

					case 'borderTopWidth':
						this._borderWidth.top = value;
						break;
					case 'borderRightWidth':
						this._borderWidth.right = value;
						break;
					case 'borderBottomWidth':
						this._borderWidth.bottom = value;
						break;
					case 'borderLeftWidth':
						this._borderWidth.left = value;
						break;

					case 'borderTopLeftRadius':
						this._borderRadius.topLeft = value;
						break;
					case 'borderTopRightRadius':
						this._borderRadius.topRight = value;
						break;
					case 'borderBottomRightRadius':
						this._borderRadius.bottomRight = value;
						break;
					case 'borderBottomLeftRadius':
						this._borderRadius.bottomLeft = value;
						break;


					// Back & Front linked properties
					case 'side':
					case 'castShadow':
					case 'receiveShadow':
						const upperCamelCaseProperty = prop.charAt(0).toUpperCase()+prop.substr(1);
						this[`_background${upperCamelCaseProperty}`].value = value;
						this[`_font${upperCamelCaseProperty}`].value = value;
						break;


						// Meshes & material properties
					case 'fontSide':
					case 'backgroundSide':
					case 'fontCastShadow':
					case 'backgroundCastShadow':
					case 'fontReceiveShadow':
					case 'backgroundReceiveShadow':
					case 'fontMaterial':
					case 'fontCustomDepthMaterial':
						this[`_${prop}`].value = value;
						break;


					default:

						if( this[ prop ] !== undefined ) {
							this[ prop ] = value
						}else if( this[`_${prop}`] !== undefined ) {
							this[`_${prop}`].value = value;
						} else {
							// error
						}
				}

		}

	}

	get ( property ) {

		switch ( property ) {

			case 'overflow':
			case 'width' :
			case 'height' :
				return this[`_${property}`].inline;
		}

	}

	/**
	 * Filters children in order to compute only one times children lists
	 * @private
	 */
	_rebuildChildrenLists() {

		//console.log( this.name, 'child added' );
		this._children._needsUpdate = true;

	}

	/**
	 * Try to retrieve parentUI after each structural change
	 * @protected
	 */
	_rebuildParentUI = () => {

		this._parent._needsUpdate = true;

		// set elements as root
		if ( this.parent && !this.parent.isUI ) {

			UpdateManager.register( this );
			this.activatePseudoState('root');

		} else {

			UpdateManager.remove( this );
			this.deactivatePseudoState('root');
		}


	};

	/**
	 * When the user calls component.add, it registers for updates,
	 * then call THREE.Object3D.add.
	 */

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		let addedUIChildren = false;
		for ( let i = 0; i < arguments.length; i++ ) {

			super.add( arguments[ i ] );

			if( arguments[i].isUI ) {
				addedUIChildren = true;
			}

		}

		if( addedUIChildren ) this._rebuildChildrenLists();

		return this;

	}


	/**
	 * When the user calls component.remove, it registers for updates,
	 * then call THREE.Object3D.remove.
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	remove( object ) {

		for ( const id of Object.keys( arguments ) ) {

			// An inline component relies on its parent for positioning
			if ( arguments[ id ].isInline ) this.update( null, true );

		}

		super.remove( ...arguments );

		this._rebuildChildrenLists();

		return this;

	}

	/**
	 *
	 * @return {Object3D}
	 */
	clear() {

		this.removeFromParent();

		this.traverse( ( obj ) => {

			if ( obj.material ) obj.material.dispose();
			if ( obj.geometry ) obj.geometry.dispose();

		} );

		super.clear();

		// remove properties
		this._backgroundMesh = null;
		this._backgroundMaterial = null;
		this._backgroundMaterialMediation = null;
		this._backgroundMeshMediation = null;

		this._children.dispose();
		this._children = null;

		this._parent.dispose();
		this._parent = null;

		this._backgroundSide = null;
		this._backgroundAlphaTest = null;
		this._visible = null;
		this._backgroundCastShadow = null;
		this._backgroundReceiveShadow = null;
		this._renderOrder = null;
		this._segments = null;
		this._bounds = null;

		// styles properties
		this._boxSizing = null;
		this._padding = null;
		this._margin = null;
		this._position = null;
		this._flexDirection = null;
		this._justifyContent = null;
		this._alignItems = null;
		this._display = null;
		this._backgroundColor = null;
		this._backgroundOpacity = null;
		this._backgroundSize = null;
		this._fontOpacity = null;
		this._color = null;
		this._whiteSpace = null;
		this._fontFamily = null;
		this._fontStyle = null;
		this._fontWeight = null;
		this._lineHeight = null;
		this._fontKerning = null;
		this._letterSpacing = null;
		this._overflow = null;
		this._textAlign = null;

		this._font = null;
		this._lineBreak = null;
		this._layouter = null;

		return this;
	}

	/**
	 *
	 * @return {string}
	 */
	get textContent() {

		this._textContent.process( this );

		return this._textContent._value;

	}

	/***********************************************************************************************************************
	 * TO MATERIAL HOLDER
	 **********************************************************************************************************************/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	get backgroundMaterial() { return this._backgroundMaterial; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set backgroundMaterial( material ) {

		this._backgroundMaterial = material;

		// Update the fontMaterialProperties that need to be transferred to
		this._backgroundMaterialMediation = { ...material.constructor.mediation };

		// transfer all the properties to material
		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {

			this._backgroundMesh.material = this._backgroundMaterial;
			uniformOrUserDataTransformer( material, 'frameSize', this._backgroundMesh.scale );

		}

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set backgroundCustomDepthMaterial( material ) {

		this._backgroundCustomDepthMaterial = material;

		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {
			// transfer to the main if isset
			this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;

		}

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get backgroundCustomDepthMaterial() { return this._backgroundCustomDepthMaterial; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMaterial( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._backgroundMaterial, options, this._backgroundMaterialMediation, this._backgroundCustomDepthMaterial );

	}

	/**
	 *
	 * @param {number} value
	 */
	set backgroundSide( value ) {

		this._backgroundSide.value = value;

		if ( this._backgroundMaterial ) this._backgroundMaterial.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundSide() { return this._backgroundSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set backgroundAlphaTest ( value ) {

		this._backgroundAlphaTest.value = value;

		if( this._backgroundMaterial ) this._backgroundMaterial.alphaTest = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundAlphaTest () { return this._backgroundAlphaTest.value; }

	/** Font Material ----------------------------------------------------------*/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	// get fontMaterial() { return this._fontMaterial__; }
	get fontMaterial() { return this._fontMaterial.value; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set fontMaterial( material ) {

		this._fontMaterial.value = material;

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set fontCustomDepthMaterial( material ) {

		this._fontCustomDepthMaterial.value = material;

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get fontCustomDepthMaterial() { return this._fontCustomDepthMaterial.value; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMaterial( options = null ) {

		const fontMat = this._fontMaterial.value;
		if( !fontMat ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, fontMat, options, this._fontMaterial._mediation, this._fontCustomDepthMaterial.value );

	}

	/**
	 *
	 * @param {number} value
	 */
	set fontSide( value ) {

		this._fontSide.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontSide() { return this._fontSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set fontAlphaTest ( value ) {

		this._fontAlphaTest.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontAlphaTest () { return this._fontAlphaTest.value; }

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMesh( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}


		}

		Mediator.mediate( this, this._backgroundMesh, options, this._backgroundMeshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setBackgroundMesh( mesh ) {

		if( this._backgroundMesh ) {

			this.remove( this._backgroundMesh );
			this.unbindBackgroundMeshProperties();

		}

		this._backgroundMesh = mesh;

		if ( this._backgroundMesh ) {

			this.bindBackgroundMeshProperties();

			if( this._backgroundCustomDepthMaterial ) {
				this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;
			}

			if( this._backgroundMaterial ) {
				uniformOrUserDataTransformer( this._backgroundMaterial, 'frameSize', this._backgroundMesh.scale );
			}

			this._transferToBackgroundMesh();

			this.add( this._backgroundMesh );

		}

	}

	/**
	 *
	 */
	bindBackgroundMeshProperties () { }

	/**
	 *
	 */
	unbindBackgroundMeshProperties () { }


	activatePseudoState ( state ) {

	}

	deactivatePseudoState ( state ) {

	}

	togglePseudoState ( state ) {

	}

	set borderRadiusMediation ( value ) {
		this._borderRadius.mediation = value;
	}

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundCastShadow( value ) {

		if( this._backgroundCastShadow ) this._backgroundCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundCastShadow() { return this._backgroundCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundReceiveShadow( value ) {

		if( this._backgroundReceiveShadow ) this._backgroundReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundReceiveShadow() { return this._backgroundReceiveShadow; }

	/**
	 *
	 * @param {number} value
	 */
	set renderOrder( value ) {

		if( this._renderOrder ) this._renderOrder.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get renderOrder() { return this._renderOrder.value; }

	/** Font Mesh --------------------------------------------------------------*/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMesh( options = null ) {

		if( !this._fontMesh ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._fontMesh, options, this._fontMeshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setFontMesh( mesh ) {

		if( this._fontMesh ) {

			this.remove( this._fontMesh );

			if ( this._fontMesh.material ) this._fontMesh.material.dispose();
			if ( this._fontMesh.geometry ) this._fontMesh.geometry.dispose();

			this._fontMesh = null;
			// deepDelete( this._fontMesh );

			this.unbindFontMeshProperties();

		}

		this._fontMesh = mesh;

		if ( this._fontMesh ) {

			this._fontMesh.raycast = () => {};

			this.bindFontMeshProperties();

			this._transferToFontMaterial();
			this._transferToFontMesh();

			this.add( this._fontMesh );

		}

	}

	/**
	 *
	 */
	bindFontMeshProperties () { }

	/**
	 *
	 */
	unbindFontMeshProperties () { }

	/**
	 *
	 * @param {boolean} value
	 */
	set fontCastShadow( value ) {

		if( this._fontCastShadow ) this._fontCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontCastShadow() { return this._fontCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set fontReceiveShadow( value ) {

		if( this._fontReceiveShadow ) this._fontReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontReceiveShadow() { return this._fontReceiveShadow; }

	/***********************************************************************************************************************
	 * GEOMETRY
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {Number} v
	 */
	set segments (v) {

		this._segments.value = v;

		// @TODO : Geometry Update

	}

	/**
	 *
	 * @return {number}
	 */
	get segments () { return this._segments.value; }


	/***********************************************************************************************************************
	 * HOOKS & ALTERS
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {Function} func
	 */
	set onAfterUpdate( func ) {

		console.warn( 'ThreeMeshUI v7xx : `onAfterUpdate()` property has been deprecated, please rely on `addAfterUpdate` instead.' );
		this.addAfterUpdate( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	addAfterUpdate( func ) {

		this._onAfterUpdates.push( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	removeAfterUpdate( func ) {

		const index = this._onAfterUpdates.indexOf( func );
		if ( index !== -1 ) {

			this._onAfterUpdates.splice( index, 1 );

		}

	}

	/**
	 * @todo: afterUpdate not called anymore
	 */
	performAfterUpdate() {

		for ( let i = 0; i < this._onAfterUpdates.length; i++ ) {

			this._onAfterUpdates[ i ]();

		}

	}

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {void}
	 */
	appendProperty( name, instance ) {

		this[`_${name}`] = instance;
		this._components.push( instance );

	}

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {BaseProperty}
	 */
	replaceProperty( name, instance ) {

		const oldProperty = this[`_${name}`];

		const index = this._components.indexOf( oldProperty );

		this._components[index] = this[`_${name}`] = instance;
		instance.needsUpdate = true;

		return oldProperty;

	}

}

/**
 * @typedef Properties
 * @type {Object.<string,Function>}
 */

/**
 * @typedef Options
 * @type {DocumentedOptions & Object.<string,any>}
 */

/**
 *
 * @typedef {Object} DocumentedOptions
 *
 * @property [options.name] {string}
 * @property [options.flexDirection] {"row"|"row-reverse"|"column"|"column-reverse"}
 * @property [options.justifyContent] {"start"|"center"|"end"|"space-around"|"space-between"|"space-evenly"}
 * @property [options.alignItems] {"start"|"center"|"end"|"stretch"}
 * @property [options.overflow] {"visible"|"hidden"}
 * @property [options.fontKerning] {"normal"|"none"}
 * @property [options.segments] {number}
 * @property [options.fontStyle] {"normal"|"italic"}
 * @property [options.fontWeight] {"light"|"normal"|"bold"|"bolder"|100|200|300|400|500|600|700|800|900}
 *
 * @property [options.backgroundColor]{Color|number|string}
 * @property [options.backgroundOpacity] {number}
 * @property [options.backgroundSize] {"cover"|"contain"|"stretch"}
 * @property [options.backgroundImage] {Texture|string}
 *
 *
 * @property [options.borderRadius] {Vector4|Array.<number>|number|string}
 * @property [options.borderWidth] {Vector4|Array.<number>|number|string}
 * @property [options.borderColor] {Color|number|string}
 *
 * @property [options.boxSizing] {"content-box"|"border-box"}
 * @property [options.width] {number|string|"100%"|"auto"}
 * @property [options.height] {number|string|"100%"|"auto"}
 * @property [options.padding] {Vector4|Array.<number>|number|string}
 * @property [options.margin] {Vector4|Array.<number>|number|string}
 *
 * @property [options.textAlign] {"left"|"right"|"center"|"justify"|"justify-left"|"justify-right"}
 * @property [options.visible] {boolean}
 * @property [options.letterSpacing] {number}
 *
 * @property [options.whiteSpace] {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
 * @property [options.fontTexture] {Texture|string} @deprecated
 * @property [options.textContent] {string}
 *
 */

;// CONCATENATED MODULE: ./src/components/core/UpdateManager.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
class UpdateManager {


	static register( component ) {

		if ( !this.elements.includes( component ) ) {

				this.elements.push( component );

		}

	}

	static remove( component ) {

		const index = this.elements.indexOf( component );
		if ( index !== -1 ) {

			this.elements.splice( index, 1 );

		}

	}


	static update() {

		for ( const UIElement of this.elements ) {
			UIElement.update();

			UIElement.process(); // Natural process
			UIElement.process(); // Actual process (optional) - For auto size and stretch

			UIElement.render();
		}

	}

}

/**
 * @internal
 * @type {Array.<MeshUIBaseElement>}
 */
UpdateManager.elements = [];

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.vertex.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_pars_vertex_glsl_program = /* glsl */`

// FrameBorder vertex pars
attribute vec2 uvB;
varying vec2 vUvB;

`;

/* harmony default export */ const frame_border_pars_vertex_glsl = (frame_border_pars_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.vertex.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_vertex_glsl_program = /* glsl */`

	// FrameBorder vertex shader
	vUvB = uvB;

`;

/* harmony default export */ const frame_border_vertex_glsl = (frame_border_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_pars_fragment_glsl_program = /* glsl */`

// borders sequences are : x:TOP, y:RIGHT, z:BOTTOM, w:LEFT
uniform vec4 borderWidth;
uniform vec3 borderColor;
uniform float borderOpacity;
uniform vec4 borderRadius;

uniform vec2 cornerTL;
uniform vec2 cornerTR;
uniform vec2 cornerBR;
uniform vec2 cornerBL;

varying vec2 vUvB;

float getEllipticFactor( vec2 uv, vec2 center, float radiusX, float radiusY )
{

		float edx = uv.x - center.x;
		float edy = uv.y - center.y;

		float ddx = (edx * edx) / (radiusX * radiusX);
		float ddy = (edy * edy) / (radiusY * radiusY);

		return ddx + ddy;

}

`;

/* harmony default export */ const frame_border_pars_fragment_glsl = (frame_border_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_fragment_glsl_program = /* glsl */`

vec4 borderColor = vec4( borderColor, borderOpacity );

// This could be tweak to produce more smoothing
float mult = 1.0;

// Step 1 ----------------------------------------------
// Draw the four borders ( top - right - bottom - left )
// Without worrying about radiuses ( Straight boorders )

// Top
float topBorderUVy = 1.0 - borderWidth.x;
if( borderWidth.x > 0.0 && vUvB.y > topBorderUVy )
{

	float w = fwidth( 1.0 - vUvB.y ) * mult;
	float step = smoothstep( topBorderUVy , topBorderUVy + w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Left
float leftBorderUVx = borderWidth.w;
if( borderWidth.w > 0.0 && vUvB.x < leftBorderUVx )
{

	float w = fwidth( vUvB.x ) * mult ;
	float step = smoothstep( leftBorderUVx , leftBorderUVx - w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Bottom
float bottomBorderUVy = borderWidth.z;
if( borderWidth.z > 0.0 && vUvB.y < bottomBorderUVy )
{
	float w = fwidth( vUvB.y ) * mult;
	float step = smoothstep( bottomBorderUVy , bottomBorderUVy - w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );
}

// Right
float rightBorderUVx = 1.0 - borderWidth.y;
if( borderWidth.y > 0.0 && vUvB.x > rightBorderUVx )
{
	float w = fwidth( 1.0 - vUvB.x ) * mult;
	float step = smoothstep( rightBorderUVx , rightBorderUVx + w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );
}


// Step 2 ----------------------------------------------
// Process each corners ( topLeft, topRight, bottomRight, bottomLeft )
// To transparentize outside radiuses
// To draw ellipse border on the corner


// Top Left corner
if( vUvB.x < cornerTL.x && vUvB.y > cornerTL.y ) {

		// Only draw border if width is set
		if( borderWidth.w + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x - borderWidth.w,  ( 1.0 - cornerTL.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		// Then then radius
		float radiusFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x, 1.0 - cornerTL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Left
if( vUvB.x < cornerBL.x && vUvB.y < cornerBL.y ) {

		if( borderWidth.w + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x - borderWidth.w,  cornerBL.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}


		float radiusFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x, cornerBL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Top Right
if( vUvB.x > cornerTR.x && vUvB.y > cornerTR.y ) {

		if( borderWidth.y + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTR, ( 1.0 - cornerTR.x ) - borderWidth.y,  ( 1.0 - cornerTR.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerTR, 1.0 - cornerTR.x, 1.0 - cornerTR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Right
if( vUvB.x > cornerBR.x && vUvB.y < cornerBR.y ) {

		if( borderWidth.y + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBR, ( 1.0 - cornerBR.x ) - borderWidth.y,  cornerBR.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerBR, 1.0 - cornerBR.x, cornerBR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}

`;

/* harmony default export */ const frame_border_fragment_glsl = (frame_border_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-common.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_common_pars_fragment_glsl_program = /* glsl */`

// To be removed - required for both border and background
uniform vec3 frameSize;
uniform vec2 textureSize;

`;

/* harmony default export */ const frame_common_pars_fragment_glsl = (frame_common_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_background_pars_fragment_glsl_program = /* glsl */`

#ifdef USE_MAP

vec4 sampleTexture() {

	vec2 uv = vUv;

	// default stretch
	#if BACKGROUND_MAPPING != 0

	float textureRatio = textureSize.x / textureSize.y;
	float panelRatio = frameSize.x / frameSize.y;
	float ratio = panelRatio / textureRatio;
	float ratio2 = textureRatio / panelRatio;

		// contain
		#if BACKGROUND_MAPPING == 1
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		}
		#else
		// cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		}

		#endif

	#endif

	return texture2D( map, uv );

}
#endif
`;

/* harmony default export */ const frame_background_pars_fragment_glsl = (frame_background_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_background_fragment_glsl_program = /* glsl */`
#ifdef USE_MAP

	vec4 textureSample = sampleTexture();
	diffuseColor *= textureSample;

#endif
`;

/* harmony default export */ const frame_background_fragment_glsl = (frame_background_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/renderers/shaders/ShaderChunkUI.js














/* eslint-disable camelcase */

/**
 * @typedef {Object} ChunksUI
 * @property msdf_alphaglyph_vertex {string}
 * @property frame_border_fragment {string}
 * @property frame_background_pars_fragment {string}
 * @property frame_common_pars {string}
 * @property msdf_alphaglyph_pars_vertex {string}
 * @property frame_border_pars_fragment {string}
 * @property msdf_offset_vertex {string}
 * @property frame_border_pars_vertex {string}
 * @property msdf_alphaglyph_pars_fragment {string}
 * @property frame_border_vertex {string}
 * @property frame_background_fragment {string}
 * @property msdf_alphaglyph_fragment {string}
 */


const ShaderChunkUI = {
	msdfAlphaglyphParsVertexGlsl: msdf_alphaglyph_pars_vertex_glsl,
	msdfAlphaglyphVertexGlsl: msdf_alphaglyph_vertex_glsl,
	msdfOffsetglyphVertexGlsl: msdf_offsetglyph_vertex_glsl,
	msdfAlphaglyphParsFragmentGlsl: msdf_alphaglyph_pars_fragment_glsl,
	msdfAlphaglyphFragmentGlsl: msdf_alphaglyph_fragment_glsl,
	frameBorderParsVertexGlsl: frame_border_pars_vertex_glsl,
	frameBorderVertexGlsl: frame_border_vertex_glsl,
	frameCommonParsFragmentGlsl: frame_common_pars_fragment_glsl,
	frameBorderParsFragmentGlsl: frame_border_pars_fragment_glsl,
	frameBorderFragmentGlsl: frame_border_fragment_glsl,
	frameBackgroundParsFragmentGlsl: frame_background_pars_fragment_glsl,
	frameBackgroundFragmentGlsl: frame_background_fragment_glsl,
};
/* eslint-enable camelcase */

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderLib/framematerial.glsl.js








const framematerial_glsl_vertexShader = /* glsl */`
// Would be automatic on three materials and from USE_UV
#ifdef USE_MAP
varying vec2 vUv;
#endif

${frame_border_pars_vertex_glsl}

#include <clipping_planes_pars_vertex>

void main() {

	#ifdef USE_MAP
	vUv = uv;
	#endif

	${frame_border_vertex_glsl}

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>

}
`

const framematerial_glsl_fragmentShader = /* glsl */`

// Basic
uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif

${frame_common_pars_fragment_glsl}

${frame_border_pars_fragment_glsl}


#ifdef USE_MAP
varying vec2 vUv;
uniform sampler2D map;
#endif

${frame_background_pars_fragment_glsl}

#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

	// map
	${frame_background_fragment_glsl}

	${frame_border_fragment_glsl}

	#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

	// output
	gl_FragColor = diffuseColor;


	#include <clipping_planes_fragment>
}
`

;// CONCATENATED MODULE: ./src/frame/utils/FrameMaterialUtils.js


//JSDoc related import
/* eslint-disable no-unused-vars */









/* eslint-enable no-unused-vars */


class FrameMaterialUtils {



	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return _mediationDefinitions;

	}


	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.borderColor = { value: null };
		threeMaterial.userData.borderRadius = { value: new external_three_namespaceObject.Vector4(0,0,0,0) };
		// Store corners based on borderRadiuses
		threeMaterial.userData.cornerTL = { value : new external_three_namespaceObject.Vector2(0,1) };
		threeMaterial.userData.cornerTR = { value : new external_three_namespaceObject.Vector2(1,1) };
		threeMaterial.userData.cornerBR = { value : new external_three_namespaceObject.Vector2(1,0) };
		threeMaterial.userData.cornerBL = { value : new external_three_namespaceObject.Vector2(0,0) };

		threeMaterial.userData.borderWidth = { value: new external_three_namespaceObject.Vector4(0,0,0,0) };
		threeMaterial.userData.borderOpacity = { value: null };
		threeMaterial.userData.frameSize = { value: new external_three_namespaceObject.Vector3( 1, 1, 1 ) };
		threeMaterial.userData.textureSize = { value: new external_three_namespaceObject.Vector2( 1, 1 ) };

	}
	/* eslint-enable no-unused-vars */

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.borderColor = threeMaterial.userData.borderColor;
		// Border radiuses and corners
		shader.uniforms.borderRadius = threeMaterial.userData.borderRadius;
		shader.uniforms.cornerTL = threeMaterial.userData.cornerTL;
		shader.uniforms.cornerTR = threeMaterial.userData.cornerTR;
		shader.uniforms.cornerBR = threeMaterial.userData.cornerBR;
		shader.uniforms.cornerBL = threeMaterial.userData.cornerBL;

		shader.uniforms.borderWidth = threeMaterial.userData.borderWidth;
		shader.uniforms.borderOpacity = threeMaterial.userData.borderOpacity;
		shader.uniforms.frameSize = threeMaterial.userData.frameSize;
		shader.uniforms.textureSize = threeMaterial.userData.textureSize;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		FrameMaterialUtils.injectVertexShaderChunks( shader );
		FrameMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + frame_border_pars_vertex_glsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + frame_border_vertex_glsl
		)

	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_background_pars_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_border_pars_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_common_pars_fragment_glsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_fragment>',
			frame_background_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			frame_border_fragment_glsl+'\n#include <alphamap_fragment>'
		)

	}

}

/**
 *
 * @param target
 * @param property
 * @param value
 * @private
 */
const _backgroundSizeTransformer = function( target, property, value ) {

	value = ['stretch','contain','cover'].indexOf(value);
	asPreprocessorValueTransformer(target, 'BACKGROUND_MAPPING', value);

}

// /**
//  *
//  * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
//  */
// const _mediationDefinitions = {
// 	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
// 	backgroundTexture: { m: 'map' },
// 	backgroundColor: { m: 'color' },
// 	backgroundOpacity: { m:'opacity' },
// 	backgroundSize: { m: 'u_backgroundMapping', t: _backgroundSizeTransformer },
// 	_borderWidthComponent: { m: 'borderWidth', t: _linkComponentOutput },
// 	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
// 	_borderRadiusComponent: { m: 'computedCorners', t: _linkCornersOutput },
// 	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
// 	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
// 	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
// }


/**
 * 7xx
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _mediationDefinitions = {
	clippingPlanes : {m: 'clippingPlanes'},
	backgroundAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	backgroundSide: { m: 'side' },
	// backgroundTexture: { m: 'map' },
	backgroundImage: { m: 'map'},
	backgroundColor: { m: 'color' },
	backgroundOpacity: { m:'opacity' },
	backgroundSize: { m: 'computedBackgroundSize', t: _backgroundSizeTransformer },
	borderWidth: { m: 'borderWidth', t: uniformOrUserDataTransformer },
	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
	cornerTL : { m: 'cornerTL', t: uniformOrUserDataTransformer },
	cornerTR : { m: 'cornerTR', t: uniformOrUserDataTransformer },
	cornerBR : { m: 'cornerBR', t: uniformOrUserDataTransformer },
	cornerBL : { m: 'cornerBL', t: uniformOrUserDataTransformer },
	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
}

;// CONCATENATED MODULE: ./src/frame/materials/FrameMaterial.js




class FrameMaterial extends external_three_namespaceObject.ShaderMaterial {


	/**
	 * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {FrameMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return FrameMaterialUtils.mediation;

	}

	constructor() {
		super ( {
			uniforms: {
				alphaTest: { value: 0.02 },
				map: { value: null },
				diffuse: { value: new external_three_namespaceObject.Color(0xffffff) },
				opacity: { value: 1.0 },
				borderColor: { value: new external_three_namespaceObject.Color(0x000000) },
				borderOpacity: { value: 0 },
				borderRadius: { value: new external_three_namespaceObject.Vector4(0,0,0,0) },
				// Corners for customized radius not all starting on center [0.5,0.5];
				// Corners will be generated from borderRadiuses
				cornerTL: { value : new external_three_namespaceObject.Vector2(0,1) },
				cornerTR: { value : new external_three_namespaceObject.Vector2(1,1) },
				cornerBR: { value : new external_three_namespaceObject.Vector2(1,0) },
				cornerBL: { value : new external_three_namespaceObject.Vector2(0,0) },
				borderWidth: { value: new external_three_namespaceObject.Vector4(0,0,0,0) },

				frameSize: { value: new external_three_namespaceObject.Vector3( 1, 1, 1 ) },
				textureSize: { value: new external_three_namespaceObject.Vector2( 1, 1 ) }
			},
			side: external_three_namespaceObject.FrontSide,
			transparent: true,
			clipping: true,
			vertexShader: framematerial_glsl_vertexShader,
			fragmentShader: framematerial_glsl_fragmentShader,
			extensions: {
				derivatives: true
			}
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;
	}

	set map( value ) {

		this.uniforms.map.value = value;
		if( !value ) {

			if( this.defines['USE_UV'] !== undefined ) {

				delete this.defines['USE_UV'];
				this.needsUpdate = true;

			}

		} else if( this.defines['USE_UV'] === undefined ) {

			this.defines['USE_UV'] = '';
			this.needsUpdate = true;

		}

		this.needsUpdate = true;

	}

	get map(){
		return this.uniforms.map.value;
	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {

		return this.uniforms.alphaTest.value;

	}



	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenBox extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @private
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._boxes = [];

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		this._compute( element );

		element._layouter._needsUpdate = true;
		element._renderOrder._needsUpdate = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		this._compute( element );

		element._flexDirection._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	_compute( element ) {

		// Stores all children that are box
		this._uis = element.children.filter( child => child.visible && child.isUI );
		this._boxes = this._uis.filter( child => child.isBox ).sort( this._sortOrder );

		// @TODO: check if it has changes boxes values? with array join to 'fingerprint'?
		// 				computation to remove computation? Does it worth it? When would it worth it?
		//				// Changed order property of children but doesn't impact the output of boxes => Order have change, okay to have more computation
		//				// Removed the Added the same element, at the same position => Rare case
		// 		Conclusion : Not worth it at the time of writing



	}



	/**
	 *
	 */
	dispose() {

		this._uis = null;
		this._boxes = null;

	}

	/**
	 *
	 * Sort children according to their .style.order property or fallback on children index
	 *
	 * @param {HTMLElementVR} a
	 * @param {HTMLElementVR} b
	 * @return {number}
	 * @private
	 */
	_sortOrder = ( a, b ) => {

		if( a._order._value < b._order._value ) return -1;
		if( a._order._value > b._order._value ) return 1;

		// if both children have the same order value, use their children index to order them
		if( this._uis.indexOf(a) < this._uis.indexOf(b) ) {
			return -1;
		}

		return 1;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsBox.js




class BoundsBox extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new external_three_namespaceObject.Vector3( 1, 1, 1 );

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerX = 0.5;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerY = 0.5;


		this._needsProcess = true;

	}

	/**
	 * Set the value of the width 100%
	 * @param element
	 * @param value
	 */
	setReferenceWidth( element, value ) {

		const width = element._width;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = width._auto ? 1 : width._value;
		// const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		if ( numberEquals( newOffsetWidth, this._offsetWidth ) ) return;

		this._offsetWidth = newOffsetWidth;
		this._innerWidth = this._offsetWidth - ( padding.y + padding.w + borderWidth.y + borderWidth.w );

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );

		this._triggerCascadingDependencies( element );

	}

	/**
	 * Set the value of the height 100%
	 * @param element
	 * @param value
	 */
	setReferenceHeight( element, value ) {

		const height = element._height;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = height._auto ? 1 : height._value;

		const newOffsetHeight = (value * factor) - ( margin.x + margin.z );
		if ( numberEquals( newOffsetHeight, this._offsetHeight ) ) return;

		this._offsetHeight = newOffsetHeight;
		this._innerHeight = this._offsetHeight - ( padding.x + padding.z + borderWidth.x + borderWidth.z );
		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );

		this._triggerCascadingDependencies( element );

	}

	setChildrenWidth( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerWidth = value;
		this._offsetWidth = this._innerWidth + ( padding.y + padding.w + border.y + border.w )

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );
		this._triggerCascadingDependencies( element );


	}

	setChildrenHeight( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerHeight = value;
		this._offsetHeight = this._innerHeight + ( padding.x + padding.z + border.x + border.z )

		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );
		this._triggerCascadingDependencies( element );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		// only compute new width if explicitely defined
		const width = element._width;
		if( !width._auto && !width._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerWidth = width._value;
				this._offsetWidth = this._innerWidth + padding.y + padding.w + border.y + border.w;

			} else {

				this._offsetWidth = width._value;
				this._innerWidth = this._offsetWidth - ( padding.y + padding.w + border.y + border.w );

			}

			this._centerX = _computeCenterX( element );
			this._needsProcess = true;

			// tells children width has changed
			this._propagateWidth( element );
			this._triggerCascadingDependencies( element );

		}

		const height = element._height;
		if( !height._auto && !height._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerHeight = height._value;
				this._offsetHeight = this._innerHeight + padding.x + padding.z + border.x + border.z;

			} else {

				this._offsetHeight = height._value;
				this._innerHeight = this._offsetHeight - ( padding.x + padding.z + border.x + border.z );

			}

			this._centerY = _computeCenterY( element );
			this._needsProcess = true;

			// tells children height has changed
			this._propagateHeight( element );
			this._triggerCascadingDependencies( element );

		}

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._triggerCascadingDependencies( element )

		//console.log( 'process bounds box', element.name );

		// update primitives or unbinded values

		// require cascading processes


	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideWidth( element ) {

		return _computeChildrenSideWidth( element );

	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideHeight( element ) {

		return _computeChildrenSideHeight( element );

	}

	_propagateWidth( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const width = box._width;

			if( width._relative ) box._bounds.setReferenceWidth( box, this._innerWidth );

		}

	}

	_propagateHeight( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const height = box._height;

			if( height._relative ) box._bounds.setReferenceHeight( box, this._innerHeight );

		}

	}

	_triggerCascadingDependencies( element ) {

		// also change parent when require
		if ( element._parent._value ) {
			element._parent._value._autoSize._needsProcess = true;
		}

		element._flexDirection._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

	}

}




/***********************************************************************************************************************
 * INTERNAL FUNCTIONS
 **********************************************************************************************************************/

/**
 * Retrieve the center X according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterX( element ) {

	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const leftSide = padding.w + borderWidth.w;
	const rightSide = padding.y + borderWidth.y;

	return ( leftSide - rightSide ) / 2;
}

/**
 * Retrieve the center Y according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterY( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const topSide = padding.x + borderWidth.x;
	const bottomSide = padding.z + borderWidth.z;

	return ( bottomSide - topSide ) / 2;
}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideWidth( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;
		const CHILD_SIZE = child._bounds._offsetWidth + margin.y + margin.w;

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideHeight( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {


		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const CHILD_SIZE = child._bounds._offsetHeight + margin.x + margin.z;

		return accu + CHILD_SIZE;

	}, 0 );

}


;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/AlignItemsPropertyBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class AlignItemsPropertyBox extends AlignItemsProperty {

	constructor( ) {

		super();

		// configure this property
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(element:MeshUIBaseElement, (child:MeshUIBaseElement, parentOffset:number )=> number ) =>  void  }
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(child:MeshUIBaseElement, parentOffset:number )=> number}
		 * @private
		 */
		this._childAlign = this.emptyStrategyLogic;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		// Stretch : Current or previous requires a bounds update of children
		// if( this._value === 'stretch' || this._input === 'stretch' ) {
		//
		// 	for ( let i = 0; i < element._children._boxes.length; i++ ) {
		// 		element._children._boxes[ i ]._bounds._needsProcess = true;
		// 	}
		//
		// }

		this._value = this._inheritedInput;

		switch( element._flexDirection._value ) {

			case 'row':
			case 'row-reverse':
				this._process = _processRow;
				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildRowStart;
						break;
					case 'end':
						this._childAlign = _alignChildRowEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}
				break;

			case 'column':
			case 'column-reverse':
				this._process = _processColumn;

				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildColumnStart;
						break;
					case 'end':
						this._childAlign = _alignChildColumnEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}

				break;

		}

		this._needsProcess = true;
		// @TODO: Store children here
		element._autoSize._needsProcess = true;

		element._flexDirection._needsProcess = true; //not mandatory
		element._justifyContent._needsProcess = true;

		this._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @param element
	 */
	process( element ) {

		// return;
		// if( !element._children._boxes.length ) return;

		this._process( element, this._childAlign );

		// @TODO : Could be strategized
		let snap = 'center';
		let snapXon = 'center';
		let snapYon = 'center';

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		if( element._flexDirection._value.indexOf('column') !== -1 ) {

			if( this._value === 'start' ) {
				snap = snapXon = 'left';
			}else if( this._value === 'end' ){
				snap = snapXon ='right';
			}else {
				snap = 'centerX';
			}

		} else {

			/* eslint-disable no-lonely-if */
			if( this._value === 'start' ) {
				snap = snapYon = 'top';
			}else if( this._value === 'end' ){
				snap = snapYon ='bottom';
			}else{
				snap = 'centerY';
			}
			/* eslint-enable no-lonely-if */

		}

		// apply 4 directional padding and borders
		let y = -(padding.x - padding.z) / 2 - (border.x - border.z)  / 2;
		let x = -(padding.y - padding.w) / 2 - ( border.y - border.w ) / 2;


		if( snapXon === 'left' ) {

			x = (padding.w - padding.y) / 2 + (border.w - border.y) / 2;

		} else if( snapXon === 'right' ) {

			x = - ( padding.y - padding.w ) / 2 - ( border.y - border.w ) / 2;

		}

		if( snapYon === 'top' ) {

			y = - (padding.x - padding.z) / 2 - (border.x - border.z)  / 2;

		} else if( snapYon === 'bottom' ) {

			y = (padding.z - padding.x) / 2 + (border.z - border.x)  / 2;

		}


		element._children._boxes.forEach( ( child ) => {

			let marginX = 0;
			let marginY = 0;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;

			if( snap === 'top' ) {

				marginY = - child._margin._value.x;

			} else if( snap === 'bottom' ) {

				marginY = child._margin._value.z;

			} else if( snap === 'left' ) {

				marginX = child._margin._value.w;

			} else if( snap === 'right' ) {

				marginX = - child._margin._value.y;

			} else if( snap === 'centerX' ) {

				marginX = ( child._margin._value.w - child._margin._value.y ) /2;

			} else if( snap === 'centerY' ) {

				marginY = ( - child._margin._value.x + child._margin._value.z ) /2;

			}

			element._layouter._childrenPos[ child.id ].x += x + marginX;
			element._layouter._childrenPos[ child.id ].y += y + marginY;

		} );

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _alignChild() {
	return 0;
}

/**
 *
 * @param child
 * @param parentOffset
 * @return {number}
 * @private
 */
function _alignChildRowEnd( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetHeight / 2 );
}

function _alignChildRowStart( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetHeight / 2 );
}

function _alignChildColumnEnd( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetWidth / 2 );
}

function _alignChildColumnStart( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetWidth / 2 );
}

function _processColumn( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerWidth / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].x = childAligner( child, AXIS_TARGET );

	} );

}

function _processRow( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerHeight / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].y = childAligner( child, AXIS_TARGET );

	} );

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionPropertyBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionPropertyBox extends FlexDirectionProperty {

	constructor( ) {

		super();

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offset = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._reverse = 1;

		/**
		 *
		 * @param { (element:MeshUIBaseElement) => void} element
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		switch ( this._value ) {
			case "row":
				this._process = FlexDirectionPropertyBox_processRow;
				// this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._process = _processRowReverse;
				// this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._process = FlexDirectionPropertyBox_processColumn;
				// this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._process = _processColumnReverse;
				// this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		// also update dependencies
		if( !element._justifyContent._needsUpdate ) element._justifyContent.computeOutputValue( element );
		if( !element._alignItems._needsUpdate ) element._alignItems.computeOutputValue( element );

		this._needsProcess = true;

	}

	process( element ) {
		// this will be defined from strategy

		//console.log( element.name, 'flexDirection process');


		switch ( this._value ) {
			case "row":
				this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		this._reverse = -Math.sign( this._offset );
		if( this._reverse === 0 ) {
			this._reverse = 1;
		}


		this._process( element );

		element._justifyContent._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function FlexDirectionPropertyBox_processRow( element ) {

	// end to end children
	let accu = element._flexDirection._offset;

	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// increase with the left margin before placing the child
		accu += child._margin._value.w * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;


		// increase the next child with this child right margin
		accu += REVERSE * ( CHILD_SIZE + child._margin._value.y ) ;

	}

}

function _processRowReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// decrease with the right margin before placing the child
		accu += child._margin._value.y * REVERSE;


		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;

		// decrease the next child with this child left margin
		accu += (CHILD_SIZE + child._margin._value.w) * REVERSE ;

	}

}

function FlexDirectionPropertyBox_processColumn( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// increase with the top margin before placing the child
		accu += child._margin._value.x * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// increase the next child with this child bottom margin
		accu += (CHILD_SIZE + child._margin._value.z) * REVERSE ;

	}

}

function _processColumnReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// decrease with the bottom margin before placing the child
		accu += child._margin._value.z * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// decrease the next child with this child top margin
		accu += ( CHILD_SIZE + child._margin._value.x ) * REVERSE ;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/JustifyContentPropertyBox.js


class JustifyContentPropertyBox extends JustifyContentProperty {

	constructor( defaultValue ) {

		super( 'justifyContent', defaultValue, true );

		// configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(axisOffset:number) => number}
		 * @private
		 */
		this._computeOffset = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement, availableSpace:number, reverse:number) => Array.<number> }
		 * @private
		 */
		this._computeMargin = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement) => void}
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}


	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		//console.log( element._flexDirection._value );
		switch ( element._flexDirection._value ) {

			case 'column-reverse':
			case 'column':
				this._process = _column.bind( this );
				break;


			case 'row-reverse':
			case 'row':
				this._process = _row.bind( this );
				break;

		}

		switch ( this._value ) {
			case 'end':
				this._computeOffset = _justificationOffsetEnd;
				this._computeMargin = _justificationMargin;
				break;

			case 'center':
				this._computeOffset = _justificationOffsetCenter;
				this._computeMargin = _justificationMargin;
				break;

			case 'start':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin;
				break;

			case 'space-between':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceBetween;
				break;

			case 'space-around':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceAround;
				break;

			case 'space-evenly':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceEvenly;
				break;
		}

		// @TODO : 	If flexDirection was keeping its children position,
		//  				it won't be necessary to compute the same result again
		//					but it will increase the memory footprint
		element._flexDirection._needsProcess = true;

	}

	process( element ) {

		this._process( element );

		element._alignItems._needsProcess = true; // not mandatory : Layout could sum each

	}

}

function _row( element ) {

	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _rowRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	// const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );


	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].x -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

function _column( element ) {


	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _columnRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );

	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].y -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

/**
 *
 * @param {MeshUIBaseElement} element
 * @return {{usedDirectionSpace: *, remainingSpace: number}}
 * @private
 */
function _rowRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideWidth( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerWidth - usedDirectionSpace };

}

function _columnRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideHeight( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerHeight - usedDirectionSpace };

}


/* eslint-disable no-unused-vars */ function _justificationOffset( axisOffset ) { /* eslint-enable no-unused-vars */

	return 0;

}

function _justificationOffsetEnd( axisOffset ) {

	return axisOffset;

}

function _justificationOffsetCenter( axisOffset ) {

	return axisOffset / 2;

}

/* eslint-disable no-unused-vars */
function _justificationMargin( element, availableSpace = 0, reverse = 1 ) { /* eslint-enable no-unused-vars */

	return Array( element._children._boxes.length ).fill( 0 );

}

function _justificationMarginSpaceBetween( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		// only one children would act as start
		if ( length > 1 ) {

			const margin = availableSpace / ( length - 1 ) * reverse;
			// set this margin for any children

			// except for first child
			justificationMargins[ 0 ] = 0;

			for ( let i = 1; i < length; i++ ) {

				justificationMargins[ i ] = margin * i;

			}

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceEvenly( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		const margin = availableSpace / ( length + 1 ) * reverse;

		// set this margin for any children
		for ( let i = 0; i < length; i++ ) {

			justificationMargins[ i ] = margin * ( i + 1 );

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceAround( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {


		const margin = availableSpace / ( length ) * reverse;

		const start = margin / 2;
		justificationMargins[ 0 ] = start;

		// set this margin for any children
		for ( let i = 1; i < length; i++ ) {

			justificationMargins[ i ] = start + margin * i;

		}


	}

	return justificationMargins;

}

;// CONCATENATED MODULE: ./src/frame/Frame.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Returns a basic plane mesh.
 */
class Frame extends external_three_namespaceObject.Mesh {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( element ) {

		const geometry = new external_three_namespaceObject.PlaneBufferGeometry( 1, 1, element._segments.value, element._segments.value );

		// Add additional uv for borders computations by copying initial uv
		const uvB = new external_three_namespaceObject.BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
		geometry.setAttribute('uvB', uvB ).name = 'uvB';

		super( geometry, element.backgroundMaterial );

		this.name = 'UIBackgroundBox';

	}

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyBox.js



class RendererPropertyBox extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._backgroundMesh ) {

			element.setBackgroundMesh( new Frame(element) );

		}

		element.performAfterUpdate();

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/PositionPropertyBox.js


class PositionPropertyBox extends PositionProperty {

	constructor( ) {

		super( 'position');

	}

	update( element, out ) {

		super.update( element, out );

		this._needsProcess = true;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/AutoSizePropertyBox.js


/**
 * Autosize are only trigger when natural size changed
 */
class AutoSizePropertyBox extends BaseProperty {

	constructor() {

		super( 'autosize' );

		this._needsProcess = true;
	}

	process( element ) {

		// if( parent ) return;


		// has auto size get the height from children
		if ( element._width._auto ) _processAutoWidth( element );
		if ( element._height._auto ) _processAutoHeight( element );

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenWidth = stretch && element._flexDirection._value.indexOf( 'column' ) !== -1;
		const stretchChildrenHeight = stretch && !stretchChildrenWidth;

		for ( const box of element._children._boxes ) {

			if ( ( box._width._auto && stretchChildrenWidth ) || box._width._relative ) {

				box._bounds.setReferenceWidth( box, element._bounds._innerWidth );

			}

			if ( ( box._height._auto && stretchChildrenHeight ) || box._height._relative ) {

				box._bounds.setReferenceHeight( box, element._bounds._innerHeight );

			}

		}

		// // justify stretch - Not that easy
		// const stretchD = element._justifyContent._value === 'stretch';
		// const stretchChildrenWidthD = stretchD && element._flexDirection._value.indexOf( 'row' ) !== -1;
		// const stretchChildrenHeightD = stretchD && !stretchChildrenWidthD;
		//
		//
		// if ( stretchChildrenWidthD ) {
		//
		// 	const used = _computeChildrenSideWidth( element );
		// 	const available = element._bounds._innerWidth - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._width._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const width = child._bounds._offsetWidth + distributed;
		// 			child._bounds.setReferenceWidth( child, width );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// } else if ( stretchChildrenHeightD ) {
		//
		// 	const used = _computeChildrenSideHeight( element );
		// 	const available = element._bounds._innerHeight - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._height._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const height = child._bounds._offsetHeight + distributed;
		// 			child._bounds.setReferenceHeight( child, height );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// }


	}

}

function _processAutoWidth( element ) {

	// column : retrieve the biggest child width
	// row : retrieve the sum of children width
	element._bounds.setChildrenWidth( element, _computeAutoWidth( element ) );

}

function _processAutoHeight( element ) {

	// column : retrieve the sum of children height
	// row : retrieve the biggest child height
	element._bounds.setChildrenHeight( element, _computeAutoHeight( element ) );

}

/**
 * Retrieve the automatic height from children boxes
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeAutoHeight( element ) {

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return _computeHighestChildHeight( element );


		case 'column' :
		case 'column-reverse' :
			return AutoSizePropertyBox_computeChildrenSideHeight( element );

	}

}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 *
 */
function _computeAutoWidth( element ) {

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return AutoSizePropertyBox_computeChildrenSideWidth( element );


		case 'column' :
		case 'column-reverse' :
			return _computeHighestChildWidth( element );

	}

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function AutoSizePropertyBox_computeChildrenSideWidth( element ) {

	let sumWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		sumWidth += width;

	}

	return sumWidth;

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function AutoSizePropertyBox_computeChildrenSideHeight( element ) {

	let sumHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		sumHeight += height;

	}

	return sumHeight;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildWidth( element ) {

	let maxWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		if ( width > maxWidth ) maxWidth = width;

	}

	return maxWidth;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildHeight( element ) {

	let maxHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		if ( height > maxHeight ) maxHeight = height;

	}

	return maxHeight;

}

;// CONCATENATED MODULE: ./src/elements/basic/BoxElement.js












//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BoxElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	constructor( properties, values) {

		BoxElement.definePropertiesValues( properties, values );

		super( properties, values );

		BoxElement.init( this );

	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsProcess = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new external_three_namespaceObject.Vector3(1,1,1);
		this._bounds._needsProcess = true;

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		// customize property
		if( !properties.children ) properties.children = ChildrenBox;
		if( !properties.bounds ) properties.bounds = BoundsBox;
		if( !properties.flexDirection ) properties.flexDirection = FlexDirectionPropertyBox;
		if( !properties.justifyContent ) properties.justifyContent = JustifyContentPropertyBox;
		if( !properties.alignItems ) properties.alignItems = AlignItemsPropertyBox;
		if( !properties.position ) properties.position = PositionPropertyBox;
		if( !properties.autoSize ) properties.autoSize = AutoSizePropertyBox;

		if( !properties.renderer ) properties.renderer = RendererPropertyBox;


		// configure
		// /* ie: * /if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;
		if ( !values.invertAlpha ) values.invertAlpha = false;
		if ( !values.fontCastShadow ) values.fontCastShadow = false;
		if ( !values.fontReceiveShadow ) values.fontReceiveShadow = false;
		if ( !values.backgroundCastShadow ) values.backgroundCastShadow = false;
		if ( !values.backgroundReceiveShadow ) values.backgroundReceiveShadow = false;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isBox: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

		element._backgroundMesh.visible = false;

	}

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Line.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


/**
 * Line represents an horizontal combination of positioned inlines with additional properties
 */
class Line extends Array {

	/**
	 *
	 * @param {Inline[]} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The width of this line
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The maximum lineBase of this line of inlines
		 * @type {number}
		 */
		this.lineBase = 0;

		/**
		 * The maximum lineHeight of this line of inlines
		 * @type {number}
		 */
		this.lineHeight = 0;

		/**
		 * The vertical position of this line
		 * @type {number}
		 */
		this.y = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoxLayouter.js


//JSDoc related imports
/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */

class BoxLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false);

		// configure
		this._needsUpdate = true;

		/**
		 * @typedef ChildrenPos
		 * @type {Object & Object.<string,Vector3>}
		 */

		/**
		 *
		 * @type {ChildrenPos}
		 * @internal
		 */
		this._childrenPos = {};

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Updated when :
	 * 	- New child added
	 * 	- Child removed
	 * 	- Child position changed
	 * 	- Child visibility changed
	 * 	- ...?
	 * 	@override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		//console.log( "BoxLayouter update", element.name );
		// reset
		this._childrenPos = {};

		for ( const uiBoxElement of element._children._boxes ) {

			//console.log( uiBoxElement._position._value )
			if( uiBoxElement._position._value === 'static' ) {

				// bind position
				this._childrenPos[ uiBoxElement.id ] = uiBoxElement.position;

			}

		}

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ process( element ) { 	/* eslint-enable no-unused-vars */

		// As _childrenPos are bounds with child.position, this is not required anymore
		//
		// element._position._needsProcess = true;
		//
		// for ( const box of element._children._boxes ) {
		//
		// 	if( this._childrenPos[box.id] ) {
		//
		// 		box.position.x = this._childrenPos[box.id].x;
		// 		box.position.y = this._childrenPos[box.id].y;
		//
		// 	}
		//
		// }

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/BlockElement.js



//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */


class BlockElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {} ) {

		const properties = {};
		BlockElement.definePropertiesValues( properties, values );

		super( properties , values );

		BlockElement.init( this );


	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Block Element can only contains box elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {
		/* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isBox ) {

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		properties.layouter = BoxLayouter;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init ( element ) {

		Object.defineProperties( element , {
				isBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}

}

;// CONCATENATED MODULE: ./src/core/properties/TextContentInline.js


class TextContentInline extends BaseProperty{

	constructor() {

		super( "textContent", null, false );

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		element._glyphs._needsUpdate = true;
		element._whiteSpace._needsProcess = true;

	}


}

;// CONCATENATED MODULE: ./src/core/properties/InlinesProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlinesProperty extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @private
		 */
		this._value = null;

		// value

		// 3. Inlines
		// this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		// 4. kerning
		// this._buildContentKernings();


		// 5.? Apply margin and padding on first and last inlines
		// if( this._textContentInlines.length ) {
		//
		// 	// First gets left side
		// 	this._textContentInlines[0].paddingLeft = this._padding.w;
		// 	this._textContentInlines[0].marginLeft = this._margin.w;
		//
		// 	// Last gets right side
		// 	const lastIndex = this._textContentInlines.length - 1;
		// 	this._textContentInlines[lastIndex].paddingRight = this._padding.y;
		// 	this._textContentInlines[lastIndex].marginRight = this._margin.y;
		//
		// }

	}

	process( element ) {

		this._value = element._glyphs._value.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		if( this._value.length ) {

			// First gets left side
			this._value[0].paddingLeft = element._padding._value.w;
			this._value[0].marginLeft = element._margin._value.w;

			// Last gets right side
			const lastIndex = this._value.length - 1;
			this._value[lastIndex].paddingRight = element._padding._value.y;
			this._value[lastIndex].marginRight = element._margin._value.y;

		}


		element._fontSize._needsProcess = true;
		element._lineBreak._needsProcess = true;
		element._fontKerning._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<Inline>}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/GlyphsProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class GlyphsProperty extends BaseProperty{

	constructor() {

		super( "glyphs", null, false);

		this._needsUpdate = false;

		/**
		 *
		 * @type {Array.<TypographicGlyph>}
		 * @private
		 */
		this._value = null;

		// value

		// 1. collapsed whiteSpace;
		// this._textContent = Whitespace.collapseWhitespaceOnString( this.content, this.getWhiteSpace() );

		// 2. glyphs
		// this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographicGlyph( char ) );

		// 3. Inlines
		// this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		// 4. kerning
		// this._buildContentKernings();


		// 5.? Apply margin and padding on first and last inlines
		// if( this._textContentInlines.length ) {
		//
		// 	// First gets left side
		// 	this._textContentInlines[0].paddingLeft = this._padding.w;
		// 	this._textContentInlines[0].marginLeft = this._margin.w;
		//
		// 	// Last gets right side
		// 	const lastIndex = this._textContentInlines.length - 1;
		// 	this._textContentInlines[lastIndex].paddingRight = this._padding.y;
		// 	this._textContentInlines[lastIndex].marginRight = this._margin.y;
		//
		// }

	}

	process( element ) {

		if( !element._font._fontVariant ) return;
		if( !element._font._fontVariant.isReady ) return;

		this._value = element._whiteSpace._whiteSpacedContent.split( '' ).map( ( char ) => element._font._fontVariant.getTypographicGlyph( char ) );

		// @TODO : Even if the value is removed it should trigger a rebuild.
		if( this._value ) element._inlines._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<TypographicGlyph>}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/ColorProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ColorProperty extends StyleColorProperty {

	constructor( ) {

		super( 'color', 'inherit', false );

		this.output = this._outputValue;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			ColorProperty_setColor( this.getInheritedInput( element ) , this._value );

		} else {

			ColorProperty_setColor( this._input, this._value);

		}

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function ColorProperty_setColor( value, output ) {



	if ( !( value instanceof external_three_namespaceObject.Color ) ) {

		if ( output instanceof external_three_namespaceObject.Color ) {

			output.set( value );

		} else {

			output = new external_three_namespaceObject.Color( value );

		}

	} else {

		output.set(value);

	}
}



;// CONCATENATED MODULE: ./src/core/properties/LineBreakProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class LineBreakProperty extends BaseProperty{

	constructor( defaultValue = "- ,.:?!\n" ) {

		super( "lineBreak", defaultValue, true );

		/**
		 *
		 * @type {"mandatory"|"possible"|null}
		 * @private
		 */
		this._newLineBreakability = null;


	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._needsProcess = true;

	}

	process( element ) {

		const newLineBreakability = element._whiteSpace._newLineBreakability;

		if( !element._inlines._value ) return;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < element._inlines._value.length; i++ ) {


			const inline = element._inlines._value[ i ];
			const char = inline.char;

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;

			// could be inlineBlock without char
			if( char !== undefined ) {

				// @question : Does it worth to be strategy? I don't really think so
				if ( newLineBreakability !== 'nowrap' ) {

					if ( this._value.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

				}

				if ( char.match( /\n/g ) ) {

					lineBreak = newLineBreakability;

				}

			}

			inline.lineBreak = lineBreak;

		}

	}

	/**
	 * @override
	 * @return {string}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/InlineLayouter.js


class InlineLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @private
		 */
		this._value = null;

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		// find the first text parent;
		this._value = element._parent.find( (p) => { return p.isUI && p.isText } );

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ) { 	/* eslint-enable no-unused-vars */


		// layout has been changed
		if( this._value ) {

			this._value._layouter._needsProcess = true;

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundColorPropertyInline.js



//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class BackgroundColorPropertyInline extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._allowsInherit = false;

		this._input = 'transparent';


	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Changes multiple mesh visibility
		// element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			BackgroundColorPropertyInline_setColor( this.getInheritedInput( element ) , this._value );

		} else {

			BackgroundColorPropertyInline_setColor( this._input, this._value);

		}

	}

}

/**
 *
 * @param {Color|string|number|null}value
 * @param {Color|null} output
 * @private
 */
function BackgroundColorPropertyInline_setColor( value, output ) {



	if ( !( value instanceof external_three_namespaceObject.Color ) ) {

		if ( output instanceof external_three_namespaceObject.Color ) {

			output.set( value );

		} else {

			output = new external_three_namespaceObject.Color( value );

		}

	} else {

		output.set(value);

	}
}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontStylePropertyInline.js



class FontStylePropertyInline extends FontStyleProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontWeightPropertyInline.js


class FontWeightPropertyInline extends FontWeightProperty {

	constructor() {

		super();

	}

	computeOutputValue( element ) {

		const input = this.getInheritedInput( element );

		const converted = LOOK_UP_TABLE[ input ];

		if ( converted ) {

			this._value = converted

		} else {

			this._value = input;

		}

	}

}

const LOOK_UP_TABLE = {
	'light'		: '100',
	'normal'	: '400',
	'bold' 		: '700',
	'bolder' 	: '900'
}


;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontFamilyPropertyInline.js





class FontFamilyPropertyInline extends FontFamilyProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

		this._input = 'inherit';
		this._needsUpdate = true;

		// configure
		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		let abstractedInput = this._inheritedInput;

		if( abstractedInput === 'inherit' ) {
			abstractedInput = this.getInheritedInput( element );
		}

		if( abstractedInput instanceof FontFamily ) {

			this._value = abstractedInput;
			element._font._needsUpdate = true;

		} else if ( typeof abstractedInput === 'string' ) {

			// string - family
			const fontFamily = font_FontLibrary.getFontFamily(abstractedInput);

			if( fontFamily ) {

				this._value = fontFamily;
				element._font._needsUpdate = true;

			} else {

				console.warn( `(.style) fontFamily, the font '${abstractedInput}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamilyPropertyInline|null}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/WhiteSpacePropertyInline.js


/**
 * @typedef  StringCollapserStrategy
 * @type {(textContent:{string}) => string}
 */


/**
 * @typedef  InlineCollapserStrategy
 * @type {(line:{Line}) => number }
 */


/**
 * @typedef InlineWrapperStrategy
 * @type {(inlines:{Array}, i:{number}, lastInlineOffset:{number}, options:Object<string,any>) => boolean}
 */

class WhiteSpacePropertyInline extends WhiteSpaceProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

		this._whiteSpacedContent = '';

		// strategies

		/**
		 *
		 * @type {StringCollapserStrategy}
		 * @internal
		 */
		this._stringCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineCollapserStrategy}
		 * @internal
		 */
		this._inlineCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineWrapperStrategy}
		 * @internal
		 */
		this._inlineWrapper = this.emptyStrategyLogic;
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_computeFromInherited( element ) { /* eslint-enable no-unused-vars */
		super._computeFromInherited( element );

		// set strategies
		this._newLineBreakability = _newlineBreakability( this._value );

		// REDO Whitespace Matrix
		// https://developer.mozilla.org/en-US/docs/Web/CSS/white-space

		switch ( this._value ) {

			case 'nowrap':
			case 'normal':
				this._stringCollapser = _stringCollapseNewLine;
				break;

			case 'pre-line':
				this._stringCollapser = _stringCollapseMultipleSpace;
				break;

			default:
				this._stringCollapser = _stringCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'nowrap':
			case 'normal':
				this._inlineCollapser = _inlineCollapseMultiple;
				break;

			case 'pre-wrap':
				this._inlineCollapser = _inlineCollapseSingle;
				break;

			default:
				this._inlineCollapser = _inlineCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'pre-wrap':
			case 'normal':
				this._inlineWrapper = _lineBreakerWrapText;
				break;

			case 'pre':
				this._inlineWrapper = _lineBreakerLineBreakOnly;
				break;

			default:
				this._inlineWrapper = _lineBreakerNoWrap;

		}


		this._needsProcess = true;

	}


	process( element ) {

		// @TODO: Make a property for Text -> inlineCollapser
		if( element.isInline && !element.isInlineBlock ) {

			this._whiteSpacedContent = this._stringCollapser( element._textContent._value );

			element._glyphs._needsProcess = true;

		}
	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
 *
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 **/
const WHITE_CHARS = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

/**
 * Get the breakability of a newline character according to white-space property
 *
 * @param whiteSpace
 * @returns {string|null}
 */
const _newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case 'pre':
		case 'pre-wrap':
		case 'pre-line':
			return 'mandatory';
	}

	// case NOWRAP:
	// case NORMAL:
	// default:

	return null;

};


// STRING COLLAPSER -----------------------------------------------------

/**
 * Treat newlines as spaces
 * @param textContentValue
 * @return {*}
 * @private
 *
 */
function _stringCollapseNewLine( textContentValue ) {

	return _stringCollapseMultipleSpace( textContentValue.replace( /\n/g, ' ' ) );

}

/**
 * Treat sequences of spaces as only one space
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseMultipleSpace( textContentValue ) {

	return textContentValue.replace( /[ ]{2,}/g, ' ' );

}

/**
 *
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseNothing ( textContentValue ) {
	return textContentValue;
}

// LineBreakers -----------------------------------------------------

/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerWrapText( inlines, i, lastInlineOffset, options ) {
	const inline = inlines[ i ];

	// prevent additional computation if line break is mandatory
	if ( inline.lineBreak === 'mandatory' ) return true;

	// ?? Missing letterSpacing ?
	// prevent additional computation if this character already exceed the available size
	if ( lastInlineOffset + inline.xadvance + inline.xoffset + inline.kerning > options.INNER_WIDTH ) return true;


	const nextBreak = _distanceToNextBreak( inlines, i, options );
	return _shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, options );
}

/* eslint-disable no-unused-vars */
/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerLineBreakOnly( inlines, i, lastInlineOffset, options ) { /* eslint-enable no-unused-vars */

	return inlines[ i ].lineBreak === 'mandatory';

}

/**
 *
 * @return {boolean}
 * @private
 */
function _lineBreakerNoWrap() {
	return false;
}

// Inlines collapser -----------------------------------------------------

/**
 *
 * @param line
 * @return {number}
 * @private
 */
function _inlineCollapseSingle( line ) {
	if ( !line[ 0 ] ) return 0;

	const firstInline = line[ 0 ];
	const lastInline = line[ line.length - 1 ];

	// only process whiteChars glyphs inlines
	// if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
	if ( firstInline.char && firstInline.char === '\n' && line.length > 1 ) {
	// if ( firstInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseLeftInlines( [ firstInline ], line[ 1 ] );

	}

	// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
	if ( lastInline.char && lastInline.char === '\n' && line.length > 1 ) {
	// if ( lastInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseRightInlines( [ lastInline ], line[ line.length - 2 ] );

	}

	return firstInline.offsetX;

}

function _inlineCollapseMultiple( line ) {

	if ( !line[ 0 ] ) return 0;

	let inlinesToCollapse = [];
	let collapsingTarget;
	// collect starting whitespaces to collapse
	for ( let i = 0; i < line.length; i++ ) {

		const inline = line[ i ];

		if ( inline.char && WHITE_CHARS[ inline.char ] && line.length > i ) {

			inlinesToCollapse.push( inline );
			collapsingTarget = line[ i + 1 ];
			continue;

		}

		break;

	}

	_collapseLeftInlines( inlinesToCollapse, collapsingTarget );


	inlinesToCollapse = [];
	collapsingTarget = null;
	// collect ending whitespace to collapse
	for ( let i = line.length - 1; i > 0; i-- ) {

		const inline = line[ i ];
		if ( inline.char && WHITE_CHARS[ inline.char ] && i > 0 ) {

			inlinesToCollapse.push( inline );
			collapsingTarget = line[ i - 1 ];
			continue;

		}

		break;

	}

	_collapseRightInlines( inlinesToCollapse, collapsingTarget );

	return line[ 0 ].offsetX;

}

/**
 *
 * @param line
 * @return {number|*}
 * @private
 */
function _inlineCollapseNothing( line ) {

	if ( !line[ 0 ] ) return 0;
	return line[ 0 ].offsetX;

}

/***********************************************************************************************************************
 * Internal logics
 **********************************************************************************************************************/


/**
 * Visually collapse inlines from right to left ( endtrim )
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseRightInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.fontFactor = 0;
		inline.offsetX = targetInline.offsetX + targetInline.cumulativeWidth;
		inline.cumulativeWidth = 0;

	}

}

/**
 * Visually collapse inlines from left to right (starttrim)
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseLeftInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.fontFactor = 0;
		// inline.offsetX += inline.cumulativeWidth;
		inline.offsetX = targetInline.offsetX;
		inline.cumulativeWidth = 0;

	}

}

/**
 * get the distance in world coord to the next glyph defined
 * as break-line-safe ( like whitespace for instance )
 * @private
 */
function _distanceToNextBreak( inlines, currentIdx, options, accu ) {

	accu = accu || 0;

	// end of the text
	if ( !inlines[ currentIdx ] ) return accu;

	const inline = inlines[ currentIdx ];

	// const kerning = inline.kerning ? inline.kerning : 0;
	// const xoffset = inline.xoffset ? inline.xoffset : 0;
	// const xadvance = inline.xadvance ? inline.xadvance : inline.width;

	// if inline.lineBreak is set, it is 'mandatory' or 'possible'
	if ( inline.lineBreak ) return accu + inline.xadvance;

	// no line break is possible on this character
	return _distanceToNextBreak(
		inlines,
		currentIdx + 1,
		options,
		accu + inline.xadvance + inline.xoffset + inline.kerning + options.LETTERSPACING
	);

}

/**
 * Test if we should line break here even if the current glyph is not out of boundary.
 * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
 * and the distance to the next friendly glyph is out of boundary.
 */
function _shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, options ) {

	// We can't check if last glyph is break-line-friendly it does not exist
	if ( !prevChar || !prevChar.char ) return false;

	// Next break-line-friendly glyph is inside boundary
	if ( lastInlineOffset + nextBreak < options.INNER_WIDTH ) return false;

	// Previous glyph was break-line-friendly
	return options.BREAKON.indexOf( prevChar.char ) > -1;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LetterSpacingPropertyInline.js


class LetterSpacingPropertyInline extends LetterSpacingProperty {

	constructor() {

		super();

		// configure
		this._input = 'inherit';
		this._allowsInherit = false;

		this.computeOutputValue = this._computeFromInherited;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );


		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontSizePropertyInline.js


class FontSizePropertyInline extends SubStyleProperty {

	constructor( ) {

		super( 'fontSize', 'inherit', true );

		// Configure
		this._allowsInherit = false;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		if( element._font._fontVariant ) element._layouter._needsProcess = true;

	}

	process( element ) {

		if( !element._font._fontVariant || !element._font._fontVariant.isReady ) return;

		const SCALE_MULT = this._value / element._font._fontVariant.typographic.size;

		// First character won't be kerned with its void lefthanded peer
		const inlines = element._inlines._value;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < inlines.length; i++ ) {

			const inline = inlines[ i ];

			inline.resetOffsets();

			inline.fontSize = this._value;
			inline.fontFactor = SCALE_MULT;

		}

		// element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}



;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsPropertyText.js


class SegmentsPropertyText extends SegmentsProperty {

	constructor() {

		super( 'segments', 1, false );

		this._notInheritedValue = undefined;

	}


	/* eslint-disable no-unused-vars */	update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;
		if ( this._notInheritedValue === 'inherit' ) {

			this._notInheritedValue = this.getInheritedInput( element );

		}

		element._layouter._needsUpdate = true;

	}

	/**
	 *
	 * @param {number|"inherit"} v
	 */
	set value( v ) {

		if ( this._value === v ) return;

		this._value = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @override
	 * @return {number}
	 */
	get value() {

		if ( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsPropertyInline.js


class SegmentsPropertyInline extends SegmentsPropertyText {

	constructor() {

		super();

		this._value = 'inherit';

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningPropertyInline.js



class FontKerningPropertyInline extends FontKerningProperty {

	constructor() {

		super();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);

		// this._needsProcess = true;
		element._parent._value._layouter._needsProcess = false;
	}

	process( element ) {

		// apply kerning on inlines
		if ( this._value !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			const whiteSpacedContent = element._whiteSpace._whiteSpacedContent;
			const inlines = element._inlines._value;
			for ( let i = 1; i < inlines.length; i++ ) {

				const glyphPair = whiteSpacedContent[ i - 1 ] + whiteSpacedContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				inlines[ i ].kerning = element._font._fontVariant.getKerningAmount( glyphPair );

			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenInline.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenInline extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._uis = [];

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		// this._compute( element );
		//
		// this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._compute( element );

	}

	/* eslint-disable no-unused-vars */ _compute( element ) { /* eslint-enable no-unused-vars */

		// this._uis = element.children.filter( child => child.visible && child.isUI );
		//
		// this._inlines = this._uis.filter( child => child.isInline );

	}

	/**
	 *
	 */
	dispose() {

		// this._inlines = null;

	}

}

;// CONCATENATED MODULE: ./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js


function computeTangents() {

	throw new Error( 'BufferGeometryUtils: computeTangents renamed to computeMikkTSpaceTangents.' );

}

function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const srcArray = attribute.isInterleavedBufferAttribute ? attribute.data.array : attribute.array;
			const dstArray = new Float32Array( attribute.getCount() * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.getCount(); i ++ ) {

				dstArray[ j ++ ] = MathUtils.denormalize( attribute.getX( i ), srcArray );
				dstArray[ j ++ ] = MathUtils.denormalize( attribute.getY( i ), srcArray );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = MathUtils.denormalize( attribute.getZ( i ), srcArray );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeBufferGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new external_three_namespaceObject.BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		// gather .userData

		mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
		mergedGeometry.userData.mergedUserData.push( geometry.userData );

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeBufferAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( attribute.isInterleavedBufferAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
			return null;

		}

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.array.length;

	}

	const array = new TypedArray( arrayLength );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		array.set( attributes[ i ].array, offset );

		offset += attributes[ i ].array.length;

	}

	return new external_three_namespaceObject.BufferAttribute( array, itemSize, normalized );

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {Array<InterleavedBufferAttribute>}
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

// returns a new, non-interleaved version of the provided attribute
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

// deinterleaves all attributes on the geometry
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * @param {Array<BufferGeometry>} geometry
 * @return {number}
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry>}
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const attrArrays = {};
	const morphAttrsArrays = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];

	// initialize the arrays
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];

		attrArrays[ name ] = [];

		const morphAttr = geometry.morphAttributes[ name ];
		if ( morphAttr ) {

			morphAttrsArrays[ name ] = new Array( morphAttr.length ).fill().map( () => [] );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const decimalShift = Math.log10( 1 / tolerance );
	const shiftMultiplier = Math.pow( 10, decimalShift );
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * shiftMultiplier ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the attribute arrays
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttr = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newarray = attrArrays[ name ];
				const newMorphArrays = morphAttrsArrays[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					newarray.push( attribute[ getterFunc ]( index ) );

					if ( morphAttr ) {

						for ( let m = 0, ml = morphAttr.length; m < ml; m ++ ) {

							newMorphArrays[ m ].push( morphAttr[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// Generate typed arrays from new attribute arrays and update
	// the attributeBuffers
	const result = geometry.clone();
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const oldAttribute = geometry.getAttribute( name );

		const buffer = new oldAttribute.array.constructor( attrArrays[ name ] );
		const attribute = new BufferAttribute( buffer, oldAttribute.itemSize, oldAttribute.normalized );

		result.setAttribute( name, attribute );

		// Update the attribute arrays
		if ( name in morphAttrsArrays ) {

			for ( let j = 0; j < morphAttrsArrays[ name ].length; j ++ ) {

				const oldMorphAttribute = geometry.morphAttributes[ name ][ j ];

				const buffer = new oldMorphAttribute.array.constructor( morphAttrsArrays[ name ][ j ] );
				const morphAttribute = new BufferAttribute( buffer, oldMorphAttribute.itemSize, oldMorphAttribute.normalized );
				result.morphAttributes[ name ][ j ] = morphAttribute;

			}

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} drawMode
 * @return {BufferGeometry>}
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 * Helpful for Raytracing or Decals.
 * @param {Mesh | Line | Points} object An instance of Mesh, Line or Points.
 * @return {Object} An Object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	if ( object.geometry.isBufferGeometry !== true ) {

		console.error( 'THREE.BufferGeometryUtils: Geometry is not of type BufferGeometry.' );
		return null;

	}

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.boneTransform( a, _vA );
			object.boneTransform( b, _vB );
			object.boneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}



;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyInline.js




class RendererPropertyInline extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._inlines._value || !element._inlines._value.length ) return;

			const charactersAsGeometries = element._inlines._value.map(
				inline =>
					element._font._fontVariant.getGeometricGlyph( inline, element )
						.translate( inline.offsetX, inline.offsetY, 0 )

			);

			const mergedGeom = mergeBufferGeometries( charactersAsGeometries );

			element.setFontMesh( new external_three_namespaceObject.Mesh( mergedGeom, element.fontMaterial) );

			element._fontMesh.renderOrder = Infinity;



	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignPropertyInline.js



class TextAlignPropertyInline extends TextAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		element._layouter._needsProcess = true;

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/InlineElement.js





















//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlineElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = { }) {

		const properties = {};
		InlineElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineElement.init( this );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Text Element can only contains inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isInline ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	_rebuildParentUI = () => {

		super._rebuildParentUI();

		this._layouter._needsUpdate = true;

	}

	set textContent( value ) {

		this._textContent.value = value;

	}

	get textContent () { return this._textContent._value; }

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.textContent ) properties.textContent = TextContentInline;
		if( !properties.glyphs ) properties.glyphs = GlyphsProperty;
		if( !properties.inlines ) properties.inlines = InlinesProperty;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInline;


		if( !properties.fontFamily ) properties.fontFamily = FontFamilyPropertyInline;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightPropertyInline;
		if( !properties.fontStyle ) properties.fontStyle = FontStylePropertyInline;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;
		if( !properties.color ) properties.color = ColorProperty;
		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorPropertyInline;
		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.segments ) properties.segments = SegmentsPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyInline;

		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyInline;

		// if( !properties.inlines ) properties.inlines = InlinesProperty;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}
}

;// CONCATENATED MODULE: ./src/core/properties/TextContentText.js



class TextContentText extends TextContentEmpty{

	constructor() {

		super( "textContent", null, false );

		this._needsUpdate = false;

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		for ( let i = element.children.length - 1 ; i >= 0; i-- ) {
			const child = element.children[ i ];
			if( child.isUI ) {

				element.remove( child );
				child.clear();

			}

		}

		if( this._value ) element.add( new InlineElement({name:'anonymousInline',textContent:this._value}));

	}

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Lines.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Lines represents a vertical succession of Line
 */
class Lines extends Array {

	/**
	 *
	 * @param {Line} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The maximum width of Line items
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The addition of height of any Line
		 * @type {number}
		 */
		this.height = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/TextLayouter.js




class TextLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {

		let INNER_WIDTH = element._width._value;
		// if nowrap or pre => infinite then = re bounds;

		// if auto => element.getInherited()
		// if display inline => auto then if lines.width less than autoWidth => shrink


		if( element._whiteSpace._value === 'nowrap' || element._whiteSpace._value === 'pre' ){

			INNER_WIDTH = Infinity;

		} else if ( element._width._auto ) {

			INNER_WIDTH = Infinity;

		} else {

			INNER_WIDTH = element._bounds._innerWidth;

		}

		//console.log( INNER_WIDTH );

		// let INNER_WIDTH = element._bounds._innerWidth;



		// // got by MeshUIComponent
		// const JUSTIFICATION = this.getJustifyContent();
		// const ALIGNMENT = this.getTextAlign();

		// Compute lines

		const INTERLINE = element._lineHeight._value;

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = new Lines( new Line() );

		let lastInlineOffset = 0;
		element._children._inlines.forEach( ( inlineElement ) => {

			// Abort condition

			if ( !inlineElement._inlines.value ) return;

			this._resetInlines( inlineElement );

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its dimensions
			//////////////////////////////////////////////////////////////

			// @TODO: Fontsize best fit
			const FONTSIZE = inlineElement._fontSize._value;

			const LETTERSPACING = inlineElement._letterSpacing._value * FONTSIZE;

			const WHITESPACE = inlineElement._whiteSpace._value;

			const BREAKON = inlineElement._lineBreak._value;

			const whiteSpaceOptions = {
				WHITESPACE,
				LETTERSPACING,
				BREAKON,
				INNER_WIDTH
			}

			const inlineWrapper = inlineElement._whiteSpace._inlineWrapper;

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

			inlineElement._inlines.value.forEach( ( inline, i, inlines ) => {

				const line = lines[lines.length - 1];

				// Line break
				const shouldBreak = inlineWrapper(inlines,i,lastInlineOffset, whiteSpaceOptions );

				if ( shouldBreak ) {

					lines.push( new Line( inline ) );

					inline.offsetX = inline.xoffset;

					// restart the lastInlineOffset as zero.
					if ( inline.width === 0 ) {
						lastInlineOffset = 0;
						return;
					}

					// compute lastInlineOffset normally
					// except for kerning which won't apply
					// as there is visually no lefthanded glyph to kern with
					inline.cumulativeWidth = inline.xadvance + LETTERSPACING;
					lastInlineOffset = inline.cumulativeWidth;
					return;

				}

				lines[ lines.length - 1 ].push( inline );
				inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

				inline.cumulativeWidth = inline.xadvance + inline.kerning + LETTERSPACING;
				lastInlineOffset += inline.cumulativeWidth;

				// in case of lineBreak mandatory
				if( line.length-1 === 1) {

					if ( line[ line.length - 2 ].width === 0 ) {

						// remove the offset of the character following the newline
						inline.offsetX -= inline.xoffset;
						lastInlineOffset -= inline.xoffset;

					}

				}

			} );

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

		} );

		// Compute single line and combined lines dimensions
		const inlineCollapser = element._whiteSpace._inlineCollapser;

		let width = 0;
		let lineOffsetY = 0;

		// calculates lines
		lines.forEach( ( line, i ) => {

			// starts by processing whitespace, it will return a collapsed left offset
			const whiteSpaceOffset = inlineCollapser( line );

			//
			let lineHeight = 0;
			let lineBase = 0;

			line.forEach( ( inline ) => {

				lineHeight = Math.max( lineHeight, inline.lineHeight );
				lineBase = Math.max( lineBase, inline.lineBase );

				inline.offsetX -= whiteSpaceOffset;

			});

			line.lineHeight = lineHeight;
			line.lineBase = lineBase;

			const baseLineDelta = lineHeight - lineBase;

			// process yoffset
			line.forEach( ( inline ) => {

				inline.offsetY = lineOffsetY - line.lineHeight + baseLineDelta + lines[ 0 ].lineHeight;

			});

			if( i !== 0 ) {

				// get the previousLine y and increase
				line.y =  lines[i-1].y - (line.lineHeight * INTERLINE) / 2;

			} else {

				line.y = - ((line.lineHeight * INTERLINE ) - line.lineHeight) / 2;

			}

			lineOffsetY = lineOffsetY - (line.lineHeight * INTERLINE);

			//

			line.width = 0;
			// if this line have inlines
			if ( line[ 0 ] ) {

				// compute its width: length from firstInline:LEFT to lastInline:RIGHT
				// only by the length of its extremities
				const lastInline = line[ line.length - 1 ];

				// Right + Left ( left is negative )
				line.width = ( lastInline.offsetX + lastInline.cumulativeWidth + lastInline.paddingRight + lastInline.marginRight ) + line[ 0 ].offsetX;

				width = Math.max( width, line.width);
			}

		} );

		lines.height = Math.abs(lineOffsetY);
		lines.width = width;

		this._value = lines;

		if( INNER_WIDTH === Infinity ) {

			element._bounds.setChildrenWidth( element, lines.width );

		}

		if( element._height._auto ) {

			element._bounds.setChildrenHeight( element, lines.height );

		}

		const parent = element._parent._value;
		if( parent ) {

			parent._autoSize._needsProcess = true;
			parent._flexDirection._needsProcess = true;

		}

		element._inlineJustificator._needsProcess = true;
		element._textAlign._needsProcess = true;

	}

	_resetInlines ( inlineElement ) {

		// ensure no collapsed remains
		inlineElement._fontSize.process( inlineElement );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignPropertyText.js



class TextAlignPropertyText extends TextAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		//
		// @TODO : strategies

	}


	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		this._needsProcess = true;

	}

	process( element ) {

		_process( element );

		element._renderer._needsRender = true;

	}

}

function _process( element ) {

	const lines = element._layouter._value;
	const ALIGNMENT = element._textAlign._value;
	const INNER_WIDTH = element._bounds._innerWidth;

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( element, line, i === lines.length - 1 );

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		// const paddingAmount = - ( padding.w + padding.y ) / 2 - ( border.w + border.y ) / 2;
		// const paddingAmount = - ( padding.w + padding.y ) / 2;
		const paddingAmount = ( - padding.w + padding.y ) / 2 + ( - border.w + border.y ) / 2;

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX - paddingAmount;
			// line[ j ].offsetX += offsetX;

		}

		// line.x = line[ 0 ].offsetX;


	}

	// last operations for justifications alignments
	if ( ALIGNMENT.indexOf( 'justify' ) === 0 ) {

		for ( let i = 0; i < lines.length; i++ ) {

			const line = lines[ i ];


			// do not process last line for justify-left or justify-right
			if ( ALIGNMENT.indexOf( '-' ) !== -1 && i === lines.length - 1 ) return;

			// can only justify is space is remaining
			const REMAINING_SPACE = INNER_WIDTH - line.width;
			if ( REMAINING_SPACE <= 0 ) return;

			// count the valid spaces to extend
			// Do not take the first nor the last space into account
			let validSpaces = 0;
			for ( let j = 1; j < line.length - 1; j++ ) {

				validSpaces += line[ j ].char === ' ' ? 1 : 0;

			}
			const additionalSpace = REMAINING_SPACE / validSpaces;


			// for right justification, process the loop in reverse
			let inverter = 1;
			if ( ALIGNMENT === 'justify-right' ) {

				line.reverse();
				inverter = -1;

			}

			let incrementalOffsetX = 0;

			// start at ONE to avoid first space
			for ( let j = 1; j <= line.length - 1; j++ ) {

				// apply offset on each char
				const inlineCharacter = line[ j ];
				inlineCharacter.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += inlineCharacter.char === ' ' ? additionalSpace : 0;

			}

			// for right justification, the loop was processed in reverse
			if ( ALIGNMENT === 'justify-right' ) {
				line.reverse();
			}


		}

	}

}

function _computeLineOffset ( element, line, lastLine ) {

	switch ( element._textAlign._value ) {

		case 'justify-left':
		case 'justify':
		case 'left':
			return - element._bounds._innerWidth / 2;

		case 'justify-right':
		case 'right':
			return -line.width + ( element._bounds._innerWidth / 2 );


		case 'center':
			return -line.width / 2;

		case 'justify-center':
			if ( lastLine ) {

				// center alignement
				return -line.width / 2;

			}

			// left alignment
			return - element._bounds._innerWidth / 2;

		default:
			console.warn( `textAlign: '${element._textAlign._value}' is not valid` );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionPropertyText.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionPropertyText extends FlexDirectionProperty {

	constructor( ) {

		super();

		this._value = this._input = 'column';

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Evaluate the needs of this property. Could be empty
		this._value = this._inheritedInput;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LineHeightPropertyInline.js



class LineHeightPropertyInline extends LineHeightProperty {

	/**
	 *
	 */
	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningPropertyText.js



class FontKerningPropertyText extends FontKerningProperty {

	constructor() {

		super();

		this._value = this._input = this.getDefaultValue();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);


	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsText.js


class BoundsText extends BoundsBox {

	constructor() {

		super();

		this._innerWidth = Infinity;
		this._innerHeight = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenText.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenText extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._inlines = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._boxes = [];

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		this._compute( element );

		this._needsProcess = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		this._compute( element );

	}

	_compute( element ) {

		this._uis = element.children.filter( child => child.visible && child.isUI );

		this._inlines = this._uis.filter( child => child.isInline );

	}

	/**
	 *
	 */
	dispose() {

		this._inlines = null;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/AutoSizePropertyText.js


/**
 * Autosize are only trigger when natural size changed
 */
class AutoSizePropertyText extends BaseProperty {

	constructor() {

		super( 'autosize' );

	}

	process( element ) {

		if( element._layouter._value && element._layouter._value.length ) {

			const lines = element._layouter._value;

			// as this is from children offsetWidth, it means parent innerWidth
			const padding = element._padding._value;
			const border = element._borderWidth._value;

			// has auto size get the height from children
			if ( element._width._auto ) {

				element._bounds.setOffsetWidth( element, lines.width + padding.w + padding.y + border.w + border.y );

			}

			if ( element._height._auto ) {

				element._bounds.setOffsetHeight( element, lines.height + padding.x + padding.z + border.x + border.z );

			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyText.js


class RendererPropertyText extends RendererPropertyBox{

	constructor() {

		super( 'renderer' );

		this._needsUpdate = false;

	}


	render( element ) {

		super.render( element );

		for ( const inlineElement of element._children._inlines ) {

			inlineElement._renderer.render( inlineElement );

		}

		element.performAfterUpdate();

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/TextElement.js


















//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class TextElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {}) {

		const properties = {};
		TextElement.definePropertiesValues( properties, values );

		super( properties, values );

		TextElement.init( this );


	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Text Element can only contains inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];
		let updateLayout = false;

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isInline ) {

				if( argument.isInline ) {
					updateLayout = true;
				}

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		if( validChildren.length > 0 ) {

			super.add( ...validChildren )

		}

		if( updateLayout ) this._layouter._needsProcess = true;


		return this;

	}


	set textContent ( value ) {

		for ( let i = this.children.length - 1 ; i >= 0; i-- ) {
			const child = this.children[ i ];
			if( child.isUI ) {

				this.remove( child );
				child.clear();

			}

		}

		if( value ) {

			this.add( new InlineElement({name:'anonymousInline',textContent:value}));

		}

	}

	get textContent ( ) {
		return super.textContent;
	}

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	get lines() { return this._layouter._value; }

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		properties.flexDirection = FlexDirectionPropertyText;
		properties.justifyContent = JustifyContentProperty;
		properties.alignItems = AlignItemsProperty;
		properties.bounds = BoundsText;
		properties.autoSize = AutoSizePropertyText;
		properties.renderer = RendererPropertyText;

		if( !properties.children ) properties.children = ChildrenText;
		if( !properties.textContent ) properties.textContent = TextContentText;
		if( !properties.layouter ) properties.layouter = TextLayouter;
		if( !properties.lineHeight ) properties.lineHeight = LineHeightPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyText;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyText;
		if( !properties.segments ) properties.segments = SegmentsPropertyText;

		// configure
		if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isText: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}
}

;// CONCATENATED MODULE: ./src/core/properties/InlinesPropertyInlineBlock.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @property {Array.<InlineGlyph>} value
 */
class InlinesPropertyInlineBlock extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @internal
		 */
		this._value = [];

	}

	process( element ) {

		// First gets left side
		this._value[0].paddingLeft = element._padding._value.w;
		this._value[0].marginLeft = element._margin._value.w;

		// Last gets right side
		const lastIndex = this._value.length - 1;
		this._value[lastIndex].paddingRight = element._padding._value.y;
		this._value[lastIndex].marginRight = element._margin._value.y;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyInlineBox.js



class RendererPropertyInlineBox extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._backgroundMesh ) {

			element.setBackgroundMesh( new Frame(element) );

		}

		element._backgroundMesh.position.x = element._inlines._value[0].offsetX + element._inlines._value[0].width/2;
		// element._backgroundMesh.position.y = element._inlines._value[0].offsetY + element._inlines._value[0].lineBase/4;
		element._backgroundMesh.position.y = element._inlines._value[0].offsetY + element._inlines._value[0].lineBase/2;

		element._bounds.render( element );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsInlineBlock.js



class BoundsInlineBlock extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new external_three_namespaceObject.Vector3( 1, 1, 1 );

		this._offsetWidth = 0;
		this._offsetHeight = 0;

		this._innerWidth = 0;
		this._innerHeight = 0;
	}




	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		this.output( out );

		this._offsetWidth = this._innerWidth = element._inlines._value[0].width;
		this._offsetHeight = this._innerHeight = element._inlines._value[0].height;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}

}


;// CONCATENATED MODULE: ./src/elements/basic/InlineBlockElement.js



















class InlineBlockElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {}) {

		const properties = {};
		InlineBlockElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineBlockElement.init( this );

	}

	clear() {

		// remove cross reference
		for ( const inline of this._inlines._value ) {
			inline.clear();
		}

		return super.clear();
	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		this._backgroundMesh.raycast = ()=>{};

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsUpdate = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new external_three_namespaceObject.Vector3(1,1,1);
		this._bounds._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'ThreeMeshUI::InlineBlockElement cannot contains UI Elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.bounds ) properties.bounds = BoundsInlineBlock;
		if( !properties.inlines ) properties.inlines = InlinesPropertyInlineBlock;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInlineBox;

		// reset inlineElement specificity
		if( !properties.fontFamily ) properties.fontFamily = FontFamilyProperty;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightProperty;
		if( !properties.fontStyle ) properties.fontStyle = FontStyleProperty;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;
		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorProperty;
		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningProperty;

		if( !values.backgroundSize ) values.backgroundSize = 'cover';

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				},
				isInlineBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		element._inlines._value = [new InlineBlockInline(element)];

		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

	}

}




/**
 * InlineBlock has its own Inline implementation
 */
class InlineBlockInline extends Inline {

	/**
	 *
	 * @param {InlineBlockElement} parent
	 */
	constructor( parent ) {

		super();

		/**
		 * @TODO: This currently make a circular reference that should ideally be removed
		 * @type {InlineBlockElement}
		 * @private
		 */
		this._uiElement = parent;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get xadvance() {

		const padding = this._uiElement._padding._value;
		const width = this._uiElement._width;

		return padding.w + padding.y + width.value;
	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get width() {

		const width = this._uiElement._width;
		return width.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get height() {

		return this._uiElement._height.value;

	}


	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineHeight() {

		return this._uiElement._height.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._uiElement._height.value }

	/**
	 *
	 */
	clear() {

		this._uiElement = null;

	}

}


;// CONCATENATED MODULE: ./src/utils/Behavior.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


class Behavior {

	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 */
	constructor( subject ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @protected
		 */
		this._subject = subject;

	}

	/**
	 * @abstract
	 */
	attach() {

		console.error(`Behavior::attach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 * @returns {void}
	 */
	act() {

		throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 */
	detach() {

		console.error(`Behavior::detach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 *
	 */
	clear() {

	}

}

;// CONCATENATED MODULE: ./src/three-mesh-ui.js
/* global global */





















const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block: BlockElement,
	Text : TextElement,
	Inline: InlineElement,
	InlineBlock : InlineBlockElement,
	// Keyboard : KeyboardElement,
	MeshUIBaseElement: MeshUIBaseElement,
	FontLibrary: font_FontLibrary,
	update,
	MSDFFontMaterialUtils: MSDFFontMaterialUtils,
	ShaderChunkUI: ShaderChunkUI,
	Behavior: Behavior,
	FontVariant: font_FontVariant
};


if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;




















/* harmony default export */ const three_mesh_ui = (ThreeMeshUI);





var __webpack_exports__BaseProperty = __webpack_exports__.w8;
var __webpack_exports__Behavior = __webpack_exports__.cg;
var __webpack_exports__Block = __webpack_exports__.gO;
var __webpack_exports__DefaultValues = __webpack_exports__.wb;
var __webpack_exports__FontLibrary = __webpack_exports__.zV;
var __webpack_exports__FontVariant = __webpack_exports__.HS;
var __webpack_exports__InheritableProperty = __webpack_exports__.Ec;
var __webpack_exports__Inline = __webpack_exports__.gF;
var __webpack_exports__InlineBlock = __webpack_exports__.ol;
var __webpack_exports__InlineGlyph = __webpack_exports__.pz;
var __webpack_exports__MSDFFontMaterialUtils = __webpack_exports__.tx;
var __webpack_exports__MaterialTransformers = __webpack_exports__.hj;
var __webpack_exports__MeshUIBaseElement = __webpack_exports__.FV;
var __webpack_exports__ShaderChunkUI = __webpack_exports__.sV;
var __webpack_exports__Text = __webpack_exports__.xv;
var __webpack_exports__TypographicFont = __webpack_exports__.mx;
var __webpack_exports__TypographicGlyph = __webpack_exports__.gE;
var __webpack_exports__default = __webpack_exports__.ZP;
var __webpack_exports__update = __webpack_exports__.Vx;
export { __webpack_exports__BaseProperty as BaseProperty, __webpack_exports__Behavior as Behavior, __webpack_exports__Block as Block, __webpack_exports__DefaultValues as DefaultValues, __webpack_exports__FontLibrary as FontLibrary, __webpack_exports__FontVariant as FontVariant, __webpack_exports__InheritableProperty as InheritableProperty, __webpack_exports__Inline as Inline, __webpack_exports__InlineBlock as InlineBlock, __webpack_exports__InlineGlyph as InlineGlyph, __webpack_exports__MSDFFontMaterialUtils as MSDFFontMaterialUtils, __webpack_exports__MaterialTransformers as MaterialTransformers, __webpack_exports__MeshUIBaseElement as MeshUIBaseElement, __webpack_exports__ShaderChunkUI as ShaderChunkUI, __webpack_exports__Text as Text, __webpack_exports__TypographicFont as TypographicFont, __webpack_exports__TypographicGlyph as TypographicGlyph, __webpack_exports__default as default, __webpack_exports__update as update };
