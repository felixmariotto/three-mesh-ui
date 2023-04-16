import HTMButton from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMButton';
import { getGroupByName } from 'three-mesh-ui/examples/hyperthreemesh/core/Group';
import HTMInlineBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineBlockElement';
import HTMInlineElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMInlineElement';

export default class HTMButtonToggle extends HTMButton {

	constructor( values = {} ) {

		const group = values.group ? values.group : 'default';

		let textContent = null;
		if( values.textContent ) {
			textContent = values.textContent;
			delete values.textContent;
		}

		let value = null;
		if( values.value !== undefined ) {
			value = values.value;
			delete values.value;
		}

		super( values );

		this.setAttribute( 'type', 'toggle');
		this.setAttribute( 'value', value);

		this._group = getGroupByName( group, true );

		this._group.add( this );

		//
		this._ascent = new HTMInlineBlockElement( {
			tagName:'ascent',
			borderRadius:0.015,
			borderWidth:0.008,
			borderColor:0xff0099,
			backgroundColor:0x000000,
			margin: 0.01,});

		this._label = new HTMInlineElement({tagName:'label'});

		this.add( this._ascent, this._label );

		if( textContent ) {
			this.textContent = textContent;
		}

	}


	clear() {

		this._group.remove( this );

		return super.clear();

	}

	/*********************************************************************************************************************
	 * Raycast Implementations
	 ********************************************************************************************************************/

	_clicked( intersect ) {

		if( this.hasAttribute('checked') ) {
			this.removeAttribute('checked');
			this.deactivatePseudoState('checked');
		}else{
			this.setAttribute('checked', null);
			this.activatePseudoState('checked');
		}

		this.dispatchEvent( {type:'change', value:this.getAttribute('value')});

		intersect.type = 'click';
		this.dispatchEvent( intersect );

	}


	/*********************************************************************************************************************
	 * PROVIDES AN API OVER `attributes` ?
	 ********************************************************************************************************************/

	set checked( v ) {

		this.setAttribute( 'checked', null );

	}

	get checked( ) {

		return this.hasAttribute('checked');

	}

	set textContent( v ) {

		this._label.textContent = v;

	}

	get textContent() {

		return this._label.textContent;

	}

	get label() { return this._label; }


}
