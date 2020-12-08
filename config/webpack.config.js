const webpack = require('webpack');

module.exports = env => {

	return {

		mode: 'production',

		entry: {
			'../dist/three-mesh-ui': './src/three-mesh-ui.js',
		},

		output: {
			filename: '[name].js',
			library: 'ThreeMeshUI',
			libraryTarget: 'umd'
		}

	}

}