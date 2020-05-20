/*

Job: create a text geometry of the wanted glyph.
Knows: dimension of the rectangle containing the glyph

*/

import { ShapeBufferGeometry } from 'three';

export default function GeometryGlyph( glyph, fontSize, font ) {

	const shape = font.generateShapes( glyph, fontSize );

	const geometry = new ShapeBufferGeometry( shape );

	return geometry

};