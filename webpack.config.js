const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = [
	['basic_setup', 'basic setup'],
	['nested_blocks', 'nested blocks'],
	['tutorial_result', 'tutorial result'],
	['interactive_button', 'interactive button'],
	['msdf_text', 'big text'],
	['background_size', 'backgroundSize'],
	['inline_block', 'InlineBlock'],
	['hidden_overflow', 'hiddenOverflow'],
	['keyboard', 'keyboard']
];

pagesConfig = pages.map( (page)=> {
	return new HtmlWebpackPlugin({
		title: page[0],
		filename: page[0] + '.html',
		template: path.resolve(__dirname, `examples/html/example_template.html`),
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
		template: path.resolve(__dirname, `examples/html/index.html`),
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
			'../dist/three-mesh-ui': './src/three-mesh-ui.js',
			basic_setup: './examples/basic_setup.js',
			nested_blocks: './examples/nested_blocks.js',
			tutorial_result: './examples/tutorial_result.js',
			interactive_button: './examples/interactive_button.js',
			msdf_text: './examples/msdf_text.js',
			background_size: './examples/background_size.js',
			inline_block: './examples/inline_block.js',
			hidden_overflow: './examples/hidden_overflow.js',
			keyboard: './examples/keyboard.js'
		},

		plugins: [

			new webpack.ProvidePlugin({
				THREE: 'three'
			})

		].concat( pagesConfig ),

		devtool: devtool,

		devServer: {
			contentBase: false
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'public')
		},

		module: {

			rules: [

				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader',
					],
				},

			],

		}

	}

}