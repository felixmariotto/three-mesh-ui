/*

Job: create a plane geometry with the right UVs to map the MSDF texture on the wanted glyph.
Knows: dimension of the plane to create

*/

export default function MSDFGlyph( char, fontSize, font ) {

	return createTextMesh( char, fontSize, font );

};

//

function createTextMesh( char, fontSize, font ) {

	const geometry = new THREE.PlaneBufferGeometry( fontSize, fontSize );

	// We test for line break, tabs, and white space
	if ( char.match(/\s/g) === null ) {

		if ( font.info.charset.indexOf( char ) === -1 ) console.error(`The character '${ char }' is not included in the font characters set.`)

		mapUVs( geometry, font, char );

		transformGeometry( geometry, font, fontSize, char );

	} else if ( char.match(/\n/g) === null ) {

		nullifyUVs( geometry );

		geometry.scale( 0.5, 0, 1 );
		geometry.translate( 0, fontSize / 2, 0 );

	} else {

		nullifyUVs( geometry );

		geometry.scale( 0, 0, 1 );
		geometry.translate( 0, fontSize / 2, 0 );

	};

	return geometry

};

//

function mapUVs( geometry, font, char ) {

	const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

	const common = font.common;

	const xMin = charOBJ.x / common.scaleW;

	const xMax = (charOBJ.x + charOBJ.width ) / common.scaleW;

	const yMin =  1 -((charOBJ.y + charOBJ.height ) / common.scaleH);

	const yMax = 1 - (charOBJ.y / common.scaleH);

	//

	const uvAttribute = geometry.attributes.uv;

	for ( var i = 0; i < uvAttribute.count; i ++ ) {

		var u = uvAttribute.getX( i );
		var v = uvAttribute.getY( i );

		[ u, v ] = (()=> {
			switch ( i ) {
			case 0 : return [ xMin, yMax ]
			case 1 : return [ xMax, yMax ]
			case 2 : return [ xMin, yMin ]
			case 3 : return [ xMax, yMin ]
			};
		})();

		uvAttribute.setXY( i, u, v );

	};

};

//

function nullifyUVs( geometry ) {

	const uvAttribute = geometry.attributes.uv;

	for ( var i = 0; i < uvAttribute.count; i ++ ) {

		uvAttribute.setXY( i, 0, 0 );

	};

};

//

function transformGeometry( geometry, font, fontSize, char ) {

	const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

	const common = font.common;

	const newHeight = charOBJ.height / common.lineHeight;
	const newWidth = (charOBJ.width * newHeight) / charOBJ.height;

	geometry.scale(
		newWidth,
		newHeight,
		1
	);

	geometry.translate(
		0,
		( ( ( ( - charOBJ.height - (charOBJ.yoffset * 2) ) / common.lineHeight ) / 2 ) * fontSize ) + fontSize,
		0
	);

};