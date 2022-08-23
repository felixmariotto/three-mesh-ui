import BaseProperty from '../BaseProperty';
import Frame from '../../../frame/Frame';

export default class RendererPropertyInlineBox extends BaseProperty{

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
