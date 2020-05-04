const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [
	['basic_setup', 'basic title'],
	['nested_blocks', 'nested blocks']
];

pagesConfig = pages.map( (page)=> {
	return new HtmlWebpackPlugin({
		title: page[0],
		filename: page[0] + '.html',
		template: path.resolve(__dirname, `examples/example_template.html`),
		inject: true
	});
});

pagesConfig.push(
	new HtmlWebpackPlugin({
		pages: pages.reduce( (accu, page)=> {
			return accu + `<li>${ page[1] }</li>`
		}, '' ),
		filename: 'index.html',
		template: path.resolve(__dirname, `examples/index.html`),
		inject: false
	})
);

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

		plugins: pagesConfig,

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