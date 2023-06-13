import { TextContentProperty, Inline } from 'three-mesh-ui';

let _domElement = null;

export default class RichTextContentProperty extends TextContentProperty{

	buildInlines( textContent ) {

		if( !_domElement ) _domElement = document.createElement('p');
		_domElement.innerHTML = textContent;

		const inlines = [];
		const childNodes = _domElement.childNodes;

		for ( let i = 0; i < childNodes.length; i++ ) {
			const child = childNodes[ i ];

			const style = {};
			// style.color: Math.random()*0xffffff;
			switch ( child.nodeName.toLowerCase() ){

				case "b":
				case "strong":
					style.fontWeight = 'bold';
					break;

				case "em":
				case "i":
					style.fontStyle = 'italic';
					break;

				case "u":
					style.textDecoration = 'underline';
					break;

				case "exp":
				case "sup":
					style.fontSize = '0.5em';
					style.verticalAlign = 'sup';
					break;

				case "sub":
					style.fontSize = '0.5em';
					style.verticalAlign = 'sub';
					break;

				case "style":
					const attributes = child.attributes;

					for (let j = 0; j < attributes.length; j++){
						style[_camelize(attributes[j].nodeName)] = attributes[j].nodeValue;
					}

					break
			}

			textContent = child.textContent;

			const inline = new Inline({textContent,...style},{textContent:RichTextContentProperty});
			inlines.push( inline )

		}

		return inlines;


	}

}

const _camelizeReg = /-./g;
const _camelize = s => s.replace( _camelizeReg, x=>x[1].toUpperCase())
