export const WORLD_UNITS = 'rem';

//
export const CENTIMETERS = 'cm';
export const MILLIMETERS = 'mm';
export const INCHES = 'in';

export const UV = 'em';
export const PERCENT = '%';

const availableUnits = [ WORLD_UNITS, UV, PERCENT ];


/**
 * Obtain a valid unit
 * @param {string} requestedUnits
 * @returns {string}
 */
export const validateUnits = function( requestedUnits ) {

	// Sent default units if requested units not available
	if( availableUnits.indexOf( requestedUnits) === -1 ) return WORLD_UNITS;

	return requestedUnits;

}
