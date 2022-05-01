export default /* glsl */`
#ifdef USE_MAP

	vec4 textureSample = sampleTexture();
	diffuseColor *= textureSample;

#endif
`
