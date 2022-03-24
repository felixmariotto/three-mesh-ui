const webpack = require('webpack');

module.exports = env => {

	return {

		mode: 'production',

		entry: {
			'../build/three-mesh-ui': './src/three-mesh-ui.js',
		},

		output: {
			filename: '[name].js',
			library: 'ThreeMeshUI',
			libraryTarget: 'umd'
		},
		externals: {
			three:'THREE'
		}

	}

}
