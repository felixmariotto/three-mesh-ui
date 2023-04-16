import HTMTextElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMTextElement';
import HTMInlineElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineElement';
import ListStyleProperty from 'three-mesh-ui/examples/hyperthreemesh/core/properties/ListStyleProperty';
import ListStylePropertyInlineBlock from 'three-mesh-ui/examples/hyperthreemesh/core/properties/ListStylePropertyInlineBlock';
import HTMInlineBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineBlockElement';
import InlineElement from 'three-mesh-ui/src/elements/basic/InlineElement';

export default class HTMListItem extends HTMTextElement{

	constructor( values = {} ) {

		super(values);

		this.appendProperty( "listStyle", new ListStyleProperty() );

		// @TODO: A morpheable inline-block to inline-text would be better than this
		this._listStyleElementBlock = new HTMInlineBlockElement({
			width:'50%',
			height:'50%',
			margin: '0.5em',
			tagName:"::",
		});

		this._listStyleElementText = new HTMInlineElement({
			tagName: "::",
			margin: '0.5em',
			textContent : ""
		});

		this._listStyleElementBlock._textCounterPart = this._listStyleElementText;

		this._listStyleElementBlock.appendProperty( "listStyle", new ListStylePropertyInlineBlock() );

		this.add( this._listStyleElementBlock );
		this.add( this._listStyleElementText );

	}

	/*********************************************************************************************************************
	 * PROVIDES AN API OVER `textContent` for listStyle
	 ********************************************************************************************************************/

	set textContent ( value ) {

		for ( let i = this.children.length - 1 ; i >= 0; i-- ) {
			const child = this.children[ i ];
			if( child.isUI && child !== this._listStyleElementBlock && child !== this._listStyleElementText ) {

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

	set listStyle( value ){
		this._listStyle.inline = value;
	}

	get listStyle(){
		return this._listStyle.inline;
	}

}
