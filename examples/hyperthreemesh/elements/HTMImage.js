import HTMBlockElement from 'three-mesh-ui/examples/hyperthreemesh/core/elements/HTMBlockElement';
import { TextureLoader } from 'three';

export default class HTMImage extends HTMBlockElement{

	constructor( values = {}, properties = {} ) {

		if( values.backgroundOpacity === undefined ) values.backgroundOpacity = 1;
		if( values.backgroundColor === undefined ) values.backgroundColor = 0xffffff;
		if( !values.backgroundSize ) values.backgroundSize = 'stretch';

		values.width = 1;
		values.height = 1;

		super(values, properties);

	}

	setAttribute( attributeName, value= null ) {

		this._attributes.set( attributeName, value );

		if( attributeName === 'src' ){
			new TextureLoader().load(value, (texture)=>{
				this._backgroundImage.inline = texture;
			})
		}

	}

}
