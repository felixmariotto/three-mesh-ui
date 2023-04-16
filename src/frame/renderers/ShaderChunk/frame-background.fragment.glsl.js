/**
 *
 * @type {string}
 */
const program = /* glsl */`
#ifdef USE_MAP

	vec4 textureSample = sampleTexture();
	diffuseColor *= textureSample;

#endif
`;

export default program;
