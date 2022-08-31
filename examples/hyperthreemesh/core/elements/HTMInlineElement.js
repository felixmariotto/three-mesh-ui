import HTMBaseElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBaseElement';
import InlineElement from '../../../../src/elements/basic/InlineElement';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMInlineElement extends HTMBaseElement {

	/**
	 *
	 * @param {Object.<string,any>} [values={}]
	 */
	constructor( values = {}) {

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

}
