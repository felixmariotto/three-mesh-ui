export default /* glsl */`
varying vec2 vUvG;
uniform sampler2D glyphMap;
uniform float u_pxRange;
// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field
float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}
float screenPxRange() {
	vec2 unitRange = vec2(u_pxRange)/vec2(textureSize(glyphMap, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUvG);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}
float tap(vec2 offsetUV) {
	vec3 msd = texture( glyphMap, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}
`;
