/**
 * Get rid of the precision issue
 * @param numA
 * @param numB
 * @param precision
 * @return {boolean}
 */
export const numberEquals = function ( numA, numB, precision = 6 ) {

	return numA.toFixed(precision) === numB.toFixed(precision)

}

/**
 *
 * @param unprecisedNumber
 * @param precision
 * @return {number}
 */
export const numberPrecise = function ( unprecisedNumber, precision = 6 ) {

	return parseFloat( unprecisedNumber.toFixed( precision ) );

}
