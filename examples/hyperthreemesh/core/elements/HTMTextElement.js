import HTMBoxElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBoxElement';
import TextElement from '../../../../src/elements/basic/TextElement';
import HTMInlineElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineElement';

/**
 * @extends {MeshUIBaseElement}
 */
export default class HTMTextElement extends HTMBoxElement {

	/**
	 *
	 * @param {Object.<string,any>} [values=null]
	 */
	constructor( values= {}) {

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

			this.add( new HTMInlineElement({tagName:'anonymous-span',textContent:value}));

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

}
