/**
 *
 * @type {string}
 */
const program = /* glsl */`
	float alpha;
#ifdef NO_RGSS

	alpha = tap( vUvG );

#else

	// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
	// per pixel partial derivatives
	vec2 dx = dFdx(vUvG);
	vec2 dy = dFdy(vUvG);
	// rotated grid uv offsets
	vec2 uvOffsets = vec2(0.125, 0.375);
	vec2 offsetUV = vec2(0.0, 0.0);
	// supersampled using 2x2 rotated grid
	alpha = 0.0;
	offsetUV.xy = vUvG + uvOffsets.x * dx + uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.x * dx - uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG + uvOffsets.y * dx - uvOffsets.x * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.y * dx + uvOffsets.x * dy;
	alpha += tap(offsetUV);
	alpha *= 0.25;

#endif

	alpha = clamp( alpha, 0.0, 1.0 );

#ifdef INVERT_ALPHA

	alpha = 1.0 - alpha;

#endif

	diffuseColor.a *= alpha;
`;

export default program;
