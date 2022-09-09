import HTMButtonToggle from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMButtonToggle';

export default class HTMButtonRadio extends HTMButtonToggle {

	constructor( values = {} ) {
		super( values );

		this.attributes.set('type','radio');
	}


	_clicked( intersect ) {

		if( this.hasAttribute('checked') ) return;

		for ( const element of this._group._elements ) {

			if( element.hasAttribute('checked') ){

				element.removeAttribute('checked');
				element.deactivatePseudoState('checked');

			}

		}

		this.setAttribute('checked', null);
		this.activatePseudoState('checked');

		this.dispatchEvent( {type:'change', value:this.getAttribute('value')});

		// and dispatch click
		intersect.type = 'click';
		this.dispatchEvent( intersect );

	}


}
