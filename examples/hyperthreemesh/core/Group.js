const _groups = {};

export class Group {

	constructor( groupName ) {

		this._name = groupName;

		this._elements = [];

		_groups[groupName] = this;

	}

	/**
	 *
	 * @param elementHTM
	 */
	add( elementHTM) {
		if ( this._elements.indexOf( elementHTM ) === -1 ) {
			this._elements.push( elementHTM );
		}
	}

	/**
	 *
	 * @param elementHTM
	 */
	remove ( elementHTM) {
		const index = this._elements.indexOf( elementHTM );
		if( index !== -1 ) {
			this._elements.splice( index, 1 );
		}
	}

}

/**
 *
 * @param {string} groupName
 * @param {boolean} orCreate
 * @returns {Group|null}
 */
export function getGroupByName( groupName, orCreate = false ) {

	const group = _groups[groupName];

	if( !group && orCreate ) {

		return new Group( groupName );

	}

	return _groups[groupName];

}
