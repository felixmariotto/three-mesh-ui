'use strict';

const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const ESLintPlugin = require('eslint-webpack-plugin');

// data in format [ JS file name => demo title in examples page ]
const pages = [
	[ 'basic_setup', 'basic setup' ],
	[ 'preloaded_font', 'preloaded font' ],
	[ 'nested_blocks', 'nested blocks' ],
	[ 'border', 'block borders' ],
	[ 'tutorial_result', 'tutorial result' ],
	[ 'interactive_button', 'interactive button' ],
	[ 'msdf_text', 'big text' ],
	[ 'background_size', 'backgroundSize' ],
	[ 'inline_block', 'InlineBlock' ],
	[ 'hidden_overflow', 'hiddenOverflow' ],
	[ 'onafterupdate', 'onAfterUpdate' ],
	[ 'manual_positioning', 'manual content positioning' ],
	[ 'keyboard', 'keyboard' ],
	[ 'letter_spacing', '.letterSpacing' ],
	[ 'font_kerning', '.fontKerning' ],
	[ 'best_fit', 'best fit' ],
	[ 'antialiasing', 'antialiasing' ],
	[ 'justification', 'justification' ],
	[ 'text_align', '.textAlign' ],
	[ 'whitespace', '.whiteSpace' ],
	[ 'content_direction', '.contentDirection' ],
	[ 'justify_content', '.justifyContent' ],
	[ 'align_items', '.alignItems' ],
];

// create one config for each of the data set above
const pagesConfig = pages.map( ( page ) => {
	return new HtmlWebpackPlugin( {
		title: page[ 0 ],
		filename: page[ 0 ] + '.html',
		template: path.resolve( __dirname, `../examples/html/example_template.html` ),
		chunks: [ page[ 0 ], 'three-mesh-ui' ],
		inject: true
	} );
} );

// just add one config for the index page
pagesConfig.push(
	new HtmlWebpackPlugin( {
		pages: pages.reduce( ( accu, page ) => {
			return accu + `<li title="${page[ 0 ]}">${page[ 1 ]}</li>`;
		}, '' ),
		filename: 'index.html',
		template: path.resolve( __dirname, `../examples/html/index.html` ),
		inject: false
	} )
);

const webpackConfig = env => {

	const IN_PRODUCTION = env.NODE_ENV === 'prod';

	const config = {
		mode: 'development',
		devtool: 'eval-source-map',

		entry: {
			'../dist/three-mesh-ui': './src/three-mesh-ui.js',
			basic_setup: './examples/basic_setup.js',
			preloaded_font: './examples/preloaded_font.js',
			nested_blocks: './examples/nested_blocks.js',
			border: './examples/border.js',
			tutorial_result: './examples/tutorial_result.js',
			interactive_button: './examples/interactive_button.js',
			msdf_text: './examples/msdf_text.js',
			background_size: './examples/background_size.js',
			inline_block: './examples/inline_block.js',
			hidden_overflow: './examples/hidden_overflow.js',
			onafterupdate: './examples/onafterupdate.js',
			manual_positioning: './examples/manual_positioning.js',
			keyboard: './examples/keyboard.js',
			letter_spacing: './examples/letter_spacing.js',
			font_kerning: './examples/font_kerning.js',
			best_fit: './examples/best_fit.js',
			antialiasing: './examples/antialiasing.js',
			justification: './examples/justification.js',
			text_align: './examples/text_align.js',
			whitespace: './examples/whitespace.js',
			content_direction: './examples/content_direction.js',
			justify_content: './examples/justify_content.js',
			align_items: './examples/align_items.js'
		},

		plugins: [
			new ESLintPlugin( { overrideConfigFile: './config/codestyle/.eslintrc', }),
			...pagesConfig
		],

		devServer: {
			hot: false,
			// The static directory of assets
			static: {
				directory: path.join( __dirname, 'dist' ),
				publicPath: '/'
			},

			// As eslint is ran during dev, only overlay errors and not warnings
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
			}

		},

		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, '../dist' )
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

	};

	if ( IN_PRODUCTION ) {

		delete config.devtool;
		config.mode = 'production';

		config.optimization = {
			minimize: true,
			minimizer: [
				new TerserPlugin( {
					test: /\.js(\?.*)?$/i,
					extractComments: 'some',
					terserOptions: {
						format: {
							comments: /@license/i,
						},
						compress: {
							drop_console: true,
						},
					}
				} ),
			],
		};
	}

	return config;
}

// share the configuration
module.exports = webpackConfig;
