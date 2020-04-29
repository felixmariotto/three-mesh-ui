const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [ 'index', '0_basic_setup', '1_advanced_demo' ];

pagesConf = pages.map( (name)=> {
	return new HtmlWebpackPlugin({
		title: name,
		filename: name + '.html',
		template: path.resolve(__dirname, `examples/${ name }.html`),
		inject: false
	});
});

module.exports = env => {

	let mode = "development";
	let devtool = 'eval-source-map';

	// Prod environment
	if (env.NODE_ENV === 'prod') {
		devtool = 'hidden-source-map';
		mode = 'production';
		// outputPath = `${__dirname}/build/js`;
	};

	return {

		mode: mode,

		entry: './src/three-mesh-ui.js',

		plugins: pagesConf,

		devtool: devtool,

		devServer: {
			contentBase: './dist'
		},

		output: {
			filename: 'three-mesh-ui.js',
			path: path.resolve(__dirname, 'dist')
		}

	}

}