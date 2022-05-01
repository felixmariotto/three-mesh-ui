export default /* glsl */`

// borders sequences are : x:TOP, y:RIGHT, z:BOTTOM, w:LEFT
uniform vec4 borderWidth;
uniform vec3 borderColor;
uniform float borderOpacity;
uniform vec4 borderRadius;

varying vec2 vUvB;

// Borders
float getEdgeDist() {

	// This allows to go the uv position in a [-1, 1] referencial system
	vec2 ndc = vec2( vUvB.x * 2.0 - 1.0, vUvB.y * 2.0 - 1.0 );

	//
	vec2 planeSpaceCoord = vec2( frameSize.x * 0.5 * ndc.x, frameSize.y * 0.5 * ndc.y );
	vec2 corner = frameSize * 0.5;
	vec2 offsetCorner = corner - abs( planeSpaceCoord );

	float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;

	if (vUvB.x < 0.5 && vUvB.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.x, 0.0 ) ) - borderRadius.x;
		float s = step( innerRadDist * -1.0, borderRadius.x );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x >= 0.5 && vUvB.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.y, 0.0 ) ) - borderRadius.y;
		float s = step( innerRadDist * -1.0, borderRadius.y );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x >= 0.5 && vUvB.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.z, 0.0 ) ) - borderRadius.z;
		float s = step( innerRadDist * -1.0, borderRadius.z );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUvB.x < 0.5 && vUvB.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - frameSize * 0.5 + borderRadius.w, 0.0 ) ) - borderRadius.w;
		float s = step( innerRadDist * -1.0, borderRadius.w );
		return mix( innerRadDist, roundedDist, s );
	}
}

`
