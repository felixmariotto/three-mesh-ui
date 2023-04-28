import { Behavior } from 'three-mesh-ui';

export default class SimpleStateBehavior extends Behavior{


	constructor(subject, states = {}) {

		super(subject);

		// build a simple style set
		/* eslint-disable camelcase */
		subject._simpleState__activeStates = [];
		subject._simpleState__normalStyles = {};
		subject._simpleState__states = states;
		subject._simpleState__statesProperties = {};
		/* eslint-enable camelcase */
		for ( const statesKey in states ) {
			for ( const styleProperty in states[ statesKey ] ) {

				if( !subject._simpleState__statesProperties[styleProperty] ){
					subject._simpleState__statesProperties[styleProperty] = [];
				}
				subject._simpleState__statesProperties[styleProperty].push(statesKey);
			}
		}

		for ( const component of subject._components ) {
			if( subject._simpleState__statesProperties[component.id] ) {

				subject._simpleState__normalStyles[component.id] = component.inline ? component.inline : component._value;
			}
		}

		subject.__overridedSet = subject.set;
		subject.set = this.storeSet.bind(subject);
		subject.renderStates = this.renderStates.bind(subject);
		subject.setupState = this.setupState.bind(subject);

		subject.setState = this.setState.bind(subject);
		subject.activatePseudoState = this.activatePseudoState.bind(subject);
		subject.deactivatePseudoState = this.deactivatePseudoState.bind(subject);
		subject.togglePseudoState = this.togglePseudoState.bind(subject);

	}
	act() {

	}

	attach() {


	}

	detach() {

	}

	setupState( state, options ){

		this._simpleState__states[state] = options;

		const newOptions = [];

			for ( const styleProperty in options ) {

				if( !this._simpleState__statesProperties[styleProperty] ){
					this._simpleState__statesProperties[styleProperty] = [];
					newOptions.push(styleProperty);
				}
				this._simpleState__statesProperties[styleProperty].push(state);
			}


		for ( const component of this._components ) {
			if( newOptions.indexOf(component.id) > -1 ) {
				this._simpleState__normalStyles[component.id] = component.inline ? component.inline : component._value;
			}
		}

	}

	renderStates(  ){

		let stateValues = {...this._simpleState__normalStyles};

		for ( const state in this._simpleState__states ) {
			if( this._simpleState__activeStates.indexOf(state) > -1 ){
				stateValues = {...stateValues, ...this._simpleState__states[state]}
			}
		}

		this.set( stateValues, false);
	}

	/**
	 * @internal will replace default set method
	 * @param options
	 * @param store
	 */
	storeSet( options, store = true){

		if( store ) {
			for ( const optionsKey in options ) {
				if( this._simpleState__statesProperties[optionsKey] ) {
					this._simpleState__normalStyles[ optionsKey ] = options[ optionsKey ];
				}
			}
		}

		this.__overridedSet(options);
	}

	activatePseudoState ( state ) {

		if( this._simpleState__activeStates.indexOf(state) === -1) {
			this._simpleState__activeStates.push( state );
			this.renderStates();
		}
	}

	deactivatePseudoState ( state ) {
		const index = this._simpleState__activeStates.indexOf(state);
		if( index > -1 ){
			this._simpleState__activeStates.splice( index,1);
			this.renderStates();
		}
	}

	togglePseudoState ( state ) {

		const index = this._simpleState__activeStates.indexOf(state);
		if( index > -1 ){
			this._simpleState__activeStates.splice( index,1);
		}else{
			this._simpleState__activeStates.push(state);
		}

		this.renderStates();

	}

	setState( states ){
		/* eslint-disable camelcase */
		if( Array.isArray(states) ){
			this._simpleState__activeStates = states;
		}else{
			this._simpleState__activeStates = [ states ];
		}
		/* eslint-enable camelcase */

		this.renderStates();
	}
}
