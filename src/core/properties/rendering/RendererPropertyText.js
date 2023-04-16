import RendererPropertyBox from './RendererPropertyBox';

export default class RendererPropertyText extends RendererPropertyBox{

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
