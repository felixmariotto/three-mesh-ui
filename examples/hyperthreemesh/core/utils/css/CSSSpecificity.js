import CSSQuery from './CSSQuery';

/**
 * Compute the specificity of a CSSQuery
 * @param {CSSQuery|string} query
 * @returns {number}
 */
export default function ( query ) {

	// Ensure we have a query object
	if( !(query instanceof CSSQuery) ){
		query = CSSQuery.build( query );
	}

	let specificity = 0;

	for ( let i = 0; i < query.length; i++ ) {
		const querySegment = query[ i ];

		for ( let j = 0; j < querySegment.conditions.length; j++ ) {
			const condition = querySegment.conditions[j];

			switch ( condition.type ) {
				case 'id':
					specificity += 10000;
					break;

				case 'class':
				case 'pseudoClass':
				case 'attribute':
					specificity += condition.value.length * 100;
					break;

				default:
					specificity += 1;

			}

		}

	}

	return specificity;

}
