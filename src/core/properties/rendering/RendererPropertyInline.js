import BaseProperty from '../BaseProperty';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { Mesh } from 'three';

export default class RendererPropertyInline extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._inlines._value || !element._inlines._value.length ) return;

			const charactersAsGeometries = element._inlines._value.map(
				inline =>
					element._font._fontVariant.getGeometricGlyph( inline, element )
						.translate( inline.offsetX, inline.offsetY, 0 )

			);

			const mergedGeom = mergeBufferGeometries( charactersAsGeometries );

			element.setFontMesh( new Mesh( mergedGeom, element.fontMaterial) );

			element._fontMesh.renderOrder = Infinity;



	}

}
