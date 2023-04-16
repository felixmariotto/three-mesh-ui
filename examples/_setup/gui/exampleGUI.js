import GUI from 'lil-gui';
import CustomController from 'three-mesh-ui/examples/_setup/gui/controllers/CustomController';
import D4Controller from 'three-mesh-ui/examples/_setup/gui/controllers/D4Controller';
import FontLoaderController from 'three-mesh-ui/examples/_setup/gui/controllers/FontLoaderController';

export default function (  ) {

	const existingCss = document.head.querySelector('style[data-target="three-mesh-ui-gui"]');
	if( !existingCss ) {
		const guiCss = document.createElement('style');
		guiCss.textContent = `
	.lil-gui {
		--font-family: "Courier new";
		--font-size: 12px;
		--background-color: #f6f6f6;
		--text-color: #3d3d3d;
		--title-background-color: #efefef;
		--title-text-color: #3d3d3d;
		--widget-color: #eaeaea;
		--hover-color: #f0f0f0;
		--focus-color: #fafafa;
		--number-color: #07aacf;
		--string-color: #8da300;
		--folder-indent: 10px;
	}
`;
		document.head.appendChild( guiCss );
	}

	// adds custom three-mesh-ui controllers
	CustomController.register( D4Controller );
	CustomController.register( FontLoaderController );

	return new GUI();

}
