export const NORMAL = "normal";
export const ITALIC = "italic";
export const OBLIQUE = "oblique";

const MAX_OBLIQUE_ANGLE = 90;

/**
 * Get the oblique style with custom angle
 * @param angleInDegree
 */
export function obliqueCustomAngle( angleInDegree ){

	// Clamp the angle
	angleInDegree = angleInDegree < - MAX_OBLIQUE_ANGLE ? - MAX_OBLIQUE_ANGLE : angleInDegree > MAX_OBLIQUE_ANGLE ? MAX_OBLIQUE_ANGLE : angleInDegree;

	return `${OBLIQUE} ${angleInDegree}deg`;

}

