const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [ 'index', 'secondPage' ];

pagesConf = pages.map( (name)=> {
	return new HtmlWebpackPlugin({
		title: name,
		filename: name + '.html',
		template: path.resolve(__dirname, `examples/${ name }.html`),
		inject: false
	});
});

module.exports = {

	entry: './src/three-mesh-ui.js',

	plugins: pagesConf,

	devtool: 'eval-source-map',

	devServer: {
		contentBase: './dist'
	},

	output: {
		filename: 'three-mesh-ui.js',
		path: path.resolve(__dirname, 'dist')
	}

}