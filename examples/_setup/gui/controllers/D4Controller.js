import CustomController from 'three-mesh-ui/examples/_setup/gui/controllers/CustomController';
import { NumberController } from 'lil-gui';

export default class D4Controller extends CustomController {

	// $constructor is called on creation.
	// It receives all the parameters after gui.addMultiline( object, property, ... )
	$constructor( min , max, step, mode = '1D' ) {

		this._min = min;
		this._max = max;
		this._step = step;


		this._mode = mode;
		this.$modeSelector = this._buildSelector();

		this.$widget.appendChild( this.$modeSelector );

		this.$fullWidget = document.createElement('div');
		this.$fullWidget.classList.add('widget--full');

		this.domElement.appendChild(this.$fullWidget );
		this.domElement.classList.add( 'number', 'hasSlider' );

		//create subwidgets :
		this._bindedOnChange = this._callOnChange.bind( this );
		this.$widget4D = this._buildWidget4D();
		this.$fullWidget.appendChild( this.$widget4D );


		this.$setWidgetsMode();

	}

	$setWidgetsMode () {

		switch ( this._mode ) {
			case '1D':
				this._y.disable(true);
				this._z.disable(true);
				this._w.disable(true);
				break;

			case '2D':
				this._y.enable(true);
				this._z.disable(true);
				this._w.disable(true);
				break;

			case '4D':
			default:
				this._y.enable(true);
				this._z.enable(true);
				this._w.enable(true);
		}


	}

	// $updateDisplay should update the controller to reflect the current value.
	$updateDisplay() {
		// this.textarea.value = this.$value;
	}

	_buildSelector() {

		const selectorContainer = document.createElement('div');
		selectorContainer.classList.add('mode-selector');

		const options = ['1D','2D','4D'];
		for ( let i = 0; i < options.length; i++ ) {
			const option = options[ i ];

			const id = this.$name.id+'-mode--'+option;

			const input = document.createElement('input');
			input.type = 'radio';
			input.name = this.$name.id+'-mode';
			input.value = option;

			if( option === this._mode ) {
				input.checked = true;
			}

			input.setAttribute('id', id);

			const label = document.createElement('label');
			label.textContent = option;
			label.setAttribute('for', id );

			const inputContainer = document.createElement('div');
			inputContainer.classList.add('form-item');

			inputContainer.appendChild( input);
			inputContainer.appendChild( label );

			selectorContainer.appendChild( inputContainer );

			input.addEventListener('change', () => {
				this._mode = input.value;
				this.$setWidgetsMode();
			} );
		}

		return selectorContainer;

	}

	_buildWidget4D(){


		const subObject = this.object[this.property];
		const widgetContainer = document.createElement('div');
		widgetContainer.classList.add('widget--4D')

		this._x = new NumberController(this.parent, subObject, 'x', this._min, this._max, this._step ).name('top');
		this._x.domElement.classList.add('hasSlider');
		this._x._callOnChange = () => {

			switch ( this._mode ) {

				case '1D':
					subObject.y = subObject.z = subObject.w = subObject.x;
					this._y.updateDisplay();
					this._z.updateDisplay();
					this._w.updateDisplay();
					break;

				case '2D':
					subObject.z = subObject.x;
					this._z.updateDisplay();
					break;

				case '4D':
				default:

			}

			this._bindedOnChange();
		}
		widgetContainer.appendChild( this._x.domElement );

		this._y = new NumberController(this.parent, subObject, 'y', this._min, this._max, this._step ).name('right');
		this._y.domElement.classList.add('hasSlider');
		this._y._callOnChange = () => {

			if( this._mode === '2D') {
				subObject.w = subObject.y;
				this._w.updateDisplay();
			}

			this._bindedOnChange();
		}
		widgetContainer.appendChild( this._y.domElement );

		this._z = new NumberController(this.parent, subObject, 'z', this._min, this._max, this._step ).name('bottom');
		this._z.domElement.classList.add('hasSlider');
		this._z._callOnChange = this._bindedOnChange;
		widgetContainer.appendChild( this._z.domElement );

		this._w = new NumberController(this.parent, subObject, 'w', this._min, this._max, this._step ).name('left');
		this._w.domElement.classList.add('hasSlider');
		this._w._callOnChange = this._bindedOnChange;
		widgetContainer.appendChild( this._w.domElement );

		return widgetContainer;

	}

}

// Provide a name for your controller by defining an $id string (UpperCamelCased).
// Custom controllers give the GUI a method called "add" + $id.
// That's where addMultiline comes from. It's also used to scope your controller's styles.

D4Controller.$id = 'D4';

// Provide a stylesheet for your controller by defining a $style string.
// Prefix your selectors with ".lil-gui .controller.$id" to keep them in scope.
// See Styling Custom Controllers for a guide on custom controller CSS.

D4Controller.$style = `
	.lil-gui .controller.D4{
		flex-wrap: wrap;
		align-items: start;
	}

	.lil-gui .controller.D4 textarea {

	/* Apply built-in vars. */

	background: var(--widget-color);
	color: var(--string-color);

	font-family: var(--font-family);
	font-size: var(--input-font-size);

	padding: var(--spacing);
	min-height: var(--widget-height);
	border-radius: var(--widget-border-radius);

	/* Override browser defaults. */

	width: 100%;
	border: 0;
	outline: none;
	resize: vertical;

}

.lil-gui .controller.D4 .widget {
	display: flex;
	flex-direction: column;

	max-width: calc( 100% - var(--name-width) );
}

.lil-gui .controller.D4 .mode-selector {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	line-height: var(--widget-height);
}

.lil-gui .controller.D4 .mode-selector .form-item * {
	vertical-align: middle;
}

.lil-gui .controller.D4 .mode-selector .form-item label {
	margin-top: 3px;
	display: inline-block;
}

.lil-gui .controller.D4 .mode-selector input[type="radio"] {
	height: 11px;
	width: unset;
	margin: 0;
	min-width: unset;
}

.lil-gui .controller.D4 .mode-selector input[type="radio"]:hover {
	cursor: pointer;
}

.lil-gui .controller.Multiline textarea:hover {
	background: var(--hover-color);
}

.lil-gui .controller.Multiline textarea:focus {
	background: var(--focus-color);
}

.lil-gui .controller.D4 .widget--full{
	border: none;
	margin-left: var(--folder-indent);
	border-left: 2px solid var(--widget-color);
}

.lil-gui .controller.D4 .widget--full .widget {
	flex-direction: row;
}

`;
