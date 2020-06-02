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

	return { getBackgroundMaterial }

};

//

function getBackgroundMaterial() {

	if ( !this.backgroundMaterial ) {

		this.backgroundMaterial = DEFAULTS.backgroundMaterial.clone();

	};

	addClippingPlanesTo( this.backgroundMaterial, this );

	return this.backgroundMaterial

};

//

function addClippingPlanesTo( material, component ) {

	const planes = component.getPlanes();

	planes.forEach( (plane)=> {

		plane.applyMatrix4( component.parent.matrixWorld );

	});

	material.clippingPlanes = planes;

};