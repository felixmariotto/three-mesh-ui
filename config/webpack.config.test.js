'use strict';

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports =  {
	mode: 'production',
	target: 'web',

	entry: {
		'../build/three-mesh-ui': './src/three-mesh-ui.js'
	},

	// Do not export threejs from global
	externals: {
		three: 'THREE',
	},

	plugins:[
		new ESLintPlugin( { overrideConfigFile: './config/codestyle/.eslintrc', })
	],

	optimization: {
		minimize: false,
	}

};
