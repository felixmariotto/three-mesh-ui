const path = require('path');
const webpack = require('webpack');

module.exports = env => {

	// let mode = "development";
	// let devtool = 'eval-source-map';

	const devtool = false;
	const mode = 'production';

	return {

		mode: mode,

		entry: {
			'../dist/three-mesh-ui': './src/three-mesh-ui.js',
		},

		devtool: devtool,

		output: {
			filename: '[name].js',
			library: 'three-mesh-ui',
   			libraryTarget: 'commonjs2'
		},

		module: {

			rules: [

				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'assets/[name].[ext]'
							}
						},
					],
					 
				},

			],

		}

	}

}