import GUI from 'lil-gui';
import CustomController from 'three-mesh-ui/examples/_setup/gui/controllers/CustomController';

export default function (  ) {

	return new GUI();

}

class D4Controller extends CustomController {

	// $constructor is called on creation.
	// It receives all the parameters after gui.addMultiline( object, property, ... )
	$constructor( args ) {

		this.textarea = document.createElement( 'textarea' );
		this.textarea.setAttribute( 'rows', rows );

		// UI elements need to be added to $widget to appear in the controller.
		this.$widget.appendChild( this.textarea );

		this.textarea.addEventListener( 'input', () => {

			// Use this.$value to update the controller's value. Assignments to this
			// property will automatically update the display and fire onChange events.
			this.$value = this.textarea.value;

		} );

		this.textarea.addEventListener( 'blur', () => {

			// Call $onFinishChange whenever your controls lose focus.
			this.$onFinishChange();

		} );

	}

	// $updateDisplay should update the controller to reflect the current value.
	$updateDisplay() {
		this.textarea.value = this.$value;
	}

}

// Provide a name for your controller by defining an $id string (UpperCamelCased).
// Custom controllers give the GUI a method called "add" + $id.
// That's where addMultiline comes from. It's also used to scope your controller's styles.

D4Controller.$id = 'D4';

// Provide a stylesheet for your controller by defining a $style string.
// Prefix your selectors with ".lil-gui .controller.$id" to keep them in scope.
// See Styling Custom Controllers for a guide on custom controller CSS.

D4Controller.$style =
	`.lil-gui .controller.D4 textarea {

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

.lil-gui .controller.Multiline textarea:hover {
	background: var(--hover-color);
}

.lil-gui .controller.Multiline textarea:focus {
	background: var(--focus-color);
}`;

// Finally, register the controller with lil-gui. This injects our stylesheet
// and adds the "addMultiline" method to GUI's prototype.

CustomController.register( D4Controller );
