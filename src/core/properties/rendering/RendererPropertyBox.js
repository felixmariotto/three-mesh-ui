import BaseProperty from '../BaseProperty';
import Frame from '../../../frame/Frame';

export default class RendererPropertyBox extends BaseProperty{

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
