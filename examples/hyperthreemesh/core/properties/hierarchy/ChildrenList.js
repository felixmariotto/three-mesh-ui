
//JSDoc related imports
/* eslint-disable no-unused-vars */
import HTMListItem from 'three-mesh-ui/examples/hyperthreemesh/elements/HTMListItem';
import ChildrenBox from 'three-mesh-ui/src/core/properties/hierarchy/ChildrenBox';
/* eslint-enable no-unused-vars */

export default class ChildrenList extends ChildrenBox {

	constructor() {

		super( 'children', null, false );

	}



	_compute( element ) {

		super._compute( element );

		const lis = this._uis.filter( element => element instanceof HTMListItem );
		for ( let i = 0; i < lis.length; i++ ) {
			lis[ i ]._listStyleElementBlock._listIndex = (i+1);
			lis[ i ]._listStyleElementBlock._listStyle._needsUpdate = true;
		}

	}

}
