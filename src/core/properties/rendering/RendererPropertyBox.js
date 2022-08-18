import BaseProperty from '../BaseProperty';
import Frame from '../../../frame/Frame';

export default class RendererPropertyBox extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	process( element ) {

		element.setBackgroundMesh( new Frame(element) );

	}

}
