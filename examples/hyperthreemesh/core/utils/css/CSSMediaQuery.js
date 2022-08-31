/**
 * JOB: Listen for media query changes, and active or deactivate rules
 */
export default class CSSMediaQuery {

	/**
	 *
	 * @param {string} condition The media query as string ie:`(orientation: portrait) and screen`
	 */
	constructor( condition ) {

		/**
		 *
		 * @private
		 */
		this._condition = condition;

		/**
		 *
		 * @type {Array.<CSSRuleVR>}
		 * @private
		 */
		this._rules = [];

		/**
		 *
		 * @type {MediaQueryList}
		 * @private
		 */
		this._matchMediaQuery = window.matchMedia( condition );

	}

	/**
	 *
	 * @param {CSSRuleVR} rule
	 */
	addRule( rule ) {
		this._rules.push( rule );
	}

	/**
	 *
	 * @param callback
	 */
	init( callback ){

		this._callback = callback;

		this._matchMediaQuery.addEventListener( 'change', this.handleMatchMediaChanges );

		if ( !this._matchMediaQuery.matches ) {

			this.disableRules();

		}

	}

	/**
	 *
	 */
	enableRules() {
		for ( const rule of this._rules ) {
			rule.enabled = true;
		}
	}

	/**
	 *
	 */
	disableRules() {
		for ( const rule of this._rules ) {
			rule.enabled = false;
		}
	}

	/**
	 *
	 * @param {MediaQueryListEvent} e
	 */
	handleMatchMediaChanges = ( e ) => {

		// If the condition match
		if (e.matches) {

			// enable all rules behind this media query
			this.enableRules();

		} else {

			// or disable all rules behing this media query
			this.disableRules();

		}

		// apply rules
		this._callback();

	}

}
