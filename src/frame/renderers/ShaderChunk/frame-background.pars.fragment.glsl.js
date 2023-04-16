/**
 *
 * @type {string}
 */
const program = /* glsl */`

#ifdef USE_MAP

vec4 sampleTexture() {

	vec2 uv = vUv;

	// default stretch
	#if BACKGROUND_MAPPING != 0

	float textureRatio = textureSize.x / textureSize.y;
	float panelRatio = frameSize.x / frameSize.y;
	float ratio = panelRatio / textureRatio;
	float ratio2 = textureRatio / panelRatio;

		// contain
		#if BACKGROUND_MAPPING == 1
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		}
		#else
		// cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		}

		#endif

	#endif

	return texture2D( map, uv );

}
#endif
`;

export default program;
