const Path = require('path')
const NodeExternals = require('webpack-node-externals')

const rules = [
	{
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: [
			/node_modules/,
			/dist/
		],
		options: {
			presets: ['@babel/preset-env']
		}
	}
]

const aliases = mode => ({
	Config: Path.resolve(__dirname, `./config.${mode}.js`),
})

module.exports = (env, argv) => {
	const mode = argv.mode || process.env.NODE_ENV || 'development'
	const isProd = mode === 'production'

	const config = {
		target: 'node',
		entry: Path.resolve(__dirname, 'src/server.js'),
		output: {
			path: Path.resolve(__dirname, 'dist'),
			filename: 'server.js'
		},
		module: {
			rules
		},
		externals: [NodeExternals()],
		resolve: {
			modules: ['src', 'node_modules'],
			alias: aliases(mode),
			extensions: ['.js', '.json']
		},
		performance: {
			hints: false
		},
		devtool: isProd ? false : '#eval-source-map'
	}

	return config
}