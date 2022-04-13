'use strict';

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require( 'terser-webpack-plugin' );

// As we will exports both module and js build, start a base configuration
const baseConfig = {
	mode: 'production',

	plugins:[
		new ESLintPlugin( { overrideConfigFile: './config/codestyle/.eslintrc', })
	],

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				test: /\.js(\?.*)?$/i,

				// only minimize .min.js files
				include: /\.min\.js$/,
				extractComments: 'some',
				terserOptions: {
					format: {
						comments: /@license/i,
					},
					compress: {

						// remove console.logs while leaving other console outputs
						pure_funcs: [ 'console.log' ],
					},
				}
			} ),
		],
	}
};


const moduleConfig = {
	target: 'node',

	// 2 files, raw + min
	entry: {
		'../build/three-mesh-ui.module': './src/three-mesh-ui.js',
		'../build/three-mesh-ui.module.min': './src/three-mesh-ui.js',
	},

	// as this configuration use `output.library.type='module'`
	experiments: {
		outputModule: true,
	},

	output: {
		filename: '[name].js', // force .js instead of .mjs
		chunkFormat: 'module',
		library: {
			type: 'module',
		},
	},

	// Do not export threejs from three folder
	externals: {
		three: 'three',
	},

	...baseConfig
};

const browserConfig = {
	target: 'web',

	entry: {
		'../build/three-mesh-ui': './src/three-mesh-ui.js',
		'../build/three-mesh-ui.min': './src/three-mesh-ui.js',
	},

	// Do not export threejs from global
	externals: {
		three: 'THREE',
	},

	...baseConfig
};

// Export both module and browser config ( ... browser is wrongly named )
module.exports = [ moduleConfig, browserConfig ];
