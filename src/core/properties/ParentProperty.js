import BaseProperty from './BaseProperty';

export default class ParentProperty extends BaseProperty {

	constructor() {

		super('parent');

	}

	update( vrElement, out ) {

		if ( vrElement.parent && vrElement.parent.isUI ) {

			this._value = vrElement.parent;
			// this.position.z = this.getOffset();

		} else {

			this._value = null;

		}

		// set elements as root
		if ( vrElement.isBlock && !this._value ) {

			ThreeMeshUI.addRoot( vrElement );
			vrElement.pseudoClassList.add('root');

		} else {

			ThreeMeshUI.removeRoot( vrElement );
			vrElement.pseudoClassList.remove('root');

		}

		this._needsUpdate = false;

	}

	set value( value ) {

		console.warn('ParentProperty is readonly');

	}

	/**
	 *
	 * @return {ElementVR|null}
	 */
	get value() { return this._value; };

	/**
	 *
	 */
	dispose() {

		this._value = null;

	}


}
