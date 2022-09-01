/**
 *
 * @type {string}
 */
const program = /* glsl */`

// borders sequences are : x:TOP, y:RIGHT, z:BOTTOM, w:LEFT
uniform vec4 borderWidth;
uniform vec3 borderColor;
uniform float borderOpacity;
uniform vec4 borderRadius;

uniform vec2 cornerTL;
uniform vec2 cornerTR;
uniform vec2 cornerBR;
uniform vec2 cornerBL;

varying vec2 vUvB;

float getEllipticFactor( vec2 uv, vec2 center, float radiusX, float radiusY )
{

		float edx = uv.x - center.x;
		float edy = uv.y - center.y;

		float ddx = (edx * edx) / (radiusX * radiusX);
		float ddy = (edy * edy) / (radiusY * radiusY);

		return ddx + ddy;

}

`;

export default program;
