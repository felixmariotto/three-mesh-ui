/*

Job: - Host the materials of a given component.
	 - Keep track of the material clippingPlanes parameters
	 - When materials attributes are updated, update the material
	 - When parents update their dimensions, update clippingPlanes

Knows: - Its component and all its parents
	   - Its component material
	   - Its component's anscestors' dimension

*/

import DEFAULTS from '../../utils/Defaults.js';

//

export default function MaterialManager() {

	// const clippingPlanes
	// const backgroundMaterial

	return {
		getBackgroundMaterial,
		updatePlanes
	}

};

//

function getBackgroundMaterial() {

	const material = DEFAULTS.backgroundMaterial.clone();

	addClippingPlanesTo( material, this );

	return material

};

//

function updatePlanes() {

	// recompute the position of the parents borders,
	// then if it differs from the records,
	// update the material's clippingPlanes

}

//

function addClippingPlanesTo( material, component ) {

	const planes = component.getPlanes();

	planes.forEach( (plane)=> {

		plane.applyMatrix4( component.matrixWorld );

	});

	material.clippingPlanes = planes;

};