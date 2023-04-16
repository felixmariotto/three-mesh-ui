import CustomController from 'three-mesh-ui/examples/_setup/gui/controllers/CustomController';

export default class FontLoaderController extends CustomController {


	/* eslint-disable no-unused-vars */
	$constructor( args ) { /* eslint-enable no-unused-vars */

		this.name('MSDF Font upload');

		this.$fullWidget = document.createElement('div');
		this.$fullWidget.classList.add('widget--full');


		this.$jsonFile = document.createElement('input');
		this.$jsonFile.type = 'file';
		this.$jsonFile.accept = '.json';

		this.$pngFile = document.createElement('input');
		this.$pngFile.type = 'file';
		this.$pngFile.accept = '.png';

		this.$fullWidget.appendChild( this.$jsonFile );
		this.$fullWidget.appendChild( this.$pngFile );


		this.$button = document.createElement('button');
		this.$button.textContent = 'Import';
		this.$button.type = 'submit';
		this.$button.addEventListener( 'click', this._import.bind(this) );

		this.$fullWidget.appendChild( this.$button );

		this.domElement.appendChild(this.$fullWidget );

	}

	_import(){

		// If there's no file, do nothing
		if (!this.$jsonFile.value.length) return;

		// Create a new FileReader() object
		const reader = new FileReader();

		// Setup the callback event to run when the file is read
		reader.onload = this._loadedJson.bind(this);

		// Read the file
		reader.readAsText(this.$jsonFile.files[0]);

	}

	_loadedJson( event ) {

		this._jsonData = JSON.parse(event.target.result)

		this._loadPng();

	}

	_loadPng() {


		if (this.$pngFile.files && this.$pngFile.files[0]) {
			const img = document.createElement('img');

			img.onload = () => {
				URL.revokeObjectURL(img.src);  // no longer needed, free memory

				this._pngData = img;

				this._onChange({ json:this._jsonData, img: img } );

			}

			img.src = URL.createObjectURL(this.$pngFile.files[0]); // set src to blob url
		}

	}

	get $value() {
		return { json: this._jsonData, img: this._pngData };
	}

	// $updateDisplay should update the controller to reflect the current value.
	$updateDisplay() {
		// this.textarea.value = this.$value;
	}



}

// Provide a name for your controller by defining an $id string (UpperCamelCased).
// Custom controllers give the GUI a method called "add" + $id.
// That's where addMultiline comes from. It's also used to scope your controller's styles.

FontLoaderController.$id = 'FontLoader';

// Provide a stylesheet for your controller by defining a $style string.
// Prefix your selectors with ".lil-gui .controller.$id" to keep them in scope.
// See Styling Custom Controllers for a guide on custom controller CSS.

FontLoaderController.$style = `
	.lil-gui .controller.FontLoader{
		flex-wrap: wrap;
		align-items: start;
	}

.lil-gui .controller.FontLoader .widget {
	max-width:10%;
}


.lil-gui .controller.FontLoader .widget--full{
	flex-direction: column;
	border: none;
	margin-left: var(--folder-indent);
	padding-left: var(--folder-indent);
	border-left: 2px solid var(--widget-color);
}

.lil-gui .controller.FontLoader .widget--full button[type="submit"]{
	margin-top: 2px;
}

`;
