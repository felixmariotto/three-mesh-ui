const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [
	['basic_setup', 'basic setup'],
	['nested_blocks', 'nested blocks'],
	['tutorial_result', 'tutorial result']
];

pagesConfig = pages.map( (page)=> {
	return new HtmlWebpackPlugin({
		title: page[0],
		filename: page[0] + '.html',
		template: path.resolve(__dirname, `examples/example_template.html`),
		chunks: [page[0], 'three-mesh-ui'],
		inject: true
	});
});

pagesConfig.push(
	new HtmlWebpackPlugin({
		pages: pages.reduce( (accu, page)=> {
			return accu + `<li title="${ page[0] }">${ page[1] }</li>`
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
		devtool = false;
		mode = 'production';
		// outputPath = `${__dirname}/build/js`;
	};

	return {

		mode: mode,

		entry: {
			'../build/three-mesh-ui': './src/three-mesh-ui.js',
			basic_setup: './examples/js/basic_setup.js',
			nested_blocks: './examples/js/nested_blocks.js',
			tutorial_result: './examples/js/tutorial_result.js'
		},

		plugins: pagesConfig,

		devtool: devtool,

		devServer: {
			contentBase: './dist'
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist')
		}

	}

}