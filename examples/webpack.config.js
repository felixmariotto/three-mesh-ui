'use strict';
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const CopyPlugin = require("copy-webpack-plugin");
const glob = require( 'glob' );
const fs = require( 'fs' );
const readline = require( 'readline' );
const { mkdirIfNotExists } = require( 'karma/lib/helper' );

/***********************************************************************************************************************
 * CUSTOM WEBPACK PLUGIN
 * - Jobs :
 * 			- Gather all :xfg(example finger prints) from example header files
 * 			- Dispatch those informations to each html templates
 * 			- Save all those informations as json available in index.html for search/indexing purposes
 **********************************************************************************************************************/

/**
 *
 * @type {RegExp}
 */
const EMPTY_LINE_REGEX = /^\s*$/;

/**
 *
 * @type {RegExp}
 */
const XFG_LINE_REGEX = /^\s*\/\/\s*xfg:([A-z_]+)\s+(.+)/;


class ThreeMeshUIExamplePlugin {

	constructor() {

		this._pluginID = "ThreeMeshUIExamplePlugin";
		this._entries = [];
		this._entriesData = {};

	}

	/**
	 * Find all header comments `xfg:{info} {data}` from a filename
	 * @source https://stackoverflow.com/a/32599033/5769288
	 * @param {string} filepath
	 * @return {Promise<{string,any}>}
	 */
	async findDetails( filepath ) {
		const fileStream = fs.createReadStream( filepath );

		const rl = readline.createInterface( {
			input: fileStream,
			crlfDelay: Infinity
		} );

		let content = {};

		// read one line at time from top to bottom
		for await ( const line of rl ) {

			// until line is empty, check next line
			if ( line.match( EMPTY_LINE_REGEX ) ) continue;

			const xfgData = line.match( XFG_LINE_REGEX );
			if ( xfgData ) {

				// only register xfg data if key and value are not empty
				if ( xfgData[ 1 ] && xfgData[ 2 ] ) {
					content[ xfgData[ 1 ] ] = xfgData[ 2 ];
				}

				// until line is xfg formatted, check next line
				continue;

			}

			rl.close();
			fileStream.close();
			// not an empty line, neither a xfg one? stop this checks
			break;

		}

		return content;
	}

	/**
	 * Webpack Plugin interface
	 * @param compiler
	 */
	apply( compiler ) {

		compiler.hooks.done.tap(this._pluginID, ( compiler ) => {

			const dirName = path.join( __dirname , '../dist');
			const fileName = path.join( __dirname , '../dist/database.json');

			if( fs.existsSync( dirName) ) {

				fs.writeFileSync( fileName , JSON.stringify( this._entriesData, null, true ) );
			}else {

				mkdirIfNotExists( dirName, () => {
					fs.writeFileSync( fileName , JSON.stringify( this._entriesData, null, true ) );
				})
			}



		});

		compiler.hooks.compilation.tap( this._pluginID, (compilation) => {

				compilation.hooks.finishModules.tapAsync( this._pluginID, async (modules, callback) => {

					// When modules finished, find which xfg should be updated
					const entriesToRebuild = [];
					for ( const module of modules ) {

						const entry = this._entries.find( e => e.path === module.rawRequest );
						if( entry ){

							entriesToRebuild.push( entry );

						}

					}

					for ( const entry of entriesToRebuild ) {

						// update from xfg
						const details = await this.findDetails( entry.path );

						details.id = entry.id;

						if( !details.title ) {
							details.title = details.id;
						}

						details.link = details.title;
						if( details.type ) {
							details.link += ` <sup>${details.type}</sup>`;
						}

						//store it
						this._entriesData[ entry.id ] = details;

					}

					callback();

				})

			}
		);


		compiler.hooks.entryOption.tap( this._pluginID, ( context, entry ) => {

			// Register all entry keys
			for ( const entryKey in entry ) {

				if( entry.hasOwnProperty( entryKey) ) {
					this._entries.push( {id:entryKey, path:entry[entryKey].import[0]} );
				}

			}

		});

		compiler.hooks.beforeCompile.tapAsync( this._pluginID, async (params, callback) => {

			if( this._entriesData.length !== 0 ) {
				callback( null, params );
				return;
			}

			// register all entrypoints
			for ( const entry of this._entries ) {

				const details = await this.findDetails( entry.path );

				details.id = entry.id;

				if( !details.title ) {
					details.title = details.id;
				}

				details.link = details.title;
				if( details.type ) {
					details.link += ` <sup>${details.type}</sup>`;
				}

				this._entriesData[ entry.id ] = details;

			}

			//
			callback( null, params );

		} );

	}
}


// Automatically get all example.js files
const entryPoints = {};
glob.sync( './examples/*.js' ).map( function ( file ) {

	const entryKey = path.basename( file, '.js' );

	if( entryKey.indexOf("webpack.config") === -1 ){
		entryPoints[ entryKey ] = file;
	}
} );

// instanciate the plugin, it will be used by other
const threeMeshUIExamples = new ThreeMeshUIExamplePlugin();

// create one config for each of the data set above
// const pagesConfig = pages.map( ( page ) => {
const pagesConfig = Object.keys(entryPoints).map( ( page ) => {

	return new HtmlWebpackPlugin( {
		cache: false,
		title: page,
		filename: page + '.html',
		template: path.resolve( __dirname, `../examples/_html/example_template.html` ),
		templateParameters: function(compilation, assets, assetTags, options){

			// generate pages
			options.details = this._entriesData[ page ];
			options.title = options.details ? options.details.title : page;

			return {
				compilation,
				webpackConfig: compilation.options,
				htmlWebpackPlugin: {
					tags: assetTags,
					files: assets,
					options
				},
			};
		}.bind( threeMeshUIExamples ),
		chunks: [ page, 'three-mesh-ui' ],
		inject: true
	} );
} );

function pageReducer( accu, page ) {
	return accu + `<li title="${page.id}">${page.link}</li>`;
}

// just add one config for the index page
const indexConfig = new HtmlWebpackPlugin( {
	// sort pages per purposes
	environment: {
		production: false,
		version: require('../package.json').version,
	},

	filename: 'index.html',
	template: path.resolve( __dirname, `../examples/_html/index.html` ),
	templateParameters: function(compilation, assets, assetTags, options){

		const entryKeys = Object.keys(this._entriesData);

		// generate pages
		options.pages = {
			examples: entryKeys.filter( p => p.indexOf( 'ex__' ) === 0 ).map( p => this._entriesData[p]).reduce( pageReducer, '' ),
			api: entryKeys.filter( p => p.indexOf( 'api__' ) === 0 ).map( p => this._entriesData[p]).reduce( pageReducer, '' ),
			tutorials: entryKeys.filter( p => p.indexOf( 'tut__' ) === 0 ).map( p => this._entriesData[p]).reduce( pageReducer, '' ),
			dev: entryKeys.filter( p => p.indexOf( 'dev__' ) === 0 ).map( p => this._entriesData[p]).reduce( pageReducer, '' )
		}

		return {
			compilation,
			webpackConfig: compilation.options,
			htmlWebpackPlugin: {
				tags: assetTags,
				files: assets,
				options
			},
		};
	}.bind( threeMeshUIExamples ),
	inject: false,
	cache : false
} );

pagesConfig.push( indexConfig );

const webpackConfig = env => {

	const IN_PRODUCTION = env.NODE_ENV === 'prod';

	const config = {
		mode: 'development',
		devtool: 'eval-source-map',

		entry: entryPoints,

		plugins: [
			new ESLintPlugin( { overrideConfigFile: path.join( __dirname, '../config/codestyle/.eslintrc' ), } ),
			threeMeshUIExamples,
			new CopyPlugin({
				patterns: [
					{ from: "./examples/assets", to: "./assets" },
				],
			}),
			...pagesConfig
		],

		resolve: {
			alias: {
				'three-mesh-ui/examples': path.resolve( __dirname, '../examples/' ),
				'three-mesh-ui': path.resolve( __dirname, '../src/three-mesh-ui.js' ),
			},
		},

		optimization: {
			moduleIds: 'named',
			chunkIds: 'named',
			splitChunks: {
				cacheGroups: {
					vendors: {
						name: 'chunk_vendors',
						priority: 10,
						test: /[\\/]node_modules[\\/]three[\\/]/,
						chunks: 'all',
						reuseExistingChunk: true
					},
					threemeshui: {
						name: 'chunk_three-mesh-ui',
						priority: 11,
						test: /[\\/]src/,
						chunks: 'all',
						reuseExistingChunk: true
					},
					importedassets: {
						name: 'chunk_imported-assets',
						priority: 12,
						test: /(.)*\.json/,
						chunks: 'all',
						reuseExistingChunk: true
					},
				}
			}
		},

		devServer: {
			hot: false,
			// The static directory of assets
			static: {
				directory: path.join( __dirname, '../dist' ),
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

		indexConfig.userOptions.environment.production = true;

		config.optimization.minimize = true;

		config.optimization.minimizer = [
			new TerserPlugin( {
				test: /\.js(\?.*)?$/i,
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
		];
	}

	return config;
}

module.exports = webpackConfig;
