/**
 *
 * @type {string}
 */
const program = /* glsl */`

vec4 borderColor = vec4( borderColor, borderOpacity );

// This could be tweak to produce more smoothing
float mult = 1.0;

// Step 1 ----------------------------------------------
// Draw the four borders ( top - right - bottom - left )
// Without worrying about radiuses ( Straight boorders )

// Top
float topBorderUVy = 1.0 - borderWidth.x;
if( borderWidth.x > 0.0 && vUvB.y > topBorderUVy )
{

	float w = fwidth( 1.0 - vUvB.y ) * mult;
	float step = smoothstep( topBorderUVy , topBorderUVy + w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Left
float leftBorderUVx = borderWidth.w;
if( borderWidth.w > 0.0 && vUvB.x < leftBorderUVx )
{

	float w = fwidth( vUvB.x ) * mult ;
	float step = smoothstep( leftBorderUVx , leftBorderUVx - w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Bottom
float bottomBorderUVy = borderWidth.z;
if( borderWidth.z > 0.0 && vUvB.y < bottomBorderUVy )
{
	float w = fwidth( vUvB.y ) * mult;
	float step = smoothstep( bottomBorderUVy , bottomBorderUVy - w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );
}

// Right
float rightBorderUVx = 1.0 - borderWidth.y;
if( borderWidth.y > 0.0 && vUvB.x > rightBorderUVx )
{
	float w = fwidth( 1.0 - vUvB.x ) * mult;
	float step = smoothstep( rightBorderUVx , rightBorderUVx + w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );
}


// Step 2 ----------------------------------------------
// Process each corners ( topLeft, topRight, bottomRight, bottomLeft )
// To transparentize outside radiuses
// To draw ellipse border on the corner


// Top Left corner
if( vUvB.x < cornerTL.x && vUvB.y > cornerTL.y ) {

		// Only draw border if width is set
		if( borderWidth.w + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x - borderWidth.w,  ( 1.0 - cornerTL.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		// Then then radius
		float radiusFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x, 1.0 - cornerTL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Left
if( vUvB.x < cornerBL.x && vUvB.y < cornerBL.y ) {

		if( borderWidth.w + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x - borderWidth.w,  cornerBL.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}


		float radiusFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x, cornerBL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Top Right
if( vUvB.x > cornerTR.x && vUvB.y > cornerTR.y ) {

		if( borderWidth.y + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTR, ( 1.0 - cornerTR.x ) - borderWidth.y,  ( 1.0 - cornerTR.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerTR, 1.0 - cornerTR.x, 1.0 - cornerTR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Right
if( vUvB.x > cornerBR.x && vUvB.y < cornerBR.y ) {

		if( borderWidth.y + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBR, ( 1.0 - cornerBR.x ) - borderWidth.y,  cornerBR.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerBR, 1.0 - cornerBR.x, cornerBR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}

`;

export default program;
