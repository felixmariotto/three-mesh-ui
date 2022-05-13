export default /* glsl */`

float edgeDist = getEdgeDist();
float change = fwidth( edgeDist );

float alpha = smoothstep( change, 0.0, edgeDist );
diffuseColor.a *= alpha;

// if the length square is not zerp
if( borderWidth.x * borderWidth.x + borderWidth.y * borderWidth.y + borderWidth.z * borderWidth.z + borderWidth.w * borderWidth.w  > 0.0 )
{

	vec4 borderColor = vec4( borderColor, borderOpacity * alpha );
	float stp = smoothstep( edgeDist + change, edgeDist, borderWidth.x * -1.0 );

	// @TODO: Implement border width sequence : top,right,bottom,left
	// if( vUvB.x <= borderWidth.w || vUvB.x >= 1.0 - borderWidth.y || vUvB.y >= 1.0 - borderWidth.x || vUvB.y <= borderWidth.z )
	// {

	//	// would be nicer with smoothstep
	//	diffuseColor.rgb = borderColor.rgb;

	//}

	diffuseColor = mix( diffuseColor, borderColor, stp );

}

`
